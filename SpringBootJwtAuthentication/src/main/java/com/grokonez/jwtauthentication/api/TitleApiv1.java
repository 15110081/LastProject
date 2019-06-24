package com.grokonez.jwtauthentication.api;

import com.grokonez.jwtauthentication.message.response.ResponseMessage;
import com.grokonez.jwtauthentication.model.TitleWord;
import com.grokonez.jwtauthentication.model.Word;
import com.grokonez.jwtauthentication.repository.TitleRepository;
import com.grokonez.jwtauthentication.service.WordService;
import com.grokonez.jwtauthentication.service.impl.TitleServiceImpl;
import com.grokonez.jwtauthentication.util.ApiResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/titleApiv1")
public class TitleApiv1 {
    @Autowired
    private WordService wordService;
    @Autowired
    private TitleServiceImpl titleService;

    @PostMapping("/{id}/save/{id2}")
    public ResponseEntity<?> saveTitleWord(@PathVariable Long id, @PathVariable Long id2) {
        TitleWord titleWord = titleService.selectTitleById(id);
        Set<TitleWord> titles = new HashSet<>();
        titles.add(titleWord);
        Word word = wordService.selectWordById((long) id2);
        word.setTitleWord(titles);
        wordService.insertWord(word);
        return new ResponseEntity<>(new ResponseMessage(String.format("Word #%d Title save successfully!", id2)), HttpStatus.OK);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> deleteTitleWord(@PathVariable Long id) {
        TitleWord titleWord = titleService.selectTitleById(id);
        Set<TitleWord> words = new HashSet<>();
        Set<Word> listWord =titleWord.getWords();
        listWord.remove(this);
//        titleWord()..remove(this);
//        for (Word u : listWord) {
//            u.getTitleWord().remove(this);
//        }
//        listWord.stream().forEach(word->titleService.de);

//        Word word = wordService.selectWordById((long) id2);
//        word.setTitleWord(titles);
//        wordService.deleteWordv2(word);
        return new ResponseEntity<>(new ResponseMessage(String.format("Word #%d Title delete successfully!", id)), HttpStatus.OK);

    }
}
