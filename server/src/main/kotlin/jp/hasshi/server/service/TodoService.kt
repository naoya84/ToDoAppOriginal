package jp.hasshi.server.service

import jp.hasshi.server.model.TodoRecord
import jp.hasshi.server.repository.TodoRepository
import org.springframework.stereotype.Service

interface TodoService {
    fun getTodos(): List<TodoRecord>
    fun postTodo(todo: String): List<TodoRecord>
}

@Service
class TodoServiceImpl(private val todoRepository: TodoRepository) : TodoService {
    override fun getTodos(): List<TodoRecord> {
        return todoRepository.findAll()
    }

    override fun postTodo(todo: String): List<TodoRecord> {
        todoRepository.save(TodoRecord(todo = todo))
        return todoRepository.findAll()
    }
}