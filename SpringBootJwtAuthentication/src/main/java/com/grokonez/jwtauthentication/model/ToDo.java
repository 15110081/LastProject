package com.grokonez.jwtauthentication.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "todo")
public class ToDo {
	  @Id
	    @Column(name = "id")
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    @Column(name = "note")
	    private String note;
	    @Column(name = "created_datetime")
	    @CreationTimestamp
	    private Date createdDatetime;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getNote() {
			return note;
		}
		public void setNote(String note) {
			this.note = note;
		}
		public Date getCreatedDatetime() {
			return createdDatetime;
		}
		public void setCreatedDatetime(Date createdDatetime) {
			this.createdDatetime = createdDatetime;
		}
	    
}
