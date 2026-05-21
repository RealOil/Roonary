export type ScreenName =
  | 'onboarding'
  | 'recommendation'
  | 'room'
  | 'routine'
  | 'replay'
  | 'closet'
  | 'archive';

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

export interface User {
  id: string;
  nickname: string;
  avatarId: string;
  myRoomId: string;
  onboardingCompleted: boolean;
}

export interface Avatar {
  id: string;
  userId: string;
  preset: CharacterPreset;
  animalType: AnimalType;
  baseColor: string;
  currentRoutineId?: string;
  currentStateLabel: string;
}

export interface MyRoom {
  id: string;
  userId: string;
  theme: RoomTheme;
  wallpaperLabel: string;
  floorLabel: string;
  furnitureLabels: string[];
}

export interface Routine {
  id: string;
  userId: string;
  type: RoutineType;
  title: string;
  status: RoutineStatus;
  estimatedMinutes?: number;
}

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

export interface DailyReplay {
  id: string;
  userId: string;
  date: string;
  frameIds: string[];
  routineSummary: RoutineSummary[];
  stats: ReplayStats;
}

export interface RecommendationResult {
  presetLabel: string;
  animalLabel: string;
  colorLabel: string;
  roomThemeLabel: string;
  roomTheme: RoomTheme;
  routines: string[];
}
