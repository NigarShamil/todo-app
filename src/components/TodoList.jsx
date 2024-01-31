
import { useState, useReducer } from "react";
import { TodoReducer, initialState } from "./TodoReducer";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

export default function TodoList() {
    const [state, dispatch] = useReducer(TodoReducer, initialState);
    const [text, setText] = useState("");
    const [editingId, setEditingId] = useState(null);

    const handleDelete = (id) => {
        dispatch({ type: "Delete_Todo", payload: id });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (text === "") return;
        dispatch({
            type: "Add_Todo",
            payload: {
                id: Math.random(),
                text,
            },
        });
        setText("");
    };

    const handleEdit = (id, newText) => {
        setEditingId(id);
        setText(newText);
    };

    const handleSaveEdit = (id) => {
        dispatch({ type: "Edit_Todo", payload: { id, newText: text } });
        setEditingId(null);
        setText("");
    };


    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    };

    const handleToggle = (id, completed) => {
        dispatch({ type: "Toggle_Todo", payload: { id, check: !completed } });
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="Todo_field">
                <h2>Todo List</h2>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add new task..."
                    onKeyUp={handleKeyUp}
                    className="input_field"
                />
                <button type="submit">Add Todo</button>

                {state.todos.length === 0 ? (
                    <p>Todo empty !!</p>
                ) : (
                    state.todos.map((item) => (
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 1rem 0 1rem" }} key={item.id} className="list_field">
                            <div className="list">
                                {editingId === item.id ? (
                                    <input
                                        type="text"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        onKeyUp={(e) => handleKeyUp(e)}
                                        style={{ border: "none", outline: "none", borderRadius: 4, height: 20, backgroundColor: "#E6E6FA" }}
                                    />
                                ) : (
                                    <>
                                        <input type="checkbox"  checked={item.completed} onChange={() => handleToggle(item.id, item.completed)} />
                                        <span style={{ marginLeft: 10, marginRight: 15, textDecoration: item.completed ? "line-through" : "none" }}>{item.text}</span>
                                    </>
                                )}
                            </div>

                            <div className="icons" style={{ display: "flex" }}>
                                <div style={{ color: "#8B008B" }} onClick={() => handleDelete(item.id)}>
                                    <DeleteIcon />
                                </div>
                                {editingId === item.id ? (
                                    <div style={{ color: "#50C878" }} onClick={() => handleSaveEdit(item.id)}><CheckIcon /></div>
                                ) : (
                                    <div style={{ color: "#FF8C00" }} onClick={() => handleEdit(item.id, item.text)}><EditNoteIcon /></div>
                                )}
                            </div>

                        </div>
                    ))
                )}
            </form>

        </>
    );
}

