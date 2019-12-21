package com.food_management.controllers;

import com.food_management.dtos.ForgotPasswordDto;
import com.food_management.dtos.NewPasswordDto;
import com.food_management.dtos.RegistrationDto;
import com.food_management.entities.UserEntity;
import com.food_management.exceptions.InactiveAccountException;
import com.food_management.security.*;
import com.food_management.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider tokenProvider;
    private UserSessionService userSessionService;
    private final EmailProvider emailProvider;
    private AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(@Lazy UserService userService, JwtTokenProvider tokenProvider, UserSessionService userSessionService, AuthenticationManager authenticationManager, EmailProvider emailProvider) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.userSessionService = userSessionService;
        this.authenticationManager = authenticationManager;
        this.emailProvider=emailProvider;
    }

    @PostMapping("/registration")
    public ResponseEntity registration(@RequestBody RegistrationDto registrationDto){
        userService.add(registrationDto);
        return ResponseEntity.ok().build();// TODO: info ze wyslano maila
    }

    @RequestMapping(value ="/registration", method = RequestMethod.POST, params = {"token"})
    public ResponseEntity registration(@RequestParam(value = "token") String token) throws Exception {
        userService.confirmAccount(token);
        return ResponseEntity.ok().build();// TODO: info ze wyslano maila
    }

    @PostMapping("/login")
    public ResponseEntity authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        UserEntity userEntity = userService.findByLogin(loginRequest.getLogin());
        if(userEntity != null){
            if(userEntity.getActive()){
                Authentication authentication = userService.authenticate(loginRequest.getLogin(), loginRequest.getPassword());
                SecurityContextHolder.getContext().setAuthentication(authentication);
                String jwt = tokenProvider.generateToken(authentication);
                JwtAuthenticationResponse response = new JwtAuthenticationResponse();
                response.setAccessToken(jwt);
                return ResponseEntity.ok(response);
            }
            else {
                throw new InactiveAccountException("Inactive account");
            }
        }
        else {
            throw new EntityNotFoundException("User with login: " + loginRequest.getLogin() + " not found");
        }

    }

    @PostMapping("/forgotPassword")
    public ResponseEntity forgotPassword(@RequestBody ForgotPasswordDto dto) {
        userService.forgotPassword(dto);
        return ResponseEntity.ok().build();// TODO: info ze wyslana wiadomosc
    }

    @RequestMapping(value ="/forgotPassword", method = RequestMethod.POST, params = {"token"})
    public ResponseEntity resetForgottenPassword(@RequestParam(value = "token") String token, @RequestBody NewPasswordDto dto) {
        userService.resetForgottenPassword(dto.getPassword(), token);
        return ResponseEntity.ok().build();// TODO: info ze wyslana wiadomosc
    }

}