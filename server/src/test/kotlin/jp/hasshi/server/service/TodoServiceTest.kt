package jp.hasshi.server.service

import jp.hasshi.server.model.TodoRecord
import jp.hasshi.server.repository.TodoRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import kotlin.test.assertEquals

@SpringBootTest
class TodoServiceTest {
    @Autowired
    private lateinit var todoRepository: TodoRepository

    @Nested
    inner class GetTodos {
        @Test
        fun `Get getTodosを呼ぶと全てのTodoを返す`() {
            todoRepository.saveAll(
                listOf(
                    TodoRecord(todo = "歯を磨く"),
                    TodoRecord(todo = "走る")
                )
            )

            val todoService = TodoServiceImpl(todoRepository)
            val result = todoService.getTodos()

            assertThat(result.size).isEqualTo(2)
            assertEquals("歯を磨く", result[0].todo)
            assertEquals("走る", result[1].todo)
        }
    }
}