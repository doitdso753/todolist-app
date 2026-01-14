import TodoEditor from "@/components/todo-list/todo-editor.tsx";
import TodoItem from "@/components/todo-list/todo-item.tsx";
import { useTodosData } from "@/hooks/queries/use-todos.data.ts";

export default function TodoListPage() {
  const { data: todos, isLoading, error } = useTodosData();

  if (error) return <div>오류가 발생했습니다.: {error.message}</div>;
  if (isLoading) return <div>로딩 중입니다 ...</div>;
  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-bold">TodoList</h1>

      <TodoEditor />
      {todos?.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
}