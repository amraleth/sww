# SWW (SchulwegWarnung)
[![wakatime](https://wakatime.com/badge/github/amraleth/sww.svg)](https://wakatime.com/badge/github/amraleth/sww)

⚠️ This is just the proof of concept, a full version can be found [here](https://github.com/amraleth/schulwegwarnung) ⚠️



SchulwegWarnung is a project, that allows parents to view their children's way to school and check for dangerous places
and situations they might encounter.

## Getting Started

- Clone this repository and run `npm init`
- Set a [Pocketbase](https://github.com/pocketbase/pocketbase) database up
- Set the Pocketbase schema to `schema.json` and update the corresponding values in `src/Pocketbase.ts`

## Deployment

The preferred way of deployment is docker.

- Run `docker-compose up -d` to bring the caddy server up
- Modify the values in `caddy/Caddyfile` to match your deployment
