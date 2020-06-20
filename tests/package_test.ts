import "https://deno.land/x/dotenv/load.ts";
// simple import
import { RiotClient } from 'https://deno.land/x/deno_tft/lib/http/index.ts';
import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";

// alternative import
import { RiotClient as RiotClientAlt } from 'https://deno.land/x/deno_tft/mods.ts';
const userName: string = 'AnimeGrillPlayer'

const riotKey = Deno.env.get('RIOT_API_KEY')
const riotClient =  new RiotClient(riotKey)
const riotClientAlt =  new RiotClientAlt(riotKey)
Deno.test({
  name: "Checking http module",
  async fn() {
    const sumObj = await riotClient.getTftSummonerByName(userName)
    assertEquals(sumObj.name, userName)
  },
  // ignore resource sanitization
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Checking mods.ts at module root",
  async fn() {
    const sumObj = await riotClientAlt.getTftSummonerByName(userName)
    assertEquals(sumObj.name, userName)
  },
  // ignore resource sanitization
  sanitizeResources: false,
  sanitizeOps: false,
});