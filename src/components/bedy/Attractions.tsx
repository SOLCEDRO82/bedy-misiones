import { ArrowRight } from "lucide-react";
import fiesta from "@/assets/attr-fiesta.jpg";
import te from "@/assets/attr-te.jpg";
import termas from "@/assets/attr-termas.jpg";
import salto from "@/assets/attr-salto.jpg";
import rural from "@/assets/attr-rural.jpg";

const attractions = [
  { title: "Fiesta Nacional del Inmigrante", tag: "Evento · Septiembre", desc: "Danzas, comidas típicas y casas de cada colectividad.", zone: "Parque de las Naciones", image: fiesta },
  { title: "Ruta del Té", tag: "Experiencia", desc: "Plantaciones, catas y paisajes de tierra colorada.", zone: "Ruta del Té", image: te },
  { title: "Termas", tag: "Relax", desc: "Aguas termales rodeadas de selva para desconectar.", zone: "Zona Termal", image: termas },
  { title: "Salto Berrondo", tag: "Naturaleza", desc: "Cascada, arroyo y senderos entre el monte.", zone: "Salto Berrondo", image: salto },
  { title: "Turismo rural", tag: "Chacras", desc: "Yerbales, granjas y la vida de campo misionera.", zone: "Oberá Centro", image: rural },
];

export function Attractions({ onPick }: { onPick: (zone: string) => void }) {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-2xl font-semibold text-foreground">¿Qué te trae por Misiones?</h2>
        <p className="text-sm text-muted-foreground">Elegí tu plan y encontrá dónde descansar cerca.</p>
      </div>
      <div className="no-scrollbar mx-auto mt-4 flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
        {attractions.map((a) => (
          <button
            key={a.title}
            onClick={() => onPick(a.zone)}
            className="group relative h-80 w-60 shrink-0 snap-start overflow-hidden rounded-2xl text-left shadow-sm lg:w-auto"
          >
            <img src={a.image} alt={a.title} loading="lazy" width={800} height={1008} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-overlay/90 via-overlay/30 to-transparent" />
            <span className="absolute left-3 top-3 rounded-full bg-card px-2.5 py-1 text-xs font-bold text-primary">{a.tag}</span>
            <div className="absolute inset-x-0 bottom-0 space-y-1.5 p-4 text-on-overlay">
              <h3 className="font-display text-lg font-semibold leading-tight">{a.title}</h3>
              <p className="text-xs opacity-90">{a.desc}</p>
              <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground">
                Ver hospedajes cercanos <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
