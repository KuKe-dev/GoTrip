# Examples

-- Users with password=1234
INSERT INTO `Users` (`username`, `email`, `password`, `avatar`, `bio`, `created_at`) VALUES
('kuke', 'kuke@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MQRqQz4Z7aZPYj7dG6tKj7X7JQ8Y1qK', 'kuke.jpg', 'Viajero apasionado por los paisajes naturales', '2023-01-15'),
('juan', 'juan@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MQRqQz4Z7aZPYj7dG6tKj7X7JQ8Y1qK', 'juan.jpg', 'Fotógrafo de viajes profesional', '2023-02-20'),
('sofi', 'sofi@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMy.MQRqQz4Z7aZPYj7dG6tKj7X7JQ8Y1qK', 'sofi.jpg', 'Amante de la cultura y la gastronomía local', '2023-03-10');

-- Posts
/* Posts de kuke */
INSERT INTO `Posts` (`user-id`, `img`, `description`, `latitude`, `longitude`) VALUES
(1, 'kuke1.jpg', 'Disfrutando del atardecer en Bali', -8.409518, 115.188919),
(1, 'kuke2.jpg', 'Explorando los templos de Angkor Wat', 13.412469, 103.866986),
(1, 'kuke3.jpg', 'Aventura en la selva amazónica', -3.465305, -62.215923);

/* Posts de juan */
INSERT INTO `Posts` (`user-id`, `img`, `description`, `latitude`, `longitude`) VALUES
(2, 'juan1.jpg', 'Fotografiando las calles de París', 48.856613, 2.352222),
(2, 'juan2.jpg', 'Vistas desde el Monte Fuji', 35.360625, 138.727363),
(2, 'juan3.jpg', 'Colores de Marrakech', 31.629472, -7.981084);

/* Posts de sofi */
INSERT INTO `Posts` (`user-id`, `img`, `description`, `latitude`, `longitude`) VALUES
(3, 'sofi1.jpg', 'Degustando pasta en Roma', 41.902782, 12.496366),
(3, 'sofi2.jpg', 'Mercados flotantes de Tailandia', 13.736717, 100.523186),
(3, 'sofi3.jpg', 'Aprendiendo a hacer sushi en Tokio', 35.676422, 139.650027);

-- Friendships
INSERT INTO `amistades` (`usuario_id1`, `usuario_id2`) VALUES
(1, 2),  -- Kuke follows Juan
(1, 3),  -- Kuke follows Sofi
(2, 1),  -- Juan follows Kuke
(2, 3),  -- Juan follows Sofi
(3, 1),  -- Sofi follows Kuke
(3, 2);  -- Sofi follows Juan