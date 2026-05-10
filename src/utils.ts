// utils.ts
// Helper functions dan type guards

import { Todo } from './types';

/**
 * Type guard: validates a single Todo object
 */
export function isTodo(obj: unknown): obj is Todo {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof (obj as Todo).id === 'number' &&
    typeof (obj as Todo).title === 'string' &&
    typeof (obj as Todo).completed === 'boolean' &&
    typeof (obj as Todo).createdAt === 'string'
  );
}

/**
 * Type guard: validates an array of Todos
 */
export function isTodoArray(data: unknown): data is Todo[] {
  return Array.isArray(data) && data.every(isTodo);
}

/**
 * Generate next sequential ID from existing todos list
 */
export function generateId(existingIds: number[]): number {
  if (existingIds.length === 0) return 1;
  return Math.max(...existingIds) + 1;
}

/**
 * Format a date string to readable format
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Validate that a string is not empty
 */
export function isNonEmptyString(value: string): boolean {
  return value.trim().length > 0;
}
