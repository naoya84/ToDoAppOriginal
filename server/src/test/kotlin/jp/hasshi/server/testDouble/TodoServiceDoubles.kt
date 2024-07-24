package jp.hasshi.server.testDouble

import jp.hasshi.server.model.TodoRecord
import jp.hasshi.server.service.TodoService

class SpyTodoService: TodoService {
    var getTodos_wasCalled = false

    override fun getTodos(): List<TodoRecord> {
        getTodos_wasCalled = true

        return emptyList()
    }
}

class StubTodoService: TodoService {
    var getTodos_returnValues: List<TodoRecord> = emptyList()
    override fun getTodos(): List<TodoRecord> {
        return getTodos_returnValues
    }
}