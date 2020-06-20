// app.ts
import "https://deno.land/x/dotenv/load.ts";
import { RiotClient } from '../lib/http/index.ts';
import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";

const puuId = "wNAH--jmUok3Ln2Gbt0VHl_qfJhk8OJEFmC5o_fWyr3eD4D1e34x2WIfeGY8i_7kfmZ9fPrQtH-hCg"
const naMatchId = 'NA1_3204555111'
const accountId = "VYHdpIsp43b0woR8kx0_crrwd5lMfP4H0ot6290JlTpOjus"
const userName: string = 'AnimeGrillPlayer'
const id = "0D5n4exiMYZSO4V9FK_W8Pia_GPZyQyKheDLuKGN94YTP24"

const riotKey = Deno.env.get('RIOT_API_KEY')
const riotClient =  new RiotClient(riotKey)

Deno.test({
  name: "getTftSummonerByName() -- Get Personal Riot Account ",
  async fn() {
    const sumObj = await riotClient.getTftSummonerByName(userName)
    assertEquals(sumObj.name, userName)
  },
  // ignore resource sanitization
  sanitizeResources: false,
  sanitizeOps: false,
});


Deno.test({
  name: "getTftSummonerByName() -- Get Personal Riot Account in NA",
  async fn() {
    const riotHttp = new RiotClient(riotKey, 'na1.api.riotgames.com')
    const sumObj = await riotHttp.getTftSummonerByName(userName)
    assertEquals(sumObj.name, userName)
  }
});

// Simple name and function, compact form, but not configurable
Deno.test("getTftSummonerByAccount() -- Get Summoner Id By Account", async() => {
  const sumObj = await riotClient.getTftSummonerByAccount(accountId)
  assertEquals(sumObj.name, userName);
});

Deno.test("getTftSummonerByPuuid() -- Get Summoner Id By Account", async() => {
  const sumObj = await riotClient.getTftSummonerByPuuid(puuId)
  assertEquals(sumObj.name, userName);
});

Deno.test("getAllTftMatchesByPuuid() defaulting to 20 matches", async() => {
  const matches = await riotClient.getAllTftMatchesByPuuid(puuId)
  assertEquals(matches.length, 20);
});


Deno.test("getAllTftMatchesByPuuid() getting 1000 matches", async() => {
  // got to play another tft game now to find out
  // seems like max limit for tft games is 200
  const matches = await riotClient.getAllTftMatchesByPuuid(puuId, 200)
  assert(matches.length >= 200);
});

// Get Tft Match
Deno.test("getTftByMatchId() -- first match", async() => {
  const matches = await riotClient.getAllTftMatchesByPuuid(puuId, 200)
  const matchId = matches[0]
  const matchData = await riotClient.getTftByMatchId(matchId)
  assertEquals(matchData?.metadata?.match_id, matchId)
})

// Get Tft Match by Id
Deno.test("getTftByMatchId() -- first match", async() => {
  const matchData = await riotClient.getTftByMatchId(naMatchId)
  assertEquals(matchData?.metadata?.match_id, naMatchId)
})

// cannot initialize instance
Deno.test({
  name: "Cannot Initialize Instance",
  async fn() {
    try {
      const riotClientNoAuth =  new RiotClient("")
      // should not get here
      assertEquals(true, false)
    } catch (err) {
      // 
      assertEquals(true, true)
    }
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

// unauthorizated with bad api key
Deno.test({
  name: "Unauthorizated",
  async fn() {
    const riotClientNoAuth =  new RiotClient('asdasd')
    const errObj = await riotClientNoAuth.getTftSummonerByName(userName)
    assertEquals(errObj, { status: { message: "Forbidden", status_code: 403 } })
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
