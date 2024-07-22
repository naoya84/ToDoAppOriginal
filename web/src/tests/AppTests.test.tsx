import {describe, expect, test} from "vitest";
import {render, screen} from "@testing-library/react";
import App from "../App.tsx";

describe('App', () => {
    test('TODOという文字が表示される', () => {
        render(<App/>)
        expect(screen.getByText('TODO')).toBeInTheDocument()
    })
})