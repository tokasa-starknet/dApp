// Versión simplificada que no requiere dependencias adicionales
export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
