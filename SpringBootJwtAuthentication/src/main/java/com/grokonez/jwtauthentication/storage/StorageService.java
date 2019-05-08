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
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class StorageService {

	Logger log = LoggerFactory.getLogger(this.getClass().getName());
	private final Path rootLocationImage = Paths.get("upload-dir/image");
	private final Path rootLocationAudio = Paths.get("upload-dir/audio");
	public static String fileStoredImage;
	public static String fileStoredAudio;
	public void store(MultipartFile file) {
		try {
			String mimeType =file.getContentType();
			System.out.println(mimeType);

			DateFormat dateFormat = new SimpleDateFormat("yyyy_MM_dd_HH_mm_");
			Date date = new Date();
			System.out.println(dateFormat.format(date));
			String fileStored=dateFormat.format(date)+file.getOriginalFilename();
//			fileStoredImage="";
//			fileStoredAudio="";
			if(mimeType.matches("^audio.+")) {
				Files.copy(file.getInputStream(), this.rootLocationAudio.resolve(fileStored));
				fileStoredAudio=fileStored;
				return;
			}
			if(mimeType.matches("^image.+")) {
				Files.copy(file.getInputStream(), this.rootLocationImage.resolve(fileStored));
				fileStoredImage=fileStored;
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
