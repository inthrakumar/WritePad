import { Users, Star, Edit3, ChevronRight, Activity } from "lucide-react"



export function StatsInteractive() {
  return (
    <section className="bg-gradient-to-br from-rose-100 to-teal-100 py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: Users, value: "100k+", label: "Active Users", color: "from-purple-500" },
            { icon: Star, value: "4.9/5", label: "User Rating", color: "from-rose-500" },
            { icon: Edit3, value: "1M+", label: "Documents Created", color: "from-teal-500" },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
              />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-full bg-slate-100 p-3">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <Activity className="h-5 w-5 text-slate-400" />
                </div>
                <div className="mb-2 text-4xl font-bold tracking-tight text-slate-900">{stat.value}</div>
                <p className="text-slate-600">{stat.label}</p>
             
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function StatsShowcase() {
  return (
    <div>
      <StatsInteractive />
    </div>
  )
}


