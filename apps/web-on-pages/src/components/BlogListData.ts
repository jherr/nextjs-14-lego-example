import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@libsql/client";
import { BlogItem } from "@/components/types";

const client = createClient({
  url: process.env.TURSO_URL!,
  authToken: process.env.TURSO_TOKEN!,
});

export async function getBlogs() {
  const { rows } = await client.execute("SELECT * FROM blogs");
  return rows as unknown as BlogItem[];
}

export async function addBlog(title: string, body: string) {
  await client.execute({
    sql: "INSERT INTO blogs (title, body) VALUES ($title, $body)",
    args: {
      title,
      body,
    },
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BlogItem[]>
) {
  if (req.method === "GET") {
    res.status(200).json(await getBlogs());
  }
  if (req.method === "POST") {
    addBlog(req.body.title, req.body.body);
    res.status(200).json(await getBlogs());
  }
}
