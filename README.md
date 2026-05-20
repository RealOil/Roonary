# Roonary

Roonary is a cozy productivity log game that turns real-life routines into small animal character scenes inside a personal room.

The first MVP focuses on the personal loop:

```text
Onboarding -> My Room -> Today's Routine -> Setlog Frames -> Daily Replay
```

Shared Rooms, invite links, and Group Replay are planned for MVP 2.

---

## Documents

Start here:

- [Product PRD](docs/product/prd.md)
- [MVP 1 Spec](docs/product/mvp1-spec.md)
- [Screen Flow](docs/product/screen-flow.md)
- [Development Strategy](docs/project/development-strategy.md)
- [Implementation Plan](docs/project/implementation-plan.md)
- [Data Model](docs/technical/data-model.md)
- [Changelog](CHANGELOG.md)

---

## Current Status

```text
Stage: MVP 1 app scaffold
Target MVP: Mobile-first React Native + Expo app
Backend: Not used in MVP 1
Data: Mock/local data for MVP 1
```

---

## Run Locally

Prerequisite:

```text
Node.js LTS with npm
```

Install dependencies:

```bash
npm install
```

Start the Expo dev server:

```bash
npm run start
```

Then open the app with Expo Go by scanning the QR code.

Useful checks:

```bash
npm run typecheck
npm run android
npm run web
```
