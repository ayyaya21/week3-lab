CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`firstname` text NOT NULL,
	`lastname` text NOT NULL,
	`std_id` text NOT NULL,
	`dob` text NOT NULL,
	`sex` text NOT NULL
);
