package com.example.TodoApi.API.Controller;

import com.example.TodoApi.API.Service.TodoService;
import com.example.TodoApi.API.dto.request.TodoCreateRequestDTO;
import com.example.TodoApi.API.dto.response.TodoDetailResponseDTO;
import com.example.TodoApi.API.entity.TodoApi;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class TodoController {

    private final TodoService todoService;

    // ✅ 특정 날짜의 Todo 조회 (READ)
    @GetMapping("/date/{todoDate}")
    public ResponseEntity<?> getTodosByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate todoDate) {
        log.info("GET /api/todos/date/{} 요청", todoDate);
        try {
            List<TodoApi> todos = todoService.getTodosByDate(todoDate);
            return ResponseEntity.ok().body(todos);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    // ✅ 모든 Todo 조회 (READ)
    @GetMapping
    public ResponseEntity<?> getAllTodos() {
        log.info("GET /api/todos 요청");
        try {
            List<TodoApi> todos = todoService.getAllTodos();
            return ResponseEntity.ok().body(todos);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    // 특정 Todo 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> getTodoById(@PathVariable String id) {
        log.info("GET /api/todos/{} 요청", id);
        try {
            TodoApi todo = todoService.getTodoById(id);
            return ResponseEntity.ok().body(todo);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    // CREATE
    @PostMapping
    public ResponseEntity<?> createTodo(
            @Validated @RequestBody TodoCreateRequestDTO requestDTO,
            BindingResult result
    ) {
        log.info("POST /api/todos 요청 - dto : {}", requestDTO);
        ResponseEntity<List<FieldError>> validatedResult = getValidatedResult(result);
        if (validatedResult != null) return validatedResult;

        try {
            TodoApi responseDTO = todoService.create(requestDTO);
            return ResponseEntity.ok().body(responseDTO);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable String id) {
        try {
            todoService.deleteTodo(id);  // 삭제 로직
            return ResponseEntity.ok().build();  // 성공적으로 삭제되었음을 알림
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // 입력값 검증 메서드
    private static ResponseEntity<List<FieldError>> getValidatedResult(BindingResult result) {
        if (result.hasErrors()) {
            List<FieldError> fieldErrors = result.getFieldErrors();
            fieldErrors.forEach(err -> log.warn("invalid client data - {}", err.toString()));
            return ResponseEntity.badRequest().body(fieldErrors);
        }
        return null;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTodo(
            @PathVariable String id,
            @Validated @RequestBody TodoCreateRequestDTO requestDTO,
            BindingResult result
    ) {
        log.info("PUT /api/todos/{} 요청 - dto : {}", id, requestDTO);

        if (id == null || id.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Error: ID 값이 없습니다.");
        }

        ResponseEntity<List<FieldError>> validatedResult = getValidatedResult(result);
        if (validatedResult != null) return validatedResult;

        try {
            TodoApi updatedTodo = todoService.updateTodo(id, requestDTO);
            return ResponseEntity.ok().body(TodoDetailResponseDTO.builder()
                    .id(updatedTodo.getTodoId())
                    .title(updatedTodo.getTitle())
                    .done(updatedTodo.isDone())
                    .build());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }
}