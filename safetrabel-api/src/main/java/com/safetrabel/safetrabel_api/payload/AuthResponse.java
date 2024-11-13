package com.safetrabel.safetrabel_api.payload;
import com.safetrabel.safetrabel_api.model.dto.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    UserDTO result;
    String token;

}
