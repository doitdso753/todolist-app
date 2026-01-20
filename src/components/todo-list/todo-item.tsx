import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router";
import type { Todo } from "@/types.ts";
import { useUpdateTodoMutation } from "@/hooks/mutations/use-update-todo-mutation.ts";
import { useDeleteTodoMutation } from "@/hooks/mutations/use-delete-todo-mutation.ts";

export default function TodoItem({
  id,
  content,
  isDone
  }: Todo) {
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo, isPending: isDeleteTodoPending } = useDeleteTodoMutation();

  const handleDeleteClick = () => {
    deleteTodo(id);
  };

  const handleCheckboxClick = () => {
    updateTodo({ id, isDone: !isDone });
  }

  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <input
          type={"checkbox"}
          checked={isDone}
          disabled={isDeleteTodoPending}
          onChange={handleCheckboxClick}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button
        variant={"destructive"}
        disabled={isDeleteTodoPending}
        onClick={handleDeleteClick}
      >
        삭제
      </Button>
    </div>
  );
}