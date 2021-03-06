package com.grokonez.jwtauthentication.api;

        import com.grokonez.jwtauthentication.message.response.ResponseMessage;
        import com.grokonez.jwtauthentication.model.TitleWord;
        import com.grokonez.jwtauthentication.model.Word;
        import com.grokonez.jwtauthentication.repository.TitleRepository;
        import com.grokonez.jwtauthentication.service.WordService;
        import com.grokonez.jwtauthentication.service.impl.TitleServiceImpl;
        import com.grokonez.jwtauthentication.storage.StorageService;
        import com.grokonez.jwtauthentication.util.ApiResponseBuilder;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;
        import org.springframework.web.multipart.MultipartFile;

        import java.util.HashSet;
        import java.util.List;
        import java.util.Map;
        import java.util.Set;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/titleApi")
public class TitleApi {
    @Autowired
    private TitleServiceImpl titleService;
    @Autowired
    StorageService storageService;
    @Autowired
    private WordService wordService;
    @Autowired
    private TitleRepository titleRepository;
    @GetMapping
    public Map<String, ?> getAllTitleAPI() {
        return ApiResponseBuilder.buildContainsDataSize("List all title", titleService.selectAllTitle(),titleService.selectAllTitle().size());
    }
    public static Long idGlobalTitle;
    @PostMapping("/post")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        String message = "";
        try {

            storageService.storeTitleFile(file);
            message = "You successfully uploaded " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.OK).body(message);
        } catch (Exception e) {
            message = "FAIL to upload " + file.getOriginalFilename() + "!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(message);
        }
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, ?> postArticle(@RequestBody TitleWord article) {
        TitleWord insertedArticle = titleService.insertTitle(new TitleWord(article.getName(),article.getImageTitle(),article.getDescription()));
        idGlobalTitle=insertedArticle.getId();
        return ApiResponseBuilder.buildSuccess(String.format("%d", insertedArticle.getId()), insertedArticle);
    }
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, ?> putArticle(@PathVariable Long id, @RequestBody TitleWord article) {
        TitleWord updatedArticle = titleService.updateTitle(id, article);
        return ApiResponseBuilder.buildSuccess(String.format("Update title#%d success", id), updatedArticle);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, ?> deleteArticle(@PathVariable Long id) {
        boolean success = titleService.deleteTitle(id);
        if (success)
            return ApiResponseBuilder.buildSuccess(String.format("Delete title#%d success", id));
        else
            return ApiResponseBuilder.buildError(String.format("Delete title#%d fail", id));
    }
    @GetMapping("/{id}")
    public Map<String, ?> getTitleAPI(@PathVariable Long id) {
        return ApiResponseBuilder.buildContainsData("Get article#" + id, titleService.selectTitleById(id));
    }
    @GetMapping("/{id}/words")
    public Map<String, ?> getWordLeft(@PathVariable Long id){
        List<Word> listWordByIdTitle= titleRepository.findWordByIdTitle(id);
        List<Word> wordAllList=wordService.selectAllWord();

            for (Word wordTile:listWordByIdTitle
                 ) {
                    wordAllList.removeIf(c->c.getId()==wordTile.getId());
            }

        return ApiResponseBuilder.buildContainsDataSize("Get Word Left",wordAllList,wordAllList.size());
    }
    @PostMapping("/{id}/save/{id2}")
    public ResponseEntity<?> saveTitleWord(@PathVariable Long id,@PathVariable Long id2){
        TitleWord titleWord=titleService.selectTitleById(id);
        Set<TitleWord> titles = new HashSet<>();
        titles.add(titleWord);
        Word word=wordService.selectWordById((long) id2);
        word.setTitleWord(titles);
        wordService.insertWord(word);
        return new ResponseEntity<>(new ResponseMessage("Word Title save successfully!"), HttpStatus.OK);
    }
}
