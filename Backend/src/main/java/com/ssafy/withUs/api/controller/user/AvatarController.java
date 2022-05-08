package com.ssafy.withUs.api.controller.user;

import com.ssafy.withUs.api.entity.Avatar;
import com.ssafy.withUs.api.service.AvatarService;
import com.ssafy.withUs.common.ApiResponse;
import com.ssafy.withUs.oauth.annotation.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/avatar")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('ROLE_USER')")
public class AvatarController {
    
    private final AvatarService avatarService;
    
    @GetMapping("/{userId}")
    public ApiResponse getAvatar(@PathVariable String userId) {
        Avatar avatar = avatarService.getAvatar(userId);
        if(avatar == null) return ApiResponse.success("avatar","null");
        String result = userId+"&"+avatar.getSettings();
        return ApiResponse.success("avatar", result);
    }
    
    @PostMapping
    public ApiResponse saveAvatar(@CurrentUser String userId, @RequestBody String settings) {
        Avatar avatar = avatarService.saveAvatar(userId, settings);
        return ApiResponse.success("avatar", avatar);
    }
}
