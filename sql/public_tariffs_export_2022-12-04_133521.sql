CREATE TABLE public.tariffs (
  id serial NOT NULL,
  name text NOT NULL,
  product_pipe text NOT NULL,
  active boolean NOT NULL,
  order_id serial NOT NULL,
  food_id integer NOT NULL
);

ALTER TABLE public.tariffs ADD CONSTRAINT tariffs_pkey PRIMARY KEY (id);insert into "public"."tariffs" ("active", "food_id", "id", "name", "order_id", "product_pipe") values (true, 1, 1, 'Agosto a Setembro 2023 - FDS', 1, '203');
insert into "public"."tariffs" ("active", "food_id", "id", "name", "order_id", "product_pipe") values (true, 1, 2, 'Agosto a Setembro 2023 - MDS', 2, '204');
