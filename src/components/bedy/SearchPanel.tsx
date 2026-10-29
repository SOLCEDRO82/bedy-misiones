import { useState } from "react";
import { BedDouble, BedSingle, CalendarDays, MapPin, Minus, Plus, Search } from "lucide-react";
import { zones } from "@/data/stays";
import { differenceInCalendarDays, format } from "date-fns";
import { es } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

export function SearchPanel({ zone, onZoneChange: setZone }: { zone: string; onZoneChange: (z: string) => void }) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [open, setOpen] = useState(false);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const nights = range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) : 0;
  const [dbl, setDbl] = useState(1);
  const [sgl, setSgl] = useState(0);
  const field = "w-full rounded-xl border-2 border-input bg-card py-2.5 text-sm text-foreground outline-none focus:border-primary";

  return (
    <form id="buscador" onSubmit={(e) => e.preventDefault()} className="scroll-mt-24 space-y-4 rounded-3xl bg-card/95 p-5 shadow-elegant backdrop-blur">
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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button type="button" className={`${field} grid grid-cols-2 text-left`}>
              {(["Entrada", "Salida"] as const).map((l, i) => {
                const d = i === 0 ? range?.from : range?.to;
                return (
                  <span key={l} className={`flex items-center gap-2 px-3 ${i ? "border-l-2 border-input" : ""}`}>
                    <CalendarDays className="h-5 w-5 shrink-0 text-primary" />
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold uppercase text-muted-foreground">{l}</span>
                      <span className={`block truncate font-semibold ${d ? "" : "text-muted-foreground"}`}>{d ? format(d, "EEE d MMM", { locale: es }) : "Elegir"}</span>
                    </span>
                  </span>
                );
              })}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              locale={es}
              selected={range}
              onSelect={(r) => { setRange(r); if (r?.from && r?.to && r.from.getTime() !== r.to.getTime()) setOpen(false); }}
              disabled={{ before: today }}
              numberOfMonths={1}
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        {nights > 0 && <p className="mt-2 text-sm font-semibold text-primary">{nights} {nights === 1 ? "noche" : "noches"}</p>}
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
