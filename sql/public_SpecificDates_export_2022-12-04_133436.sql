CREATE TABLE public."SpecificDates" (
  id serial NOT NULL,
  date text NOT NULL,
  tariffs_id integer NOT NULL
);

ALTER TABLE public."SpecificDates" ADD CONSTRAINT "SpecificDates_pkey" PRIMARY KEY (id);