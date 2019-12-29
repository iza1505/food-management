package com.food_management.security;

import com.food_management.exceptions.LoginValidatorException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(propagation = Propagation.MANDATORY)
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class LoginValidator {

    private static final Integer length_min = 8;
    private static final Integer length_max = 32;

    public void checkBasicConditions(String login) {
        if (login.length() < length_min ||
                login.length() > length_max ||
                !checkLetters(login) ||
                checkSpacesColonsQuotationMarks(login)
        ) {
            throw new LoginValidatorException("Login does not meet the basic conditions.");
        }
    }

    private boolean checkLetters(String login) {
        return login.chars().anyMatch(loginChar -> Character.isLetter(loginChar));
    }

    private boolean checkSpacesColonsQuotationMarks(String login) {
        return login.chars()
                .anyMatch(loginChar -> Character.isSpaceChar(loginChar) || (loginChar == ':') || (loginChar == '"'));
    }
}
