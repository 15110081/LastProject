package com.grokonez.jwtauthentication.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.grokonez.jwtauthentication.model.Word;
import com.grokonez.jwtauthentication.repository.WordRepository;
import com.grokonez.jwtauthentication.service.WordService;
import com.grokonez.jwtauthentication.storage.StorageService;
import com.grokonez.jwtauthentication.util.ApiResponseBuilder;
import com.sun.deploy.association.utility.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/wordapi")
public class WordApi {
    @Autowired
    private WordService articleService;
    @Autowired
    StorageService storageService;


    public static Long idGlobal;
    @PostMapping("/post")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {

            storageService.store(file);
            message = "You successfully uploaded " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message = "FAIL to upload " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, ?> postArticle(@RequestBody Word article) {
        System.out.println("definition"+article.getDefinition());
//        System.out.println("API POST "+StorageService.fileStoredAudio+StorageService.fileStoredImage);
        Word insertedArticle = articleService.insertWord(new Word(article.getVocabulary(), article.getPhonetic(), article.getNote(), article.getDefinition(), article.getTypeword()));
        idGlobal=insertedArticle.getId();
        System.out.println(idGlobal);
        return ApiResponseBuilder.buildSuccess(String.format("%d", insertedArticle.getId()), insertedArticle);
    }




    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, ?> getAllWordAPI() {
        return ApiResponseBuilder.buildContainsDataSize("List all words", articleService.selectAllWord(),articleService.selectAllWord().size());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Map<String, ?> getWordAPI(@PathVariable Long id) {
        return ApiResponseBuilder.buildContainsData("Get article#" + id, articleService.selectWordById(id));
    }
    @GetMapping("/infoWord/{id}")
    public Word getWordInfoAPI(@PathVariable Long id) {
        return  articleService.selectWordById(id);
    }



    //    @RequestMapping(value = "/Image/{id:.+}", method = RequestMethod.GET)
//    public ResponseEntity<byte[]> getImage(@PathVariable("id") String id) {
//        byte[] image = imageService.getImage(id);
//        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
//    }


    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, ?> putArticle(@PathVariable Long id, @RequestBody Word article) {
        Word updatedArticle = articleService.updateWord(id, article);
        return ApiResponseBuilder.buildSuccess(String.format("Update article#%d success", id), updatedArticle);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, ?> deleteArticle(@PathVariable Long id) {
        boolean success = articleService.deleteWord(id);
        if (success)
            return ApiResponseBuilder.buildSuccess(String.format("Delete article#%d success", id));
        else
            return ApiResponseBuilder.buildError(String.format("Delete article#%d fail", id));
    }



    @RequestMapping(value = "/getAllWord", method = RequestMethod.GET)
    public List<Word> getAllWords() {
        return articleService.selectAllWord();
    }


    @RequestMapping(value = "/getOrder",method = RequestMethod.GET)
    public List<Word>getOrders() {
        System.out.println("__________Demo find all order by name desc________________");
        List<Word> listCustomer1 = articleService.selectOrders();
        return listCustomer1;
    }


}
