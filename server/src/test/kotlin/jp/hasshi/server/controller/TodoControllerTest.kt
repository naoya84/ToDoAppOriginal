package jp.hasshi.server.controller

import jp.hasshi.server.model.TodoRecord
import jp.hasshi.server.testDouble.SpyTodoService
import jp.hasshi.server.testDouble.StubTodoService
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import kotlin.test.assertEquals
import kotlin.test.todo

@SpringBootTest
class TodoControllerTest {
    @Nested
    inner class GetTodos {
        @Test
        fun `Get api_todosにリクエストを送るとTodoServiceのgetTodosメソッドが呼ばれる`() {
            val spyTodoService = SpyTodoService()
            val todoController = TodoController(spyTodoService)

            val mockMvc: MockMvc = MockMvcBuilders
                .standaloneSetup(todoController)
                .build()
            val result = mockMvc
                .perform(get("/api/todos"))

            result.andExpect(status().isOk)
            assertTrue(spyTodoService.getTodos_wasCalled)
        }

        @Test
        fun `Get api_todosにリクエストを送るとTodoServiceのgetTodosの返り値を返す`() {
            val stubTodoService = StubTodoService()
            stubTodoService.getTodos_returnValues = listOf(
                TodoRecord(todo = "歯を磨く"),
            )
            val todoController = TodoController(stubTodoService)

            val mockMvc: MockMvc = MockMvcBuilders
                .standaloneSetup(todoController)
                .build()

            val result = mockMvc.perform(get("/api/todos"))
            result.andExpect(jsonPath("$[0].todo", equalTo("歯を磨く")))

        }
    }
}