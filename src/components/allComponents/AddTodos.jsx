import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "@/features/todo/todoSlice";

function AddTodos() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <Label htmlFor="todo-input" className="text-lg font-medium">
        Add a Todo
      </Label>
      <Input
        id="todo-input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your todo"
        className="px-4 py-2 border rounded-md"
      />
      <Button type="submit" variant="default" className="flex items-center gap-2">
        Add Todo
      </Button>
    </form>
  );
}

export default AddTodos;
