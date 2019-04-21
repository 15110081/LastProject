package com.grokonez.jwtauthentication.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;

@Entity
public class Word {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;
    private String vocabulary;
    private String phonetic;
    private String note;
    private String definition;
    private String typeword;
    private String title;
    public String audioword;
    @JsonIgnore
    @Transient
    private MultipartFile image;
    @JsonIgnore
    @Transient
    private MultipartFile audio;

    public MultipartFile getAudio() {
        return audio;
    }

    public void setAudio(MultipartFile audio) {
        this.audio = audio;
    }

    public String getAudioword() {
        return audioword;
    }

    public void setAudioword(String audioword) {
        this.audioword = audioword;
    }

    public MultipartFile getImage() {
        return image;
    }

    public void setImage(MultipartFile image) {
        this.image = image;
    }
    private String imageWord;

    public Word(String vocabulary, String phonetic, String note, String definition, String typeword, String title, String imageWord) {
        this.vocabulary = vocabulary;
        this.phonetic = phonetic;
        this.note = note;
        this.definition = definition;
        this.typeword = typeword;
        this.title = title;
        this.imageWord = imageWord;
    }

    public Word() {
    }
    //    @ManyToOne
//    @JoinColumn(name="title_id",nullable = false)
//    private Title title;
//
//    @ManyToOne
//    @JoinColumn(name="type_id",nullable = false)
//    private Type type;


    public String getImageWord() {
        return imageWord;
    }

    public void setImageWord(String imageWord) {
        this.imageWord = imageWord;
    }

    public String getTypeword() {
        return typeword;
    }

    public void setTypeword(String typeword) {
        this.typeword = typeword;
    }



    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }




    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVocabulary() {
        return vocabulary;
    }

    public void setVocabulary(String vocabulary) {
        this.vocabulary = vocabulary;
    }

    public String getPhonetic() {
        return phonetic;
    }

    public void setPhonetic(String phonetic) {
        this.phonetic = phonetic;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }





}
