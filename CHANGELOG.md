# Changelog

All notable changes to Roonary will be documented in this file.

This project follows a lightweight changelog format:

```text
Added: new features or documents
Changed: updates to existing behavior or direction
Fixed: bug fixes
Removed: removed scope or files
```

---

## 2026-05-20

### Added

- Created the initial Roonary PRD.
- Added development strategy for AI-assisted SDLC.
- Added MVP 1 feature specification.
- Added MVP 1 screen flow.
- Added project changelog.
- Added initial git ignore rules for Expo/React Native development.
- Added repository README and docs index.
- Organized planning documents under `docs/`.
- Added Expo/React Native app scaffold.
- Added MVP 1 app shell with onboarding, recommendation, My Room, routine, replay, closet, and archive screens.
- Added mock data, data types, and theme tokens for the first prototype.
- Added persisted MVP 1 state with AsyncStorage.
- Added selectable onboarding answers that drive character and room recommendations.
- Added persisted current routine selection.
- Changed MVP 1 app-facing language to Korean.
- Added Korean-first internal language policy to project docs.
- Removed the onboarding record-style question.
- Changed My Room to prioritize a large room scene over routine/frame lists.
- Added manual Setlog Frame generation from the current routine.
- Changed Daily Replay to summarize generated frames instead of a fixed replay mock.
- Added routine-specific room scene props and labels.
- Added selectable Setlog Frame detail in Daily Replay.
- Changed My Room into a focus display with only date, time, current routine, room, character, and bottom navigation.
- Removed recommendation state copy from the MVP data model.
- Merged Routine and Replay into one Routine / Today Log screen.
- Removed Setlog Frame detail from MVP 1.
- Changed Closet from onboarding reset placeholder to Character / Room customization tabs.
- Changed Closet tabs to show large character/room previews with selectable species, color, outfit, prop, wallpaper, floor, and furniture options.
- Changed Closet controls from stacked option groups to sub-tabs with color swatches and simple option icons.
- Changed My Room and room customization preview from flat room blocks to a simple 2.5D corner-room composition.
- Documented future layered PNG/WebP asset direction for room, character, outfit, prop, and routine object graphics.
- Documented product direction toward recurring routines, schedules/calendar, focus sessions, and future widgets.
- Changed the Routine screen into a Today screen with focus session, daily schedule, widget preview, and Today Log sections.
