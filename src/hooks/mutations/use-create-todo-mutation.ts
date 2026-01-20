import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "@/api/create-todo.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import type { Todo } from "@/types.ts";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(newTodo.id),
        newTodo
      );

      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [newTodo.id];
          return [...prevTodoIds, newTodo.id];
        }
      );
    },
    onError: () => {},
  });
}