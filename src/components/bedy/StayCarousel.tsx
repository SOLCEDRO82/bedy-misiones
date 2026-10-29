import { useState } from "react";
import { BedDouble, BedSingle, Heart, MapPin, Star } from "lucide-react";
import { formatARS, type Stay } from "@/data/stays";

export function StayCarousel({ title, subtitle, stays, onSelect }: { title: string; subtitle: string; stays: Stay[]; onSelect: (s: Stay) => void }) {
  return (
    <section className="py-6">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-display text-2xl font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="no-scrollbar mx-auto mt-4 flex max-w-6xl snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2">
        {stays.map((s) => (
          <StayCard key={s.id} stay={s} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

function StayCard({ stay, onSelect }: { stay: Stay; onSelect: (s: Stay) => void }) {
  const [fav, setFav] = useState(false);
  const isOffer = !!stay.oldPrice;
  return (
    <article className="relative w-64 shrink-0 snap-start overflow-hidden rounded-2xl border bg-card shadow-sm sm:w-72">
      <button onClick={() => onSelect(stay)} className="block w-full text-left">
        <div className="relative">
          <img src={stay.image} alt={stay.title} loading="lazy" width={944} height={704} className="aspect-[4/3] w-full object-cover" />
          <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold ${isOffer ? "bg-offer text-on-overlay" : "bg-card text-primary"}`}>
            {stay.badge}
          </span>
        </div>
        <div className="space-y-1.5 p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate font-bold text-card-foreground">{stay.title}</h3>
            <span className="flex items-center gap-1 text-sm font-semibold"><Star className="h-4 w-4 fill-primary text-primary" />{stay.rating}</span>
          </div>
          <p className="flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{stay.zone}</p>
          <p className="flex gap-3 text-xs text-muted-foreground">
            {stay.doubleBeds > 0 && <span className="flex items-center gap-1"><BedDouble className="h-4 w-4" />{stay.doubleBeds} matrim.</span>}
            {stay.singleBeds > 0 && <span className="flex items-center gap-1"><BedSingle className="h-4 w-4" />{stay.singleBeds} indiv.</span>}
          </p>
          <p className="pt-1">
            {isOffer && <span className="mr-2 text-sm text-muted-foreground line-through">{formatARS(stay.oldPrice!)}</span>}
            <span className="font-bold text-foreground">{formatARS(stay.pricePerNight)}</span>
            <span className="text-sm text-muted-foreground"> / noche</span>
          </p>
        </div>
      </button>
      <button
        aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
        onClick={() => setFav(!fav)}
        className="absolute right-3 top-3 rounded-full bg-card/90 p-2 shadow"
      >
        <Heart className={`h-4 w-4 ${fav ? "fill-primary text-primary" : "text-foreground"}`} />
      </button>
    </article>
  );
}
