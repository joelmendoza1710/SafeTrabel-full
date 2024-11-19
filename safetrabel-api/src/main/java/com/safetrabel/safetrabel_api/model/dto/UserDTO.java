package com.safetrabel.safetrabel_api.model.dto;

import java.time.ZonedDateTime;
import com.safetrabel.safetrabel_api.model.entity.User.Role;

import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private String name;
    private Role role;
    private ZonedDateTime createdAt;


    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Role getRole() {
        return role;
    }
    public void setRole(Role role) {
        this.role = role;
    }
    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }

}
