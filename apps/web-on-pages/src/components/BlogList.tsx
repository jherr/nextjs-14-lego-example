import { useState } from "react";
import type { BlogItem } from "./types";

export function BlogList({
  rows,
  apiEndpoint,
}: {
  rows: BlogItem[];
  apiEndpoint: string;
}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [updatedRows, setUpdatedRows] = useState(rows);

  return (
    <div>
      {updatedRows.map((row, index) => (
        <div className="mb-5" key={index}>
          <div className="font-semibold text-2xl">{row.title}</div>
          <div className="ml-5 mt-2 italic">{row.body}</div>
        </div>
      ))}
      <div className="flex items-center gap-4">
        <label htmlFor="title">Title:</label>
        <input
          className="w-full flex-grow text-black"
          id="title"
          name="title"
          onChange={(evt) => {
            setTitle(evt.target.value);
          }}
          type="text"
          value={title}
        />
        <label htmlFor="body">Body:</label>
        <input
          className="w-full flex-grow text-black"
          id="body"
          name="body"
          onChange={(evt) => {
            setBody(evt.target.value);
          }}
          type="text"
          value={body}
        />
        <button
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={async () => {
            await fetch(apiEndpoint, {
              method: "POST",
              body: JSON.stringify({
                title,
                body,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            setUpdatedRows(await (await fetch(apiEndpoint)).json());
          }}
          type="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
