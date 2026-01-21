import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStrapiMedia(url: string | null) {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('//')) return url;
    return `${process.env.CMS_URL || 'http://localhost:1337'}${url}`;
}