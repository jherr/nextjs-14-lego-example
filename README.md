# Setup

Set up a database with Turso. I chose the name `blog-db` but you can use anything you want.

```bash
turso db create blog-db
```

Start up a shell to the database:

```bash
turso db shell blog-db
```

Create the `blogs` table:

```sql
CREATE TABLE blogs (
  title TEXT,
  body TEXT
);
```

Get the URL for the database using the `show` command:

```bash
turso db show blog-db
```

And past it into the `DATABASE_URL` environment variable. Mine looks like this:

```
TURSO_URL=libsql://[your database].turso.io
TURSO_TOKEN=***SECRET_TOKEN_HERE***
```

Get a token for the database:

```bash
turso db tokens create blog-db
```

And add that to the `.env` file:

In the root directory run the install command:

```bash
npm i
```

And then run the start command:

```bash
npm run dev
```
