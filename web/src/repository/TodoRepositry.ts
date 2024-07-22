import {TodoResponse} from "../model/TodoResponse.ts";

export interface TodoRepositry {
    getTodos(): Promise<TodoResponse[]>
}

export class DefaultTodoRepository implements TodoRepositry {
    getTodos(): Promise<TodoResponse[]> {
        return Promise.resolve([])
    }
}