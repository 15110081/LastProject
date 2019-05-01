package com.grokonez.jwtauthentication.model;

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
    private  String image;
    @Column(name = "created_datetime")
    @CreationTimestamp
    private Date createdDatetime;
    @Column(name = "updated_datetime")
    @UpdateTimestamp
    private Date updatedDatetime;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "title_word",
            joinColumns = { @JoinColumn(name = "title_id") },
            inverseJoinColumns = {@JoinColumn(name = "word_id") })
    private List<Word> words = new ArrayList<>();

    @Override
    public String toString() {
        return "Category [id=" + id + ", name=" + name + "  - products size: " + words.size() + "]";
    }

    public TitleWord() {
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

    public List<Word> getWords() {
        return words;
    }

    public void setWords(List<Word> words) {
        this.words = words;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
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
