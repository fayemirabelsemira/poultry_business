export type EggSize = "Small" | "Medium" | "Large";

export interface Product {
  size: EggSize;
  minPrice: number; // per tray, PHP
  maxPrice: number; // per tray, PHP
  blurb: string;
  imageKey: string; // file name (without extension) in src/assets/eggs
  alt: string;
}

// All sizes share one tray photo for now. To use a separate photo per size, add
// small.jpg / medium.jpg / large.jpg to src/assets/eggs and change the keys below.
export const PRODUCTS: Product[] = [
  {
    size: "Small",
    minPrice: 120,
    maxPrice: 180,
    blurb: "Everyday eggs for simple meals.",
    imageKey: "egg-tray",
    alt: "Tray of small eggs",
  },
  {
    size: "Medium",
    minPrice: 200,
    maxPrice: 250,
    blurb: "A dependable all-rounder.",
    imageKey: "egg-tray",
    alt: "Tray of medium eggs",
  },
  {
    size: "Large",
    minPrice: 300,
    maxPrice: 350,
    blurb: "Generous eggs for hearty breakfasts.",
    imageKey: "egg-tray",
    alt: "Tray of large eggs",
  },
];
