package com.food_management.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@Entity
@Table(name = "role")
public class RoleEntity extends BaseEntity {

    @Column(name = "name", unique = true, nullable = false, length = 50)
    private String name;
}
