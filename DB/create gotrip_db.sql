CREATE DATABASE gotrip_db;
USE gotrip_db;

# Remove tables
DROP TABLE IF EXISTS `Follows`;
DROP TABLE IF EXISTS `Posts`;
DROP TABLE IF EXISTS `Users`;

# Creating tables #

-- Users
CREATE TABLE `Users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `bio` varchar(255),
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_username_unique` (`username`),
  KEY `users_avatar_index` (`avatar`),
  KEY `users_bio_index` (`bio`),
  KEY `users_password_index` (`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Posts
CREATE TABLE `Posts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user-id` bigint NOT NULL,
  `img` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `latitude` DOUBLE NOT NULL,
  `longitude` DOUBLE NOT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_description_index` (`description`),
  KEY `posts_img_index` (`img`),
  CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user-id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Follows
CREATE TABLE `Follows` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT NOT NULL,
    following_id INT NOT NULL
);

# Rreset ID AUTO_INCREMENT
ALTER TABLE `users` AUTO_INCREMENT=1;
ALTER TABLE `posts` AUTO_INCREMENT=1;
ALTER TABLE `follows` AUTO_INCREMENT=1;