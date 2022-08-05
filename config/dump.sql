CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "urls" (
	"id" serial NOT NULL,
	"shortUrl" TEXT NOT NULL UNIQUE,
	"url" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"visitCount" integer NOT NULL DEFAULT '0',
	"createdAt" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "urls_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"userId" integer NOT NULL,
	"token" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT 'NOW()',
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "urls" ADD CONSTRAINT "urls_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");



