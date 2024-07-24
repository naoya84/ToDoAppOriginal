package jp.hasshi.server.service

import jp.hasshi.server.model.TodoRecord
import jp.hasshi.server.repository.TodoRepository
import org.springframework.stereotype.Service

interface TodoService {
    fun getTodos(): List<TodoRecord>
}

@Service
class TodoServiceImpl(private val todoRepository: TodoRepository) : TodoService {
    override fun getTodos(): List<TodoRecord> {
        return todoRepository.findAll()
    }
}