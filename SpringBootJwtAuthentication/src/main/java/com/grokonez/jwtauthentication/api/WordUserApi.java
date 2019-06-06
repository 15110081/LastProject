package com.grokonez.jwtauthentication.api;

import com.grokonez.jwtauthentication.service.WordService;
import com.grokonez.jwtauthentication.util.ApiResponseBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/worduserapi")
public class WordUserApi {
    @Autowired
    private WordService articleService;

    @GetMapping
    public Map<String, ?> getAllWordUserAPI() {
        return ApiResponseBuilder.buildContainsDataSize("List all words", articleService.selectAllWord(),articleService.selectAllWord().size());
    }
    @GetMapping("/{id}")
    public Map<String, ?> getWordUserAPI(@PathVariable Long id) {
        return ApiResponseBuilder.buildContainsData("Get article#" + id, articleService.selectWordById(id));
    }
}
