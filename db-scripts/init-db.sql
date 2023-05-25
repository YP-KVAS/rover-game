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
    name VARCHAR(50) NOT NULL
);

INSERT INTO roles (name) VALUES ('admin'), ('regular');

CREATE TABLE users (
   id INTEGER PRIMARY KEY,
   role_id INTEGER NOT NULL
);

-- test admin user id
INSERT INTO users (id, role_id) VALUES (1234, 1);

