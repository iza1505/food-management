package com.sobczyk.food_management.services.interfaces;

import com.sobczyk.food_management.dtos.*;
import com.sobczyk.food_management.entities.UserEntity;
import com.sobczyk.food_management.entities.UserIngredientEntity;
import org.springframework.security.core.Authentication;

import java.util.List;


public interface UserService {
    UserEntity convertToEntity(UserDto dto);

    UserDto convertToDto(UserEntity entity);

    void add(RegistrationDto registrationDto);

    void sendActivationEmail(String hashedPassword, String email, String language);

    void confirmAccount(String token);

    UserEntity findByLogin(String login);

    UserEntity findByEmail(String email);

    UserEntity findById(Long id);

    Authentication authenticate(String login, String password);

    Integer getIngredientPercentage(Long id, List<UserIngredientEntity> userIngredients);

    void forgotPassword(ForgotPasswordOrResendConfirmationEmailDto dto);

    void resetForgottenPassword(String newPassword, String token);

    void changePassword(ChangePasswordDto dto);

    MyDetailsUserDto getMyDetails();

    UserDetailsToChangeDto updateDetails(UserDetailsToChangeDto dto);

    HeadersDto findAll(Integer elementsOnPage, Integer currentPage, String sortBy, Boolean ascendingSort);

    ChangeActiveStatusDto updateActiveStatus(ChangeActiveStatusDto dto);

    //void changeActiveStatus();

    void resendConfirmationEmail(ForgotPasswordOrResendConfirmationEmailDto dto);


}
