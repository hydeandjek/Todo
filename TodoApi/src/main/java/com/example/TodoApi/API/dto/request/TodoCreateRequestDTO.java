package com.example.TodoApi.API.dto.request;

import com.example.TodoApi.API.entity.TodoApi;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Setter@Getter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoCreateRequestDTO {

    @NotBlank
    @Size(min = 2, max = 30)
    private String title;

    private boolean done;

    private LocalDate todoDate;


    // dto -> entity
    public TodoApi toEntity(){
        return TodoApi.builder()
                .title(this.title)
                .done(this.done)
                .todoDate(this.todoDate)
                .build();
    }

}
