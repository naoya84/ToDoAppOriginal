import {DefaultTodoRepository, TodoRepository} from "./repository/TodoRepository.ts";
import {useEffect, useState} from "react";
import {TodoResponse} from "./model/TodoResponse.ts";

interface Props {
    todoRepository?: TodoRepository
}

function App(
    {todoRepository = new DefaultTodoRepository()}: Props
) {
    const [todos, setTodos] = useState<TodoResponse[]>([])
    const [draftTodo, setDraftTodo] = useState("")

    useEffect(() => {
        todoRepository.getTodos()
            .then((todo) => setTodos(todo))
    }, [])

    const onClickSaveButton = async () => {
        const res = await todoRepository.postTodo(draftTodo)
        setTodos(res)
        setDraftTodo("")
    }

    return (
        <>
            <p>TODO</p>
            <label>
                New Todo
                <input
                    value={draftTodo}
                    type="text"
                    onChange={e => setDraftTodo(e.target.value)}
                />
            </label>
            <button onClick={onClickSaveButton}>Save</button>
            {
                todos.map(todo => (
                        <div key={window.crypto.randomUUID()}>
                            {todo.todo}
                        </div>
                    )
                )
            }
        </>
    )
}

export default App
