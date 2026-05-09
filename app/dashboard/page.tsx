'use client';

import { useEffect, useState } from 'react';
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

  if (!data) {
    return <div className="p-10 text-white">Loading dashboard...</div>;
  }

  const [aiRange, setAiRange] = useState(data.rangeKm);
  const [aiSoh, setAiSoh] = useState(data.soh);
  const [speed, setSpeed] = useState(60); 

  useEffect(() => {
    const fetchAIPredictions = async () => {
      // ⚠️ PASTE YOUR EXACT RENDER URL RIGHT HERE ⚠️
      const apiURL = "https://ml-models-5files.onrender.com/api/predict";

      const currentSensorData = {
        soc_percent: data.soc || 85.0,
        speed_kmh: speed,
        current_a: data.current || 22.0,
        batt_temp_c: data.temperature || 38.0,
        cycles: 320,
        age_months: 18,
        fast_charge_ratio: 0.4
      };

      try {
        const response = await fetch(apiURL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentSensorData)
        });
        
        const result = await response.json();
        
        if (result.status === "success") {
          setAiRange(result.data.predicted_range_km);
          setAiSoh(result.data.predicted_soh_percent);
        }
      } catch (error) {
        console.error("AI Fetch Error:", error);
      }
    };

    fetchAIPredictions();
    const interval = setInterval(fetchAIPredictions, 5000);
    return () => clearInterval(interval);
  }, [data.soc, data.current, data.temperature, speed]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-white tracking-tight">System Overview</h1>
           <p className="text-sm text-slate-400 mt-1">Live AI Dashboard Connected!</p>
        </div>
      </div>

      <div style={{ padding: '20px', border: '1px solid #333', borderRadius: '10px', background: '#222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ color: 'white', fontWeight: 'bold', margin: 0 }}>Live Speed Simulator</h3>
          <p style={{ color: '#aaa', fontSize: '14px', margin: 0 }}>Drag to see how speed affects AI Range prediction</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <input 
            type="range" 
            min="0" 
            max="120" 
            value={speed} 
            onChange={(e) => setSpeed(Number(e.target.value))}
            style={{ width: '200px', cursor: 'pointer' }}
          />
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#00ff00', width: '100px' }}>{speed} km/h</span>
        </div>
      </div>

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
          value={`${aiSoh}%`} 
          subtitle="AI Predicted"
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <RangeCard range={aiRange} accuracy={data.rangeAccuracy} /> 
          <BatteryChart data={data.history} />
          <ActivityLogs />
        </div>
        <div className="xl:col-span-1 space-y-6">
          <DeviceStatus connectionStatus={data.connectionStatus} systemRisk={data.systemRisk} />
          <AlertsPanel />
          <AIInsights />
        </div>
      </div>
    </div>
  );
}