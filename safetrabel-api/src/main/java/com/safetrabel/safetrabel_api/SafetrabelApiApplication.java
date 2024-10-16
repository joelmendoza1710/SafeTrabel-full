package com.safetrabel.safetrabel_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class SafetrabelApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SafetrabelApiApplication.class, args);
	}

}
