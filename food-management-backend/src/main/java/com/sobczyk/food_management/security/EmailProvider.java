package com.sobczyk.food_management.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailProvider {
    private final JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String mail;
    @Value("${custom.frontend.path}")
    private String applicationPath;

    @Autowired
    public EmailProvider(
            JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String token, String userEmail, String address, String title,
                          String message) {
        String url;
        if(token.equals("") && address.equals("")){
            url = "";
        } else {
            url = applicationPath + address + token;
        }
        mailSender.send(emailConstructor(title, message + " \r\n " + url, userEmail));
    }

    private SimpleMailMessage emailConstructor(String title, String emailBody, String userEmail) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setSubject(title);
        email.setText(emailBody);
        email.setTo(userEmail);
        email.setFrom(mail);
        return email;
    }

}
