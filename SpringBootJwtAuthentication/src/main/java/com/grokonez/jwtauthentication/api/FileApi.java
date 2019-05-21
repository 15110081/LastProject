package com.grokonez.jwtauthentication.api;

import com.grokonez.jwtauthentication.model.Word;
import com.grokonez.jwtauthentication.service.WordService;
import com.grokonez.jwtauthentication.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/upload")
public class FileApi {
    @Autowired
    WordService articleService=new WordService();
    @Autowired
    StorageService storageService;
    @GetMapping(value = "/image/{id}")
    public ResponseEntity<InputStreamResource> getImage(@PathVariable("id")Long id) throws IOException {
        Word word=articleService.selectWordById(id);
        ClassPathResource imgFile = new ClassPathResource("src/main/upload/"+word.getImageWord());
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG).contentType(MediaType.IMAGE_PNG)
                .body(new InputStreamResource(imgFile.getInputStream()));
    }
    @GetMapping("/fileaudio/{id}")
    public  HashMap<String, Object> getListFiles(@PathVariable Long id) {
        Word word=articleService.selectWordById(id);
        String audio = MvcUriComponentsBuilder.fromMethodName(FileApi.class,"getFile",word.getAudioword()).build().toString();
        String image = MvcUriComponentsBuilder.fromMethodName(FileApi.class,"getFile",word.getImageWord()).build().toString();
//                files
//                .stream().map(fileName -> MvcUriComponentsBuilder
//                        .fromMethodName(WordApi.class, "getFile", fileName).build().toString())
//                .collect(Collectors.toList());
        HashMap<String, Object> res = new HashMap<>();
        res.put("audio", audio);
       res.put("image", image);
        return res;
    }

    @GetMapping("/file/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.loadFile(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
}
