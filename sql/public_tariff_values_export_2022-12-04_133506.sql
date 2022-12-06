CREATE TABLE public.tariff_values (
  id serial NOT NULL,
  tariffs_id integer NOT NULL,
  category_id integer NOT NULL,
  adt double precision NOT NULL,
  adtex double precision NOT NULL,
  chd0 double precision NOT NULL,
  chd4 double precision NOT NULL,
  chd8 double precision NOT NULL
);

ALTER TABLE public.tariff_values ADD CONSTRAINT tariff_values_pkey PRIMARY KEY (id);insert into "public"."tariff_values" ("adt", "adtex", "category_id", "chd0", "chd4", "chd8", "id", "tariffs_id") values (479, 259, 1, 0, 140, 165, 1, 1);
insert into "public"."tariff_values" ("adt", "adtex", "category_id", "chd0", "chd4", "chd8", "id", "tariffs_id") values (525, 284, 2, 0, 140, 165, 2, 1);
insert into "public"."tariff_values" ("adt", "adtex", "category_id", "chd0", "chd4", "chd8", "id", "tariffs_id") values (583, 409, 3, 0, 140, 165, 3, 1);
insert into "public"."tariff_values" ("adt", "adtex", "category_id", "chd0", "chd4", "chd8", "id", "tariffs_id") values (618, 433, 4, 0, 140, 165, 4, 1);
insert into "public"."tariff_values" ("adt", "adtex", "category_id", "chd0", "chd4", "chd8", "id", "tariffs_id") values (618, 433, 5, 0, 140, 165, 5, 1);
insert into "public"."tariff_values" ("adt", "adtex", "category_id", "chd0", "chd4", "chd8", "id", "tariffs_id") values (340, 184, 1, 0, 130, 144, 6, 2);
insert into "public"."tariff_values" ("adt", "adtex", "category_id", "chd0", "chd4", "chd8", "id", "tariffs_id") values (373, 202, 2, 0, 130, 144, 7, 2);
insert into "public"."tariff_values" ("adt", "adtex", "category_id", "chd0", "chd4", "chd8", "id", "tariffs_id") values (414, 290, 3, 0, 130, 144, 8, 2);
insert into "public"."tariff_values" ("adt", "adtex", "category_id", "chd0", "chd4", "chd8", "id", "tariffs_id") values (439, 308, 4, 0, 130, 144, 9, 2);
insert into "public"."tariff_values" ("adt", "adtex", "category_id", "chd0", "chd4", "chd8", "id", "tariffs_id") values (439, 308, 5, 0, 130, 144, 10, 2);
