import { useState } from "react";
import { BedDouble, BedSingle, CalendarDays, MapPin, Minus, Plus, Search } from "lucide-react";
import { zones } from "@/data/stays";

function Label({ a, b }: { a: string; b: string }) {
  return (
    <p className="mb-2 text-sm font-semibold text-foreground">
      {a} <span className="font-extrabold uppercase text-primary">{b}</span>
    </p>
  );
}

function Counter({ icon: Icon, label, value, onChange }: { icon: typeof BedDouble; label: string; value: number; onChange: (n: number) => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl border-2 border-input bg-card px-3 py-2">
      <span className="flex items-center gap-2 text-sm font-semibold text-foreground"><Icon className="h-5 w-5 text-primary" />{label}</span>
      <span className="flex items-center gap-2">
        <button type="button" aria-label={`Menos ${label}`} onClick={() => onChange(Math.max(0, value - 1))} className="rounded-full bg-secondary p-1 text-secondary-foreground disabled:opacity-40" disabled={value === 0}><Minus className="h-3.5 w-3.5" /></button>
        <span className="w-4 text-center font-bold">{value}</span>
        <button type="button" aria-label={`Más ${label}`} onClick={() => onChange(Math.min(9, value + 1))} className="rounded-full bg-primary p-1 text-primary-foreground"><Plus className="h-3.5 w-3.5" /></button>
      </span>
    </div>
  );
}

export function SearchPanel() {
  const [zone, setZone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [dbl, setDbl] = useState(1);
  const [sgl, setSgl] = useState(0);
  const field = "w-full rounded-xl border-2 border-input bg-card py-2.5 text-sm text-foreground outline-none focus:border-primary";

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4 rounded-3xl bg-card/95 p-5 shadow-elegant backdrop-blur">
      <div>
        <Label a="Indicá el" b="destino" />
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
          <input list="zonas" value={zone} onChange={(e) => setZone(e.target.value)} placeholder="¿A dónde vamos?" className={`${field} pl-10 pr-3`} />
          <datalist id="zonas">{zones.map((z) => <option key={z} value={z} />)}</datalist>
        </div>
      </div>
      <div>
        <Label a="Seleccioná las" b="fechas" />
        <div className="grid grid-cols-2 gap-3">
          {[["Check-in", checkIn, setCheckIn], ["Check-out", checkOut, setCheckOut]].map(([l, v, set]) => (
            <label key={l as string} className="relative block">
              <span className="sr-only">{l as string}</span>
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
              <input type="date" value={v as string} onChange={(e) => (set as (s: string) => void)(e.target.value)} className={`${field} pl-10 pr-2`} />
            </label>
          ))}
        </div>
      </div>
      <div>
        <Label a="Cantidad de" b="camas" />
        <div className="grid gap-3 sm:grid-cols-2">
          <Counter icon={BedDouble} label="Matrimonial" value={dbl} onChange={setDbl} />
          <Counter icon={BedSingle} label="Individual" value={sgl} onChange={setSgl} />
        </div>
      </div>
      <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-primary py-3 font-bold text-primary-foreground shadow-elegant transition hover:opacity-95">
        <Search className="h-5 w-5" /> Buscar hospedaje
      </button>
    </form>
  );
}
