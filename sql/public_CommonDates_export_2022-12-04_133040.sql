CREATE TABLE public."CommonDates" (
  id serial NOT NULL,
  date text NOT NULL,
  tariff_to_midweek_id integer NOT NULL,
  tariff_to_weekend_id integer NOT NULL
);

ALTER TABLE public."CommonDates" ADD CONSTRAINT "CommonDates_pkey" PRIMARY KEY (id);
insert into "public"."CommonDates" ("date", "id", "tariff_to_midweek_id", "tariff_to_weekend_id") values ('2023-09', 2, 2, 1);
insert into "public"."CommonDates" ("date", "id", "tariff_to_midweek_id", "tariff_to_weekend_id") values ('2023-08', 1, 2, 1);
