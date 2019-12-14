package com.food_management.security;

import com.food_management.entities.UserEntity;
import com.food_management.services.impl.UserServiceImpl;
import com.food_management.services.interfaces.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
//@Transactional(propagation = Propagation.MANDATORY)
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class UserSessionService {

    private final UserService userService;

    public UserEntity getUser() {
        UserEntity detachedUser = (UserEntity) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return userService.findById(detachedUser.getId());
    }

    public Boolean isActive(){
        UserEntity detachedUser = (UserEntity) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        return detachedUser.getActive();
    }



}
