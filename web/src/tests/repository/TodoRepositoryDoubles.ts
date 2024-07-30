import {TodoResponse} from "../../model/TodoResponse.ts";
import {TodoRepository} from "../../repository/TodoRepository.ts";

export class DummyTodoRepository implements TodoRepository {
    getTodos(): Promise<TodoResponse[]> {
        return Promise.resolve([])
    }

    postTodo(todo: string): Promise<TodoResponse[]> {
        return Promise.resolve([])
    }
}

export class SpyTodoRepository implements TodoRepository {
    getTodos_wasCalled = false

    getTodos(): Promise<TodoResponse[]> {
        this.getTodos_wasCalled = true
        return Promise.resolve([])
    }

    postTodo_argument_todo?: string = undefined

    postTodo(todo: string): Promise<TodoResponse[]> {
        this.postTodo_argument_todo = todo
        return Promise.resolve([])
    }
}

export class StubTodoRepository implements TodoRepository {
    getTodos_returnValue: Promise<TodoResponse[]> = Promise.resolve([])

    getTodos(): Promise<TodoResponse[]> {
        return this.getTodos_returnValue
    }

    postTodo_returnValue: Promise<TodoResponse[]> = Promise.resolve([])

    postTodo(todo: string): Promise<TodoResponse[]> {
        return this.postTodo_returnValue
    }
}