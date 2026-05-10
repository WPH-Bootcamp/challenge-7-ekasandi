// types.ts
// Definisi tipe data (interface, type)

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export type Priority = 'low' | 'medium' | 'high';

export type TodoStatus = 'active' | 'done' | 'all';
