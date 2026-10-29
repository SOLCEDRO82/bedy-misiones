import stay1 from "@/assets/stay1.jpg";
import stay2 from "@/assets/stay2.jpg";
import stay3 from "@/assets/stay3.jpg";
import stay4 from "@/assets/stay4.jpg";

export type Stay = {
  id: string;
  title: string;
  zone: string;
  image: string;
  pricePerNight: number;
  oldPrice?: number;
  rating: number;
  doubleBeds: number;
  singleBeds: number;
  badge?: string;
};

export const zones = ["Oberá Centro", "Salto Berrondo", "Ruta del Té", "Parque de las Naciones", "Zona Termal"];

const base: Stay[] = [
  { id: "1", title: "Cabaña del Monte", zone: "Salto Berrondo", image: stay1, pricePerNight: 68000, rating: 4.9, doubleBeds: 1, singleBeds: 2 },
  { id: "2", title: "Depto Luz Verde", zone: "Oberá Centro", image: stay2, pricePerNight: 45000, rating: 4.7, doubleBeds: 1, singleBeds: 0 },
  { id: "3", title: "Casa Quinta Tierra Roja", zone: "Zona Termal", image: stay3, pricePerNight: 120000, rating: 4.8, doubleBeds: 2, singleBeds: 3 },
  { id: "4", title: "Lodge Ruta del Té", zone: "Ruta del Té", image: stay4, pricePerNight: 52000, rating: 4.6, doubleBeds: 0, singleBeds: 2 },
];

export const featured = base.map((s) => ({ ...s, badge: "Destacado" }));
export const newest = [...base].reverse().map((s) => ({ ...s, id: `n${s.id}`, badge: "Nuevo" }));
export const offers = base.map((s) => ({
  ...s,
  id: `o${s.id}`,
  oldPrice: s.pricePerNight,
  pricePerNight: Math.round(s.pricePerNight * 0.8),
  badge: "-20%",
}));

export const formatARS = (n: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(n);
