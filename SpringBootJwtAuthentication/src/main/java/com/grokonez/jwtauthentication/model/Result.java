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
	    private String titleId;
	    @Column(name="username")
	    private  String username;
	    @Column(name="type_test")
	    private  String typeTest;
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
		
		public String getUsername() {
			return username;
		}
		public void setUsername(String username) {
			this.username = username;
		}
		
		public String getTitleId() {
			return titleId;
		}
		public void setTitleId(String titleId) {
			this.titleId = titleId;
		}
		public String getTypeTest() {
			return typeTest;
		}
		public void setTypeTest(String typeTest) {
			this.typeTest = typeTest;
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
