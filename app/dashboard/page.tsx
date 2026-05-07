'use client';

import { useBatteryData } from '@/hooks/useBatteryData';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { RangeCard } from '@/components/dashboard/RangeCard';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { BatteryChart } from '@/components/dashboard/BatteryChart';
import { AIInsights } from '@/components/dashboard/AIInsights';
import { DeviceStatus } from '@/components/dashboard/DeviceStatus';
import { ActivityLogs } from '@/components/dashboard/ActivityLogs';
import { Zap, Activity, Thermometer, Battery, ActivitySquare } from 'lucide-react';

export default function DashboardPage() {
  const data = useBatteryData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-white tracking-tight">System Overview</h1>
           <p className="text-sm text-slate-400 mt-1">Real-time intelligence and telemetry</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard 
          title="State of Charge" 
          value={`${data.soc}%`} 
          subtitle={data.remainingTime}
          icon={<Battery className="w-5 h-5" />} 
          statusColor={data.soc > 20 ? 'green' : 'red'}
        />
        <KpiCard 
          title="State of Health" 
          value={`${data.soh}%`} 
          subtitle="Optimal condition"
          icon={<ActivitySquare className="w-5 h-5" />} 
          statusColor="blue"
        />
        <KpiCard 
          title="Temperature" 
          value={`${data.temperature}°C`} 
          subtitle="Stable cooling"
          icon={<Thermometer className="w-5 h-5" />} 
          statusColor={data.temperature > 40 ? 'red' : data.temperature > 35 ? 'yellow' : 'green'}
        />
        <KpiCard 
          title="Voltage" 
          value={`${data.voltage}V`} 
          subtitle="Nominal range"
          icon={<Zap className="w-5 h-5" />} 
          statusColor="blue"
        />
        <KpiCard 
          title="Current" 
          value={`${data.current}A`} 
          subtitle={data.status}
          icon={<Activity className="w-5 h-5" />} 
          statusColor={data.current > 0 ? 'green' : 'yellow'}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (Span 2) */}
        <div className="xl:col-span-2 space-y-6">
          <RangeCard range={data.rangeKm} accuracy={data.rangeAccuracy} />
          <BatteryChart data={data.history} />
          <ActivityLogs />
        </div>

        {/* Right Column (Span 1) */}
        <div className="xl:col-span-1 space-y-6">
          <DeviceStatus connectionStatus={data.connectionStatus} systemRisk={data.systemRisk} />
          <AlertsPanel />
          <AIInsights />
        </div>

      </div>
    </div>
  );
}
