package com.gotrip.Go_Trip.Services;

import com.gotrip.Go_Trip.Entities.Post;
import com.gotrip.Go_Trip.Repositories.PostRepository;
import org.hibernate.type.descriptor.java.spi.JsonJavaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public List<Post> getPosts() {
        return postRepository.getPosts();
    }

    public Post getPostById(Long id) {
        return postRepository.getPostById(id);
    }

}
