import { serve } from "https://deno.land/std@0.53.0/http/server.ts";
import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";

const s = serve({ port: 8000 });
console.log("http://localhost:8000/");

async function getHtml(): Promise<any> {
  const body = await readFileStr('./public/index.html');

  return { body }
}

for await (const req of s) {
  req.respond(await getHtml());
}