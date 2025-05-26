package com.gotrip.Go_Trip.Repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.gotrip.Go_Trip.Entities.Friend;  // Import correcto de la entidad

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {

    @Query(value = "SELECT usuario_id1 FROM amistades WHERE usuario_id2 = :id", nativeQuery = true)
    List<Long> getFriend1(@Param("id") Long id); 

    @Query(value = "SELECT usuario_id2 FROM amistades WHERE usuario_id1 = :id", nativeQuery = true)
    List<Long> getFriend2(@Param("id") Long id); 
}
