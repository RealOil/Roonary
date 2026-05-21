import {
  Avatar,
  DailyReplay,
  MyRoom,
  Routine,
  RoutineType,
  SetlogFrame,
  User,
  RecommendationResult,
} from '../models/types';

export const routineLabels: Record<RoutineType, string> = {
  code_work: 'Code / Work',
  read: 'Read',
  workout: 'Workout',
  plan: 'Plan',
  review: 'Review',
  create: 'Create',
  rest: 'Rest',
};

export const mockUser: User = {
  id: 'user-yujin',
  nickname: 'Yujin',
  avatarId: 'avatar-quiet-owl',
  myRoomId: 'room-main',
  onboardingCompleted: false,
};

export const mockAvatar: Avatar = {
  id: 'avatar-quiet-owl',
  userId: mockUser.id,
  preset: 'quiet_planner',
  animalType: 'owl',
  baseColor: 'moss green',
  currentRoutineId: 'routine-code',
  currentStateLabel: 'Working at the desk with a small planner nearby.',
};

export const mockRoom: MyRoom = {
  id: 'room-main',
  userId: mockUser.id,
  theme: 'clean_desk',
  wallpaperLabel: 'warm paper wall',
  floorLabel: 'pale wood floor',
  furnitureLabels: ['desk', 'bookshelf', 'plant', 'planner board'],
};

export const routinePresets: Routine[] = [
  {
    id: 'routine-plan',
    userId: mockUser.id,
    type: 'plan',
    title: 'Plan',
    status: 'completed',
    estimatedMinutes: 30,
  },
  {
    id: 'routine-code',
    userId: mockUser.id,
    type: 'code_work',
    title: 'Code / Work',
    status: 'active',
    estimatedMinutes: 120,
  },
  {
    id: 'routine-rest',
    userId: mockUser.id,
    type: 'rest',
    title: 'Rest',
    status: 'planned',
    estimatedMinutes: 45,
  },
  {
    id: 'routine-workout',
    userId: mockUser.id,
    type: 'workout',
    title: 'Workout',
    status: 'planned',
    estimatedMinutes: 30,
  },
  {
    id: 'routine-read',
    userId: mockUser.id,
    type: 'read',
    title: 'Read',
    status: 'planned',
    estimatedMinutes: 40,
  },
];

export const setlogFrames: SetlogFrame[] = [
  {
    id: 'frame-0800',
    type: 'my',
    userId: mockUser.id,
    timestamp: '08:00',
    routineType: 'plan',
    routineStatus: 'completed',
    sceneLabel: 'Planner board check',
    variationLabel: 'opening planner',
    roomTheme: 'clean_desk',
  },
  {
    id: 'frame-1000',
    type: 'my',
    userId: mockUser.id,
    timestamp: '10:00',
    routineType: 'code_work',
    routineStatus: 'active',
    sceneLabel: 'Laptop desk session',
    variationLabel: 'typing with coffee',
    roomTheme: 'clean_desk',
  },
  {
    id: 'frame-1400',
    type: 'my',
    userId: mockUser.id,
    timestamp: '14:00',
    routineType: 'rest',
    routineStatus: 'planned',
    sceneLabel: 'Tea break corner',
    variationLabel: 'resting near plant',
    roomTheme: 'cozy_room',
  },
  {
    id: 'frame-1800',
    type: 'my',
    userId: mockUser.id,
    timestamp: '18:00',
    routineType: 'workout',
    routineStatus: 'planned',
    sceneLabel: 'Stretching mat',
    variationLabel: 'light stretching',
    roomTheme: 'home_gym',
  },
  {
    id: 'frame-2200',
    type: 'my',
    userId: mockUser.id,
    timestamp: '22:00',
    routineType: 'read',
    routineStatus: 'planned',
    sceneLabel: 'Sofa reading',
    variationLabel: 'reading with tea',
    roomTheme: 'cozy_room',
  },
];

export const dailyReplay: DailyReplay = {
  id: 'replay-today',
  userId: mockUser.id,
  date: '2026.05.21',
  frameIds: setlogFrames.map((frame) => frame.id),
  routineSummary: [
    { routineType: 'plan', totalMinutes: 30, status: 'completed' },
    { routineType: 'code_work', totalMinutes: 130, status: 'partial' },
    { routineType: 'read', totalMinutes: 35, status: 'partial' },
    { routineType: 'workout', totalMinutes: 20, status: 'partial' },
    { routineType: 'rest', totalMinutes: 60, status: 'partial' },
  ],
  stats: {
    roomExp: 42,
    focus: 18,
    wellness: 9,
    creativity: 6,
  },
};

export const defaultRecommendation: RecommendationResult = {
  presetLabel: 'Quiet Planner',
  animalLabel: 'Owl',
  colorLabel: 'Moss green',
  roomThemeLabel: 'Clean desk',
  roomTheme: 'clean_desk',
  routines: ['Plan', 'Code / Work', 'Review', 'Rest'],
  stateLabel: 'Working at the desk with a small planner nearby.',
};

export const recommendationProfiles: Record<string, RecommendationResult> = {
  planner: defaultRecommendation,
  starter: {
    presetLabel: 'Spark Starter',
    animalLabel: 'Fox',
    colorLabel: 'Warm coral',
    roomThemeLabel: 'Quiet cafe',
    roomTheme: 'quiet_cafe',
    routines: ['Code / Work', 'Create', 'Workout', 'Rest'],
    stateLabel: 'Ready to start fast with a bright desk setup.',
  },
  cozy: {
    presetLabel: 'Cozy Finisher',
    animalLabel: 'Rabbit',
    colorLabel: 'Soft cream',
    roomThemeLabel: 'Cozy room',
    roomTheme: 'cozy_room',
    routines: ['Read', 'Rest', 'Review', 'Plan'],
    stateLabel: 'Settled into a soft corner and moving steadily.',
  },
  buddy: {
    presetLabel: 'Room Buddy',
    animalLabel: 'Hamster',
    colorLabel: 'Honey yellow',
    roomThemeLabel: 'Clean desk',
    roomTheme: 'clean_desk',
    routines: ['Plan', 'Code / Work', 'Read', 'Review'],
    stateLabel: 'Keeping pace with a shared-room mindset.',
  },
  deep: {
    presetLabel: 'Deep Worker',
    animalLabel: 'Bear',
    colorLabel: 'Slate blue',
    roomThemeLabel: 'Night studio',
    roomTheme: 'night_studio',
    routines: ['Code / Work', 'Read', 'Review', 'Rest'],
    stateLabel: 'Focused in a low-light work scene.',
  },
  restorer: {
    presetLabel: 'Soft Restorer',
    animalLabel: 'Cat',
    colorLabel: 'Leaf green',
    roomThemeLabel: 'Cozy room',
    roomTheme: 'cozy_room',
    routines: ['Rest', 'Workout', 'Review', 'Read'],
    stateLabel: 'Balancing recovery and routine in a calm room.',
  },
};
