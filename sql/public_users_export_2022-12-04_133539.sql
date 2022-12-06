CREATE TABLE public.users (
  id serial NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  name text NOT NULL,
  username text NOT NULL,
  password text NOT NULL
);

ALTER TABLE public.users ADD CONSTRAINT users_pkey PRIMARY KEY (id);insert into "public"."users" ("email", "id", "name", "password", "phone", "username") values ('matheus.henrique4245@gmail.com', 1, 'Matheus Henrique', 'admin', '14 991578451', 'admin');
