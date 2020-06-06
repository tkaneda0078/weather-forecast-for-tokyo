import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { viewEngine, engineFactory, adapterFactory } from "https://deno.land/x/view_engine/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts"
import ky from 'https://deno.land/x/ky/index.js';

const app = new Application();
const router = new Router();
const env: any = config();

const ejsEngine = await engineFactory.getEjsEngine();
const oakAdapter = await adapterFactory.getOakAdapter();

app.use(viewEngine(oakAdapter, ejsEngine));

router.get('/', (ctx: any) => {
  ctx.render('./public/index.ejs', { data: { message: 'ddd' } })
});

app.use(router.routes());
app.use(router.allowedMethods());

/**
 * @param url 
 * @TODO class化
 */
async function getWeatherForecast(url: string): Promise<any> {
  return await ky.get(url).json();
}

getWeatherForecast(`${env.BASE_URL}?q=Tokyo,jp&appid=${env.API_KEY}`);

console.log("http://localhost:8000/");
await app.listen({ port: 8000 });