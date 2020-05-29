import { serve } from "https://deno.land/std@0.53.0/http/server.ts";
import { readFileStr } from "https://deno.land/std/fs/read_file_str.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts"
import ky from 'https://deno.land/x/ky/index.js';

const env: any = config();
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");

/**
 * @param url 
 */
async function getWeatherForecast(url: string): Promise<any> {
  return await ky.get(url).json();
}

async function getHtml(): Promise<any> {
  const body = await readFileStr('./public/index.html');

  return { body }
}

getWeatherForecast(`${env.BASE_URL}?q=Tokyo,jp&appid=${env.API_KEY}`);

for await (const req of s) {
  req.respond(await getHtml());
}