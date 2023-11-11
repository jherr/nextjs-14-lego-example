import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_URL!,
  authToken: process.env.TURSO_TOKEN!,
});

export async function RSCBlogList({
  onSubmit,
}: {
  onSubmit?: () => Promise<void>;
}) {
  const { rows } = await client.execute("SELECT * FROM blogs");

  return (
    <main className="mx-auto max-w-6xl mt-5">
      {rows.map((row, index) => (
        <div className="mb-5" key={index}>
          <div className="font-semibold text-2xl">{row.title}</div>
          <div className="ml-5 mt-2 italic">{row.body}</div>
        </div>
      ))}
      <form className="flex items-center gap-4">
        <label htmlFor="title">Title:</label>
        <input
          className="w-full flex-grow text-black"
          id="title"
          name="title"
          type="text"
        />
        <label htmlFor="body">Body:</label>
        <input
          className="w-full flex-grow text-black"
          id="body"
          name="body"
          type="text"
        />
        <button
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          formAction={async function postBlog(args: FormData) {
            "use server";
            await client.execute({
              sql: "INSERT INTO blogs (title, body) VALUES ($title, $body)",
              args: {
                title: (args.get("title") ?? "") as string,
                body: (args.get("body") ?? "") as string,
              },
            });
            await onSubmit?.();
          }}
          type="submit"
        >
          Submit
        </button>
      </form>
      <button
        className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        formAction={async function postBlog(args: FormData) {
          "use server";
          await client.execute({
            sql: "INSERT INTO blogs (title, body) VALUES ($title, $body)",
            args: {
              title: (args.get("title") ?? "") as string,
              body: (args.get("body") ?? "") as string,
            },
          });
        }}
        type="submit"
      >
        Submit
      </button>
    </main>
  );
}
