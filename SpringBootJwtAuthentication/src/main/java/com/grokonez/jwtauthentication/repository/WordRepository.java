package com.grokonez.jwtauthentication.repository;

import com.grokonez.jwtauthentication.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordRepository extends JpaRepository<Word,Long> {
//    Word findByVocabulary(String name);
List<Word> findAllByOrderByVocabulary();

}
