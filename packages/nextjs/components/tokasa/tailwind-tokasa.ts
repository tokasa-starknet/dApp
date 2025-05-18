/**
 * Este archivo contiene las clases de Tailwind personalizadas para ToKasa
 * basadas en la configuración de tailwind.tokasa.config.ts
 */

// Contenedores principales
export const tokasaContainer = "bg-zinc-950 text-white";
export const tokasaCard =
  "bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-4 shadow-lg";
export const tokasaBox = "border border-zinc-800 rounded-lg p-4";

// Navegación y sidebar
export const tokasaSidebar =
  "hidden md:flex flex-col w-64 border-r border-zinc-800 p-4 sticky top-0 h-screen";
export const tokasaNavItem = {
  active:
    "flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white",
  inactive:
    "flex items-center space-x-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-zinc-800",
};
export const tokasaNavSection = "space-y-1";
export const tokasaFooterSection = "mt-auto pt-6 border-t border-zinc-800";

// Elementos interactivos
export const tokasaButton =
  "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-2 px-4 rounded-lg";
export const tokasaButtonOutline =
  "border border-blue-500 text-blue-500 hover:bg-blue-500/10 font-medium py-2 px-4 rounded-lg";
export const tokasaButtonSecondary =
  "bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-4 rounded-lg";

// Tipografía
export const tokasaHeading = "text-xl font-bold text-white";
export const tokasaSubheading = "text-lg font-medium text-white/90";
export const tokasaParagraph = "text-white/70";
export const tokasaLabel = "text-sm text-white/60";

// Elementos de estado
export const tokasaStatusIndicator = {
  active: "w-2 h-2 rounded-full bg-green-500",
  warning: "w-2 h-2 rounded-full bg-yellow-500",
  error: "w-2 h-2 rounded-full bg-red-500",
  inactive: "w-2 h-2 rounded-full bg-gray-500",
};

// Gradientes y efectos
export const tokasaGradient =
  "bg-gradient-to-r from-blue-600/20 to-purple-600/20";
export const tokasaGradientFull =
  "bg-gradient-to-r from-blue-600 to-purple-600";
export const tokasaGlow = "shadow-lg shadow-blue-500/20";

// Puedes agregar más clases personalizadas según necesites
