# Roonary PRD
> Product Requirements Document v0.2  
> Project name: **Roonary**  
> Meaning: Room + Routine + Diary  
> Purpose: Define the MVP and product direction for a cozy productivity log game where real-life routines become room-based setlogs.

---

## 0. Product Summary

**Roonary is a cozy productivity log game that turns a user's real-life routines into daily living scenes for a small animal character.**

Every user starts with a default personal space called **My Room**. In My Room, the user sets today's routines, checks routine progress, and sees their character act out the current routine inside a pixel or isometric 2D room. The app records these moments as hourly **Setlog Frames** and compiles the day into a **Daily Replay**.

When users want to do routines with other people, they can create a **Shared Room** and invite others by link. In Shared Rooms, up to 4 participants bring their characters into the same room, choose their own routines, and create shared hourly **Room Setlogs** and a final **Group Replay**.

Roonary should feel like a productivity log tool first and a cozy room game second. The value comes from visible routine traces, compact replayable records, and attachment to the user's room and character.

---

## 1. Platform Direction

### MVP Platform

The first MVP should be designed mobile-first.

Recommended stack direction:

```text
Primary: Cross-platform mobile app
Targets: Android and iOS
Candidate approach: React Native / Expo, Flutter, or another mature cross-platform app stack
```

Rationale:

- Routine checks, current status updates, invite links, and replay viewing are frequent lightweight behaviors.
- The core experience is naturally personal, daily, and phone-adjacent.
- Android/iOS simultaneous delivery is more important than desktop-level complexity in the first version.

### Later Platform Candidates

```text
Web: Replay sharing, invite landing, lightweight dashboard
PC: Optional dashboard or focused work companion
```

Web and PC are not core MVP platforms. They are expansion candidates after the mobile loop proves useful.

---

## 2. Product Name

Current product name:

```text
Roonary
```

Interpretation:

```text
Room + Routine + Diary
```

Why it fits:

- It keeps the room as the primary visual metaphor.
- It implies that routines become a personal record.
- It feels softer and more ownable than purely functional names like Routine Room.

Previous working terms such as `Routine Room`, `Room Setlog`, `LifeLog Room`, and `Daily Replay` are treated as concept terms. `Daily Replay`, `Setlog Frame`, `Room Setlog`, and `Group Replay` remain useful product vocabulary.

---

## 3. Product Principles

### 3.1 My Room Always Exists

Users should not need to create a personal room.

```text
Bad first flow:
Install -> Create room -> Choose private room -> Name room -> Enter

Preferred first flow:
Install -> Onboarding -> My Room appears
```

My Room is the default personal space. It is always present.

### 3.2 Shared Rooms Are Created Only When Needed

Shared Room creation is an intentional social action.

```text
My Room: default private routine space
Shared Room: link-based group routine space created when users want to be together
```

The product should not make group participation feel mandatory.

### 3.3 Scenes Before Sentimental Copy

Roonary should not rely on emotional captions to create meaning. The room, character, routines, frames, and replay should carry the experience.

Preferred:

```text
21:00
Code 2h
Read 35m
Rest 1h
Generated Frames: 5
```

Avoid:

```text
Your beautiful little efforts made today shine.
Together we made a magical memory.
```

### 3.4 Productivity Log Tool, Not Dating Sim

The character is an avatar and routine proxy, not a virtual partner.

Avoid:

- Full-screen character portraits
- Intimacy meters
- Relationship UI
- Heart-based affection systems
- Excessive sentimental dialogue
- Dating-sim visual framing

Prefer:

- Pixel or isometric 2D room scenes
- Small animal character avatars
- Room-centered layout
- Routine state and log data
- Compact replay artifacts

---

## 4. Core Terms

| Term | Meaning |
|---|---|
| **Roonary** | Product name. A room-based routine diary and cozy productivity log game. |
| **My Room** | The user's default personal room. Always exists. |
| **Shared Room** | A temporary or session-based room created to do routines with others. |
| **Routine** | A real-life activity the user intends to perform, such as Code, Read, Workout, Plan, Review, Create, or Rest. |
| **Setlog Frame** | A 1-hour snapshot of routine state represented as a character room scene. |
| **My Setlog** | The user's personal collection of Setlog Frames from My Room. |
| **Room Setlog** | A shared hourly log generated inside a Shared Room. |
| **Daily Replay** | A daily personal summary made from Setlog Frames and routine data. |
| **Group Replay** | A shared session summary made from Room Setlogs. |
| **Closet** | Character outfit and item customization area. MVP can be a placeholder. |
| **Archive** | Storage for past Daily Replays, Group Replays, and Setlog artifacts. |

---

## 5. Onboarding: Character and Room Recommendation

### 5.1 Direction

Instead of asking users to simply choose a character appearance, Roonary should use a short onboarding flow to recommend a character and room setup based on routine style.

MVP onboarding should be lightweight:

```text
Length: Around 5 questions
Output: Character preset, base color, first outfit/prop, room theme, recommended routine presets
User control: Accept recommendation or change character/color/room theme
```

The onboarding should not create a complex personality engine. It should create a first moment of attachment while keeping implementation bounded.

### 5.2 Routine Style Axes

Example axes:

```text
Focus-oriented / Flexible
Planned / Spontaneous
Solo immersion / Group motivation
Record-oriented / Action-oriented
```

These axes are used only for recommendation logic in MVP.

### 5.3 Example Questions

```text
When starting the day, what feels most natural?
- Quietly make a plan
- Start moving right away
- Begin with someone else
- Set the mood first

Where do you focus best?
- Clean desk
- Cozy room
- Quiet cafe
- Night studio

When a routine fails, what helps you most?
- A checkpoint to restart
- A low-pressure break
- A small reward
- Someone doing it with me

Which daily record feels most useful?
- A clear timeline
- A short completion summary
- A visual room scene
- A shared result with others

What kind of routine do you want help with first?
- Work or study
- Reading or learning
- Exercise or wellness
- Planning or review
```

### 5.4 Character Style Presets

| Preset | Meaning | Suggested Fit |
|---|---|---|
| **Quiet Planner** | Quietly plans before acting | Planned, record-oriented |
| **Cozy Finisher** | Slowly but steadily completes routines | Flexible, steady execution |
| **Spark Starter** | Starts fast and likes momentum | Action-oriented, spontaneous |
| **Deep Worker** | Works best in immersion | Focus-oriented, solo |
| **Soft Restorer** | Values balance and recovery | Flexible, wellness-oriented |
| **Room Buddy** | Does better with shared motivation | Group motivation |

### 5.5 Recommendation Outputs

MVP recommendation result:

```text
Character preset
Animal character type
Base color
First outfit or prop
Default room theme
Recommended routine presets
```

Example:

```text
Preset: Quiet Planner
Animal: Owl
Base color: Moss green
First prop: Planner board
Room theme: Clean desk
Recommended routines: Plan, Code / Work, Review, Rest
```

---

## 6. Core User Flows

### 6.1 Solo Daily Flow

```text
Open app
Enter My Room
Review or set today's routines
Start or update current routine
Character scene reflects routine state
Hourly Setlog Frame is generated from mock or real routine state
Daily Replay summarizes the day
Replay is saved to Archive
```

Example day:

```text
08:00 Plan
10:00 Code / Work
14:00 Rest
18:00 Workout
22:00 Read
```

### 6.2 Shared Room Flow

```text
Open app
Enter My Room or Shared tab
Create Shared Room
Set room name, duration, theme, and max participants
Share invite link
Participants join
Each participant selects a routine
Hourly Room Setlog is generated
Session ends
Group Replay is generated
Share/export result
```

MVP 2 should cap Shared Rooms at 4 participants.

---

## 7. Main Screens

### 7.1 My Room

Role:

```text
Default personal space
Routine state visualization
Entry point to today's routines, replay, shared rooms, closet, and archive
```

Core layout:

```text
Top: Date / current time / simple day status
Center: Pixel or isometric 2D My Room with small animal character
Side or bottom panel: Today's routines
Bottom navigation: Room / Routine / Replay / Shared / Closet / Archive
```

Primary actions:

```text
Set today's routines
Start current routine
View Daily Replay
Change room or outfit
Create or join Shared Room
```

### 7.2 Today's Routine Setup

Users select from default routine presets in MVP.

Default routines:

| Routine | Meaning | Example Character Scene |
|---|---|---|
| Code / Work | Coding, work, study | Character working at desk with laptop |
| Read | Reading or learning | Character reading on sofa or at desk |
| Workout | Exercise | Character stretching on mat |
| Plan | Planning | Character checking planner or board |
| Review | Reflection or daily review | Character writing in diary |
| Create | Writing, drawing, making | Character using creative tools |
| Rest | Break and recovery | Character drinking tea or resting near plant |

MVP should prioritize preset selection over fully custom routine creation.

### 7.3 Daily Replay

Daily Replay is a record-like summary, not an emotional diary page.

Core content:

```text
Date
Routine Summary
Hour Frames
Completed / deferred / skipped routines
Simple room or growth stats
Archive save state
```

Example:

```text
Daily Replay
2026.05.20

Routine Summary
- Code / Work: 2h 10m
- Read: 35m
- Workout: 20m
- Review: skipped
- Rest: 1h

Generated Frames
- 08:00 Plan
- 10:00 Code / Work
- 14:00 Rest
- 18:00 Workout
- 22:00 Read

Room EXP +42
Focus +18
Wellness +9
Creativity +6
```

### 7.4 Closet

MVP 1 can provide a placeholder screen.

Later scope:

```text
Character animal type
Base color
Outfit
Accessory
Routine props
```

### 7.5 Archive

MVP 1 can provide a placeholder screen.

Later scope:

```text
Past Daily Replays
Past Group Replays
Filter by date / routine / shared room
Replay detail view
```

---

## 8. Setlog Frames

### 8.1 Personal Setlog Frame

A personal Setlog Frame is generated in My Room at 1-hour intervals.

Frame inputs:

```text
Current routine
Routine status
Character preset and outfit
Room theme and furniture
Routine variation pool
Time of day
```

Frame output:

```text
Timestamp
Routine type and status
Character action
Room scene state
Selected variation
Optional generated/exported image asset
```

Example:

```text
21:00
Routine: Code / Work
Scene: Small fox character working at desk with laptop
Props: Coffee, second monitor
Room: Night lighting, bookshelf, plant
```

### 8.2 Variation Rules

Repeated routines should produce visual variation.

Variation formula:

```text
Routine
+ action pose
+ expression
+ prop
+ position
+ outfit
+ furniture
+ time of day
+ lighting
= Setlog Frame
```

Avoid repeating the same variation for the same user and same routine in the most recent 3 frames when possible.

### 8.3 Routine Variation Examples

Code / Work:

```text
Typing on laptop
Looking at error screen
Debugging with coffee
Sketching structure on whiteboard
Thinking with chin on hand
Checking completed task
```

Read:

```text
Reading on sofa
Reading at desk
Choosing a book near bookshelf
Reading with tea
Adding sticky notes
Writing a short note
```

Workout:

```text
Stretching
Using yoga mat
Drinking water
Wiping the floor after workout
Light jumping
Putting away workout gear
```

Plan:

```text
Opening planner
Checking calendar
Writing goals on board
Sorting checklist
Adding stickers
Selecting tomorrow's routine
```

Review:

```text
Writing in diary
Checking daily log
Looking out window
Cleaning desk
Closing routine board
Turning off room light
```

Rest:

```text
Drinking tea
Lying under blanket
Looking out window
Listening to music
Watering plant
Taking a short nap
```

---

## 9. Shared Room

### 9.1 Creation

Shared Rooms are created only when users want to do routines with others.

Creation fields:

```text
Room name
Duration
Theme
Max participants
Invite link
```

MVP 2 defaults:

```text
Max participants: 4
Setlog interval: 1 hour
Invite method: Link
```

### 9.2 Room Setlog

Room Setlog is a shared hourly scene generated from all participants' routine states.

Example:

```text
21:00 Room Setlog

Yujin: Code / Work
Minji: Read
Jiwon: Workout
Seoyeon: Review
```

In the visual result, text should be secondary. The primary artifact is the room scene or 4-split setlog.

### 9.3 Shared Result Formats

MVP 2 should prioritize 4-split output for shareability.

Format A: Live Shared Room Scene

```text
All characters placed in one isometric room
Each character performs their current routine
Room theme and host customization are visible
```

Format B: 4-Split Setlog Result

```text
+----------------+----------------+
| 21:00 Yujin    | 21:00 Minji    |
| Code / Work    | Read           |
+----------------+----------------+
| 21:00 Jiwon    | 21:00 Seoyeon  |
| Workout        | Review         |
+----------------+----------------+
```

Recommendation:

```text
Live Shared Room: one shared room scene
Shared/export result: 4-split setlog first
Final replay: chronological frame stream
```

### 9.4 Group Replay

Group Replay summarizes a Shared Room session.

Example:

```text
Group Replay
Study Room
20:00 - 23:00

Participants
- Yujin: Code / Work, Review
- Minji: Read, Rest
- Jiwon: Workout, Plan
- Seoyeon: Code / Work, Read

Room Frames
- 20:00 Start
- 21:00 Focus Mode
- 22:00 Mixed Routine
- 23:00 Closing Log

Room Result
- Total focus time: 7h 30m
- Completed routines: 13
- Rest logs: 3
- Room EXP +128
```

---

## 10. Visual Direction

Recommended style:

```text
Pixel or isometric 2D
Small animal characters
Room-centered composition
Cozy but not overly sentimental
Productivity UI with soft game-like reward
Shareable setlog artifacts
```

Avoid:

```text
Full-screen character illustration
Visual novel layout
Dating-sim intimacy UI
Excessive sparkle animation
Overly cute emotional captions
Public social feed as core loop
```

UI should be calm, legible, and tool-like. The room can be charming, but routine state and log readability come first.

---

## 11. Information Architecture

Recommended navigation:

```text
My Room
Routine
Replay
Shared
Closet
Archive
```

Responsibilities:

| Area | Role |
|---|---|
| **My Room** | Default personal room and current routine state. |
| **Routine** | Set or edit today's routines. |
| **Replay** | View Daily Replay and recent Setlog Frames. |
| **Shared** | Create, join, and view Shared Rooms. |
| **Closet** | Change character outfit and props. |
| **Archive** | Store past replay artifacts. |

---

## 12. Data Model Draft

The following TypeScript-style model is a reference for implementation planning.

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
  | 'home_gym'
  | 'free';

export type CharacterPreset =
  | 'quiet_planner'
  | 'cozy_finisher'
  | 'spark_starter'
  | 'deep_worker'
  | 'soft_restorer'
  | 'room_buddy';

export interface User {
  id: string;
  nickname: string;
  avatarId: string;
  myRoomId: string;
  onboardingResultId?: string;
  ownedItemIds: string[];
  routineTemplateIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingResult {
  id: string;
  userId: string;
  preset: CharacterPreset;
  recommendedAnimalType: AnimalType;
  recommendedColor: string;
  recommendedRoomTheme: RoomTheme;
  recommendedRoutineTypes: RoutineType[];
  answers: OnboardingAnswer[];
  createdAt: string;
}

export interface OnboardingAnswer {
  questionId: string;
  optionId: string;
}

export type AnimalType =
  | 'fox'
  | 'cat'
  | 'rabbit'
  | 'owl'
  | 'bear'
  | 'hamster';

export interface Avatar {
  id: string;
  userId: string;
  preset: CharacterPreset;
  animalType: AnimalType;
  baseColor: string;
  outfitItemIds: string[];
  accessoryItemIds: string[];
  currentRoutineId?: string;
  currentState?: string;
}

export interface MyRoom {
  id: string;
  userId: string;
  theme: RoomTheme;
  wallpaperItemId?: string;
  floorItemId?: string;
  furnitureItemIds: string[];
  currentLayout: RoomLayout;
  createdAt: string;
  updatedAt: string;
}

export interface SharedRoom {
  id: string;
  hostUserId: string;
  name: string;
  theme: RoomTheme;
  maxParticipants: number;
  inviteCode: string;
  inviteUrl: string;
  status: 'scheduled' | 'active' | 'ended';
  startTime: string;
  endTime?: string;
  participants: SharedRoomParticipant[];
  createdAt: string;
  updatedAt: string;
}

export interface SharedRoomParticipant {
  userId: string;
  avatarId: string;
  joinedAt: string;
  leftAt?: string;
  currentRoutineId?: string;
}

export interface Routine {
  id: string;
  userId: string;
  type: RoutineType;
  title: string;
  status: RoutineStatus;
  startTime?: string;
  endTime?: string;
  durationMinutes?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SetlogFrame {
  id: string;
  type: 'my' | 'room';
  userId?: string;
  sharedRoomId?: string;
  timestamp: string;
  routineStates: FrameRoutineState[];
  sceneLayout: RoomLayout;
  selectedVariationIds: string[];
  generatedAssetUrl?: string;
  createdAt: string;
}

export interface FrameRoutineState {
  userId: string;
  avatarId: string;
  routineType: RoutineType;
  routineStatus: RoutineStatus;
  variationId: string;
  position: { x: number; y: number };
}

export interface DailyReplay {
  id: string;
  userId: string;
  date: string;
  frameIds: string[];
  routineSummary: RoutineSummary[];
  exportAssetUrl?: string;
  createdAt: string;
}

export interface GroupReplay {
  id: string;
  sharedRoomId: string;
  frameIds: string[];
  participantSummaries: ParticipantSummary[];
  exportAssetUrl?: string;
  createdAt: string;
}

export interface RoutineSummary {
  routineType: RoutineType;
  completedCount: number;
  totalMinutes: number;
  status: 'completed' | 'partial' | 'deferred' | 'skipped';
}

export interface ParticipantSummary {
  userId: string;
  nickname: string;
  routineSummary: RoutineSummary[];
}

export interface RoomLayout {
  theme: RoomTheme;
  wallpaperItemId?: string;
  floorItemId?: string;
  furniturePlacements: FurniturePlacement[];
}

export interface FurniturePlacement {
  itemId: string;
  x: number;
  y: number;
  rotation?: number;
}
```

---

## 13. MVP Scope

### MVP 1: Personal Core Experience

Goal:

```text
Validate whether real routines becoming character room scenes and daily replay logs feels useful and worth returning to.
```

Included:

```text
My Room basic screen
Today's routine setup
Routine-based character state display
Mock-data-based hourly Frame list
Daily Replay screen
Basic Closet placeholder
Basic Archive placeholder
Light onboarding with character/room recommendation
```

Excluded:

```text
Shared Room
Invite links
Group replay
Complex room editing
Store or payment system
Chat
Public feed
```

### MVP 2: Shared Room and Group Replay

Goal:

```text
Validate togetherness, link invitation, and shareable group setlog artifacts.
```

Included:

```text
Shared Room creation
Invite link
Up to 4 participants
Participant routine selection
Hourly Room Setlog
4-split shared result
Group Replay
Basic host room theme setting
```

Excluded:

```text
Public room discovery
Chat
Voice or video calls
Advanced editor
Large groups
```

### MVP 3: Customization and Archive Depth

Goal:

```text
Validate retention through room attachment, item expansion, and replay history.
```

Included:

```text
More items and props
More room themes
More routine variations
Weekly Replay
Improved Archive
Furniture-based variation unlocks
```

---

## 14. Non-Goals

The following are not early-version goals:

```text
Dating-sim relationship system
Full emotional dialogue system
Real-time chat-first social service
Voice/video study room
Public room discovery feed
Marketplace or monetization system
Complex economy
AI-generated emotional captions as core value
Fully custom routine editor before preset loop validation
```

---

## 15. Success Metrics

Early metrics:

```text
D1 retention
D7 retention
Today's routine setup completion rate
Routine start/update rate
Setlog Frame generation count per user
Daily Replay view rate
Daily Replay revisit rate
Closet/room customization interaction rate
```

MVP 2 metrics:

```text
Shared Room creation rate
Invite link conversion rate
Room Setlog generation count
Group Replay view rate
Group Replay share/export rate
Repeat Shared Room creation rate
```

Key validation questions:

```text
Do users return to see generated setlogs?
Do users understand that My Room is always available?
Does onboarding increase attachment without slowing first use too much?
Do users share Daily Replay or Group Replay artifacts?
Do Shared Rooms create enough motivation without requiring chat?
```

---

## 16. Implementation Prompt Example

Use the following prompt when asking Codex or another implementation agent to build MVP 1:

```text
Implement the MVP 1 personal experience for Roonary, a cozy productivity log game.

Core requirements:
1. The user has a default My Room. There is no personal room creation flow.
2. Add a lightweight onboarding flow of about 5 questions that recommends a character preset, animal type, base color, room theme, and routine presets. The user can accept or adjust the recommendation.
3. In My Room, the user can select today's routines from presets.
4. The room view shows a small animal character whose state changes based on the selected/current routine.
5. Use mock data to display a 1-hour Setlog Frame list.
6. Build a Daily Replay screen with chronological frames and routine summary.
7. Add basic Closet and Archive placeholder screens.
8. Design the UI as a pixel or isometric 2D room-centered productivity log tool, not a dating sim.
9. Keep captions minimal and information-oriented: time, routine, state, and summary.
10. Structure data so MVP 2 can later add Shared Rooms, invite links, Room Setlog, and Group Replay.

MVP 1 screens:
- Onboarding
- My Room
- Today's Routine Setup
- Daily Replay
- Closet placeholder
- Archive placeholder
```

---

## 17. Final Product Definition

**Roonary is a cozy productivity log game that turns real-life routines into small animal character scenes inside a personal room, records those scenes as hourly Setlog Frames, and compiles them into Daily Replays.**

Every user starts with My Room. Shared Rooms are created only when users want to do routines together. The product should make routine progress visible as a room-based record, not as a sentimental diary or dating-sim relationship.

---

## 18. One-Line Summary

```text
My Room is always there.
Shared Rooms are created only when needed.
Routines become hourly room scenes.
Daily Replay turns those scenes into a record.
Roonary feels like Room + Routine + Diary.
```
