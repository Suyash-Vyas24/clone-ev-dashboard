import { Card, CardHeader, CardContent } from '../ui/Card';
import { BrainCircuit, TrendingUp, Cpu } from 'lucide-react';

const mockInsights = [
  {
    id: 1,
    title: 'Optimal Charging Window',
    explanation: 'Based on your usage patterns and grid rates, charging at 2:00 AM will maximize cost savings while ensuring a full charge by 7:00 AM.',
    recommendation: 'Schedule Smart Charge',
    confidence: 94,
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-400/10'
  },
  {
    id: 2,
    title: 'Range Degradation Risk',
    explanation: 'Frequent fast charging in high ambient temperatures is causing a slight increase in internal resistance.',
    recommendation: 'Use AC charging for next 3 cycles',
    confidence: 87,
    icon: BrainCircuit,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10'
  }
];

export function AIInsights() {
  return (
    <Card className="col-span-full xl:col-span-1 h-[450px] flex flex-col">
      <CardHeader className="flex flex-row items-center gap-2 py-4">
        <BrainCircuit className="w-5 h-5 text-purple-400" />
        <h2 className="text-lg font-semibold text-white">AI Insights</h2>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {mockInsights.map((insight) => (
          <div key={insight.id} className="p-4 rounded-xl relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 group hover:border-slate-600 transition-colors">
            
            {/* Sparkle effects */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl -mr-16 -mt-16 transition-opacity group-hover:opacity-100 opacity-50"></div>
            
            <div className="flex items-start justify-between mb-2 relative z-10">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${insight.bg}`}>
                  <insight.icon className={`w-4 h-4 ${insight.color}`} />
                </div>
                <h3 className="font-medium text-slate-200">{insight.title}</h3>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-slate-300">{insight.confidence}%</span>
                <span className="text-[10px] text-slate-500 uppercase">Conf</span>
              </div>
            </div>
            
            <p className="text-sm text-slate-400 mb-4 leading-relaxed relative z-10">
              {insight.explanation}
            </p>
            
            <button className="text-sm font-medium text-purple-400 hover:text-purple-300 relative z-10 flex items-center gap-1 group/btn transition-colors">
              {insight.recommendation}
              <span className="transition-transform group-hover/btn:translate-x-1">→</span>
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
