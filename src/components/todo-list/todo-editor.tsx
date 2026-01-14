import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import { useCreateTodoMutation } from "@/hooks/mutations/use-create-todo-mutation.ts";

export default function TodoEditor() {
  const { mutate, isPending } = useCreateTodoMutation();
  const [content, setContent] = useState("");

  const handleAddTodo = () => {
    if (content.trim() === "") return;

    mutate(content);
    setContent("");
  }
  return (
    <div className="flex gap-2">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="새로운 할 일을 입력하세요 ..."
      />
      <Button disabled={isPending} onClick={handleAddTodo}>
        추가
      </Button>
    </div>
  );
}