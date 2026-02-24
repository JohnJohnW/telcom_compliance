import { BookOpen, Scale, CalendarCheck, MapPin } from 'lucide-react';

const STATS = [
  { icon: BookOpen, value: '16', label: 'Compliance Areas' },
  { icon: Scale, value: '6', label: 'Key Acts Covered' },
  { icon: CalendarCheck, value: 'Feb 2026', label: 'Last Reviewed' },
  { icon: MapPin, value: 'AU Only', label: 'Australia Specific' },
];

export function StatsBar() {
  return (
    <section className="bg-steel-100 border-y border-steel-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-steel-200">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 md:px-8 first:pl-0 last:pr-0">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-steel-600/10 text-steel-600 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-navy-900">{value}</div>
                <div className="text-xs text-slate-500 font-medium">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
