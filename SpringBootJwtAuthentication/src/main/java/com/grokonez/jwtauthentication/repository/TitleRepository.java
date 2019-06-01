package com.grokonez.jwtauthentication.repository;


import com.grokonez.jwtauthentication.model.TitleWord;
import com.grokonez.jwtauthentication.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.security.auth.Subject;
import java.util.List;
import java.util.Optional;
@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "title", path = "titleHAL")
public interface TitleRepository extends JpaRepository<TitleWord,Long> {
    Optional<TitleWord> findById(Long id);
    @Query("SELECT e.words FROM TitleWord e WHERE e.id=?1")
    List<Word> findWordByIdTitle(Long id);
}
