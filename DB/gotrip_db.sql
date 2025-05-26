CREATE DATABASE gotrip_db;

USE gotrip_db;

DROP TABLE IF EXISTS `Friendship`;
DROP TABLE IF EXISTS `Messages`;
DROP TABLE IF EXISTS `Reactions`;
DROP TABLE IF EXISTS `Posts`;
DROP TABLE IF EXISTS `TypeOfReactions`;
DROP TABLE IF EXISTS `Users`;

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

CREATE TABLE amistades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id1 INT NOT NULL,
    usuario_id2 INT NOT NULL
);

ALTER TABLE `Users` AUTO_INCREMENT=6;
ALTER TABLE `Posts` AUTO_INCREMENT=6;