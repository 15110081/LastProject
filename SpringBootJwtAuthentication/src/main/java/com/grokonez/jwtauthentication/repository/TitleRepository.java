package com.grokonez.jwtauthentication.repository;



import com.grokonez.jwtauthentication.model.TitleWord;
import com.grokonez.jwtauthentication.model.Word;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Optional;
@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "title", path = "titleHAL")
public interface TitleRepository extends JpaRepository<TitleWord,Long> {
    Optional<TitleWord> findById(Long id);
    @Query("SELECT e.words FROM TitleWord e WHERE e.id=?1")
    List<Word> findWordByIdTitle(Long id);
    Page<TitleWord> findByNameContaining(@Param("query") String query,Pageable page);
}
