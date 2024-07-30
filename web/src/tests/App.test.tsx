import {describe, expect, test} from "vitest";
import {act, render, screen} from "@testing-library/react";
import App from "../App.tsx";
import {DummyTodoRepository, SpyTodoRepository, StubTodoRepository} from "./repository/TodoRepositoryDoubles.ts";
import {TodoRepository} from "../repository/TodoRepository.ts";
import userEvent from "@testing-library/user-event";

describe('App', () => {
    describe('GET', () => {
        test('TODOという文字が表示される', async () => {
            await renderApp(new DummyTodoRepository());
            expect(screen.getByText('TODO')).toBeInTheDocument()
        })

        test('レンダリング時にTodoRepositoryのgetTodosを呼ぶ', async () => {
            const spyTodoRepository: SpyTodoRepository = new SpyTodoRepository()
            await renderApp(spyTodoRepository);

            expect(spyTodoRepository.getTodos_wasCalled).toBeTruthy()
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

    describe('POST', () => {
        test('フォームボタンと保存ボタンが表示されている', async () => {
            await renderApp(new DummyTodoRepository())

            const inputForm = screen.getByLabelText("New Todo")
            const button = screen.getByText("Save")

            expect(inputForm).toBeInTheDocument()
            expect(button).toBeInTheDocument()
        })

        test('保存ボタンを押すとTodoRepositoryのpostTodoを呼ぶ', async () => {
            const spyTodoRepository = new SpyTodoRepository()
            await renderApp(spyTodoRepository)

            const inputForm = screen.getByLabelText("New Todo")
            const button = screen.getByText("Save")

            await userEvent.type(inputForm, "some-todo")
            await userEvent.click(button)

            expect(spyTodoRepository.postTodo_argument_todo).toEqual("some-todo")
        })

        test('保存ボタンを押すとTodoRepositoryのpostTodoの返り値が表示される', async () => {
            const stubTodoRepository = new StubTodoRepository()
            stubTodoRepository.postTodo_returnValue = Promise.resolve([
                {todo: "some-todo1"},
                {todo: "some-todo2"},
            ])

            await renderApp(stubTodoRepository)

            const inputForm = screen.getByLabelText("New Todo")
            const button = screen.getByText("Save")

            await userEvent.type(inputForm, "some-todo")
            await userEvent.click(button)

            expect(screen.getByText("some-todo1")).toBeInTheDocument()
            expect(screen.getByText("some-todo2")).toBeInTheDocument()
        })

        test('保存ボタンを押すとフォームの中の返り値が消える', async () => {
            await renderApp(new DummyTodoRepository)

            const inputForm = screen.getByLabelText("New Todo") as HTMLInputElement
            const button = screen.getByText("Save")

            await userEvent.type(inputForm, "some-todo")
            await userEvent.click(button)

            expect(inputForm.value).toBe("")
        })
    })
})

async function renderApp(todoRepository: TodoRepository) {
    await act(async () => {
        render(<App todoRepository={todoRepository}/>)
    })
}
