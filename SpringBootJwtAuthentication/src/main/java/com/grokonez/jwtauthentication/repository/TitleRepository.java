package com.grokonez.jwtauthentication.repository;


import com.grokonez.jwtauthentication.model.TitleWord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import javax.security.auth.Subject;
import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "title", path = "title")
public interface TitleRepository extends JpaRepository<TitleWord,Long> {
    Optional<TitleWord> findById(Long id);
}
