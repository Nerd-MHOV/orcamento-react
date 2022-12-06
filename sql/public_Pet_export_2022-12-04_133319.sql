CREATE TABLE public."Pet" (
  id serial NOT NULL,
  carrying text NOT NULL,
  daily_price double precision NOT NULL
);

ALTER TABLE public."Pet" ADD CONSTRAINT "Pet_pkey" PRIMARY KEY (id);