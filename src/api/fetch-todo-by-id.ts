import type { Todo } from "@/types.ts";
import { API_URL } from "@/lib/constants.ts";

export async function fetchTodoById(id: number): Promise<Todo> {
  const response = await fetch(`${API_URL}/todos/${id}`, {});

  if (!response.ok) {
    throw new Error("fetch todo detail failed.");
  }

  const data: Todo = await response.json();
  return data;
}