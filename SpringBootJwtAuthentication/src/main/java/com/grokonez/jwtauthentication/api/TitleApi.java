package com.grokonez.jwtauthentication.api;

import com.grokonez.jwtauthentication.model.TitleWord;
import com.grokonez.jwtauthentication.model.Word;
import com.grokonez.jwtauthentication.repository.TitleRepository;
import com.grokonez.jwtauthentication.service.impl.TitleServiceImpl;
import com.grokonez.jwtauthentication.util.ApiResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/titleApi")
public class TitleApi {
    @Autowired
    private TitleServiceImpl titleService;
//    @GetMapping
//    @ResponseStatus(HttpStatus.OK)
//    public List<Word> getAllWordAPI() {
//        return titleService.getListTitle();
//    }

}
