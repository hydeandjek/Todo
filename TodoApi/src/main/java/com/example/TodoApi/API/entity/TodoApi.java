package com.example.TodoApi.API.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @Setter @ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="tbl_Todo")
public class TodoApi {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String TodoId;

    @Column(nullable = false, length = 30)
    private String title;

    private boolean done;

    @CreationTimestamp
    private LocalDateTime createDate;

//    @Column(name = "todo_date")
//    private LocalDate todoDate;

}
