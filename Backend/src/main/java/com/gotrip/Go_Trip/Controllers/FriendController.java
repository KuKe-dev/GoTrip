package com.gotrip.Go_Trip.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gotrip.Go_Trip.Services.FriendService;

@RestController
@RequestMapping("/api/friends-clap-clap-clap-clap")
public class FriendController {

    //* Methods injection
    @Autowired
    private FriendService friendService;

    @GetMapping("/{id}")
    public List<Long> getFriends(@PathVariable Long id) {
        return friendService.getFriends(id);
    }

                             

}
