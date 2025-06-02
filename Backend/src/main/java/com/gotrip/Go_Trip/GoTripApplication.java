package com.gotrip.Go_Trip;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;



@SpringBootApplication
public class GoTripApplication {


	
	public static void main(String[] args) {
		
		SpringApplication.run(GoTripApplication.class, args);
		System.out.println("Server is running on: http://localhost:8080");
		System.out.println("Client is running on: " + System.getenv("CLIENT_URL"));
	}

	

	//TODO: Finish api/posts Controller/CRUD (Read is finished)

	//TODO: Start api/users Controller/CRUD (IMPORTANT: DO NOT INCLUDE PASSWORD NEITHER EMAIL)
	//TODO: Start authentication (auth/login & auth/islogged)
}