INSERT INTO users(id, name, email, password)
VALUES (1, 'Jibola Johnson', 'jj@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'), 
(2, 'Martha Ray', 'martha_ray@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(3, 'Robert Elliot', 'robert.e@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
(4, 'Ian Bond', 'ian007@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Port out', 'description', 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1475938/pexels-photo-1475938.jpeg',  930.61, 6, 4, 8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', 28142, true),
(2, 'Fun glad', 'description', 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg',  920.61, 7, 5, 7, 'Canada', '169 Nuwug Circle', 'Vutgapha', 'Newfoundland And Labrador', 00159, true),
(3, 'Shine twenty', 'description', 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2076739/pexels-photo-2076739.jpeg',  900.23, 10, 7, 9, 'Canada', '340 Dokto Park', 'Upfufa', 'Nova Scotia', 29045, true),
(4, 'Game fill', 'description', 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1756826/pexels-photo-1756826.jpeg',  800.10, 9, 6, 10, 'Canada', '102 Sierra Court', 'Richmond', 'Alberta', 10010, true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2022-01-01', '2022-01-14', 2, 3),
('2022-02-02', '2022-02-15', 1, 4),
('2022-03-03', '2022-03-16', 1, 2),
('2022-04-04', '2022-04-25', 3, 4);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 3, 4, 5, 'messages'),
(1, 2, 3, 5, 'messages'),
(4, 1, 2, 4, 'messages'),
(1, 1, 1, 5, 'messages')