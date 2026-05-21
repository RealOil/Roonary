# Roonary Implementation Plan
> 목적: MVP 1을 실제 Expo 앱으로 구현하기 위한 순서와 작업 단위를 정의한다.

---

## 1. Implementation Goal

MVP 1의 첫 구현 목표는 다음이다.

```text
Expo 앱을 실행한다.
온보딩을 완료한다.
추천 결과를 확인한다.
My Room에 들어간다.
오늘의 루틴을 선택한다.
seed Setlog Frame을 확인한다.
현재 루틴 기준 Setlog Frame을 수동 생성한다.
생성된 frame 기반 Today Log를 확인한다.
Closet/Archive placeholder를 확인한다.
```

---

## 2. Recommended Stack

```text
React Native
Expo
TypeScript
Expo Router
Local/mock data
```

초기에는 다음을 사용하지 않는다.

```text
Backend
Database
Authentication
Push notifications
In-app purchase
```

---

## 3. Project Setup Tasks

```text
1. Initialize git repository
2. Create Expo project
3. Add TypeScript setup
4. Add basic route structure
5. Add mock data module
6. Add basic theme tokens
7. Run the app with Expo Go
```

Recommended route structure:

```text
app/
  _layout.tsx
  index.tsx
  onboarding.tsx
  recommendation.tsx
  room.tsx
  routine.tsx
  closet.tsx
  archive.tsx

src/
  data/
    mockData.ts
  models/
    types.ts
  components/
  theme/
    tokens.ts
```

---

## 4. Feature Implementation Order

### Step 1. Static App Shell

Build:

```text
Base navigation
Screen containers
Shared typography/colors
Room-first layout foundation
```

Done when:

```text
All MVP 1 screens are reachable.
Each screen has a clear title and placeholder content.
```

### Step 2. Mock Data and Types

Build:

```text
Routine types
Avatar types
Room types
Setlog Frame types
Today Log summary types
mockData.ts
```

Done when:

```text
Screens can read consistent mock data instead of hardcoded scattered values.
```

### Step 3. Onboarding

Build:

```text
4 question flow
Option selection
Simple scoring or mapping
Recommendation result
Accept recommendation
```

Done when:

```text
First launch can move from onboarding to recommendation to My Room.
```

### Step 4. My Room

Build:

```text
Room scene area
Small animal character representation
Current routine state
```

Done when:

```text
The My Room screen shows only the current routine, date/time, room scene, character, and bottom navigation.
```

### Step 5. Routine / Today Log

Build:

```text
Routine preset list
Multi-select today's routines
Select current routine
Manual Setlog Frame generation
Routine Summary from generated frames
Generated Frames timeline
Simple stats
Return to My Room
```

Done when:

```text
User can choose today's routine, generate a frame, and read today's log in one screen.
```

### Step 6. Placeholders

Build:

```text
Closet placeholder
Archive placeholder
```

Done when:

```text
Both screens are reachable and explain their future role with minimal text.
```

---

## 5. Visual Implementation Rule

MVP 1 should not wait for finished art assets.

Allowed early representation:

```text
Simple geometric room blocks
Text labels for props
Small animal emoji-like placeholder made with shapes
Routine cards
Frame cards
```

Avoid:

```text
Dating-sim portrait layout
Dialogue boxes
Large emotional captions
Overly decorative landing page
```

---

## 6. Verification Checklist

Before calling MVP 1 draft complete:

```text
npx expo start works.
App opens on Expo Go.
Main screens are reachable.
No major text overlap on mobile.
Onboarding can be completed.
Routine selection changes visible state.
Today Log is readable inside the Routine screen.
Shared Room is not accidentally implemented in MVP 1.
```

---

## 7. Suggested First Codex Prompt

```text
Read docs/product/prd.md, docs/product/mvp1-spec.md, docs/product/screen-flow.md, docs/project/development-strategy.md, docs/project/implementation-plan.md, and docs/technical/data-model.md.

Create a React Native + Expo + TypeScript MVP 1 app for Roonary.

Implement only the app shell, route structure, theme tokens, data types, and mock data first.
Do not implement backend, auth, Shared Room, invite links, or real persistence.

After creating the app shell, run the project check command and tell me how to open it with Expo Go.
```
