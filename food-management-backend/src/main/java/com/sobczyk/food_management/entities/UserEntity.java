package com.sobczyk.food_management.entities;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@Entity
@Table(name = "user_")
public class UserEntity extends BaseEntity {

    public UserEntity() {
        super();
        this.active=false;
    }

    @Column(name = "login", nullable = false, unique = true, length = 32)
    private String login;

    @Email
    @Column(name = "email", nullable = false, unique = true, length = 50)
    private String email;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private RoleEntity role;

    @OneToMany(mappedBy = "userIngredientKey.user")
    private List<UserIngredientEntity> userIngredients = new ArrayList<>();

    @Column(name = "active", nullable = false)
    private Boolean active;

    @Column(name = "confirmation_date")
    private Date confrimationDate;

    @Column(name = "creator_login", length = 32)
    private String creatorLogin;
}
