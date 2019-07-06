package com.grokonez.jwtauthentication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.grokonez.jwtauthentication.model.ToDo;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "todo", path = "todoHAL")
public interface ToDoRepository extends JpaRepository<ToDo,Long>{

}
