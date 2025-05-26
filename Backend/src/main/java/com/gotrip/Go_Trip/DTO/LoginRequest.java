package com.gotrip.Go_Trip.DTO;

import lombok.Data;

@Data
public class LoginRequest {

    private String usernameOrEmail;
    private String password;

    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public String getPassword() {
        return password;
    }

}
