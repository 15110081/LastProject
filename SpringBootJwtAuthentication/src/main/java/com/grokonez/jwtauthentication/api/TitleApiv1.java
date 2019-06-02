package com.grokonez.jwtauthentication.api;

import com.grokonez.jwtauthentication.message.response.ResponseMessage;
import com.grokonez.jwtauthentication.model.TitleWord;
import com.grokonez.jwtauthentication.model.Word;
import com.grokonez.jwtauthentication.repository.TitleRepository;
import com.grokonez.jwtauthentication.service.WordService;
import com.grokonez.jwtauthentication.service.impl.TitleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/titleApiv1")
public class TitleApiv1{
        @Autowired
        private WordService wordService;
        @Autowired
        private TitleServiceImpl titleService;
        @PostMapping("/{id}/save/{id2}")
        public ResponseEntity<?> saveTitleWord(@PathVariable Long id, @PathVariable Long id2){
            TitleWord titleWord=titleService.selectTitleById(id);
            Set<TitleWord> titles = new HashSet<>();
            titles.add(titleWord);
            Word word=wordService.selectWordById((long) id2);
            word.setTitleWord(titles);
            wordService.insertWord(word);
            return new ResponseEntity<>(new ResponseMessage(String.format("Word #%d Title save successfully!", id2)), HttpStatus.OK);
        }
}
