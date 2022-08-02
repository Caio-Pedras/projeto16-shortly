CREATE TABLE "public.users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.urls" (
	"id" serial NOT NULL,
	"shortUrl" TEXT NOT NULL UNIQUE,
	"url" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"visitCount" integer NOT NULL DEFAULT '0',
	CONSTRAINT "urls_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.sessions" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"token" TEXT NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "urls" ADD CONSTRAINT "urls_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");



