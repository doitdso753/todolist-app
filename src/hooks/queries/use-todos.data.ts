import { fetchTodos } from "@/api/fetch-todos.ts";
import { useQuery } from "@tanstack/react-query";

export function useTodosData() {
  return useQuery({
    queryFn: fetchTodos,
    queryKey: ["todos"],
  });
}
