package com.grokonez.jwtauthentication.repository;

import com.grokonez.jwtauthentication.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;


public interface WordRepository extends JpaRepository<Word,Long> {
//    Word findByVocabulary(String name);


}
