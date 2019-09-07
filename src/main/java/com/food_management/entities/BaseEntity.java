package com.food_management.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@MappedSuperclass
@NoArgsConstructor
public class BaseEntity {

    @Version
    @Column(nullable = false)
    @Getter
    protected Long version;

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    protected Long id;

}
