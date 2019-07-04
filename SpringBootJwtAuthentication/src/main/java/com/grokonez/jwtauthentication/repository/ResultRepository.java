package com.grokonez.jwtauthentication.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.grokonez.jwtauthentication.model.Result;
@CrossOrigin
@Repository
@RepositoryRestResource(collectionResourceRel = "result", path = "resultHAL")
public interface ResultRepository  extends JpaRepository<Result, Long> {
	Page<Result> findByTypeTestContainingAndTitleIdContaining(@Param("query") String query,@Param("query1") String query1,Pageable page);
//	 List<Result> findBytype_test_t(@Param("query") String query, Pageable page);
}
