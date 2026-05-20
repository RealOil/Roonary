# Roonary Data Model
> 목적: MVP 1 구현에 필요한 최소 데이터 구조를 정의한다.

---

## 1. 원칙

MVP 1은 서버 없이 mock/local data로 구현한다.

```text
실제 DB 없음
로그인 없음
단일 mock user
단일 My Room
프리셋 루틴
mock Setlog Frames
mock Daily Replay
```

데이터 구조는 MVP 2에서 Shared Room, invite link, Group Replay를 붙일 수 있도록 너무 좁게 만들지 않는다.

---

## 2. Core Types

```ts
export type RoutineType =
  | 'code_work'
  | 'read'
  | 'workout'
  | 'plan'
  | 'review'
  | 'create'
  | 'rest';

export type RoutineStatus =
  | 'planned'
  | 'active'
  | 'completed'
  | 'deferred'
  | 'skipped';

export type RoomTheme =
  | 'clean_desk'
  | 'cozy_room'
  | 'quiet_cafe'
  | 'night_studio'
  | 'home_gym';

export type CharacterPreset =
  | 'quiet_planner'
  | 'cozy_finisher'
  | 'spark_starter'
  | 'deep_worker'
  | 'soft_restorer'
  | 'room_buddy';

export type AnimalType =
  | 'fox'
  | 'cat'
  | 'rabbit'
  | 'owl'
  | 'bear'
  | 'hamster';
```

---

## 3. MVP 1 Entities

### User

```ts
export interface User {
  id: string;
  nickname: string;
  avatarId: string;
  myRoomId: string;
  onboardingCompleted: boolean;
}
```

### OnboardingResult

```ts
export interface OnboardingResult {
  id: string;
  userId: string;
  preset: CharacterPreset;
  animalType: AnimalType;
  baseColor: string;
  roomTheme: RoomTheme;
  recommendedRoutineTypes: RoutineType[];
  answers: OnboardingAnswer[];
}

export interface OnboardingAnswer {
  questionId: string;
  optionId: string;
}
```

### Avatar

```ts
export interface Avatar {
  id: string;
  userId: string;
  preset: CharacterPreset;
  animalType: AnimalType;
  baseColor: string;
  currentRoutineId?: string;
  currentStateLabel: string;
}
```

### MyRoom

```ts
export interface MyRoom {
  id: string;
  userId: string;
  theme: RoomTheme;
  wallpaperLabel: string;
  floorLabel: string;
  furnitureLabels: string[];
}
```

### Routine

```ts
export interface Routine {
  id: string;
  userId: string;
  type: RoutineType;
  title: string;
  status: RoutineStatus;
  estimatedMinutes?: number;
}
```

### SetlogFrame

```ts
export interface SetlogFrame {
  id: string;
  type: 'my';
  userId: string;
  timestamp: string;
  routineType: RoutineType;
  routineStatus: RoutineStatus;
  sceneLabel: string;
  variationLabel: string;
  roomTheme: RoomTheme;
}
```

### DailyReplay

```ts
export interface DailyReplay {
  id: string;
  userId: string;
  date: string;
  frameIds: string[];
  routineSummary: RoutineSummary[];
  stats: ReplayStats;
}

export interface RoutineSummary {
  routineType: RoutineType;
  totalMinutes: number;
  status: 'completed' | 'partial' | 'deferred' | 'skipped';
}

export interface ReplayStats {
  roomExp: number;
  focus: number;
  wellness: number;
  creativity: number;
}
```

---

## 4. Mock Data Shape

MVP 1 mock data should live in a dedicated module.

Recommended file later:

```text
src/data/mockData.ts
```

Initial mock scenario:

```text
User: Yujin
Avatar: Quiet Planner owl, moss green
Room: clean desk
Today routines: Plan, Code / Work, Rest, Workout, Read
Frames: 08:00, 10:00, 14:00, 18:00, 22:00
Daily Replay: same frame list with routine summary
```

---

## 5. MVP 2 Extension Points

The MVP 1 model should later expand with:

```ts
export interface SharedRoom {
  id: string;
  hostUserId: string;
  name: string;
  theme: RoomTheme;
  maxParticipants: number;
  inviteCode: string;
  status: 'scheduled' | 'active' | 'ended';
}

export interface GroupReplay {
  id: string;
  sharedRoomId: string;
  frameIds: string[];
}
```

Do not implement these in MVP 1 screens.

