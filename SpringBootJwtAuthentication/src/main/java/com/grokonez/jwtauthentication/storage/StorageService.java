package com.grokonez.jwtauthentication.storage;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class StorageService {

	Logger log = LoggerFactory.getLogger(this.getClass().getName());
	private final Path rootLocationImage = Paths.get("upload-dir/image");
	private final Path rootLocationAudio = Paths.get("upload-dir/audio");
	public void store(MultipartFile file) {
		try {
			String mimeType =file.getContentType();
			System.out.println(mimeType);
			if(mimeType.matches("^audio.+")) {
				Files.copy(file.getInputStream(), this.rootLocationAudio.resolve(file.getOriginalFilename()));
				return;
			}
			if(mimeType.matches("^image.+")) {
				Files.copy(file.getInputStream(), this.rootLocationImage.resolve(file.getOriginalFilename()));
				return;
			}
		} catch (Exception e) {
			throw new RuntimeException("FAIL!");
		}
	}

	public Resource loadFile(String filename) {
		try {
			Path file = rootLocationImage.resolve(filename);
			Resource resource = new UrlResource(file.toUri());
			if (resource.exists() || resource.isReadable()) {
				return resource;
			} else {
				throw new RuntimeException("FAIL!");
			}
		} catch (MalformedURLException e) {
			throw new RuntimeException("FAIL!");
		}
	}

	public void deleteAll() {
		FileSystemUtils.deleteRecursively(rootLocationImage.toFile());
	}

	public void init() {
		try {
			if (!Files.exists(rootLocationImage))
			Files.createDirectory(rootLocationImage);
			if(!Files.exists(rootLocationAudio))
			Files.createDirectory(rootLocationAudio);
		} catch (IOException e) {
			throw new RuntimeException("Could not initialize storage!");
		}
	}
}
