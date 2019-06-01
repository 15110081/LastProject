package com.grokonez.jwtauthentication.repository;


import com.grokonez.jwtauthentication.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
@CrossOrigin
@RepositoryRestResource(collectionResourceRel = "word", path = "wordHAL")
public interface WordRepository extends JpaRepository<Word,Long> {
//    Word findByVocabulary(String name);
List<Word> findAllByOrderByVocabulary();
    Word findWordByIdNotIn(Long id);
}
