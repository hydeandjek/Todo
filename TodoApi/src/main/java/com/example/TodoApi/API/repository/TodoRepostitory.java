package com.example.TodoApi.API.repository;
import  com.example.TodoApi.API.entity.TodoApi;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepostitory extends JpaRepository<TodoApi,String> {
}
