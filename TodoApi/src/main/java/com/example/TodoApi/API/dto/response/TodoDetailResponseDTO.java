package com.example.TodoApi.API.dto.response;


import com.example.TodoApi.API.entity.TodoApi;
import lombok.*;

@Setter @Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoDetailResponseDTO {

    private String id;
    private String title;
    private  boolean done;

    public TodoDetailResponseDTO(TodoApi todoApi) {
        this.id = todoApi.getTodoId();
        this.title = todoApi.getTitle();
        this.done = todoApi.isDone();
    }
}
