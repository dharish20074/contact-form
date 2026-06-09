package com.example.contact_form;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * ContactController
 * 
 * Handles all contact form submissions from the frontend.
 * Receives POST requests with form data and processes them.
 * 
 * Endpoint: POST /contact
 */
@RestController
@CrossOrigin(origins = "http://localhost:8080")
public class ContactController {
    
    /**
     * Handle contact form submission
     * 
     * @param contactRequest - Contains name, email, and message
     * @return Response with success message
     */
    @PostMapping("/contact")
    public ApiResponse handleContactForm(@RequestBody ContactRequest contactRequest) {
        
        // Validate the incoming data
        if (isValidRequest(contactRequest)) {
            // Log to console
            logContactSubmission(contactRequest);
            
            // Return success response
            return new ApiResponse(
                true,
                "Your message has been received successfully! We'll get back to you soon.",
                200
            );
        } else {
            // Return validation error
            return new ApiResponse(
                false,
                "Invalid request. Please ensure all fields are filled correctly.",
                400
            );
        }
    }
    
    /**
     * Validate the contact request
     * 
     * @param request - The contact request to validate
     * @return true if valid, false otherwise
     */
    private boolean isValidRequest(ContactRequest request) {
        if (request == null) {
            return false;
        }
        
        String name = request.getName();
        String email = request.getEmail();
        String message = request.getMessage();
        
        // Check if fields are not null or empty
        if (name == null || name.trim().isEmpty()) {
            return false;
        }
        
        if (email == null || email.trim().isEmpty()) {
            return false;
        }
        
        if (message == null || message.trim().isEmpty()) {
            return false;
        }
        
        // Validate email format
        if (!isValidEmail(email)) {
            return false;
        }
        
        // Validate field lengths
        if (name.length() > 100 || message.length() > 5000) {
            return false;
        }
        
        return true;
    }
    
    /**
     * Validate email format using regex
     * 
     * @param email - Email to validate
     * @return true if email is valid, false otherwise
     */
    private boolean isValidEmail(String email) {
        String emailRegex = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
        return email.matches(emailRegex);
    }
    
    /**
     * Log the contact submission to console
     * 
     * @param request - The contact request to log
     */
    private void logContactSubmission(ContactRequest request) {
        System.out.println("\n" + "=".repeat(60));
        System.out.println("NEW CONTACT FORM SUBMISSION");
        System.out.println("=".repeat(60));
        System.out.println("📝 Name      : " + request.getName());
        System.out.println("✉️  Email     : " + request.getEmail());
        System.out.println("💬 Message   : " + request.getMessage());
        System.out.println("⏰ Timestamp  : " + getCurrentTimestamp());
        System.out.println("=".repeat(60) + "\n");
    }
    
    /**
     * Get current timestamp in readable format
     * 
     * @return Formatted timestamp string
     */
    private String getCurrentTimestamp() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return now.format(formatter);
    }
    
    /**
     * Health check endpoint (optional)
     * Can be used to verify the server is running
     */
    @GetMapping("/health")
    public ApiResponse healthCheck() {
        return new ApiResponse(
            true,
            "Server is running and ready to receive contact form submissions!",
            200
        );
    }
}

/**
 * ContactRequest
 * 
 * Data Transfer Object (DTO) for contact form data
 * Represents the structure of incoming JSON data
 */
class ContactRequest {
    private String name;
    private String email;
    private String message;
    
    // Constructors
    public ContactRequest() {
    }
    
    public ContactRequest(String name, String email, String message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }
    
    // Getters
    public String getName() {
        return name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public String getMessage() {
        return message;
    }
    
    // Setters
    public void setName(String name) {
        this.name = name;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    // toString method for logging
    @Override
    public String toString() {
        return "ContactRequest{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}

/**
 * ApiResponse
 * 
 * Standard response format for all API endpoints
 * Ensures consistent response structure across the application
 */
class ApiResponse {
    private boolean success;
    private String message;
    private int statusCode;
    private long timestamp;
    
    // Constructors
    public ApiResponse() {
        this.timestamp = System.currentTimeMillis();
    }
    
    public ApiResponse(boolean success, String message, int statusCode) {
        this();
        this.success = success;
        this.message = message;
        this.statusCode = statusCode;
    }
    
    // Getters
    public boolean isSuccess() {
        return success;
    }
    
    public String getMessage() {
        return message;
    }
    
    public int getStatusCode() {
        return statusCode;
    }
    
    public long getTimestamp() {
        return timestamp;
    }
    
    // Setters
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
    
    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
    
    // toString method for logging
    @Override
    public String toString() {
        return "ApiResponse{" +
                "success=" + success +
                ", message='" + message + '\'' +
                ", statusCode=" + statusCode +
                ", timestamp=" + timestamp +
                '}';
    }
}
