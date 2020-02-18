package com.sobczyk.food_management.security;

import com.sobczyk.food_management.entities.UserEntity;
import com.sobczyk.food_management.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JsonWebTokenAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JsonWebTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse resp, FilterChain filterChain)
            throws
            ServletException, IOException {
        try {
            String token = getJwtFromRequest(req);

            if (StringUtils.hasText(token) && tokenProvider.validateToken(token)) {
                String login = tokenProvider.getUserLoginFromJWT(token);

                UserEntity user = userService.findByLogin(login);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user,
                                                                                                             login,
                                                                                                             UserPrincipal
                                                                                                                     .create(userService
                                                                                                                                     .findByLogin(
                                                                                                                                             login))
                                                                                                                     .getAuthorities()
                );
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception exception) {
            logger.error("Could not set user authentication in security context", exception);
        }

        filterChain.doFilter(req, resp);
    }

    private String getJwtFromRequest(HttpServletRequest req) {
        String token = req.getHeader("Authorization");
        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            return token.substring(7);
        }
        return null;
    }
}