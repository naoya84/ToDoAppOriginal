import { TodoResponse } from "../../model/TodoResponse.ts";
import {TodoRepositry} from "../../repository/TodoRepositry.ts";

export class DummyTodoRepository implements TodoRepositry {
    getTodos(): Promise<TodoResponse[]> {
        return Promise.resolve([])
    }
}

export class SpyTodoRepository implements TodoRepositry {
    getTodos_wasCalled = false

    getTodos(): Promise<TodoResponse[]> {
        this.getTodos_wasCalled = true
        return Promise.resolve([])
    }
}

export class StubTodoRepository implements TodoRepositry {
    getTodos_returnValue: Promise<TodoResponse[]> = Promise.resolve([])

    getTodos(): Promise<TodoResponse[]> {
        return this.getTodos_returnValue
    }
}