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

COMMIT;