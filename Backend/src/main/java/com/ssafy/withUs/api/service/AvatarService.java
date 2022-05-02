package com.ssafy.withUs.api.service;

import com.ssafy.withUs.api.entity.Avatar;
import com.ssafy.withUs.api.repository.AvatarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AvatarService {
    
    private final AvatarRepository avatarRepository;
    
    public Avatar saveAvatar(String userId, String settings){
        Avatar userAvatar = avatarRepository.findByUserId(userId);
        if(userAvatar == null){
            userAvatar = Avatar.builder()
                    .userId(userId)
                    .settings(settings)
                    .build();
        }else{
            userAvatar.setSettings(settings);
        }
        return avatarRepository.save(userAvatar);
    }
    
    public Avatar getAvatar(String userId){
        return avatarRepository.findByUserId(userId);
    }
}
