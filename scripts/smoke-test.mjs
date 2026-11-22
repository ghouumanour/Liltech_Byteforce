import fs from 'node:fs';
import { performance } from 'node:perf_hooks';

// Public, non-destructive API smoke tests. No test users or writes.
const pairs = fs.readFileSync(new URL('../.env', import.meta.url), 'utf8')
  .split(/\r?\n/).filter(line => /^(VITE_SUPABASE_URL|VITE_SUPABASE_PUBLISHABLE_KEY)=/.test(line))
  .map(line => [line.slice(0, line.indexOf('=')), line.slice(line.indexOf('=') + 1).trim()]);
const config = Object.fromEntries(pairs);
const base = config.VITE_SUPABASE_URL?.replace(/\/$/, '');
const key = config.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!base?.startsWith('https://') || !key?.startsWith('sb_publishable_')) {
  console.error('Missing expected public Supabase configuration.');
  process.exit(2);
}

const cases = [
  { name: 'Public missions', path: '/rest/v1/missions?select=id&limit=1', status: 200 },
  { name: 'Profiles schema', path: '/rest/v1/profiles?select=id&limit=0', status: 200 },
  { name: 'Applications schema', path: '/rest/v1/applications?select=id&limit=0', status: 200 },
  { name: 'Membership rejects anonymous RPC', path: '/rest/v1/rpc/getboth_membership', method: 'POST', body: {p_request: false}, status: 401 },
  { name: 'Membership protects data', path: '/rest/v1/membership_requests?select=status&limit=0', status: 401 }
];
let failures = 0;
for (const test of cases) {
  const started = performance.now();
  try {
    const response = await fetch(base + test.path, {
      method: test.method || 'GET',
      headers: { apikey: key, 'Content-Type': 'application/json' },
      body: test.body ? JSON.stringify(test.body) : undefined,
      signal: AbortSignal.timeout(5000)
    });
    const elapsed = Math.round(performance.now() - started);
    const pass = response.status === test.status;
    if (!pass) failures++;
    console.log(`${pass ? 'PASS' : 'FAIL'} ${test.name}: HTTP ${response.status}, ${elapsed}ms`);
  } catch (error) {
    failures++;
    console.error(`FAIL ${test.name}: ${error.message}`);
  }
}
console.log(`Smoke test: ${cases.length - failures}/${cases.length} passed.`);
if (failures) process.exitCode = 1;
