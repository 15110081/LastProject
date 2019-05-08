package com.grokonez.jwtauthentication.service;

import com.grokonez.jwtauthentication.model.Word;
import com.grokonez.jwtauthentication.repository.WordRepository;
import org.hibernate.ObjectNotFoundException;
import org.hibernate.TypeMismatchException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordService {
    @Autowired
    private WordRepository wordRepository;

    public List<Word> selectOrders(){return wordRepository.findAllByOrderByVocabulary();}



    // get all article
    public List<Word> selectAllWord() {
        return wordRepository.findAll();
    }

    // get a article
    public Word selectWordById(Long id) throws ObjectNotFoundException {
        return wordRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException(id, Word.class.getSimpleName()));
    }

    // add a new article
    public Word insertWord(Word article){
        if (article == null) throw new TypeMismatchException("Object is null");
        return wordRepository.save(article);
    }

    public void insertListWord(List<Word>article){
        if (article == null) throw new TypeMismatchException("Object is null");
        for(Word word:article){
            wordRepository.save(word);
        }
    }
    // edit a article
    public Word updateWord(Long id, Word data) throws ObjectNotFoundException {
        Word article = selectWordById(id);
        article.setImageWord(data.getImageWord());
        article.setVocabulary(data.getVocabulary());
        article.setPhonetic(data.getPhonetic());
        article.setNote(data.getNote());
        article.setDefinition(data.getDefinition());
        article.setAudioword(data.getAudioword());
        article.setTypeword(data.getTypeword());
        return wordRepository.save(article);
    }
    public Word updateImageWord(Long id) throws ObjectNotFoundException {
        Word word=selectWordById(id);
        word.setImageWord("");
        return wordRepository.save(word);
    }

    // delete a article
    public boolean deleteWord(Long id) throws ObjectNotFoundException {
        Word article = selectWordById(id);
        wordRepository.delete(article);
        return (wordRepository.existsById(id) == false);
    }
}
