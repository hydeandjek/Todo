package com.example.TodoApi.API.repository;
import  com.example.TodoApi.API.entity.TodoApi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface todoRepository extends JpaRepository<TodoApi,String> {
    List<TodoApi> findByTodoDate(LocalDate todoDate);
}
