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
  `roles_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `roles_id`),
  INDEX `fk_users_roles1_idx` (`roles_id` ASC),
  CONSTRAINT `fk_users_roles1`
    FOREIGN KEY (`roles_id`)
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
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `vouchers_id` INT(11) NOT NULL,
  `users_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `vouchers_id`, `users_id`),
  INDEX `fk_discounts_vouchers1_idx` (`vouchers_id` ASC),
  INDEX `fk_discounts_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_discounts_vouchers1`
    FOREIGN KEY (`vouchers_id`)
    REFERENCES `tech_bakers_db`.`vouchers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_discounts_users1`
    FOREIGN KEY (`users_id`)
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
  `categories_id` INT(11) NOT NULL,
  `types_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `categories_id`, `types_id`),
  INDEX `fk_products_categories1_idx` (`categories_id` ASC),
  INDEX `fk_products_types1_idx` (`types_id` ASC),
  CONSTRAINT `fk_products_categories1`
    FOREIGN KEY (`categories_id`)
    REFERENCES `tech_bakers_db`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_types1`
    FOREIGN KEY (`types_id`)
    REFERENCES `tech_bakers_db`.`types` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tech_bakers_db`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tech_bakers_db`.`images` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `products_id` INT(11) NOT NULL,
  `products_types_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `products_id`, `products_types_id`),
  INDEX `fk_images_products1_idx` (`products_id` ASC, `products_types_id` ASC),
  CONSTRAINT `fk_images_products1`
    FOREIGN KEY (`products_id` , `products_types_id`)
    REFERENCES `tech_bakers_db`.`products` (`id` , `types_id`)
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
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  `users_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `users_id`),
  INDEX `fk_photos_users_idx` (`users_id` ASC),
  CONSTRAINT `fk_photos_users`
    FOREIGN KEY (`users_id`)
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
  `payments_id` INT(11) NOT NULL,
  `users_id` INT(11) NOT NULL,
  `products_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`, `payments_id`, `users_id`, `products_id`),
  INDEX `fk_sales_payments1_idx` (`payments_id` ASC),
  INDEX `fk_sales_users1_idx` (`users_id` ASC),
  INDEX `fk_sales_products1_idx` (`products_id` ASC),
  CONSTRAINT `fk_sales_payments1`
    FOREIGN KEY (`payments_id`)
    REFERENCES `tech_bakers_db`.`payments` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `tech_bakers_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sales_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `tech_bakers_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
