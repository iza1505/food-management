package com.food_management.controllers;

import com.food_management.dtos.ForgotPasswordDto;
import com.food_management.dtos.NewPasswordDto;
import com.food_management.security.EmailProvider;
import com.food_management.security.JwtAuthenticationResponse;
import com.food_management.security.JwtTokenProvider;
import com.food_management.security.LoginRequest;
import com.food_management.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider tokenProvider;
    private final EmailProvider emailProvider;
    private AuthenticationManager authenticationManager;

    @Autowired
    public AuthController(@Lazy UserService userService, JwtTokenProvider tokenProvider, AuthenticationManager authenticationManager, EmailProvider emailProvider) {
        this.userService = userService;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
        this.emailProvider=emailProvider;
    }


    @PostMapping("/login")
    public ResponseEntity authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = userService.authenticate(loginRequest.getLogin(), loginRequest.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        JwtAuthenticationResponse response = new JwtAuthenticationResponse();
        response.setAccessToken(jwt);
        System.out.println(tokenProvider.getUserLoginFromJWT(jwt));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgotPassword")
    public ResponseEntity forgotPassword(@RequestBody ForgotPasswordDto dto) {
        userService.forgotPassword(dto.getEmail());
        return ResponseEntity.ok().build();// TODO: info ze wyslana wiadomosc
    }

    @RequestMapping(value ="/forgotPassword", method = RequestMethod.POST, params = {"token"})
    public ResponseEntity resetPassword(@RequestParam(value = "token") String token, @RequestBody NewPasswordDto dto) {
        userService.resetPassword(dto.getPassword(), token);
        return ResponseEntity.ok().build();// TODO: info ze wyslana wiadomosc
    }

    //TODO: nie todo ale info ze zeby odkodowac haslo potrzebuje passwordencoder.matches(haslo, zakodowane haslo) i spr czy to to samo
    //TODO mapping z tokenem na ktory przychodzi token (user, hash hasha) i haslo nowe: String url = applicationPath + "/forgotPassword?token=" + token;
}//todo: biore maila i zahashowane haslo z tokenu. porownuje biore uzytkownika z tym mailem, jego zahash haslo, robie matches, jak sa takie same to wtedy hashuje haslo to nowe i podmieniam i zapisuje encje
