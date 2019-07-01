package com.grokonez.jwtauthentication.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "result")
public class Result {
	 	@Id
	    @Column(name = "id")
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    @Column(name = "title_id")
	    private String title_id;
	    @Column(name="username")
	    private  String username;
	    @Column(name="type_test")
	    private  String type_test;
	    @Column(name="result")
	    private  String result;
	    @Column(name = "created_datetime")
	    @CreationTimestamp
	    private Date createdDatetime;
	    @Column(name = "updated_datetime")
	    @UpdateTimestamp
	    private Date updatedDatetime;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getTitle_id() {
			return title_id;
		}
		public void setTitle_id(String title_id) {
			this.title_id = title_id;
		}
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		public String getType_test() {
			return type_test;
		}
		public void setType_test(String type_test) {
			this.type_test = type_test;
		}
		public String getResult() {
			return result;
		}
		public void setResult(String result) {
			this.result = result;
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
