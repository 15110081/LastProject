package com.grokonez.jwtauthentication;

import com.grokonez.jwtauthentication.model.TitleWord;
import com.grokonez.jwtauthentication.model.Word;
import com.grokonez.jwtauthentication.repository.TitleRepository;
import com.grokonez.jwtauthentication.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.util.List;
import java.util.Optional;

@SpringBootApplication
public class SpringBootJwtAuthenticationApplication  {


	public static void main(String[] args) {

		SpringApplication.run(SpringBootJwtAuthenticationApplication.class, args);
	}


}
