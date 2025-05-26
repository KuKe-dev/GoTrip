package com.gotrip.Go_Trip.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    //* Check if server is running
    @GetMapping("/")
    public String getStatus() {
        return "<h1>Server is running</h1>";
    }

}
