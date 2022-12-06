CREATE TABLE public.categories (
  id serial NOT NULL,
  initials text NOT NULL,
  name text NOT NULL
);

ALTER TABLE public.categories ADD CONSTRAINT categories_pkey PRIMARY KEY (id);insert into "public"."categories" ("id", "initials", "name") values (1, 'PAD', 'padrão');
insert into "public"."categories" ("id", "initials", "name") values (2, 'PADV', 'padrão varanda');
insert into "public"."categories" ("id", "initials", "name") values (3, 'LUX', 'luxo');
insert into "public"."categories" ("id", "initials", "name") values (4, 'LUXC', 'luxo conjugado');
insert into "public"."categories" ("id", "initials", "name") values (5, 'LUXH', 'luxo com hidro');
