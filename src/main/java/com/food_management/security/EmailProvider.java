package com.food_management.security;


import com.food_management.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailProvider {
    @Value("${support.mail}")
    private String mail;

    @Value("${custom.frontend.path}")
    private String applicationPath;


    private final UserService userService;


    private final JavaMailSender mailSender;

    @Autowired
    public EmailProvider(@Lazy UserService userService, JavaMailSender mailSender)
    {
        this.userService = userService;
        this.mailSender = mailSender;
    }

    public SimpleMailMessage constructResetPasswordEmail(String token, String userEmail, String address) {
        String url = applicationPath + address + token;
        String message = "Reset your password using link:";
        return emailConstructor("Reset Password", message + " \r\n " + url, userEmail);
    }

    public SimpleMailMessage emailConstructor (String title, String emailBody, String userEmail) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setSubject(title);
        email.setText(emailBody);
        email.setTo(userEmail);
        email.setFrom(mail);
        return email;
    }

    public void sendEmail(SimpleMailMessage emailToSend){
        mailSender.send(emailToSend);
    }
}
