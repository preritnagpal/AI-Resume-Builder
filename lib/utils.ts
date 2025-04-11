// lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatResumeDate = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return isNaN(date.getTime()) 
      ? '' 
      : date.toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};