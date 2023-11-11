import { BlogList } from "@/components/BlogList";
import { BlogItem } from "@/components/types";
import { getBlogs } from "@/components/BlogListData";

export async function getServerSideProps() {
  const rows = await getBlogs();

  return {
    props: {
      rows,
    },
  };
}

export default function Home({ rows }: { rows: BlogItem[] }) {
  return (
    <main className="mx-auto max-w-6xl mt-5 text-white">
      <BlogList rows={rows} apiEndpoint="/api/blogs" />
    </main>
  );
}
