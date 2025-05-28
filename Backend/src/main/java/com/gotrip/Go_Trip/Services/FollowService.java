package com.gotrip.Go_Trip.Services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.gotrip.Go_Trip.Repositories.FollowRepository;

import jakarta.transaction.Transactional;

@Service
public class FollowService {
    
    private final FollowRepository followRepository;

    public FollowService(FollowRepository followRepository) {
        this.followRepository = followRepository;
    }

    public List<Long> getFollowings(Long id) {
        return followRepository.getFollowings(id);
    }

    public Map<String, Object> isFollowing(Long followerId, Long followingId) {

        boolean isFollowing;
        try {
            isFollowing = followRepository.existsByFollowerIdAndFollowingId(followerId, followingId);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("error", e.getMessage());
            return response;
        }

        Map<String, Object> response = new HashMap<>();
        response.put("isFollowing", isFollowing);
        response.put("followerId", followerId);
        response.put("followingId", followingId);

        return response;
    }

    @Transactional
    public void follow(Long followerId, Long followingId) {
        try {
            followRepository.saveFollow(followerId, followingId);
        } catch (Exception e) {
            throw new RuntimeException("Error following user", e);
        }
    }

    @Transactional
    public void unfollow(Long followerId, Long followingId) {
        try {
            followRepository.deleteFollow(followerId, followingId);
        } catch (Exception e) {
            throw new RuntimeException("Error unfollowing user", e);
        }
    }
}