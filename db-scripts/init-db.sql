CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL default NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL default NOW(),
    topic_count INTEGER NOT NULL default 0
);

INSERT INTO categories (name) VALUES ('Предложения и идеи'), ('Секреты прохождения'), ('Ваши вопросы'), ('Off Topic');

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (name) VALUES ('admin'), ('regular');

CREATE TABLE users (
   id INTEGER PRIMARY KEY,
   role_id INTEGER NOT NULL REFERENCES roles (id),
   best_score INTEGER default NULL,
   "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL default NOW(),
   "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL default NOW()
);

-- test user data
-- INSERT INTO users (id, role_id, best_score) VALUES (871818, 1, 200);
-- INSERT INTO users (id, role_id, best_score) VALUES (628350, 1, 500);
-- INSERT INTO users (id, role_id, best_score) VALUES (750280, 1, 900);
-- INSERT INTO users (id, role_id, best_score) VALUES (330799, 1, 200);
-- INSERT INTO users (id, role_id, best_score) VALUES (618086, 1, 300);
-- INSERT INTO users (id, role_id, best_score) VALUES (616655, 1, 180);
-- INSERT INTO users (id, role_id, best_score) VALUES (560349, 1, 700);
-- INSERT INTO users (id, role_id, best_score) VALUES (712273, 1, 900);
-- INSERT INTO users (id, role_id, best_score) VALUES (70200, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (568033, 1, 50);
-- INSERT INTO users (id, role_id, best_score) VALUES (258743, 1, 55);
-- INSERT INTO users (id, role_id, best_score) VALUES (637592, 1, 77);
-- INSERT INTO users (id, role_id, best_score) VALUES (235041, 1, 77);
-- INSERT INTO users (id, role_id, best_score) VALUES (254984, 1, 900);
-- INSERT INTO users (id, role_id, best_score) VALUES (549747, 1, 33);
-- INSERT INTO users (id, role_id, best_score) VALUES (681902, 1, 55);
-- INSERT INTO users (id, role_id, best_score) VALUES (711515, 1, 99);
-- INSERT INTO users (id, role_id, best_score) VALUES (868046, 1, 888);
-- INSERT INTO users (id, role_id, best_score) VALUES (548842, 1, 55);
-- INSERT INTO users (id, role_id, best_score) VALUES (638103, 1, 1);
-- INSERT INTO users (id, role_id, best_score) VALUES (743281, 1, 8);
-- INSERT INTO users (id, role_id, best_score) VALUES (523423, 1, 7);
-- INSERT INTO users (id, role_id, best_score) VALUES (907404, 1, 7);
-- INSERT INTO users (id, role_id, best_score) VALUES (167269, 1, 7);
-- INSERT INTO users (id, role_id, best_score) VALUES (553464, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (553419, 1, 7);
-- INSERT INTO users (id, role_id, best_score) VALUES (553411, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (553429, 1, 88);
-- INSERT INTO users (id, role_id, best_score) VALUES (553475, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (553473, 1, 2);
-- INSERT INTO users (id, role_id, best_score) VALUES (551905, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (551903, 1, 5);
-- INSERT INTO users (id, role_id, best_score) VALUES (553458, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (551896, 1, 6);
-- INSERT INTO users (id, role_id, best_score) VALUES (553489, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (548683, 1, 15);
-- INSERT INTO users (id, role_id, best_score) VALUES (552066, 1, 4);
-- INSERT INTO users (id, role_id, best_score) VALUES (553492, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (551870, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (675541, 1, 44);
-- INSERT INTO users (id, role_id, best_score) VALUES (235902, 1, 4);
-- INSERT INTO users (id, role_id, best_score) VALUES (553497, 1, 7);
-- INSERT INTO users (id, role_id, best_score) VALUES (551867, 1, 77);
-- INSERT INTO users (id, role_id, best_score) VALUES (520577, 1, 99);
-- INSERT INTO users (id, role_id, best_score) VALUES (553502, 1, 3);
-- INSERT INTO users (id, role_id, best_score) VALUES (551829, 1, 18);
-- INSERT INTO users (id, role_id, best_score) VALUES (552876, 1, 7);
-- INSERT INTO users (id, role_id, best_score) VALUES (549010, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (553509, 1, 7);
-- INSERT INTO users (id, role_id, best_score) VALUES (553513, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (548993, 1, 6);
-- INSERT INTO users (id, role_id, best_score) VALUES (548981, 1, 12);
-- INSERT INTO users (id, role_id, best_score) VALUES (552852, 1, 20);
-- INSERT INTO users (id, role_id, best_score) VALUES (553520, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (547244, 1, 21);
-- INSERT INTO users (id, role_id, best_score) VALUES (548978, 1, 4);
-- INSERT INTO users (id, role_id, best_score) VALUES (553522, 1, 25);
-- INSERT INTO users (id, role_id, best_score) VALUES (553548, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (300938, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (548687, 1, 4);
-- INSERT INTO users (id, role_id, best_score) VALUES (926830, 1, 4);
-- INSERT INTO users (id, role_id, best_score) VALUES (723203, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (553524, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (548699, 1, 77);
-- INSERT INTO users (id, role_id, best_score) VALUES (553527, 1, 7);
-- INSERT INTO users (id, role_id, best_score) VALUES (548972, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (553530, 1, 7);
-- INSERT INTO users (id, role_id, best_score) VALUES (548968, 1, 7);
-- INSERT INTO users (id, role_id, best_score) VALUES (553533, 1, 100);
-- INSERT INTO users (id, role_id, best_score) VALUES (548964, 1, 9);

CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id),
    category_id INTEGER NOT NULL REFERENCES categories (id) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(120) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL default NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL default NOW()
);
CREATE INDEX topics_name ON topics (name);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users (id),
    topic_id INTEGER NOT NULL REFERENCES topics (id) ON DELETE CASCADE ON UPDATE CASCADE,
    parent_comment_id INTEGER,
    message TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL default NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL default NOW()
);

