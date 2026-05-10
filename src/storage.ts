// storage.ts
// File handling (read/write JSON)

import * as fs from 'fs';
import * as path from 'path';
import { Todo } from './types';
import { isTodoArray } from './utils';

const DATA_DIR = path.join(__dirname, '../data');
const FILE_PATH = path.join(DATA_DIR, 'todos.json');

/**
 * Ensure the data directory exists, create if not
 */
function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log(`Data folder created: ${DATA_DIR}`);
  }
}

/**
 * Load all todos from JSON file
 */
export function loadTodos(): Todo[] {
  try {
    ensureDataDir();

    if (!fs.existsSync(FILE_PATH)) {
      return [];
    }

    const rawData = fs.readFileSync(FILE_PATH, 'utf-8');

    if (!rawData.trim()) {
      return [];
    }

    const parsed: unknown = JSON.parse(rawData);

    if (!isTodoArray(parsed)) {
      console.error('Warning: Data file is corrupted. Starting fresh.');
      return [];
    }

    return parsed;
  } catch (error) {
    console.error('Error reading todos file:', error);
    return [];
  }
}

/**
 * Save all todos to JSON file
 */
export function saveTodos(todos: Todo[]): void {
  try {
    ensureDataDir();
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving todos file:', error);
    throw new Error('Failed to save data. Please check file permissions.');
  }
}

/**
 * Get the path of the data file
 */
export function getDataFilePath(): string {
  return FILE_PATH;
}
