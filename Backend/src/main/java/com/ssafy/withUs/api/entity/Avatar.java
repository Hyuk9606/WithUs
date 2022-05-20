package com.ssafy.withUs.api.entity;

import com.ssafy.withUs.api.entity.user.User;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Avatar")
public class Avatar {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer avatarSeq;
    
    @Column(unique = true)
    private String userId;
    
    @Column(columnDefinition = "MEDIUMTEXT")
    private String settings;
    
}
