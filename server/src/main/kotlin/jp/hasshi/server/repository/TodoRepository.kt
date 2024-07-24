package jp.hasshi.server.repository

import jp.hasshi.server.model.TodoRecord
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.UUID

@Repository
interface TodoRepository: JpaRepository<TodoRecord, UUID> {
}