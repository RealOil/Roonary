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
  code_work: '업무 / 공부',
  read: '독서',
  workout: '운동',
  plan: '계획',
  review: '회고',
  create: '창작',
  rest: '휴식',
};

export const mockUser: User = {
  id: 'user-yujin',
  nickname: '유진',
  avatarId: 'avatar-quiet-owl',
  myRoomId: 'room-main',
  onboardingCompleted: false,
};

export const mockAvatar: Avatar = {
  id: 'avatar-quiet-owl',
  userId: mockUser.id,
  preset: 'quiet_planner',
  animalType: 'owl',
  baseColor: '이끼 초록',
  currentRoutineId: 'routine-code',
  currentStateLabel: '작은 플래너를 옆에 두고 책상에서 집중하는 중.',
};

export const mockRoom: MyRoom = {
  id: 'room-main',
  userId: mockUser.id,
  theme: 'clean_desk',
  wallpaperLabel: '따뜻한 종이 벽지',
  floorLabel: '밝은 나무 바닥',
  furnitureLabels: ['책상', '책장', '화분', '플래너 보드'],
};

export const routinePresets: Routine[] = [
  {
    id: 'routine-plan',
    userId: mockUser.id,
    type: 'plan',
    title: '계획',
    status: 'completed',
    estimatedMinutes: 30,
  },
  {
    id: 'routine-code',
    userId: mockUser.id,
    type: 'code_work',
    title: '업무 / 공부',
    status: 'active',
    estimatedMinutes: 120,
  },
  {
    id: 'routine-rest',
    userId: mockUser.id,
    type: 'rest',
    title: '휴식',
    status: 'planned',
    estimatedMinutes: 45,
  },
  {
    id: 'routine-workout',
    userId: mockUser.id,
    type: 'workout',
    title: '운동',
    status: 'planned',
    estimatedMinutes: 30,
  },
  {
    id: 'routine-read',
    userId: mockUser.id,
    type: 'read',
    title: '독서',
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
    sceneLabel: '플래너 보드 확인',
    variationLabel: '플래너 펼치기',
    roomTheme: 'clean_desk',
  },
  {
    id: 'frame-1000',
    type: 'my',
    userId: mockUser.id,
    timestamp: '10:00',
    routineType: 'code_work',
    routineStatus: 'active',
    sceneLabel: '노트북 책상 집중',
    variationLabel: '커피 옆에서 타이핑',
    roomTheme: 'clean_desk',
  },
  {
    id: 'frame-1400',
    type: 'my',
    userId: mockUser.id,
    timestamp: '14:00',
    routineType: 'rest',
    routineStatus: 'planned',
    sceneLabel: '차 마시는 휴식 코너',
    variationLabel: '화분 옆에서 쉬기',
    roomTheme: 'cozy_room',
  },
  {
    id: 'frame-1800',
    type: 'my',
    userId: mockUser.id,
    timestamp: '18:00',
    routineType: 'workout',
    routineStatus: 'planned',
    sceneLabel: '스트레칭 매트',
    variationLabel: '가벼운 스트레칭',
    roomTheme: 'home_gym',
  },
  {
    id: 'frame-2200',
    type: 'my',
    userId: mockUser.id,
    timestamp: '22:00',
    routineType: 'read',
    routineStatus: 'planned',
    sceneLabel: '소파 독서',
    variationLabel: '차와 함께 책 읽기',
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
  presetLabel: '조용한 계획가',
  animalLabel: '부엉이',
  colorLabel: '이끼 초록',
  roomThemeLabel: '깔끔한 책상',
  roomTheme: 'clean_desk',
  routines: ['계획', '업무 / 공부', '회고', '휴식'],
  stateLabel: '작은 플래너를 옆에 두고 책상에서 집중하는 중.',
};

export const recommendationProfiles: Record<string, RecommendationResult> = {
  planner: defaultRecommendation,
  starter: {
    presetLabel: '빠른 시작가',
    animalLabel: '여우',
    colorLabel: '따뜻한 코랄',
    roomThemeLabel: '조용한 카페',
    roomTheme: 'quiet_cafe',
    routines: ['업무 / 공부', '창작', '운동', '휴식'],
    stateLabel: '밝은 책상 앞에서 빠르게 시작할 준비를 마친 상태.',
  },
  cozy: {
    presetLabel: '포근한 완주가',
    animalLabel: '토끼',
    colorLabel: '부드러운 크림',
    roomThemeLabel: '포근한 방',
    roomTheme: 'cozy_room',
    routines: ['독서', '휴식', '회고', '계획'],
    stateLabel: '포근한 구석에 자리를 잡고 천천히 이어가는 중.',
  },
  buddy: {
    presetLabel: '룸 버디',
    animalLabel: '햄스터',
    colorLabel: '꿀빛 노랑',
    roomThemeLabel: '깔끔한 책상',
    roomTheme: 'clean_desk',
    routines: ['계획', '업무 / 공부', '독서', '회고'],
    stateLabel: '함께 하는 리듬을 떠올리며 페이스를 맞추는 중.',
  },
  deep: {
    presetLabel: '깊은 몰입가',
    animalLabel: '곰',
    colorLabel: '슬레이트 블루',
    roomThemeLabel: '밤의 작업실',
    roomTheme: 'night_studio',
    routines: ['업무 / 공부', '독서', '회고', '휴식'],
    stateLabel: '낮은 조명의 작업실에서 깊게 몰입하는 중.',
  },
  restorer: {
    presetLabel: '부드러운 회복가',
    animalLabel: '고양이',
    colorLabel: '잎사귀 초록',
    roomThemeLabel: '포근한 방',
    roomTheme: 'cozy_room',
    routines: ['휴식', '운동', '회고', '독서'],
    stateLabel: '차분한 방에서 회복과 루틴의 균형을 맞추는 중.',
  },
};
