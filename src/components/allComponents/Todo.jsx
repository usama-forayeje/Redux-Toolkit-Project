import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Trash, Edit3, Save, X } from "lucide-react";
import { removeTodo, updateTodo } from "@/features/todo/todoSlice";
import AddTodos from "./AddTodos"; // AddTodo component

function Todo() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleRemove = (id) => dispatch(removeTodo(id));

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const handleUpdate = () => {
    if (editText.trim()) {
      dispatch(updateTodo({ id: editId, text: editText }));
      setEditId(null);
      setEditText("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Manage Your Todos
        </h1>

        {/* AddTodo Component */}
        <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mb-8">
          <AddTodos />
        </div>

        {/* Todo List */}
        <ul className="w-full max-w-xl mx-auto space-y-4 rounded-lg p-6">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex flex-col justify-between bg-white shadow-md rounded-lg p-6 space-y-4"
            >
              {editId === todo.id ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md text-lg"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={handleUpdate}
                      className="flex items-center gap-2"
                    >
                      <Save size={16} />
                      Save
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditId(null)}
                      className="flex items-center gap-2"
                    >
                      <X size={16} />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-lg font-medium">{todo.text}</p>
                  <div className="flex justify-between gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(todo)}
                      className="flex items-center gap-2"
                    >
                      <Edit3 size={16} />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleRemove(todo.id)}
                      className="flex items-center gap-2"
                    >
                      <Trash size={16} />
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
