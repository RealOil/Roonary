import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  dailyReplay,
  defaultRecommendation,
  mockRoom,
  recommendationProfiles,
  routineLabels,
  routinePresets,
  setlogFrames,
} from './src/data/mockData';
import { RecommendationResult, Routine, RoutineType, ScreenName, SetlogFrame } from './src/models/types';
import { colors, radius, spacing } from './src/theme/tokens';

type OnboardingAnswerMap = Record<string, string>;

interface PersistedAppState {
  onboardingCompleted: boolean;
  currentRoutineId: string;
  onboardingAnswers: OnboardingAnswerMap;
  recommendation: RecommendationResult;
  frames: SetlogFrame[];
}

const STORAGE_KEY = 'roonary:mvp1-state-ko-v3';

const onboardingQuestions = [
  {
    id: 'start',
    title: '시작 방식',
    prompt: '하루를 시작할 때 더 끌리는 것은?',
    options: [
      { id: 'planner', label: '조용히 계획하기' },
      { id: 'starter', label: '바로 움직이기' },
      { id: 'buddy', label: '같이 시작하기' },
      { id: 'cozy', label: '분위기 정리하기' },
    ],
  },
  {
    id: 'space',
    title: '집중 공간',
    prompt: '집중이 잘 되는 공간은?',
    options: [
      { id: 'planner', label: '깔끔한 책상' },
      { id: 'cozy', label: '포근한 방' },
      { id: 'buddy', label: '조용한 카페' },
      { id: 'deep', label: '밤의 작업실' },
    ],
  },
  {
    id: 'reset',
    title: '다시 시작',
    prompt: '루틴이 실패했을 때 나에게 필요한 것은?',
    options: [
      { id: 'planner', label: '체크포인트' },
      { id: 'restorer', label: '부담 없는 휴식' },
      { id: 'starter', label: '작은 보상' },
      { id: 'buddy', label: '같이 하는 사람' },
    ],
  },
  {
    id: 'firstRoutine',
    title: '첫 루틴',
    prompt: 'Roonary가 가장 먼저 도와줬으면 하는 루틴은?',
    options: [
      { id: 'deep', label: '업무 / 공부' },
      { id: 'cozy', label: '독서' },
      { id: 'restorer', label: '운동 / 회복' },
      { id: 'planner', label: '계획 / 회고' },
    ],
  },
];

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('onboarding');
  const [hydrated, setHydrated] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [onboardingAnswers, setOnboardingAnswers] = useState<OnboardingAnswerMap>({});
  const [recommendation, setRecommendation] =
    useState<RecommendationResult>(defaultRecommendation);
  const [currentRoutineId, setCurrentRoutineId] = useState('routine-code');
  const [frames, setFrames] = useState<SetlogFrame[]>(setlogFrames);

  const currentRoutine = useMemo(
    () => routinePresets.find((routine) => routine.id === currentRoutineId) ?? routinePresets[0],
    [currentRoutineId],
  );

  useEffect(() => {
    let mounted = true;

    async function hydrate() {
      try {
        const rawState = await AsyncStorage.getItem(STORAGE_KEY);
        if (!mounted) {
          return;
        }

        if (rawState) {
          const saved = JSON.parse(rawState) as PersistedAppState;
          setOnboardingCompleted(saved.onboardingCompleted);
          setCurrentRoutineId(saved.currentRoutineId);
          setOnboardingAnswers(saved.onboardingAnswers);
          setRecommendation(saved.recommendation);
          setFrames(saved.frames?.length ? saved.frames : setlogFrames);
          setScreen(saved.onboardingCompleted ? 'room' : 'onboarding');
        }
      } catch {
        setScreen('onboarding');
      } finally {
        if (mounted) {
          setHydrated(true);
        }
      }
    }

    hydrate();

    return () => {
      mounted = false;
    };
  }, []);

  const persist = async (nextState: PersistedAppState) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  };

  const open = (nextScreen: ScreenName) => setScreen(nextScreen);

  const selectAnswer = (questionId: string, optionId: string) => {
    const nextAnswers = { ...onboardingAnswers, [questionId]: optionId };
    setOnboardingAnswers(nextAnswers);
    setRecommendation(buildRecommendation(nextAnswers));
  };

  const acceptRecommendation = async () => {
    const nextState = {
      onboardingCompleted: true,
      currentRoutineId,
      onboardingAnswers,
      recommendation,
      frames,
    };
    setOnboardingCompleted(true);
    await persist(nextState);
    open('room');
  };

  const selectCurrentRoutine = async (routineId: string) => {
    setCurrentRoutineId(routineId);
    if (onboardingCompleted) {
      await persist({
        onboardingCompleted,
        currentRoutineId: routineId,
        onboardingAnswers,
        recommendation,
        frames,
      });
    }
  };

  const generateFrame = async () => {
    const nextFrame = createSetlogFrame(currentRoutine, recommendation, frames.length);
    const nextFrames = [nextFrame, ...frames];
    setFrames(nextFrames);

    if (onboardingCompleted) {
      await persist({
        onboardingCompleted,
        currentRoutineId,
        onboardingAnswers,
        recommendation,
        frames: nextFrames,
      });
    }
  };

  const resetFrames = async () => {
    setFrames(setlogFrames);
    if (onboardingCompleted) {
      await persist({
        onboardingCompleted,
        currentRoutineId,
        onboardingAnswers,
        recommendation,
        frames: setlogFrames,
      });
    }
  };

  const resetOnboarding = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setOnboardingCompleted(false);
    setOnboardingAnswers({});
    setRecommendation(defaultRecommendation);
    setCurrentRoutineId('routine-code');
    setFrames(setlogFrames);
    open('onboarding');
  };

  if (!hydrated) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.loadingShell}>
          <Text style={styles.brand}>Roonary</Text>
          <Text style={styles.headerTitle}>방을 여는 중...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        {screen !== 'room' && <Header screen={screen} onHome={() => open('room')} />}
        <ScrollView
          contentContainerStyle={[styles.content, screen === 'room' && styles.roomContent]}
          showsVerticalScrollIndicator={false}
        >
          {screen === 'onboarding' && (
            <OnboardingScreen
              answers={onboardingAnswers}
              onSelectAnswer={selectAnswer}
              onDone={() => open('recommendation')}
            />
          )}
          {screen === 'recommendation' && (
            <RecommendationScreen recommendation={recommendation} onAccept={acceptRecommendation} />
          )}
          {screen === 'room' && (
            <RoomScreen
              currentRoutine={currentRoutine}
              recommendation={recommendation}
            />
          )}
          {screen === 'routine' && (
            <RoutineScreen
              currentRoutineId={currentRoutineId}
              onSelectRoutine={selectCurrentRoutine}
              onDone={() => open('room')}
            />
          )}
          {screen === 'replay' && (
            <ReplayScreen
              frames={frames}
              currentRoutine={currentRoutine}
              onGenerateFrame={generateFrame}
              onResetFrames={resetFrames}
            />
          )}
          {screen === 'closet' && (
            <PlaceholderScreen
              title="옷장"
              recommendation={recommendation}
              onReset={resetOnboarding}
            />
          )}
          {screen === 'archive' && (
            <PlaceholderScreen
              title="아카이브"
              recommendation={recommendation}
              onReset={resetOnboarding}
            />
          )}
        </ScrollView>
        {screen !== 'onboarding' && screen !== 'recommendation' && (
          <BottomNav current={screen} onNavigate={open} />
        )}
      </View>
    </SafeAreaView>
  );
}

function Header({ screen, onHome }: { screen: ScreenName; onHome: () => void }) {
  const title = screen === 'room' ? '내 방' : screenTitle(screen);

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.brand}>Roonary</Text>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {screen !== 'onboarding' && (
        <Pressable style={styles.ghostButton} onPress={onHome}>
          <Text style={styles.ghostButtonText}>방</Text>
        </Pressable>
      )}
    </View>
  );
}

function OnboardingScreen({
  answers,
  onSelectAnswer,
  onDone,
}: {
  answers: OnboardingAnswerMap;
  onSelectAnswer: (questionId: string, optionId: string) => void;
  onDone: () => void;
}) {
  const answeredCount = Object.keys(answers).length;
  const canContinue = answeredCount === onboardingQuestions.length;

  return (
    <View style={styles.stack}>
      <Text style={styles.kicker}>MVP 1 온보딩</Text>
      <Text style={styles.heroTitle}>내 루틴에 맞는 첫 방을 찾아볼게요.</Text>
      <Text style={styles.bodyText}>
        질문마다 하나씩 골라주세요. 선택 결과를 바탕으로 캐릭터, 방 테마, 추천 루틴을
        제안합니다.
      </Text>
      {onboardingQuestions.map((question) => (
        <View key={question.id} style={styles.panel}>
          <View style={styles.questionHeader}>
            <Text style={styles.panelTitle}>{question.title}</Text>
            <Text style={styles.subtleText}>{answers[question.id] ? '선택됨' : '필수'}</Text>
          </View>
          <Text style={styles.bodyText}>{question.prompt}</Text>
          <View style={styles.optionGrid}>
            {question.options.map((option) => {
              const selected = answers[question.id] === option.id;
              return (
                <Pressable
                  key={option.label}
                  style={[styles.optionPill, selected && styles.optionPillActive]}
                  onPress={() => onSelectAnswer(question.id, option.id)}
                >
                  <Text style={[styles.optionText, selected && styles.optionTextActive]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ))}
      <PrimaryButton
        disabled={!canContinue}
        label={canContinue ? '추천 결과 보기' : `${answeredCount}/4 선택됨`}
        onPress={onDone}
      />
    </View>
  );
}

function RecommendationScreen({
  recommendation,
  onAccept,
}: {
  recommendation: RecommendationResult;
  onAccept: () => void;
}) {
  return (
    <View style={styles.stack}>
      <Text style={styles.kicker}>추천 결과</Text>
      <Text style={styles.heroTitle}>{recommendation.presetLabel}</Text>
      <View style={styles.recommendationCard}>
        <RoomIllustration routineLabel="계획" routineType="plan" recommendation={recommendation} />
        <MetricRow label="캐릭터" value={recommendation.animalLabel} />
        <MetricRow label="기본 색상" value={recommendation.colorLabel} />
        <MetricRow label="방 테마" value={recommendation.roomThemeLabel} />
        <MetricRow label="추천 루틴" value={recommendation.routines.join(', ')} />
      </View>
      <PrimaryButton label="내 방으로 들어가기" onPress={onAccept} />
    </View>
  );
}

function RoomScreen({
  currentRoutine,
  recommendation,
}: {
  currentRoutine: Routine;
  recommendation: RecommendationResult;
}) {
  const [currentTime, setCurrentTime] = useState(formatCurrentTimeLabel());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(formatCurrentTimeLabel());
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.roomExperience}>
      <RoomIllustration
        routineLabel={currentRoutine.title}
        routineType={currentRoutine.type}
        recommendation={recommendation}
        size="large"
      />

      <View style={styles.roomOverlayTop}>
        <View>
          <Text style={styles.roomDateText}>{formatTodayLabel()}</Text>
          <Text style={styles.roomTimeText}>{currentTime}</Text>
        </View>
        <View style={styles.roomRoutineBadge}>
          <Text style={styles.roomRoutineKicker}>현재 루틴</Text>
          <Text style={styles.roomRoutineText}>{currentRoutine.title}</Text>
        </View>
      </View>
    </View>
  );
}

function RoutineScreen({
  currentRoutineId,
  onSelectRoutine,
  onDone,
}: {
  currentRoutineId: string;
  onSelectRoutine: (routineId: string) => void;
  onDone: () => void;
}) {
  return (
    <View style={styles.stack}>
      <Text style={styles.kicker}>오늘의 루틴 설정</Text>
      <Text style={styles.heroTitle}>지금 방에 보여줄 루틴을 골라주세요.</Text>
      {routinePresets.map((routine) => {
        const selected = routine.id === currentRoutineId;
        return (
          <Pressable
            key={routine.id}
            style={[styles.selectRow, selected && styles.selectRowActive]}
            onPress={() => onSelectRoutine(routine.id)}
          >
            <View>
              <Text style={styles.cardTitle}>{routine.title}</Text>
              <Text style={styles.subtleText}>{routine.estimatedMinutes}분 프리셋</Text>
            </View>
            <Text style={selected ? styles.selectedText : styles.subtleText}>
              {selected ? '현재 선택' : statusLabel(routine.status)}
            </Text>
          </Pressable>
        );
      })}
      <PrimaryButton label="내 방으로 돌아가기" onPress={onDone} />
    </View>
  );
}

function ReplayScreen({
  frames,
  currentRoutine,
  onGenerateFrame,
  onResetFrames,
}: {
  frames: SetlogFrame[];
  currentRoutine: Routine;
  onGenerateFrame: () => void;
  onResetFrames: () => void;
}) {
  const [selectedFrameId, setSelectedFrameId] = useState(frames[0]?.id);
  const replaySummary = buildReplaySummary(frames);
  const replayStats = buildReplayStats(frames);
  const selectedFrame =
    frames.find((frame) => frame.id === selectedFrameId) ?? frames[0] ?? setlogFrames[0];

  useEffect(() => {
    setSelectedFrameId(frames[0]?.id);
  }, [frames]);

  return (
    <View style={styles.stack}>
      <Text style={styles.kicker}>데일리 리플레이</Text>
      <Text style={styles.heroTitle}>{dailyReplay.date}</Text>
      <View style={styles.buttonRow}>
        <SecondaryButton
          label={`${currentRoutine.title} 프레임 생성`}
          onPress={onGenerateFrame}
        />
        <SecondaryButton label="프레임 초기화" onPress={onResetFrames} />
      </View>
      <View style={styles.statsGrid}>
        <StatCard label="방 EXP" value={`+${replayStats.roomExp}`} />
        <StatCard label="집중" value={`+${replayStats.focus}`} />
        <StatCard label="회복" value={`+${replayStats.wellness}`} />
        <StatCard label="창작" value={`+${replayStats.creativity}`} />
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>루틴 요약</Text>
        {replaySummary.map((summary) => (
          <MetricRow
            key={summary.routineType}
            label={routineLabels[summary.routineType]}
            value={`${summary.totalMinutes}분 / ${summaryStatusLabel(summary.status)}`}
          />
        ))}
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>생성된 프레임</Text>
        {frames.map((frame) => (
          <Pressable
            key={frame.id}
            style={[
              styles.timelineRow,
              selectedFrame.id === frame.id && styles.timelineRowActive,
            ]}
            onPress={() => setSelectedFrameId(frame.id)}
          >
            <Text style={styles.frameTime}>{frame.timestamp}</Text>
            <Text style={styles.timelineText}>
              {routineLabels[frame.routineType]} - {frame.variationLabel}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.panel}>
        <View style={styles.frameDetailHeader}>
          <Text style={styles.panelTitle}>프레임 상세</Text>
          <Text style={styles.frameTime}>{selectedFrame.timestamp}</Text>
        </View>
        <MetricRow label="루틴" value={routineLabels[selectedFrame.routineType]} />
        <MetricRow label="상태" value={statusLabel(selectedFrame.routineStatus)} />
        <MetricRow label="장면" value={selectedFrame.sceneLabel} />
        <MetricRow label="Variation" value={selectedFrame.variationLabel} />
      </View>
    </View>
  );
}

function PlaceholderScreen({
  title,
  recommendation,
  onReset,
}: {
  title: string;
  recommendation: RecommendationResult;
  onReset: () => void;
}) {
  const isCloset = title === '옷장';

  return (
    <View style={styles.stack}>
      <Text style={styles.kicker}>MVP 1 자리 표시</Text>
      <Text style={styles.heroTitle}>{title}</Text>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>{isCloset ? '현재 캐릭터' : '저장된 기록'}</Text>
        <Text style={styles.bodyText}>
          {isCloset
            ? `${recommendation.presetLabel} ${recommendation.animalLabel} / ${recommendation.colorLabel}. 의상과 소품은 다음 MVP에서 확장합니다.`
            : '오늘의 데일리 리플레이가 이곳에 표시됩니다. 과거 기록 필터는 다음 MVP에서 확장합니다.'}
        </Text>
      </View>
      {isCloset && <SecondaryButton label="온보딩 다시 하기" onPress={onReset} />}
    </View>
  );
}

function RoomIllustration({
  routineLabel,
  routineType,
  recommendation,
  size = 'normal',
}: {
  routineLabel: string;
  routineType: RoutineType;
  recommendation: RecommendationResult;
  size?: 'normal' | 'large';
}) {
  const roomColor = roomThemeColor(recommendation.roomTheme);
  const scene = routineSceneMap[routineType];

  return (
    <View
      style={[
        styles.roomScene,
        size === 'large' && styles.roomSceneLarge,
        { backgroundColor: roomColor.wall },
      ]}
    >
      <View
        style={[
          styles.wallShelf,
          size === 'large' && styles.wallShelfLarge,
          { backgroundColor: roomColor.accent },
        ]}
      />
      <View style={[styles.windowBox, size === 'large' && styles.windowBoxLarge]} />
      <View
        style={[
          styles.desk,
          size === 'large' && styles.deskLarge,
          { backgroundColor: roomColor.floor },
        ]}
      >
        <View style={[styles.monitor, size === 'large' && styles.monitorLarge]} />
        <View style={[styles.cup, size === 'large' && styles.cupLarge]} />
      </View>
      <View style={[styles.avatar, size === 'large' && styles.avatarLarge]}>
        <View
          style={[
            styles.avatarHead,
            size === 'large' && styles.avatarHeadLarge,
            { backgroundColor: roomColor.avatar },
          ]}
        />
        <View
          style={[
            styles.avatarBody,
            size === 'large' && styles.avatarBodyLarge,
            { backgroundColor: roomColor.avatarSoft },
          ]}
        />
      </View>
      <View style={[styles.plant, size === 'large' && styles.plantLarge]}>
        <View style={[styles.plantLeaf, size === 'large' && styles.plantLeafLarge]} />
        <View style={[styles.plantPot, size === 'large' && styles.plantPotLarge]} />
      </View>
      <View style={[styles.routineProp, size === 'large' && styles.routinePropLarge, scene.propStyle]}>
        {size !== 'large' && <Text style={styles.routinePropText}>{scene.symbol}</Text>}
      </View>
      {size !== 'large' && <Text style={styles.sceneActionLabel}>{scene.label}</Text>}
      {size !== 'large' && (
        <>
          <Text style={styles.sceneCaption}>{routineLabel}</Text>
          <Text style={styles.sceneSubcaption}>
            {recommendation.roomThemeLabel} / {mockRoom.furnitureLabels.join(', ')}
          </Text>
        </>
      )}
    </View>
  );
}

function BottomNav({
  current,
  onNavigate,
}: {
  current: ScreenName;
  onNavigate: (screen: ScreenName) => void;
}) {
  const items: { label: string; screen: ScreenName }[] = [
    { label: '방', screen: 'room' },
    { label: '루틴', screen: 'routine' },
    { label: '리플레이', screen: 'replay' },
    { label: '옷장', screen: 'closet' },
    { label: '아카이브', screen: 'archive' },
  ];

  return (
    <View style={styles.nav}>
      {items.map((item) => {
        const active = item.screen === current;
        return (
          <Pressable
            key={item.screen}
            style={[styles.navItem, active && styles.navItemActive]}
            onPress={() => onNavigate(item.screen)}
          >
            <Text style={[styles.navText, active && styles.navTextActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function PrimaryButton({
  disabled = false,
  label,
  onPress,
}: {
  disabled?: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      disabled={disabled}
      style={[styles.primaryButton, disabled && styles.primaryButtonDisabled]}
      onPress={onPress}
    >
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

function SecondaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.secondaryButton} onPress={onPress}>
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </Pressable>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricRow}>
      <Text style={styles.subtleText}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.subtleText}>{label}</Text>
    </View>
  );
}

function buildRecommendation(answers: OnboardingAnswerMap): RecommendationResult {
  const scores = Object.values(answers).reduce<Record<string, number>>((acc, profileKey) => {
    acc[profileKey] = (acc[profileKey] ?? 0) + 1;
    return acc;
  }, {});

  const winningKey =
    Object.entries(scores).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] ??
    'planner';

  return recommendationProfiles[winningKey] ?? defaultRecommendation;
}

function createSetlogFrame(
  routine: Routine,
  recommendation: RecommendationResult,
  frameIndex: number,
): SetlogFrame {
  const now = new Date();
  const timestamp = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);
  const variation = routineVariations[routine.type][frameIndex % routineVariations[routine.type].length];

  return {
    id: `frame-${Date.now()}`,
    type: 'my',
    userId: 'user-yujin',
    timestamp,
    routineType: routine.type,
    routineStatus: routine.status,
    sceneLabel: `${recommendation.roomThemeLabel}에서 ${routine.title}`,
    variationLabel: variation,
    roomTheme: recommendation.roomTheme,
  };
}

function buildReplaySummary(frames: SetlogFrame[]) {
  const totals = frames.reduce<Partial<Record<RoutineType, number>>>((acc, frame) => {
    acc[frame.routineType] = (acc[frame.routineType] ?? 0) + 60;
    return acc;
  }, {});

  return Object.entries(totals).map(([routineType, totalMinutes]) => ({
    routineType: routineType as RoutineType,
    totalMinutes: totalMinutes ?? 0,
    status: 'partial' as const,
  }));
}

function buildReplayStats(frames: SetlogFrame[]) {
  const focusFrames = frames.filter((frame) =>
    ['code_work', 'read', 'plan', 'review'].includes(frame.routineType),
  ).length;
  const wellnessFrames = frames.filter((frame) =>
    ['rest', 'workout'].includes(frame.routineType),
  ).length;
  const creativityFrames = frames.filter((frame) => frame.routineType === 'create').length;

  return {
    roomExp: frames.length * 8,
    focus: focusFrames * 4,
    wellness: wellnessFrames * 4,
    creativity: creativityFrames * 5,
  };
}

const routineVariations: Record<RoutineType, string[]> = {
  code_work: ['노트북 집중', '커피 옆 타이핑', '작업 보드 정리'],
  read: ['소파 독서', '차와 함께 책 읽기', '책장 앞 메모'],
  workout: ['가벼운 스트레칭', '매트 운동', '물 마시기'],
  plan: ['플래너 펼치기', '체크리스트 정리', '보드에 목표 적기'],
  review: ['하루 로그 확인', '다이어리 정리', '책상 정리'],
  create: ['아이디어 스케치', '도구 펼치기', '초안 다듬기'],
  rest: ['차 마시기', '화분 옆 휴식', '담요 아래 쉬기'],
};

const routineSceneMap: Record<
  RoutineType,
  { label: string; symbol: string; propStyle: { backgroundColor: string } }
> = {
  code_work: {
    label: '책상 집중',
    symbol: '⌨',
    propStyle: { backgroundColor: '#DCE7EA' },
  },
  read: {
    label: '소파 독서',
    symbol: '책',
    propStyle: { backgroundColor: '#E8D8A8' },
  },
  workout: {
    label: '매트 운동',
    symbol: '매트',
    propStyle: { backgroundColor: '#BFD7B5' },
  },
  plan: {
    label: '계획 정리',
    symbol: '체크',
    propStyle: { backgroundColor: '#DFE8CF' },
  },
  review: {
    label: '회고 기록',
    symbol: '로그',
    propStyle: { backgroundColor: '#E8D6C8' },
  },
  create: {
    label: '창작 도구',
    symbol: '펜',
    propStyle: { backgroundColor: '#E4D4EA' },
  },
  rest: {
    label: '휴식 코너',
    symbol: '차',
    propStyle: { backgroundColor: '#EAD7C2' },
  },
};

function roomThemeColor(roomTheme: RecommendationResult['roomTheme']) {
  const themes = {
    clean_desk: {
      wall: colors.wall,
      floor: colors.floor,
      accent: colors.green,
      avatar: colors.green,
      avatarSoft: '#AFC29F',
    },
    cozy_room: {
      wall: '#EBD6C7',
      floor: '#CFA88F',
      accent: colors.coral,
      avatar: colors.coral,
      avatarSoft: '#DDA28C',
    },
    quiet_cafe: {
      wall: '#D8E1DC',
      floor: '#B7A17B',
      accent: colors.blue,
      avatar: colors.yellow,
      avatarSoft: '#E0C875',
    },
    night_studio: {
      wall: '#CED7DF',
      floor: '#9BA9B6',
      accent: colors.blue,
      avatar: colors.blue,
      avatarSoft: '#8CA3B5',
    },
    home_gym: {
      wall: '#DDE4D4',
      floor: '#B9C4A8',
      accent: colors.green,
      avatar: colors.green,
      avatarSoft: '#B8C9A8',
    },
  };

  return themes[roomTheme];
}

function formatTodayLabel() {
  return new Intl.DateTimeFormat('ko-KR', {
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).format(new Date());
}

function formatCurrentTimeLabel() {
  return new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
}

function screenTitle(screen: ScreenName) {
  const titles: Record<ScreenName, string> = {
    onboarding: '온보딩',
    recommendation: '추천 결과',
    room: '내 방',
    routine: '루틴',
    replay: '데일리 리플레이',
    closet: '옷장',
    archive: '아카이브',
  };

  return titles[screen];
}

function statusLabel(status: Routine['status']) {
  const labels: Record<Routine['status'], string> = {
    planned: '예정',
    active: '진행 중',
    completed: '완료',
    deferred: '미룸',
    skipped: '건너뜀',
  };

  return labels[status];
}

function summaryStatusLabel(status: 'completed' | 'partial' | 'deferred' | 'skipped') {
  const labels = {
    completed: '완료',
    partial: '일부 진행',
    deferred: '미룸',
    skipped: '건너뜀',
  };

  return labels[status];
}

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.paper,
  },
  loadingShell: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  appShell: {
    flex: 1,
    backgroundColor: colors.paper,
    maxWidth: 480,
    overflow: 'hidden',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    borderBottomColor: colors.line,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  brand: {
    color: colors.green,
    fontSize: 13,
    fontWeight: '700',
  },
  headerTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 2,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: 104,
  },
  roomContent: {
    flexGrow: 1,
    padding: 0,
    paddingBottom: 70,
  },
  stack: {
    gap: spacing.lg,
  },
  kicker: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  bodyText: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  panel: {
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  questionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  panelTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: '800',
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  optionPill: {
    backgroundColor: '#EEF3EA',
    borderColor: colors.green,
    borderRadius: radius.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  optionPillActive: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  optionText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '700',
  },
  optionTextActive: {
    color: colors.panel,
  },
  recommendationCard: {
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.lg,
  },
  roomTopline: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  roomExperience: {
    flex: 1,
    minHeight: 650,
    position: 'relative',
  },
  roomOverlayTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: spacing.lg,
    position: 'absolute',
    right: spacing.lg,
    top: spacing.lg,
    zIndex: 2,
  },
  roomDateText: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '800',
  },
  roomTimeText: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34,
  },
  roomRoutineBadge: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(250, 246, 238, 0.82)',
    borderColor: colors.line,
    borderRadius: radius.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  roomRoutineKicker: {
    color: colors.green,
    fontSize: 11,
    fontWeight: '800',
  },
  roomRoutineText: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '900',
  },
  roomScene: {
    aspectRatio: 1.18,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: 'hidden',
    padding: spacing.lg,
    position: 'relative',
  },
  roomSceneLarge: {
    aspectRatio: undefined,
    flex: 1,
    minHeight: 650,
    borderRadius: 0,
    borderWidth: 0,
  },
  wallShelf: {
    height: 8,
    left: 26,
    position: 'absolute',
    top: 44,
    width: 92,
  },
  wallShelfLarge: {
    left: 48,
    top: 118,
    width: 132,
  },
  windowBox: {
    backgroundColor: '#C8D8D7',
    borderColor: colors.blue,
    borderRadius: radius.sm,
    borderWidth: 2,
    height: 62,
    position: 'absolute',
    right: 28,
    top: 32,
    width: 76,
  },
  windowBoxLarge: {
    height: 86,
    right: 28,
    top: 92,
    width: 82,
  },
  desk: {
    borderRadius: radius.sm,
    bottom: 78,
    height: 54,
    left: 42,
    position: 'absolute',
    width: 156,
  },
  deskLarge: {
    bottom: 268,
    height: 72,
    left: 58,
    width: 190,
  },
  monitor: {
    backgroundColor: colors.blue,
    borderRadius: 4,
    height: 34,
    left: 22,
    position: 'absolute',
    top: -24,
    width: 54,
  },
  monitorLarge: {
    height: 44,
    left: 26,
    top: -32,
    width: 70,
  },
  cup: {
    backgroundColor: colors.coral,
    borderRadius: 4,
    height: 18,
    position: 'absolute',
    right: 22,
    top: 14,
    width: 16,
  },
  cupLarge: {
    height: 22,
    right: 28,
    top: 18,
    width: 20,
  },
  avatar: {
    alignItems: 'center',
    bottom: 82,
    left: 176,
    position: 'absolute',
  },
  avatarLarge: {
    bottom: 274,
    left: 214,
  },
  avatarHead: {
    borderRadius: 24,
    height: 48,
    width: 48,
  },
  avatarHeadLarge: {
    borderRadius: 32,
    height: 64,
    width: 64,
  },
  avatarBody: {
    borderRadius: 18,
    height: 44,
    marginTop: -8,
    width: 38,
  },
  avatarBodyLarge: {
    borderRadius: 22,
    height: 58,
    marginTop: -10,
    width: 50,
  },
  plant: {
    alignItems: 'center',
    bottom: 78,
    position: 'absolute',
    right: 34,
  },
  plantLarge: {
    bottom: 278,
    right: 46,
  },
  plantLeaf: {
    backgroundColor: colors.green,
    borderRadius: 18,
    height: 38,
    width: 36,
  },
  plantLeafLarge: {
    borderRadius: 24,
    height: 52,
    width: 50,
  },
  plantPot: {
    backgroundColor: colors.coral,
    borderRadius: 5,
    height: 28,
    marginTop: -2,
    width: 34,
  },
  plantPotLarge: {
    height: 36,
    width: 44,
  },
  routineProp: {
    alignItems: 'center',
    borderColor: colors.line,
    borderRadius: radius.sm,
    borderWidth: 1,
    bottom: 84,
    height: 34,
    justifyContent: 'center',
    left: 92,
    position: 'absolute',
    width: 54,
  },
  routinePropLarge: {
    bottom: 332,
    height: 44,
    left: 96,
    width: 74,
  },
  routinePropText: {
    color: colors.ink,
    fontSize: 11,
    fontWeight: '900',
  },
  sceneActionLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '800',
    left: 154,
    position: 'absolute',
    top: 118,
  },
  sceneCaption: {
    bottom: 34,
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
    left: spacing.lg,
    position: 'absolute',
  },
  sceneSubcaption: {
    bottom: 16,
    color: colors.muted,
    fontSize: 12,
    left: spacing.lg,
    position: 'absolute',
    right: spacing.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.ink,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  primaryButtonDisabled: {
    backgroundColor: colors.line,
  },
  primaryButtonText: {
    color: colors.panel,
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    alignItems: 'center',
    borderColor: colors.ink,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  secondaryButtonText: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: '800',
  },
  ghostButton: {
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  ghostButtonText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '800',
  },
  bigRoutine: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: '900',
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: '900',
  },
  subtleText: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  routineCard: {
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    minWidth: '30%',
    padding: spacing.md,
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: '800',
  },
  frameRow: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
  },
  frameTime: {
    color: colors.blue,
    fontSize: 14,
    fontWeight: '900',
    width: 48,
  },
  frameText: {
    flex: 1,
  },
  selectRow: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  selectRowActive: {
    backgroundColor: '#EEF3EA',
    borderColor: colors.green,
  },
  selectedText: {
    color: colors.green,
    fontSize: 13,
    fontWeight: '900',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statCard: {
    backgroundColor: colors.panel,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    flexGrow: 1,
    minWidth: '45%',
    padding: spacing.md,
  },
  statValue: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: '900',
  },
  metricRow: {
    alignItems: 'center',
    borderTopColor: colors.line,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.sm,
  },
  metricValue: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    textAlign: 'right',
  },
  timelineRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  timelineRowActive: {
    backgroundColor: '#EEF3EA',
    borderRadius: radius.sm,
    marginHorizontal: -spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  timelineText: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
  },
  frameDetailHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  nav: {
    backgroundColor: colors.panel,
    borderTopColor: colors.line,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: 'row',
    gap: spacing.xs,
    left: 0,
    padding: spacing.sm,
    position: 'absolute',
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    borderRadius: radius.md,
    flex: 1,
    paddingVertical: spacing.sm,
  },
  navItemActive: {
    backgroundColor: '#EEF3EA',
  },
  navText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: '800',
  },
  navTextActive: {
    color: colors.green,
  },
});
