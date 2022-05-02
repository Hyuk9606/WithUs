package com.ssafy.withUs.api.repository.user;

import com.ssafy.withUs.api.entity.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvatarRepository extends JpaRepository<Avatar, Integer> {
    Avatar findByUserId(String userId);
}
