package com.sobczyk.food_management.controllers;

import com.sobczyk.food_management.dtos.ForgotPasswordOrResendConfirmationEmailDto;
import com.sobczyk.food_management.dtos.NewPasswordDto;
import com.sobczyk.food_management.dtos.RegistrationDto;
import com.sobczyk.food_management.entities.UserEntity;
import com.sobczyk.food_management.exceptions.InactiveAccountException;
import com.sobczyk.food_management.security.*;
import com.sobczyk.food_management.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider tokenProvider;

    @Autowired
    public AuthController(@Lazy UserService userService, JwtTokenProvider tokenProvider) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/registration")
    public ResponseEntity registration(@RequestBody RegistrationDto registrationDto) {
        userService.add(registrationDto);
        return ResponseEntity.ok("Confirmation email was sent.");
    }

    @PostMapping(value = "/registration", params = {"token"})
    public ResponseEntity registration(@RequestParam(value = "token") String token) throws Exception {
        System.out.println(token);
        userService.confirmAccount(token);
        return ResponseEntity.ok("Account has been confirmed.");
    }

    @PostMapping("/login")
    public ResponseEntity authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        UserEntity userEntity = userService.findByLogin(loginRequest.getLogin());
        if (userEntity != null) {
            if (userEntity.getActive()) {
                Authentication authentication =
                        userService.authenticate(loginRequest.getLogin(), loginRequest.getPassword());
                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = tokenProvider.generateToken(authentication);
                JwtAuthenticationResponse response = new JwtAuthenticationResponse();
                response.setAccessToken(jwt);
                return ResponseEntity.ok(response);
            } else {
                throw new InactiveAccountException("Inactive account");
            }
        } else {
            throw new EntityNotFoundException("User with login: " + loginRequest.getLogin() + " not found");
        }

    }

    @PostMapping("/forgotPassword")
    public ResponseEntity forgotPassword(@RequestBody ForgotPasswordOrResendConfirmationEmailDto dto) {
        userService.forgotPassword(dto);
        return ResponseEntity.ok("Reset passsword email was sent.");
    }

    @PostMapping(value = "/forgotPassword", params = {"token"})
    public ResponseEntity resetForgottenPassword(@RequestParam(value = "token") String token,
                                                 @RequestBody NewPasswordDto dto) {
        userService.resetForgottenPassword(dto.getPassword(), token);
        return ResponseEntity.ok("Password has been changed.");
    }

    @PostMapping("/resendConfirmationEmail")
    public ResponseEntity resendConfirmationEmail(@RequestBody ForgotPasswordOrResendConfirmationEmailDto dto) {
        userService.resendConfirmationEmail(dto);
        return ResponseEntity.ok("Confirmation email was sent.");
    }

}