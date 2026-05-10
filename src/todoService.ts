// todoService.ts
// Business logic (CRUD operations)

import { Todo } from './types';
import { loadTodos, saveTodos } from './storage';
import { generateId, isNonEmptyString, formatDate } from './utils';

/**
 * Add a new Todo
 */
export function addTodo(title: string): Todo {
  if (!isNonEmptyString(title)) {
    throw new Error('Title cannot be empty.');
  }

  const todos: Todo[] = loadTodos();

  const newTodo: Todo = {
    id: generateId(todos.map((t: Todo) => t.id)),
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(newTodo);
  saveTodos(todos);

  console.log(`✅ Todo added: "${newTodo.title}"`);
  return newTodo;
}

/**
 * Mark a Todo as complete
 */
export function completeTodo(id: number): boolean {
  const todos: Todo[] = loadTodos();

  const todo = todos.find((t: Todo) => t.id === id);

  if (!todo) {
    console.log(`❌ Todo with number ${id} not found.`);
    return false;
  }

  if (todo.completed) {
    console.log(`⚠️  Todo "${todo.title}" is already completed.`);
    return false;
  }

  todo.completed = true;
  todo.completedAt = new Date().toISOString();

  saveTodos(todos);
  console.log(`✅ Marked as complete: "${todo.title}"`);
  return true;
}

/**
 * Delete a Todo by number
 */
export function deleteTodo(id: number): boolean {
  const todos: Todo[] = loadTodos();

  const index = todos.findIndex((t: Todo) => t.id === id);

  if (index === -1) {
    console.log(`❌ Todo with number ${id} not found.`);
    return false;
  }

  const deleted = todos.splice(index, 1)[0];
  saveTodos(todos);

  console.log(`🗑️  Deleted: "${deleted.title}"`);
  return true;
}

/**
 * List all Todos with formatted output
 */
export function listTodos(): void {
  const todos: Todo[] = loadTodos();

  if (todos.length === 0) {
    console.log('\n📋 No todos found. Start by adding one!\n');
    return;
  }

  console.log('\n📋 Your Todo List:');
  console.log('─'.repeat(50));

  todos.forEach((todo: Todo) => {
    const status = todo.completed ? '[DONE]  ' : '[ACTIVE]';
    const number = String(todo.id).padStart(2, ' ');
    const createdInfo = `(created: ${formatDate(todo.createdAt)})`;

    console.log(`${status} ${number}. ${todo.title} ${createdInfo}`);

    if (todo.completed && todo.completedAt) {
      console.log(`          Completed: ${formatDate(todo.completedAt)}`);
    }
  });

  console.log('─'.repeat(50));

  const doneCount = todos.filter((t: Todo) => t.completed).length;
  const activeCount = todos.length - doneCount;
  console.log(`Total: ${todos.length} | Active: ${activeCount} | Done: ${doneCount}\n`);
}

/**
 * Get a single Todo by number
 */
export function getTodoById(id: number): Todo | undefined {
  const todos: Todo[] = loadTodos();
  return todos.find((t: Todo) => t.id === id);
}
