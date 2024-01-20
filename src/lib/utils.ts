import "dotenv/config"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function logError(message: any) {
  if (process.env.LOGGER_URL) {
    await fetch(process.env.LOGGER_URL, {
      method: "POST",
      body: JSON.stringify(message),
    })
  }
}
