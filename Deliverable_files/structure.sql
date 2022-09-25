-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema tech_bakers_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tech_bakers_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tech_bakers_db` DEFAULT CHARACTER SET utf8 ;
USE `tech_bakers_db` ;

-- -----------------------------------------------------
-- Table `tech_bakers_db`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tech_bakers_db`.`categories` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tech_bakers_db`.`vouchers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tech_bakers_db`.`vouchers` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tech_bakers_db`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tech_bakers_db`.`roles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tech_bakers_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tech_bakers_db`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(255) NULL DEFAULT NULL,
  `lastname` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `phonenumber` INT(11) NULL DEFAULT NULL,
  `address` VARCHAR(255) NULL DEFAULT NULL,
  `city` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NULL DEFAULT NULL,
  `terms` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `roleId` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `roleId`),
  INDEX `fk_users_roles_idx` (`roleId` ASC) ,
  CONSTRAINT `fk_users_roles`
    FOREIGN KEY (`roleId`)
    REFERENCES `tech_bakers_db`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tech_bakers_db`.`discounts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tech_bakers_db`.`discounts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `userId` INT(11) NULL DEFAULT NULL,
  `voucherId` INT(11) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `voucherId` INT(11) NOT NULL,
  `userId` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `voucherId`, `userId`),
  INDEX `fk_discounts_vouchers1_idx` (`voucherId` ASC) ,
  INDEX `fk_discounts_users1_idx` (`userId` ASC) ,
  CONSTRAINT `fk_discounts_vouchers1`
    FOREIGN KEY (`voucherId`)
    REFERENCES `tech_bakers_db`.`vouchers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_discounts_users1`
    FOREIGN KEY (`userId`)
    REFERENCES `tech_bakers_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tech_bakers_db`.`types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tech_bakers_db`.`types` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tech_bakers_db`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tech_bakers_db`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `price` DECIMAL(10,0) NULL DEFAULT NULL,
  `discount` DECIMAL(10,0) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `stock` INT(11) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `typeId` INT(11) NOT NULL,
  `categoryId` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `typeId`, `categoryId`),
  INDEX `fk_products_types1_idx` (`typeId` ASC) ,
  INDEX `fk_products_categories1_idx` (`categoryId` ASC) ,
  CONSTRAINT `fk_products_types1`
    FOREIGN KEY (`typeId`)
    REFERENCES `tech_bakers_db`.`types` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`categoryId`)
    REFERENCES `tech_bakers_db`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tech_bakers_db`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tech_bakers_db`.`images` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `fileName` VARCHAR(255) NULL DEFAULT NULL,
  `productId` INT(11) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `productId` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `productId`),
  INDEX `fk_images_products1_idx` (`productId` ASC) ,
  CONSTRAINT `fk_images_products1`
    FOREIGN KEY (`productId`)
    REFERENCES `tech_bakers_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tech_bakers_db`.`payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tech_bakers_db`.`payments` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tech_bakers_db`.`photos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tech_bakers_db`.`photos` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `fileName` VARCHAR(255) NULL DEFAULT NULL,
  `userId` INT(11) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `userId` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `userId`),
  INDEX `fk_photos_users1_idx` (`userId` ASC) ,
  CONSTRAINT `fk_photos_users1`
    FOREIGN KEY (`userId`)
    REFERENCES `tech_bakers_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tech_bakers_db`.`sales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tech_bakers_db`.`sales` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `ticket_number` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `paymentId` INT(11) NOT NULL,
  `userId` INT(11) NOT NULL,
  `productId` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `paymentId`, `userId`, `productId`),
  INDEX `fk_sales_payments1_idx` (`paymentId` ASC) ,
  INDEX `fk_sales_users1_idx` (`userId` ASC) ,
  INDEX `fk_sales_products1_idx` (`productId` ASC) ,
  CONSTRAINT `fk_sales_payments1`
    FOREIGN KEY (`paymentId`)
    REFERENCES `tech_bakers_db`.`payments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_users1`
    FOREIGN KEY (`userId`)
    REFERENCES `tech_bakers_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_products1`
    FOREIGN KEY (`productId`)
    REFERENCES `tech_bakers_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
