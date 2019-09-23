package com.food_management.security;

import com.food_management.entities.UserEntity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

@Getter
@Setter
public class UserPrincipal implements UserDetails {

    private  Long id;

    private String login;

    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(Long id, String login, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserPrincipal create(UserEntity user) {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getName());
        List<SimpleGrantedAuthority> authoritiesList = new ArrayList<>();
        authoritiesList.add(authority);

        return new UserPrincipal(
                user.getId(),
                user.getLogin(),
                user.getPasswordHash(),
                authoritiesList
        );
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) { return true; }
        if (o == null || getClass() != o.getClass()) { return false; }
        UserPrincipal that = (UserPrincipal) o;
        return Objects.equals(login, that.login);
    }

    @Override
    public int hashCode() {
        return Objects.hash(login);
    }
}