package jp.hasshi.server.service

import jp.hasshi.server.model.TodoRecord
import jp.hasshi.server.repository.TodoRepository
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import kotlin.test.assertEquals

@DataJpaTest
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

    @Nested
    inner class PostTodo {
        @Test
        fun todoServiceのpostTodoを呼ぶとtodoが保存され全てのTodoを返す() {
            todoRepository.save(TodoRecord(todo = "髪を切る"))

            val todoService = TodoServiceImpl(todoRepository)
            val todos = todoService.postTodo("自転車に乗る")

            val savedTodos = todoRepository.findAll()

            Assertions.assertEquals(2, todos.size)
            Assertions.assertEquals("髪を切る", todos.first().todo)
            Assertions.assertEquals("自転車に乗る", todos.last().todo)
            Assertions.assertEquals(2, savedTodos.size)
        }
    }
}