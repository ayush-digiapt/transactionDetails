-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema talkback
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema talkback
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `talkback` DEFAULT CHARACTER SET latin1 ;
USE `talkback` ;

-- -----------------------------------------------------
-- Table `talkback`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `talkback`.`admin` (
  `name` VARCHAR(32) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `talkback`.`admin_sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `talkback`.`admin_sessions` (
  `id` INT(4) NOT NULL AUTO_INCREMENT,
  `admin` VARCHAR(32) NOT NULL,
  `token` VARCHAR(32) NOT NULL,
  `token_expiry` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_admin_sessions_1_idx` (`admin` ASC),
  CONSTRAINT `fk_admin_sessions_1`
    FOREIGN KEY (`admin`)
    REFERENCES `talkback`.`admin` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 38
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `talkback`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `talkback`.`team` (
  `name` VARCHAR(32) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `number_of_people` INT(4) NOT NULL,
  `validity` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `license_key` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `talkback`.`team_sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `talkback`.`team_sessions` (
  `id` INT(4) NOT NULL AUTO_INCREMENT,
  `team` VARCHAR(32) NOT NULL,
  `token` VARCHAR(32) NOT NULL,
  `token_expiry` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_team_sessions_1_idx` (`team` ASC),
  CONSTRAINT `fk_team_sessions_1`
    FOREIGN KEY (`team`)
    REFERENCES `talkback`.`team` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 62
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema talkback
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema talkback
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `talkback` DEFAULT CHARACTER SET latin1 ;
USE `talkback` ;

-- -----------------------------------------------------
-- Table `talkback`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `talkback`.`admin` (
  `name` VARCHAR(32) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `talkback`.`admin_sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `talkback`.`admin_sessions` (
  `id` INT(4) NOT NULL AUTO_INCREMENT,
  `admin` VARCHAR(32) NOT NULL,
  `token` VARCHAR(32) NOT NULL,
  `token_expiry` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_admin_sessions_1_idx` (`admin` ASC),
  CONSTRAINT `fk_admin_sessions_1`
    FOREIGN KEY (`admin`)
    REFERENCES `talkback`.`admin` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 38
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `talkback`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `talkback`.`team` (
  `name` VARCHAR(32) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `number_of_people` INT(4) NOT NULL,
  `validity` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `license_key` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `talkback`.`team_sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `talkback`.`team_sessions` (
  `id` INT(4) NOT NULL AUTO_INCREMENT,
  `team` VARCHAR(32) NOT NULL,
  `token` VARCHAR(32) NOT NULL,
  `token_expiry` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_team_sessions_1_idx` (`team` ASC),
  CONSTRAINT `fk_team_sessions_1`
    FOREIGN KEY (`team`)
    REFERENCES `talkback`.`team` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 62
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema talkback
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema talkback
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `talkback` DEFAULT CHARACTER SET latin1 ;
USE `talkback` ;

-- -----------------------------------------------------
-- Table `talkback`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `talkback`.`admin` (
  `name` VARCHAR(32) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `talkback`.`admin_sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `talkback`.`admin_sessions` (
  `id` INT(4) NOT NULL AUTO_INCREMENT,
  `admin` VARCHAR(32) NOT NULL,
  `token` VARCHAR(32) NOT NULL,
  `token_expiry` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_admin_sessions_1_idx` (`admin` ASC),
  CONSTRAINT `fk_admin_sessions_1`
    FOREIGN KEY (`admin`)
    REFERENCES `talkback`.`admin` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 38
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `talkback`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `talkback`.`team` (
  `name` VARCHAR(32) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `number_of_people` INT(4) NOT NULL,
  `validity` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `license_key` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `talkback`.`team_sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `talkback`.`team_sessions` (
  `id` INT(4) NOT NULL AUTO_INCREMENT,
  `team` VARCHAR(32) NOT NULL,
  `token` VARCHAR(32) NOT NULL,
  `token_expiry` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_team_sessions_1_idx` (`team` ASC),
  CONSTRAINT `fk_team_sessions_1`
    FOREIGN KEY (`team`)
    REFERENCES `talkback`.`team` (`name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 62
DEFAULT CHARACTER SET = latin1;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

