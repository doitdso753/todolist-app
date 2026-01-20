import { fetchTodos } from "@/api/fetch-todos.ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants.ts";
import type { Todo } from "@/types.ts";

export function useTodosData() {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: async () => {
      const todos: Todo[] = await fetchTodos();

      todos.forEach((todo) => {
        queryClient.setQueryData<Todo>(
          QUERY_KEYS.todo.detail(todo.id),
          todo
        );
      });

      return todos.map((todo) => todo.id);
    },
    queryKey: QUERY_KEYS.todo.list,
  });
}
