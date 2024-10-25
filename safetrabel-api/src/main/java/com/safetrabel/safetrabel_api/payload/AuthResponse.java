package com.safetrabel.safetrabel_api.payload;
import com.safetrabel.safetrabel_api.model.entity.User.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    User result;
    String token;

}
