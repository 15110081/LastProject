package com.grokonez.jwtauthentication.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "title")
public class TitleWord {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name="image")
    private  String imageTitle;
    @Column(name="description")
    private  String description;
    @Column(name = "created_datetime")
    @CreationTimestamp
    private Date createdDatetime;
    @Column(name = "updated_datetime")
    @UpdateTimestamp
    private Date updatedDatetime;
    @ManyToMany(mappedBy = "title", fetch = FetchType.EAGER)
    private Set<Word> words;

    @Override
    public String toString() {
        return "Category [id=" + id + ", name=" + name + "  - products size: " + words.size() + "]";
    }

    public TitleWord() {
    }
    @JsonIgnore
    public Set<Word> getWords() {
        return words;
    }

    public void setWords(Set<Word> words) {
        this.words = words;
    }

   

    public TitleWord(String name, String imageTitle, String description) {
        this.name = name;
        this.imageTitle = imageTitle;
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getImageTitle() {
        return imageTitle;
    }

    public void setImageTitle(String imageTitle) {
        this.imageTitle = imageTitle;
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

}
