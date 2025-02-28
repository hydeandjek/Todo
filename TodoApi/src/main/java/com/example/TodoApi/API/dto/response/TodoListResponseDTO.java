package com.example.TodoApi.API.dto.response;

import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoListResponseDTO {

    private String error;
    private List<TodoDetailResponseDTO> todos;


}
