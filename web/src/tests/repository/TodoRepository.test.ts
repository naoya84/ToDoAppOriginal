import {describe, expect, test} from "vitest";
import {DefaultTodoRepository} from "../../repository/TodoRepositry.ts";
import {SpyHttp, StubHttp} from "../http/HttpDoubles.ts";

describe('TodoRepository', ()=>{
    test('httpに正しいリクエストを渡す',()=>{
        const spyHttp = new SpyHttp()

        const todoRepository = new DefaultTodoRepository(spyHttp)
        todoRepository.getTodos()

        expect(spyHttp.get_argument_url).toEqual('/api/todos')
    })

    test('httpの返り値をキャストして返す',async ()=>{
        const stubHttp = new StubHttp()
        stubHttp.get_returnValue = Promise.resolve([
            {todo: "歯を磨く"},
            {todo: "服を選択する"}
        ])
        const todoRepository = new DefaultTodoRepository(stubHttp)
        const res = await todoRepository.getTodos()

        expect(res.length).toEqual(2)
        expect(res).toEqual([
            {todo: "歯を磨く"},
            {todo: "服を選択する"}
        ])
    })
})