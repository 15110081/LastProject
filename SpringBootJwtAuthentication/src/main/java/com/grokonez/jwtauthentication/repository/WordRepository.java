package com.grokonez.jwtauthentication.repository;


import com.grokonez.jwtauthentication.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "word", path = "word")
public interface WordRepository extends JpaRepository<Word,Long> {
//    Word findByVocabulary(String name);
List<Word> findAllByOrderByVocabulary();

}
