import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "@/api/update-todo.ts";
import { QUERY_KEYS } from "@/lib/constants.ts";
import type { Todo } from "@/types.ts";

export function useUpdateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      // optimistic update 전에 진행 중인 쿼리(fetch) 중단
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.detail(updatedTodo.id),
      });

      const prevTodo = queryClient.getQueryData<Todo>(
        QUERY_KEYS.todo.detail(updatedTodo.id),
      )

      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(updatedTodo.id),
        (prevTodo) => {
          if (!prevTodo) return;
          return {
            ...prevTodo,
            ...updatedTodo
          };
        }
      );

      return {
        prevTodo,
      };
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: QUERY_KEYS.todo.list
    //   })
    // },
    onError: (error, variable, context) => {
      if (context && context.prevTodo) {
        queryClient.setQueryData<Todo>(
          QUERY_KEYS.todo.detail(context.prevTodo.id),
          context.prevTodo,
        );
      }
    }
  })
}