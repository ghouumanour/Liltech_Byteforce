import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DollarSign, TrendingUp, ShieldCheck, ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';

export const StudentEarningsChart: React.FC = () => {
  const { student, applications, jobs } = useApp();
  const [withdrawnNotice, setWithdrawnNotice] = useState(false);

  const completedApps = applications.filter(a => a.studentId === student.id && a.status === 'completed');
  const acceptedApps = applications.filter(a => a.studentId === student.id && a.status === 'accepted');

  const escrowLockedAmount = acceptedApps.reduce((acc, a) => {
    const job = jobs.find(j => j.id === a.jobId);
    return acc + (job ? job.totalPayment : 48);
  }, 0);

  const months = [
    { name: 'Aug', amount: 180, height: 35 },
    { name: 'Sep', amount: 240, height: 48 },
    { name: 'Oct', amount: 360, height: 72 },
    { name: 'Nov (Current)', amount: student.totalEarnings, height: 95 }
  ];

  const handleWithdraw = () => {
    setWithdrawnNotice(true);
    setTimeout(() => setWithdrawnNotice(false), 3000);
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-soft space-y-5">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-tunisian block font-display">
            Financial Ledger & Escrow
          </span>
          <h3 className="text-lg font-black text-navy font-display">
            Earnings & Payout Overview
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleWithdraw}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-1.5"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>Withdraw Balance</span>
          </button>
        </div>
      </div>

      {withdrawnNotice && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Transfer request of {student.totalEarnings} DT dispatched to your Tunisian bank / D17 account!</span>
        </div>
      )}

      {/* Big Balances Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 block">Available Balance (Paid Out)</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-black text-navy font-display">{student.totalEarnings}</span>
            <span className="text-sm font-bold text-tunisian">DT</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-bold inline-flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> Ready for immediate bank transfer
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-blush/30 border border-blush-300">
          <span className="text-[11px] font-semibold text-slate-500 block">Locked in Escrow (Upcoming Missions)</span>
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-3xl font-black text-tunisian font-display">{escrowLockedAmount}</span>
            <span className="text-sm font-bold text-tunisian">DT</span>
          </div>
          <span className="text-[10px] text-slate-600 font-semibold inline-flex items-center gap-1 mt-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Released upon shift completion
          </span>
        </div>
      </div>

      {/* Visual Bar Chart */}
      <div className="pt-2">
        <span className="text-xs font-bold text-navy block mb-3 font-display">Monthly Earnings Growth (DT)</span>
        <div className="h-32 flex items-end justify-between gap-3 px-2 pt-4 border-b border-slate-200">
          {months.map(m => (
            <div key={m.name} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-[10px] font-bold text-navy opacity-0 group-hover:opacity-100 transition-opacity">
                {m.amount} DT
              </span>
              <div
                style={{ height: `${m.height}%` }}
                className={`w-full max-w-[48px] rounded-t-xl transition-all group-hover:scale-105 ${
                  m.name.includes('Current')
                    ? 'bg-gradient-to-t from-navy to-fresh shadow-md'
                    : 'bg-slate-200 group-hover:bg-fresh-200'
                }`}
              ></div>
              <span className="text-[10px] font-semibold text-slate-500 truncate max-w-[80px]">
                {m.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Payout List */}
      <div className="space-y-2 pt-1">
        <span className="text-xs font-bold text-navy block font-display">Recent Completed Mission Payouts</span>
        <div className="space-y-1.5 text-xs">
          {completedApps.map(app => {
            const job = jobs.find(j => j.id === app.jobId);
            return (
              <div key={app.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-navy block truncate max-w-[220px]">{job?.title || 'Mission'}</span>
                  <span className="text-[10px] text-slate-400">{job?.companyName} • {job?.date}</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-emerald-600 block">+{job?.totalPayment || 50} DT</span>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase">Settled</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
