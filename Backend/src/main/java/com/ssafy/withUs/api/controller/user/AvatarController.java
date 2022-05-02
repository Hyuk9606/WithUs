package com.ssafy.withUs.api.controller.user;

import com.ssafy.withUs.api.entity.Avatar;
import com.ssafy.withUs.api.service.AvatarService;
import com.ssafy.withUs.common.ApiResponse;
import com.ssafy.withUs.oauth.annotation.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/avatar")
@RequiredArgsConstructor
public class AvatarController {
    
    private final AvatarService avatarService;
    
    @GetMapping
    public ApiResponse getAvatar(@CurrentUser String userId) {
        Avatar avatar = avatarService.getAvatar(userId);
        return ApiResponse.success("avatar", avatar);
    }
    
    @PostMapping
    public ApiResponse saveAvatar(@CurrentUser String userId, @RequestBody String settings) {
        Avatar avatar = avatarService.saveAvatar(userId, settings);
        return ApiResponse.success("avatar", avatar);
    }
}
