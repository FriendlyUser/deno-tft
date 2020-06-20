### Deno Tft

Typescript wrapper around the riot games api and utility functions so I can win more games of ranked tft.

Unlike the npmjs version https://github.com/FriendlyUser/node-tft (also created by me), this one has less bugs.

#### Future Plans

1. Automatically Extract late game builds from grandmaster players
2. Display Useful statistics from games such as gold spent and other things.
3. Possibly useful for data science.
4. Pull Info from games I win and/or lose
5. Get a sense of how common certain builds are.

##### How to use

```
async getTFTData() {
  const riotHttp = new RiotClient(riotKey, 'na1.api.riotgames.com')
  const sumObj = await riotHttp.getTftSummonerByName(userName)
}
```

# Endpoints

## TFT SUMMONER V1
- [x] `Get a summoner by account ID.`
- [x] `Get a summoner by summoner name.`
- [x] `Get a summoner by PUUID.`
- [x] `Get a summoner by summoner ID.`

## TFT MATCH V1
- [x] `Get match list by summoner PUUID.`
- [x] `Get match list details.`

## TFT LEAGUE V1
- [x] `Get the challenger league for given queue.`
- [x] `Get league entries in all queues for a given summoner ID.`
- [x] `Get all the league entries.`
- [x] `Get league with given ID, including inactive entries.`
- [x] `Get the master league for given queue.`

Donate

Eth: 0x9d18acAB9Fe749Cbf899B2FD63Bf25e64829bbF3

PS, don't expect anyone to actually donate.