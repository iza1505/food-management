package com.sobczyk.food_management.controllers;

import com.sobczyk.food_management.dtos.ForgotPasswordOrResendConfirmationEmailDto;
import com.sobczyk.food_management.dtos.NewPasswordDto;
import com.sobczyk.food_management.dtos.RegistrationDto;
import com.sobczyk.food_management.entities.UserEntity;
import com.sobczyk.food_management.exceptions.InactiveAccountException;
import com.sobczyk.food_management.exceptions.configuration.FMEntityNotFoundException;
import com.sobczyk.food_management.security.*;
import com.sobczyk.food_management.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity registration(@RequestParam(value = "token") String token) {
        userService.confirmAccount(token);
        return ResponseEntity.ok("Account has been confirmed.");
    }

    @PostMapping("/login")
    public ResponseEntity authenticateUser(@Valid @RequestBody LoginRequest loginReq) {
        UserEntity userEntity = userService.findByLogin(loginReq.getLogin());
        if (userEntity != null) {
            if (userEntity.getActive()) {
                Authentication authenticationToSystem =
                        userService.authenticate(loginReq.getLogin(), loginReq.getPassword());
                SecurityContextHolder.getContext().setAuthentication(authenticationToSystem);
                String loginJWT = tokenProvider.generateToken(authenticationToSystem);
                JwtAuthenticationResponse loginResponse = new JwtAuthenticationResponse();
                loginResponse.setAccessToken(loginJWT);
                return ResponseEntity.ok(loginResponse);
            } else {
                throw new InactiveAccountException("Inactive account","Konto niekatywne.");
            }
        } else {
            throw new FMEntityNotFoundException("User with login: " + loginReq.getLogin() + " not found","U" +
                    "żytkownik z podanym loginem nie istnieje.");
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