package com.safetrabel.safetrabel_api.payload;

import org.hibernate.annotations.Any;

import com.safetrabel.safetrabel_api.model.entity.User.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterAdminRequest {

    String username;
    String password;
    String name;
    Role role;

}
