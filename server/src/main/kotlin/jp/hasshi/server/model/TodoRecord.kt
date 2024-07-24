package jp.hasshi.server.model

import jakarta.persistence.Entity
import jakarta.persistence.Id
import java.util.UUID

@Entity(name = "todos")
data class TodoRecord(
    @Id
    val id: UUID = UUID.randomUUID(),
    val todo: String,
)
