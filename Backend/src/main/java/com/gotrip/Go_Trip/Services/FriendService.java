package com.gotrip.Go_Trip.Services;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.gotrip.Go_Trip.Repositories.FriendRepository;

@Service
public class FriendService {
    
    private final FriendRepository friendRepository;

    @Autowired
    public FriendService(FriendRepository friendRepository) {
        this.friendRepository = friendRepository;
    }

    public List<Long> getFriends(Long id) {
        List<Long> friends = new ArrayList<>();
        
        try {
            List<Long> friends1 = friendRepository.getFriend1(id);
            List<Long> friends2 = friendRepository.getFriend2(id);
            
            if(friends1 != null) friends.addAll(friends1);
            if(friends2 != null) friends.addAll(friends2);
            
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener amigos: " + e.getMessage());
        }
        
        return friends;
    }
}