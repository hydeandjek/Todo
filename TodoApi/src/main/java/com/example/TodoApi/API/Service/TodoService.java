package com.example.TodoApi.API.Service;

import com.example.TodoApi.API.dto.request.TodoCreateRequestDTO;
import com.example.TodoApi.API.dto.response.TodoDetailResponseDTO;
import com.example.TodoApi.API.dto.response.TodoListResponseDTO;
import com.example.TodoApi.API.entity.TodoApi;
import com.example.TodoApi.API.repository.TodoRepostitory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class TodoService {

    private final TodoRepostitory todoRepostitory;

    public TodoListResponseDTO create(TodoCreateRequestDTO requestDTO) throws Exception{

        todoRepostitory.save(requestDTO.toEntity());
        log.info("할일 저장 완료 - title : {}",requestDTO.getTitle());
        return retrieve();
    }

    public TodoListResponseDTO retrieve() throws Exception{
        List<TodoApi> entityList = todoRepostitory.findAll();

        List<TodoDetailResponseDTO> dtoList = entityList.stream()
//                .map(entity -> new TodoDetailResponseDTO(entity))
                .map(TodoDetailResponseDTO::new)
                .collect(Collectors.toList());

        return TodoListResponseDTO.builder()
                .todos(dtoList)
                .build();
    }

}
