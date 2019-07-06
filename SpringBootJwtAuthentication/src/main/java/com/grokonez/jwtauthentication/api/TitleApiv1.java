package com.grokonez.jwtauthentication.api;

import com.grokonez.jwtauthentication.message.response.ResponseMessage;
import com.grokonez.jwtauthentication.model.TitleWord;
import com.grokonez.jwtauthentication.model.Word;
import com.grokonez.jwtauthentication.repository.ResultRepository;
import com.grokonez.jwtauthentication.repository.TitleRepository;
import com.grokonez.jwtauthentication.repository.UserRepository;
import com.grokonez.jwtauthentication.service.WordService;
import com.grokonez.jwtauthentication.service.impl.TitleServiceImpl;
import com.grokonez.jwtauthentication.util.ApiResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
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
    @Autowired
    private UserRepository userService;
    @Autowired
    private ResultRepository resultRepository;
    @Autowired
    private JdbcTemplate jT;
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

    @DeleteMapping("/{id}/deletev2")
    public ResponseEntity<?> deleteTitleWordv2(@PathVariable Long id) {
        TitleWord titleWord = titleService.selectTitleById(id);
        jT.execute("delete from title_word where title_id="+id);
//        titleWord.getWords().removeAll(titleWord.getWords());
//        titleService.deleteTitle(titleWord.getId());
//        Set<Word> listWord =titleWord.getWords();
//        for(Word word:titleWord.getWords())
//        {
//        	titleWord.getWords().remove(word);
//        }
//        Group group = groupRepository.findOne(groupId);
//        group.getUsers().removeAll(group.getUsers());
//
//        // Other business logic
//
//        groupRepository.delete(group);
        return new ResponseEntity<>(new ResponseMessage(String.format("Word #%d Title delete successfully!", id)), HttpStatus.OK);
    }
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> deleteTitleWord(@PathVariable Long id) {
        TitleWord titleWord = titleService.selectTitleById(id);
        Set<TitleWord> words = new HashSet<>();
        Set<Word> listWord =titleWord.getWords();
//        titleWord.setWords(null);
        Set<Word> listWord1 =titleWord.getWords();
//        System.out.println(listWord);
//        words.add(titleWord);
//        Word word = wordService.selectWordById((long) id2);
//        word.setTitleWord(words);
        for(Word word:listWord) {
//        Word word1=new Word();
//        word1.setId(1);
        wordService.deleteWord(word.getId());
        }
        for(Word word:listWord1) {
        	Word temp=new Word();
        	temp.setId(word.getId());
        	temp.setCreatedDatetime(word.getCreatedDatetime());
        	temp.setDefinition(word.getDefinition());
        	temp.setImageWord(word.getImageWord());
        	temp.setNote(word.getNote());
        	temp.setPhonetic(word.getPhonetic());
        	temp.setTypeword(word.getTypeword());
        	temp.setUpdatedDatetime(word.getUpdatedDatetime());
        	temp.setVocabulary(word.getVocabulary());
        	wordService.insertWord(temp);
        }
        TitleWord temp=new TitleWord();
     
//        titleService.insertTitle(temp);
//        titleWord()..remove(this);
      
//        listWord.stream().forEach(word->titleService.de);

//        Word word = wordService.selectWordById((long) id2);
//        word.setTitleWord(titles);
//        wordService.deleteWordv2(word);
        return new ResponseEntity<>(new ResponseMessage(String.format("Word #%d Title delete successfully!", id)), HttpStatus.OK);

    }
    @GetMapping("/countWordofTitle/{id}")
    public Map<String, ?> getCountWordofTitle(@PathVariable Long id){
    	  TitleWord titleWord = titleService.selectTitleById(id);
    	  Set<Word> listWord = titleWord.getWords();
    	  return ApiResponseBuilder.buildContainsDataSizev2("Get Word Count",listWord.size());
    }
    @GetMapping("/overview")
    public  Map<String, ?> getOverview(){
    	 HashMap<String, Object> res = new HashMap<>();
    	 res.put("words", wordService.selectAllWord().size());
    	 res.put("users",userService.findAll().size());
    	 res.put("results",resultRepository.findAll().size());
    	 res.put("titles",titleService.selectAllTitle().size());
    	 return res; 
    }
}
