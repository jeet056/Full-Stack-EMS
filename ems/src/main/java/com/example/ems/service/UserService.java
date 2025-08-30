package com.example.ems.service;

import com.example.ems.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

//Custom OAuth2 User Service
@Service
public class UserService extends DefaultOAuth2UserService {

    @SuppressWarnings("null")
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        String email = oAuth2User.getAttribute("email");
        // Assign role based on email (example logic)
        String role = email.endsWith("@admin.com") ? "ADMIN" : "USER";
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));
        return new User(oAuth2User, authorities);
    }
}