package jp.hasshi.server.controller

import jp.hasshi.server.model.TodoRecord
import jp.hasshi.server.service.TodoService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/todos")
class TodoController(private val todoService: TodoService) {
    @GetMapping
    fun getTodos(): List<TodoRecord> {
        return todoService.getTodos()
    }
}