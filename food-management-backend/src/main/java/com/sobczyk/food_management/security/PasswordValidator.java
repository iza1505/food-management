package com.sobczyk.food_management.security;

import com.sobczyk.food_management.exceptions.PasswordValidatorException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(propagation = Propagation.MANDATORY)
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class PasswordValidator {

    private static final Integer length_min = 8;
    private static final Integer length_max = 64;
    private static final boolean number = true;
    private static final boolean uppercase = true;
    private static final boolean lowercase = true;

    public void checkBasicConditions(String password) {
        if (password.length() < length_min ||
                password.length() > length_max ||
                (uppercase && !checkUppercase(password)) ||
                (lowercase && !checkLowercase(password) ||
                        (number && !checkNumber(password))
                )) {
            throw new PasswordValidatorException("Password does not meet the basic conditions.");
        }
    }

    private boolean checkUppercase(String password) {
        return password.chars()
                .anyMatch(passwordChar -> Character.isLetter(passwordChar) && Character.isUpperCase(passwordChar));
    }

    private boolean checkLowercase(String password) {
        return password.chars()
                .anyMatch(passwordChar -> Character.isLetter(passwordChar) && Character.isLowerCase(passwordChar));
    }

    private boolean checkNumber(String password) {
        return password.chars().anyMatch(passwordChar -> Character.isDigit(passwordChar));
    }

}
