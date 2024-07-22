import {DefaultTodoRepository, TodoRepositry} from "./repository/TodoRepositry.ts";
import {useEffect, useState} from "react";
import {TodoResponse} from "./model/TodoResponse.ts";

interface Props {
    todoRepository: TodoRepositry
}

function App(
    {todoRepository = new DefaultTodoRepository()}: Props
) {
    const [todos, setTodos] = useState<TodoResponse[]>([])

    useEffect(() => {
        todoRepository.getTodos()
            .then((todo) => setTodos(todo))
    }, [])

    return (
        <>
            <p>TODO</p>
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
