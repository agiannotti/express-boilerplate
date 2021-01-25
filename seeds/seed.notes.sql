BEGIN;


INSERT INTO note (note_name, content, assigned_folder)
VALUES
('One', 'nintendo switch', 1),
('Two', 'cats in my lap', 2),
('Three', 'friends indeed', 3),
('Four', 'build an app', 4),
('Five', 'make it big', 1);

COMMIT;