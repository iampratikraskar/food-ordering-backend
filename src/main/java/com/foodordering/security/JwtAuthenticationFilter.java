package com.foodordering.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService) {

        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    // =====================================================
    // PUBLIC ENDPOINTS
    // =====================================================

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {

        String path = request.getServletPath();

        // ---------------------------------------------
        // Public authentication endpoints
        // ---------------------------------------------

        if (path.startsWith("/api/auth/")) {
            return true;
        }

        // ---------------------------------------------
        // Customer registration
        // ---------------------------------------------

        if (path.equals("/api/customers/register")) {
            return true;
        }

        // ---------------------------------------------
        // Public restaurant GET APIs
        // ---------------------------------------------

        if (request.getMethod().equals("GET")
                && (path.equals("/api/restaurants")
                || path.startsWith("/api/restaurants/"))) {

            return true;
        }

        // ---------------------------------------------
        // Public restaurant food GET APIs
        // ---------------------------------------------

        if (request.getMethod().equals("GET")
                && path.startsWith("/api/foods/restaurant/")) {

            return true;
        }

        // ---------------------------------------------
        // CORS preflight
        // ---------------------------------------------

        if (request.getMethod().equals("OPTIONS")) {
            return true;
        }

        return false;
    }

    // =====================================================
    // JWT FILTER
    // =====================================================

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader =
                request.getHeader("Authorization");

        // ---------------------------------------------
        // No JWT
        // ---------------------------------------------

        if (authHeader == null
                || !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        // ---------------------------------------------
        // Extract JWT
        // ---------------------------------------------

        String jwt = authHeader.substring(7);

        try {

            String email =
                    jwtService.extractUsername(jwt);

            // ---------------------------------------------
            // Authenticate user
            // ---------------------------------------------

            if (email != null
                    && SecurityContextHolder
                            .getContext()
                            .getAuthentication() == null) {

                UserDetails userDetails =
                        userDetailsService
                                .loadUserByUsername(email);

                // ---------------------------------------------
                // Validate JWT
                // ---------------------------------------------

                if (jwtService.isTokenValid(
                        jwt,
                        userDetails)) {

                    UsernamePasswordAuthenticationToken
                            authToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authToken);
                }
            }

        } catch (Exception e) {

            // Invalid JWT
            SecurityContextHolder
                    .clearContext();
        }

        // Continue request
        filterChain.doFilter(request, response);
    }
}