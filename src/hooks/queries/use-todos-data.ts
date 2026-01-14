import { fetchTodos } from "@/api/fetch-todos.ts";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants.ts";

export function useTodosData() {
  return useQuery({
    queryFn: fetchTodos,
    queryKey: QUERY_KEYS.todo.list,
  });
}
