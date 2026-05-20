import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
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
  mockAvatar,
  mockRoom,
  recommendation,
  routineLabels,
  routinePresets,
  setlogFrames,
} from './src/data/mockData';
import { Routine, ScreenName } from './src/models/types';
import { colors, radius, spacing } from './src/theme/tokens';

const onboardingQuestions = [
  {
    title: 'Start style',
    prompt: 'What feels best when the day begins?',
    options: ['Quiet plan', 'Move first', 'Start together', 'Set the room'],
  },
  {
    title: 'Focus space',
    prompt: 'Where does focus feel easiest?',
    options: ['Clean desk', 'Cozy room', 'Quiet cafe', 'Night studio'],
  },
  {
    title: 'Reset cue',
    prompt: 'What helps after a missed routine?',
    options: ['Checkpoint', 'Soft break', 'Small reward', 'Room buddy'],
  },
];

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('onboarding');
  const [currentRoutineId, setCurrentRoutineId] = useState('routine-code');
  const currentRoutine = useMemo(
    () => routinePresets.find((routine) => routine.id === currentRoutineId) ?? routinePresets[0],
    [currentRoutineId],
  );

  const open = (nextScreen: ScreenName) => setScreen(nextScreen);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        <Header screen={screen} onHome={() => open('room')} />
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {screen === 'onboarding' && <OnboardingScreen onDone={() => open('recommendation')} />}
          {screen === 'recommendation' && <RecommendationScreen onAccept={() => open('room')} />}
          {screen === 'room' && (
            <RoomScreen
              currentRoutine={currentRoutine}
              onRoutinePress={() => open('routine')}
              onReplayPress={() => open('replay')}
              onFramePress={() => open('replay')}
            />
          )}
          {screen === 'routine' && (
            <RoutineScreen
              currentRoutineId={currentRoutineId}
              onSelectRoutine={setCurrentRoutineId}
              onDone={() => open('room')}
            />
          )}
          {screen === 'replay' && <ReplayScreen />}
          {screen === 'closet' && <PlaceholderScreen title="Closet" />}
          {screen === 'archive' && <PlaceholderScreen title="Archive" />}
        </ScrollView>
        {screen !== 'onboarding' && screen !== 'recommendation' && (
          <BottomNav current={screen} onNavigate={open} />
        )}
      </View>
    </SafeAreaView>
  );
}

function Header({ screen, onHome }: { screen: ScreenName; onHome: () => void }) {
  const title = screen === 'room' ? 'My Room' : screenTitle(screen);

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.brand}>Roonary</Text>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {screen !== 'onboarding' && (
        <Pressable style={styles.ghostButton} onPress={onHome}>
          <Text style={styles.ghostButtonText}>Room</Text>
        </Pressable>
      )}
    </View>
  );
}

function OnboardingScreen({ onDone }: { onDone: () => void }) {
  return (
    <View style={styles.stack}>
      <Text style={styles.kicker}>MVP 1 onboarding</Text>
      <Text style={styles.heroTitle}>Find the first room shape for your routine.</Text>
      <Text style={styles.bodyText}>
        This draft keeps onboarding light: answer a few routine-style prompts, then accept a
        simple character and room recommendation.
      </Text>
      {onboardingQuestions.map((question) => (
        <View key={question.title} style={styles.panel}>
          <Text style={styles.panelTitle}>{question.title}</Text>
          <Text style={styles.bodyText}>{question.prompt}</Text>
          <View style={styles.optionGrid}>
            {question.options.map((option) => (
              <View key={option} style={styles.optionPill}>
                <Text style={styles.optionText}>{option}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
      <PrimaryButton label="View recommendation" onPress={onDone} />
    </View>
  );
}

function RecommendationScreen({ onAccept }: { onAccept: () => void }) {
  return (
    <View style={styles.stack}>
      <Text style={styles.kicker}>Recommendation</Text>
      <Text style={styles.heroTitle}>{recommendation.presetLabel}</Text>
      <View style={styles.recommendationCard}>
        <RoomIllustration routineLabel="Plan" />
        <MetricRow label="Animal" value={recommendation.animalLabel} />
        <MetricRow label="Base color" value={recommendation.colorLabel} />
        <MetricRow label="Room theme" value={recommendation.roomThemeLabel} />
        <MetricRow label="Routine presets" value={recommendation.routines.join(', ')} />
      </View>
      <PrimaryButton label="Enter My Room" onPress={onAccept} />
    </View>
  );
}

function RoomScreen({
  currentRoutine,
  onRoutinePress,
  onReplayPress,
  onFramePress,
}: {
  currentRoutine: Routine;
  onRoutinePress: () => void;
  onReplayPress: () => void;
  onFramePress: () => void;
}) {
  return (
    <View style={styles.stack}>
      <View style={styles.roomTopline}>
        <View>
          <Text style={styles.kicker}>2026.05.20 Wed</Text>
          <Text style={styles.heroTitle}>My Room</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{currentRoutine.status}</Text>
        </View>
      </View>

      <RoomIllustration routineLabel={currentRoutine.title} />

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Current routine</Text>
        <Text style={styles.bigRoutine}>{currentRoutine.title}</Text>
        <Text style={styles.bodyText}>{mockAvatar.currentStateLabel}</Text>
        <View style={styles.buttonRow}>
          <SecondaryButton label="Set routine" onPress={onRoutinePress} />
          <SecondaryButton label="Daily Replay" onPress={onReplayPress} />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today routines</Text>
        <Text style={styles.subtleText}>{routinePresets.length} presets</Text>
      </View>
      <View style={styles.cardGrid}>
        {routinePresets.map((routine) => (
          <View key={routine.id} style={styles.routineCard}>
            <Text style={styles.cardTitle}>{routine.title}</Text>
            <Text style={styles.subtleText}>{routine.status}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Setlog Frames</Text>
        <Text style={styles.subtleText}>mock data</Text>
      </View>
      {setlogFrames.slice(0, 3).map((frame) => (
        <Pressable key={frame.id} style={styles.frameRow} onPress={onFramePress}>
          <Text style={styles.frameTime}>{frame.timestamp}</Text>
          <View style={styles.frameText}>
            <Text style={styles.cardTitle}>{routineLabels[frame.routineType]}</Text>
            <Text style={styles.subtleText}>{frame.sceneLabel}</Text>
          </View>
        </Pressable>
      ))}
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
      <Text style={styles.kicker}>Today routine setup</Text>
      <Text style={styles.heroTitle}>Choose the routine your room should show now.</Text>
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
              <Text style={styles.subtleText}>{routine.estimatedMinutes} min preset</Text>
            </View>
            <Text style={selected ? styles.selectedText : styles.subtleText}>
              {selected ? 'Current' : routine.status}
            </Text>
          </Pressable>
        );
      })}
      <PrimaryButton label="Back to My Room" onPress={onDone} />
    </View>
  );
}

function ReplayScreen() {
  return (
    <View style={styles.stack}>
      <Text style={styles.kicker}>Daily Replay</Text>
      <Text style={styles.heroTitle}>{dailyReplay.date}</Text>
      <View style={styles.statsGrid}>
        <StatCard label="Room EXP" value={`+${dailyReplay.stats.roomExp}`} />
        <StatCard label="Focus" value={`+${dailyReplay.stats.focus}`} />
        <StatCard label="Wellness" value={`+${dailyReplay.stats.wellness}`} />
        <StatCard label="Creativity" value={`+${dailyReplay.stats.creativity}`} />
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Routine Summary</Text>
        {dailyReplay.routineSummary.map((summary) => (
          <MetricRow
            key={summary.routineType}
            label={routineLabels[summary.routineType]}
            value={`${summary.totalMinutes}m / ${summary.status}`}
          />
        ))}
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Generated Frames</Text>
        {setlogFrames.map((frame) => (
          <View key={frame.id} style={styles.timelineRow}>
            <Text style={styles.frameTime}>{frame.timestamp}</Text>
            <Text style={styles.timelineText}>
              {routineLabels[frame.routineType]} - {frame.variationLabel}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function PlaceholderScreen({ title }: { title: string }) {
  const isCloset = title === 'Closet';

  return (
    <View style={styles.stack}>
      <Text style={styles.kicker}>MVP 1 placeholder</Text>
      <Text style={styles.heroTitle}>{title}</Text>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>{isCloset ? 'Current character' : 'Saved records'}</Text>
        <Text style={styles.bodyText}>
          {isCloset
            ? 'Quiet Planner owl / moss green. Outfits and props are reserved for a later MVP.'
            : 'Today Daily Replay is visible here. Past replay filters are reserved for a later MVP.'}
        </Text>
      </View>
    </View>
  );
}

function RoomIllustration({ routineLabel }: { routineLabel: string }) {
  return (
    <View style={styles.roomScene}>
      <View style={styles.wallShelf} />
      <View style={styles.windowBox} />
      <View style={styles.desk}>
        <View style={styles.monitor} />
        <View style={styles.cup} />
      </View>
      <View style={styles.avatar}>
        <View style={styles.avatarHead} />
        <View style={styles.avatarBody} />
      </View>
      <View style={styles.plant}>
        <View style={styles.plantLeaf} />
        <View style={styles.plantPot} />
      </View>
      <Text style={styles.sceneCaption}>{routineLabel}</Text>
      <Text style={styles.sceneSubcaption}>
        {mockRoom.theme.replace('_', ' ')} / {mockRoom.furnitureLabels.join(', ')}
      </Text>
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
    { label: 'Room', screen: 'room' },
    { label: 'Routine', screen: 'routine' },
    { label: 'Replay', screen: 'replay' },
    { label: 'Closet', screen: 'closet' },
    { label: 'Archive', screen: 'archive' },
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

function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.primaryButton} onPress={onPress}>
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

function screenTitle(screen: ScreenName) {
  const titles: Record<ScreenName, string> = {
    onboarding: 'Onboarding',
    recommendation: 'Recommendation',
    room: 'My Room',
    routine: 'Routine',
    replay: 'Daily Replay',
    closet: 'Closet',
    archive: 'Archive',
  };

  return titles[screen];
}

const styles = StyleSheet.create({
  safeArea: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.paper,
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
  optionText: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: '700',
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
  statusBadge: {
    backgroundColor: '#EEF3EA',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  statusText: {
    color: colors.green,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  roomScene: {
    aspectRatio: 1.18,
    backgroundColor: colors.wall,
    borderColor: colors.line,
    borderRadius: radius.md,
    borderWidth: 1,
    overflow: 'hidden',
    padding: spacing.lg,
    position: 'relative',
  },
  wallShelf: {
    backgroundColor: colors.floor,
    height: 8,
    left: 26,
    position: 'absolute',
    top: 44,
    width: 92,
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
  desk: {
    backgroundColor: colors.floor,
    borderRadius: radius.sm,
    bottom: 78,
    height: 54,
    left: 42,
    position: 'absolute',
    width: 156,
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
  cup: {
    backgroundColor: colors.coral,
    borderRadius: 4,
    height: 18,
    position: 'absolute',
    right: 22,
    top: 14,
    width: 16,
  },
  avatar: {
    alignItems: 'center',
    bottom: 82,
    left: 176,
    position: 'absolute',
  },
  avatarHead: {
    backgroundColor: colors.green,
    borderRadius: 24,
    height: 48,
    width: 48,
  },
  avatarBody: {
    backgroundColor: '#AFC29F',
    borderRadius: 18,
    height: 44,
    marginTop: -8,
    width: 38,
  },
  plant: {
    alignItems: 'center',
    bottom: 78,
    position: 'absolute',
    right: 34,
  },
  plantLeaf: {
    backgroundColor: colors.green,
    borderRadius: 18,
    height: 38,
    width: 36,
  },
  plantPot: {
    backgroundColor: colors.coral,
    borderRadius: 5,
    height: 28,
    marginTop: -2,
    width: 34,
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
  timelineText: {
    color: colors.ink,
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
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
