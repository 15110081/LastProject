package com.grokonez.jwtauthentication.service.impl;

import com.grokonez.jwtauthentication.model.TitleWord;
import com.grokonez.jwtauthentication.model.Word;
import com.grokonez.jwtauthentication.repository.TitleRepository;
import org.hibernate.ObjectNotFoundException;
import org.hibernate.TypeMismatchException;
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
    // get all article
    public List<TitleWord> selectAllTitle() {
        return titleRepository.findAll();
    }

    // get a article
    public TitleWord selectTitleById(Long id) throws ObjectNotFoundException {
        return titleRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException(id, TitleWord.class.getSimpleName()));
    }

    // add a new article
    public TitleWord insertTitle(TitleWord article){
        if (article == null) throw new TypeMismatchException("Object is null");
        return titleRepository.save(article);
    }
 
    public boolean deleteTitle(Long id) throws ObjectNotFoundException {
        TitleWord article = selectTitleById(id);
        titleRepository.delete(article);
        return (titleRepository.existsById(id) == false);
    }
    public TitleWord updateTitle(Long id, TitleWord data) throws ObjectNotFoundException {
        TitleWord article = selectTitleById(id);
        article.setImageTitle(data.getImageTitle());
        article.setName(data.getName());
        return titleRepository.save(article);
    }
    public TitleWord updateImageTitle(Long id,String titleName) throws ObjectNotFoundException {
        TitleWord title=selectTitleById(id);
        title.setImageTitle(titleName);
        return titleRepository.save(title);
    }
}
