import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Todo } from "@/types.ts";

const initialState = {
  todos: [],
} satisfies {
  todos: Todo[],
};

const useTodosStore = create(
  immer(combine(initialState, (set) => ({
    actions: {
      createTodo: (content: string) => {
        set(state => {
          state.todos.push({
            id: String(new Date().getTime()),
            content
          });
        })

      },
      deleteTodo: (targetId: string) => {
        set(state => {
          const index = state.todos.findIndex(
            todo => todo?.id === targetId
          );

          if (index !== -1) {
            state.todos.splice(index, 1);
          }
        })
      },
    }
  })))
);

export const useTodos = () => {
  return useTodosStore(store => store.todos);
};

export const useCreateTodo = () => {
  return useTodosStore(store => store.actions.createTodo);
};

export const useDeleteTodo = () => {
  return useTodosStore(store => store.actions.deleteTodo);
};