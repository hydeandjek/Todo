package com.example.TodoApi.API.Service;

import com.example.TodoApi.API.dto.request.TodoCreateRequestDTO;
import com.example.TodoApi.API.repository.TodoRepostitory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class TodoService {

    private final TodoRepostitory todoRepostitory;

    public void create(TodoCreateRequestDTO requestDTO) {

        todoRepostitory.save(requestDTO.toEntity());
        log.info("할일 저장 완료 - title : {}",requestDTO.getTitle());
        return retrive();
    }

    public TodoListResponseDTO retrive(){

    }

}
