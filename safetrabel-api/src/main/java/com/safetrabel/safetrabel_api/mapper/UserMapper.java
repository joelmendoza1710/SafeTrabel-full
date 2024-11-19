package com.safetrabel.safetrabel_api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.safetrabel.safetrabel_api.model.dto.UserDTO;
import com.safetrabel.safetrabel_api.model.entity.User.User;


@Mapper(componentModel = "spring") 
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO toUserDTO(User user);

    
    User toUser(UserDTO userDTO);

}
