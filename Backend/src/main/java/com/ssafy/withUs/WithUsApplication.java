package com.ssafy.withUs;

import com.ssafy.withUs.config.properties.AppProperties;
import com.ssafy.withUs.config.properties.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
        CorsProperties.class,
        AppProperties.class
})
public class WithUsApplication {

    public static void main(String[] args) {
        SpringApplication.run(WithUsApplication.class, args);
    }

}
