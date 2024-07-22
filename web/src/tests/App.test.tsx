import {describe, expect, test} from "vitest";
import {act, render, screen} from "@testing-library/react";
import App from "../App.tsx";
import {DummyTodoRepository, SpyTodoRepository, StubTodoRepository} from "./repository/TodoRepositoryDoubles.ts";
import {TodoRepositry} from "../repository/TodoRepositry.ts";

describe('App', () => {
    test('TODOという文字が表示される', async () => {
        await renderApp(new DummyTodoRepository());
        expect(screen.getByText('TODO')).toBeInTheDocument()
    })

    test('レンダリング時にTodoRepositoryのgetTodosを呼ぶ', async () => {
        const spyTodoRepository: SpyTodoRepository = new SpyTodoRepository()
        await renderApp(spyTodoRepository);

        expect(spyTodoRepository.getTodos_wasCalled).toBeTruthy
    })

    test('レンダリング時にTodoを表示する', async () => {
        const stubTodoRepository: StubTodoRepository = new StubTodoRepository()
        stubTodoRepository.getTodos_returnValue = Promise.resolve([
            {todo: "todo1"},
            {todo: "todo2"},
        ])

        await renderApp(stubTodoRepository);

        expect(screen.getByText("todo1")).toBeInTheDocument()
        expect(screen.getByText("todo2")).toBeInTheDocument()
    })
})

async function renderApp(todoRepository: TodoRepositry) {
    await act(async () => {
        render(<App todoRepository={todoRepository}/>)
    })
}
