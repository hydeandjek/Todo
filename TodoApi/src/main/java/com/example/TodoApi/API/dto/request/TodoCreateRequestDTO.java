package com.example.TodoApi.API.dto.request;

import com.example.TodoApi.API.entity.TodoApi;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

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

    // dto -> entity
    public TodoApi toEntity(){
        return TodoApi.builder()
                .title(this.title)
                .build();
    }

}
