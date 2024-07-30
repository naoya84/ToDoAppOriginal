import {Http} from "../../http/NetworkHttp.ts";
import {TodoResponse} from "../../model/TodoResponse.ts";

export class SpyHttp implements Http {
    get_argument_url?: string = undefined
    get<T>(url: string): Promise<T> {
        this.get_argument_url = url
        return Promise.resolve([]) as Promise<T>
    }

    post_argument_url?: string = undefined
    post_argument_todo?: string = undefined
    post<T>(url: string, todo: string): Promise<T> {
        this.post_argument_url = url
        this.post_argument_todo = todo
        return Promise.resolve([]) as Promise<T>
    }
}

export class StubHttp implements Http {
    get_returnValue: Promise<TodoResponse[]> = Promise.resolve([])
    get<T>(url: string): Promise<T> {
        return this.get_returnValue as Promise<T>
    }

    post_returnValue: Promise<TodoResponse[]> = Promise.resolve([])
    post<T>(url: string, todo: string): Promise<T> {
        return this.post_returnValue as Promise<T>
    }
}