import { API_URL } from "@/lib/constants.ts";
import type { Todo } from "@/types.ts";

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch(`${API_URL}/todos`);

  if (!response.ok) {
    throw new Error("fetch todos failed.");
  }

  const data: Todo[] = await response.json();
  return data;
}
