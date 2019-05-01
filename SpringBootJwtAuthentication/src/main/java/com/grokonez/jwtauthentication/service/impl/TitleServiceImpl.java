package com.grokonez.jwtauthentication.service.impl;

import com.grokonez.jwtauthentication.model.TitleWord;
import com.grokonez.jwtauthentication.model.Word;
import com.grokonez.jwtauthentication.repository.TitleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collector;

@Service
public class TitleServiceImpl {
    @Autowired
    TitleRepository titleRepository;
    public List<Word> getListTitle(){
     Optional<TitleWord> titleWord=titleRepository.findById((long) 1);
        System.out.println(titleWord.get().getWords());
        List<Word> wordList= (List<Word>) titleWord.get().getWords();
        return wordList;
    }
}
