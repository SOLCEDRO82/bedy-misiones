import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bell, CalendarCheck, Heart, Home, Menu, Moon, Sun, User, X } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { Logo } from "@/components/bedy/Logo";
import { SearchPanel } from "@/components/bedy/SearchPanel";
import { StayCarousel } from "@/components/bedy/StayCarousel";
import { featured, formatARS, newest, offers, type Stay } from "@/data/stays";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "bedy — Hospedajes en Oberá, Misiones" },
      { name: "description", content: "Buscá y reservá cabañas, departamentos y casas en Oberá eligiendo cuántas camas matrimoniales e individuales necesitás." },
      { property: "og:title", content: "bedy — Hospedajes en Oberá, Misiones" },
      { property: "og:description", content: "Reservá tu hospedaje en Oberá eligiendo tus camas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState<Stay | null>(null);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);

  return (
    <div className="min-h-screen bg-background pb-20 font-sans">
      <header className="sticky top-0 z-30 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <div className="flex items-center gap-1">
            <button aria-label="Cambiar modo claro/oscuro" onClick={() => setDark(!dark)} className="rounded-full p-2 text-foreground hover:bg-accent">
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button aria-label="Abrir menú" onClick={() => setMenu(true)} className="rounded-full p-2 text-foreground hover:bg-accent"><Menu className="h-6 w-6" /></button>
          </div>
        </div>
      </header>

      {menu && (
        <div className="fixed inset-0 z-50 bg-overlay/50" onClick={() => setMenu(false)}>
          <nav onClick={(e) => e.stopPropagation()} className="ml-auto h-full w-72 bg-card p-6 shadow-xl">
            <div className="mb-8 flex items-center justify-between"><Logo className="text-2xl" /><button aria-label="Cerrar" onClick={() => setMenu(false)}><X className="h-6 w-6" /></button></div>
            <ul className="space-y-4 font-semibold text-card-foreground">
              <li><button className="w-full rounded-xl bg-gradient-primary py-2.5 text-primary-foreground">Ingresar / Registrarme</button></li>
              <li>Publicar mi hospedaje</li><li>Cómo funciona</li><li>Ayuda</li>
            </ul>
          </nav>
        </div>
      )}

      <section className="relative">
        <img src={hero} alt="Cabaña entre la selva misionera al atardecer" width={1280} height={1600} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-overlay/60 via-overlay/30 to-background" />
        <div className="relative mx-auto grid max-w-6xl gap-6 px-4 pb-10 pt-10 md:grid-cols-2 md:items-center md:pt-20">
          <div className="text-on-overlay">
            <p className="text-sm font-bold uppercase tracking-widest opacity-90">Oberá · Misiones</p>
            <h1 className="mt-2 font-display text-4xl font-semibold leading-tight md:text-5xl">Dormí como en casa,<br />en el corazón de la tierra colorada.</h1>
            <p className="mt-3 max-w-md opacity-90">Elegí tus camas, no solo la cantidad de personas.</p>
          </div>
          <SearchPanel />
        </div>
      </section>

      <StayCarousel title="Destacados" subtitle="Los favoritos de quienes visitan Oberá" stays={featured} onSelect={setSelected} />
      <StayCarousel title="Nuevos hospedajes" subtitle="Recién llegados a bedy" stays={newest} onSelect={setSelected} />
      <StayCarousel title="Ofertas" subtitle="Precios especiales por tiempo limitado" stays={offers} onSelect={setSelected} />

      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="rounded-3xl bg-gradient-primary p-6 text-primary-foreground shadow-elegant md:flex md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="font-display text-2xl font-semibold md:text-3xl">¿Tenés un hospedaje en Misiones?</h2>
            <p className="mt-1 opacity-90">Publicalo en bedy y empezá a recibir huéspedes.</p>
          </div>
          <button className="mt-4 rounded-xl bg-card px-5 py-3 font-bold text-primary md:mt-0">Publicar ahora</button>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-overlay/50 sm:items-center" onClick={() => setSelected(null)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md overflow-hidden rounded-t-3xl bg-card sm:rounded-3xl">
            <img src={selected.image} alt={selected.title} className="aspect-video w-full object-cover" />
            <div className="space-y-3 p-5">
              <h3 className="font-display text-xl font-semibold">{selected.title}</h3>
              <p className="text-sm text-muted-foreground">{selected.zone} · {selected.doubleBeds} matrimonial · {selected.singleBeds} individual</p>
              <div className="flex justify-between rounded-xl bg-secondary p-3 text-sm text-secondary-foreground"><span>3 noches × {formatARS(selected.pricePerNight)}</span><b>{formatARS(selected.pricePerNight * 3)}</b></div>
              <button className="w-full rounded-xl bg-gradient-primary py-3 font-bold text-primary-foreground">Iniciá sesión para reservar</button>
              <button onClick={() => setSelected(null)} className="w-full py-2 text-sm text-muted-foreground">Cerrar</button>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t bg-card">
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {[[Home, "Inicio"], [Heart, "Favoritos"], [Bell, "Avisos"], [CalendarCheck, "Reservas"], [User, "Perfil"]].map(([Icon, l], i) => {
            const I = Icon as typeof Home;
            return (
              <li key={l as string}>
                <button className={`flex w-full flex-col items-center gap-0.5 py-2.5 text-[11px] font-semibold ${i === 0 ? "text-primary" : "text-muted-foreground"}`}>
                  <I className="h-5 w-5" />{l as string}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
