package com.example.TodoApi.API.Service;

import com.example.TodoApi.API.dto.request.TodoCreateRequestDTO;
import com.example.TodoApi.API.entity.TodoApi;
import com.example.TodoApi.API.repository.todoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TodoServiceTest {

    @Mock
    private todoRepository todoRepository;

    @InjectMocks
    private TodoService todoService;

    private TodoApi sampleTodo;

    @BeforeEach
    void setUp() {
        sampleTodo = new TodoApi();
        sampleTodo.setTodoId("1");
        sampleTodo.setTitle("Test Todo");
        sampleTodo.setTodoDate(LocalDate.parse("2025-03-14"));
        sampleTodo.setCreateDate(LocalDate.now().atStartOfDay());
        sampleTodo.setDone(false);
    }

    @Test
    void getTodosByDate() {
        LocalDate date = LocalDate.now();
        when(todoRepository.findByTodoDate(date)).thenReturn(Arrays.asList(sampleTodo));

        System.out.println("테스트 - 특정 날짜의 Todo 조회 실행");
        List<TodoApi> todos = todoService.getTodosByDate(date);
        System.out.println("조회된 Todo: " + todos);

        assertNotNull(todos);
        assertEquals(1, todos.size());
    }

    @Test
    void getAllTodos() {
        when(todoRepository.findAll()).thenReturn(Arrays.asList(sampleTodo));

        System.out.println("테스트 - 모든 Todo 조회 실행");
        List<TodoApi> todos = todoService.getAllTodos();
        System.out.println("조회된 Todo 리스트: " + todos);

        assertNotNull(todos);
        assertEquals(1, todos.size());
    }

    @Test
    void getTodoById() {
        when(todoRepository.findById("1")).thenReturn(Optional.of(sampleTodo));

        System.out.println("테스트 - 특정 Todo 조회 실행");
        TodoApi todo = todoService.getTodoById("1");
        System.out.println("조회된 Todo: " + todo);

        assertNotNull(todo);
        assertEquals("1", todo.getTodoId());
    }

    @Test
    void create() {
        TodoCreateRequestDTO requestDTO = new TodoCreateRequestDTO();
        requestDTO.setTitle("New Task");
        requestDTO.setTodoDate(LocalDate.now());
        when(todoRepository.save(any(TodoApi.class))).thenReturn(sampleTodo);

        System.out.println("테스트 - 새로운 Todo 추가 실행");
        TodoApi createdTodo = todoService.create(requestDTO);
        System.out.println("생성된 Todo: " + createdTodo);

        assertNotNull(createdTodo);
        assertEquals("Test Todo", createdTodo.getTitle());
    }

    @Test
    void deleteTodo() {
        when(todoRepository.findById("1")).thenReturn(Optional.of(sampleTodo));
        doNothing().when(todoRepository).delete(sampleTodo);

        System.out.println("테스트 - 특정 Todo 삭제 실행");
        todoService.deleteTodo("1");
        System.out.println("삭제 완료");

        verify(todoRepository, times(1)).delete(sampleTodo);
    }

    @Test
    void updateTodo() {
        TodoCreateRequestDTO requestDTO = new TodoCreateRequestDTO();
        requestDTO.setDone(true);
        when(todoRepository.findById("1")).thenReturn(Optional.of(sampleTodo));
        when(todoRepository.save(any(TodoApi.class))).thenReturn(sampleTodo);

        System.out.println("테스트 - 특정 Todo 업데이트 실행");
        TodoApi updatedTodo = todoService.updateTodo("1", requestDTO);
        System.out.println("업데이트된 Todo: " + updatedTodo);

        assertNotNull(updatedTodo);
        assertTrue(updatedTodo.isDone());
    }
}