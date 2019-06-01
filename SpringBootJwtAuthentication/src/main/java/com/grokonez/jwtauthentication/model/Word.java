package com.grokonez.jwtauthentication.model;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.*;

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
    public String audioword;
    private String imageWord;

    public Word(){}
    @Column(name = "created_datetime")
    @CreationTimestamp
    private Date createdDatetime;
    @Column(name = "updated_datetime")
    @UpdateTimestamp
    private Date updatedDatetime;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "title_word",
            joinColumns = { @JoinColumn(name = "word_id") },
            inverseJoinColumns = {@JoinColumn(name = "title_id") })
    private Set<TitleWord> titleWord ;
    @Override
    public String toString() {
        return "Product [id=" + id + ", name=" + vocabulary + "  - categories size: " + titleWord.size() +"]";
    }
    public String getAudioword() {
        return audioword;
    }

    public void setAudioword(String audioword) {
        this.audioword = audioword;
    }

    public Date getCreatedDatetime() {
        return createdDatetime;
    }

    public void setCreatedDatetime(Date createdDatetime) {
        this.createdDatetime = createdDatetime;
    }

    public Date getUpdatedDatetime() {
        return updatedDatetime;
    }

    public void setUpdatedDatetime(Date updatedDatetime) {
        this.updatedDatetime = updatedDatetime;
    }


    public Word(String vocabulary, String phonetic, String note, String definition, String typeword) {
        this.vocabulary = vocabulary;
        this.phonetic = phonetic;
        this.note = note;
        this.definition = definition;
        this.typeword = typeword;
    }



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


    public Set<TitleWord> getTitleWord() {
        return titleWord;
    }

    public void setTitleWord(Set<TitleWord> titleWord) {
        this.titleWord = titleWord;
    }
}
