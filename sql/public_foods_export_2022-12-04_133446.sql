CREATE TABLE public.foods (
  id serial NOT NULL,
  adt double precision NOT NULL,
  adtex double precision NOT NULL,
  chd0 double precision NOT NULL,
  chd4 double precision NOT NULL,
  chd8 double precision NOT NULL
);

ALTER TABLE public.foods ADD CONSTRAINT foods_pkey PRIMARY KEY (id);insert into "public"."foods" ("adt", "adtex", "chd0", "chd4", "chd8", "id") values (87, 87, 0, 43, 52, 1);
