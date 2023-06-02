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
   best_score INTEGER default NULL
);

-- test admin user id
INSERT INTO users (id, role_id, best_score) VALUES (1234, 1, null);

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

