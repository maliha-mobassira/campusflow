import React from 'react';
import { Users, Building2, UserCheck, ArrowUpRight, Sparkles } from 'lucide-react';

const STATS = [
  {
    title: 'Total Students',
    value: '1,248',
    change: '+12% from last term',
    icon: Users,
  },
  {
    title: 'Departments',
    value: '12',
    change: 'Active faculties',
    icon: Building2,
  },
  {
    title: 'Active Students',
    value: '1,104',
    change: '88.5% engagement rate',
    icon: UserCheck,
  },
];

export default function Dashboard({ onNavigateToStudents }) {
  return (
    <div className="space-y-10">
      {/* Header section with Editorial Typography */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1111110a] dark:bg-[#ffffff10] text-[#11111199] dark:text-[#F5F5F599] mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CampusFlow Overview</span>
        </div>
        <h1
          className="text-5xl md:text-6xl font-medium leading-none text-[#111111] dark:text-[#F5F5F5]"
          style={{ letterSpacing: '-0.04em' }}
        >
          Dashboard
        </h1>
        <p className="text-base text-[#11111199] dark:text-[#F5F5F599] pt-1">
          Welcome back.
        </p>
      </div>

      {/* Primary Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-[#11111112] dark:border-[#FFFFFF14] bg-white dark:bg-[#1C1C1C] p-6 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-[#11111199] dark:text-[#F5F5F599]">
                  {stat.title}
                </span>
                <div className="w-9 h-9 rounded-xl bg-[#F5F5F5] dark:bg-[#242424] flex items-center justify-center text-[#111111] dark:text-[#F5F5F5]">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div
                className="text-3xl md:text-4xl font-semibold tracking-tight text-[#111111] dark:text-[#F5F5F5]"
                style={{ letterSpacing: '-0.03em' }}
              >
                {stat.value}
              </div>
              <p className="text-xs text-[#11111166] dark:text-[#F5F5F566] mt-2 font-normal">
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Visual Quick Actions Banner */}
      <div className="rounded-3xl border border-[#11111112] dark:border-[#FFFFFF14] bg-[#FAFAFA] dark:bg-[#242424] p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-colors duration-300">
        <div className="space-y-1.5 max-w-md">
          <h2
            className="text-xl font-semibold text-[#111111] dark:text-[#F5F5F5] tracking-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            Ready to manage campus records?
          </h2>
          <p className="text-sm text-[#11111199] dark:text-[#F5F5F599]">
            Explore student rosters, academic departments, and track campus progress in one unified view.
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateToStudents}
          className="self-start sm:self-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111111] font-medium text-sm hover:opacity-90 transition-all cursor-pointer shadow-sm"
        >
          <span>View Student Directory</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
