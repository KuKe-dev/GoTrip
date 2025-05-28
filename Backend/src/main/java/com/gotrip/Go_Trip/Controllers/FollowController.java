package com.gotrip.Go_Trip.Controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gotrip.Go_Trip.Services.FollowService;

@RestController
@RequestMapping("/api")
public class FollowController {

    //* Methods injection
    @Autowired
    private FollowService followService;

    

    @GetMapping("/followings/{id}")
    public List<Long> getFollowers(@PathVariable Long id) {
        return followService.getFollowings(id);
    }

    @GetMapping("/isFollowing")
    public Map getFollowings(@RequestParam Long followerId ,@RequestParam Long followingId) {
        try {
            return followService.isFollowing(followerId, followingId);
        } catch (Exception e) {
            Map<String, Object> response = Map.of("error", e.getMessage());
            return response;
        }
    }

    @PostMapping("/follow")
    public Map<String, Object> follow(@RequestParam Long followerId, @RequestParam Long followingId) {
        try {
            followService.follow(followerId, followingId);
            return Map.of("success", true);
        } catch (Exception e) {
            return Map.of("success", false, "error", e.getMessage());
        }
    }

    @DeleteMapping("/unfollow")
    public Map<String, Object> unfollow(@RequestParam Long followerId, @RequestParam Long followingId) {
        try {
            followService.unfollow(followerId, followingId);
            return Map.of("success", true);
        } catch (Exception e) {
            return Map.of("success", false, "error", e.getMessage());
        }
    }

}
