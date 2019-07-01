package com.grokonez.jwtauthentication.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.grokonez.jwtauthentication.model.Result;

@Repository
@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "result", path = "resultHAL")
public interface ResultRepository  extends JpaRepository<Result, Long> {

}
