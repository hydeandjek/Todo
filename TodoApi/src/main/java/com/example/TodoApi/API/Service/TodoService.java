package com.example.TodoApi.API.Service;

import com.example.TodoApi.API.dto.request.TodoCreateRequestDTO;
import com.example.TodoApi.API.entity.TodoApi;
import com.example.TodoApi.API.repository.todoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class TodoService {

    private final todoRepository todoRepository;

    // ✅ 특정 날짜의 Todo 조회
    public List<TodoApi> getTodosByDate(LocalDate todoDate) {
        return todoRepository.findByTodoDate(todoDate);
    }

    // ✅ 모든 Todo 조회
    public List<TodoApi> getAllTodos() {
        return todoRepository.findAll();
    }

    // ✅ 특정 Todo 조회
    public TodoApi getTodoById(String id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo를 찾을 수 없습니다: " + id));
    }

    // ✅ 새로운 Todo 추가
    public TodoApi create(TodoCreateRequestDTO requestDTO) {
        TodoApi newTodo = new TodoApi();
        newTodo.setTitle(requestDTO.getTitle());
        newTodo.setTodoDate(requestDTO.getTodoDate());
        newTodo.setDone(false);  // 기본값 설정
        // 날짜가 필요한 경우 여기서 설정 (예: 오늘 날짜)
        // newTodo.setTodoDate(LocalDate.now());
        return todoRepository.save(newTodo);
    }

    public void deleteTodo(String id) {
        // 해당 id로 Todo를 찾습니다.
        TodoApi todo = getTodoById(id);

        // 만약 Todo가 존재하지 않으면 예외를 던집니다.
        if (todo == null) {
            throw new RuntimeException("Todo not found for ID: " + id);
        }

        // Todo가 존재하면 삭제합니다.
        todoRepository.delete(todo);
    }

    public TodoApi updateTodo(String id, TodoCreateRequestDTO requestDTO) {
        TodoApi todo = todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));

        // 기존 데이터를 새로운 데이터로 업데이트

        todo.setDone(requestDTO.isDone());

        return todoRepository.save(todo);
    }
}