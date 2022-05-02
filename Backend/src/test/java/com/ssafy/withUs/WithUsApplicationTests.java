package com.ssafy.withUs;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
@ActiveProfiles("dev")
class WithUsApplicationTests {

    @Autowired
    AvatarRepository avatarRepository;
    
    @Test
    public void avatarTest(){
        
    
        System.out.println(avatarRepository.findByUserId("abcde"));
    }

}
