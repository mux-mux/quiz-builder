BEGIN TRANSACTION;

INSERT INTO quizzes (title) VALUES ('Cats related questions') RETURNING id;
INSERT INTO questions (quiz_id, name, type)
VALUES 
(1, 'How many cats do you have?', 'input'),
(1, 'Are they black or white?', 'boolean');

INSERT INTO quizzes (title) VALUES ('Dogs related questions') RETURNING id;
INSERT INTO questions (quiz_id, name, type)
VALUES 
(2, 'How many dogs do you have?', 'input'),
(2, 'Are they black or brown?', 'boolean'),
(2, 'What they like to do?', 'checkbox');

INSERT INTO quizzes (title) VALUES ('Birds related questions') RETURNING id;
INSERT INTO questions (quiz_id, name, type)
VALUES 
(3, 'How many birds do you have?', 'input'),
(3, 'Can they talk?', 'boolean'),
(3, 'What they like to do?', 'checkbox');

INSERT INTO quizzes (title) VALUES ('Fish related questions') RETURNING id;
INSERT INTO questions (quiz_id, name, type)
VALUES 
(4, 'How many fish do you have?', 'input'),
(4, 'Do they live in fresh water?', 'boolean'),
(4, 'What they like to do?', 'input');

INSERT INTO quizzes (title) VALUES ('Rabbits related questions') RETURNING id;
INSERT INTO questions (quiz_id, name, type)
VALUES 
(5, 'How many rabbits do you have?', 'input'),
(5, 'Are they white?', 'boolean'),
(5, 'What they like to do?', 'checkbox');

COMMIT;