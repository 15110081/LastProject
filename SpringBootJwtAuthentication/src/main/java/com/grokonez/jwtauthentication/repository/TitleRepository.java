package com.grokonez.jwtauthentication.repository;

;
import com.grokonez.jwtauthentication.model.TitleWord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TitleRepository  extends JpaRepository<TitleWord,Long> {
    Optional<TitleWord> findById(Long id);
}
