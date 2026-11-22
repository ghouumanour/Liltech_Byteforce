import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useApp } from '../../context/AppContext';

export function Membership(){
 const {role,authenticated,setAuthModalMode,setIsAuthModalOpen}=useApp();
 const [status,setStatus]=useState('none');
 const [error,setError]=useState('');
 const [busy,setBusy]=useState(false);
 async function perform(request=false){
  setBusy(true);setError('');
  const controller=new AbortController();
  let deadline:ReturnType<typeof setTimeout>|undefined;
  try{
   const timeout=new Promise<never>((_,reject)=>{deadline=setTimeout(()=>{controller.abort();reject(new Error('Request timed out. Refresh status before retrying.'));},1850);});
   const result=await Promise.race([supabase.rpc('getboth_membership',{p_request:request}).abortSignal(controller.signal),timeout]);
   if(result.error)throw new Error(result.error.message);
   setStatus(result.data?.status||'none');
  }catch(e){setError(e instanceof Error?e.message:'Request failed.');}
  finally{if(deadline!==undefined)clearTimeout(deadline);setBusy(false);}
 }
 useEffect(()=>{setStatus('none');if(authenticated&&role==='employer')void perform();},[authenticated,role]);
 async function request(){if(!busy)await perform(true);}
 async function refresh(){if(!busy)await perform();}
 return <section className="max-w-4xl mx-auto px-4 py-8 space-y-5">
 <div><p className="text-xs uppercase font-bold text-tunisian">GetBoth membership</p><h1 className="text-3xl font-black text-navy">Grow on your terms.</h1><p className="text-slate-500">Students stay free. Employers can register interest in Pro.</p></div>
 <div className="grid sm:grid-cols-2 gap-4">
 <article className="bg-white border rounded-3xl p-6 space-y-3"><h2 className="font-bold text-xl text-navy">Free</h2><p className="text-3xl font-black text-navy">0 DT</p><p>{role==='employer'?'Post missions, manage your company profile and review applicants.':'Browse opportunities, manage your schedule and apply for jobs.'}</p><p className="text-sm text-slate-500">{role==='employer'?'Basic employer access remains free.':'Core student access stays free.'}</p></article>
 <article className="bg-navy text-white rounded-3xl p-6 space-y-3"><h2 className="font-bold text-xl">Employer Pro</h2><p className="text-2xl font-bold">Early access</p><p>Planned: advanced recruiting filters, promoted missions and recruitment analytics.</p><p className="text-sm text-slate-300">No payment is collected. Features and pricing are not launched.</p>
 {!authenticated?<button className="bg-white text-navy px-4 py-3 rounded-xl font-bold" onClick={()=>{setAuthModalMode('login');setIsAuthModalOpen(true)}}>Sign in</button>:role==='employer'?<button disabled={busy||status!=='none'} className="bg-white text-navy px-4 py-3 rounded-xl font-bold disabled:opacity-60" onClick={request}>{busy?'Submitting…':status==='none'?'Request Pro access':status==='approved'?'Interest approved':status==='declined'?'Request declined':'Request pending'}</button>:<p className="text-sm">Available for employer accounts.</p>}
 {authenticated&&role==='employer'&&<button disabled={busy} className="block underline text-sm" onClick={()=>void refresh()}>Refresh status</button>}</article></div>
 {error&&<p role="alert" className="text-tunisian text-sm">{error}</p>}</section>;
}
