package com.gotrip.Go_Trip.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "amistades")
public class Friend {

    //- Attributes

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
        name = "usuario_id1",
        nullable = false
    )
    private Long usuario_id1;

    @Column(
        name = "usuario_id2",
        nullable = false
    )
    private Long usuario_id2;


    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


      public Long getUsuario_id1() {
        return usuario_id1;
    }

    public void setUsuario_id1(Long usuario_id1) {
        this.usuario_id1 = usuario_id1;
    }

    public Long getUsuario_id2() {
        return usuario_id2;
    }

    public void setUsuario_id2(Long usuario_id2) {
        this.usuario_id2 = usuario_id2;
    }

    

  

}
