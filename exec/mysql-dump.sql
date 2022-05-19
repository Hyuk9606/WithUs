-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema withus
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema withus
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `withus` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `withus` ;

-- -----------------------------------------------------
-- Table `withus`.`avatar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `withus`.`avatar` (
  `avatar_seq` INT NOT NULL AUTO_INCREMENT,
  `settings` MEDIUMTEXT NULL DEFAULT NULL,
  `user_id` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`avatar_seq`),
  UNIQUE INDEX `UK_n6rcv8e9ik29v4v9m62o3rmup` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `withus`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `withus`.`user` (
  `user_seq` BIGINT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NULL DEFAULT NULL,
  `email` VARCHAR(512) NULL DEFAULT NULL,
  `email_verified_yn` VARCHAR(1) NULL DEFAULT NULL,
  `modified_at` DATETIME(6) NULL DEFAULT NULL,
  `password` VARCHAR(128) NULL DEFAULT NULL,
  `profile_image_url` VARCHAR(512) NULL DEFAULT NULL,
  `provider_type` VARCHAR(20) NULL DEFAULT NULL,
  `role_type` VARCHAR(20) NULL DEFAULT NULL,
  `user_id` VARCHAR(64) NULL DEFAULT NULL,
  `username` VARCHAR(100) NULL DEFAULT NULL,
  `avatar_avatar_seq` INT NOT NULL,
  PRIMARY KEY (`user_seq`),
  UNIQUE INDEX `UK_ob8kqyqqgmefl0aco34akdtpe` (`email` ASC) VISIBLE,
  UNIQUE INDEX `UK_a3imlf41l37utmxiquukk8ajc` (`user_id` ASC) VISIBLE,
  INDEX `fk_user_avatar1_idx` (`avatar_avatar_seq` ASC) VISIBLE,
  CONSTRAINT `fk_user_avatar1`
    FOREIGN KEY (`avatar_avatar_seq`)
    REFERENCES `withus`.`avatar` (`avatar_seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `withus`.`user_refresh_token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `withus`.`user_refresh_token` (
  `refresh_token_seq` BIGINT NOT NULL AUTO_INCREMENT,
  `refresh_token` VARCHAR(256) NULL DEFAULT NULL,
  `user_id` VARCHAR(64) NULL DEFAULT NULL,
  `user_user_seq` BIGINT NOT NULL,
  PRIMARY KEY (`refresh_token_seq`),
  UNIQUE INDEX `UK_qca3mjxv5a1egwmn4wnbplfkt` (`user_id` ASC) VISIBLE,
  INDEX `fk_user_refresh_token_user_idx` (`user_user_seq` ASC) VISIBLE,
  CONSTRAINT `fk_user_refresh_token_user`
    FOREIGN KEY (`user_user_seq`)
    REFERENCES `withus`.`user` (`user_seq`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
