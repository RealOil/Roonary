# Roonary MVP 1 Spec
> 목적: Roonary 1차 MVP에서 구현할 기능과 구현하지 않을 기능을 명확히 정의한다.

---

## 1. MVP 1 목표

MVP 1은 개인 루틴 경험만 검증한다.

핵심 질문:

```text
사용자가 자신의 루틴을 선택했을 때,
그 루틴이 작은 동물 캐릭터의 방 장면과 Setlog Frame, Daily Replay로 바뀌는 경험이 매력적인가?
```

MVP 1은 공유 방, 로그인, 서버 저장 없이도 성립해야 한다.

---

## 2. MVP 1 포함 범위

```text
Onboarding
My Room
Today's Routine setup
Routine-based character state
Seed Setlog Frame list
Manual Setlog Frame generation
Daily Replay
Closet placeholder
Archive placeholder
```

언어 기준:

```text
앱 내부 표시 언어는 한국어로 고정한다.
제품명 Roonary와 일부 약어(MVP, EXP)는 그대로 사용할 수 있다.
```

---

## 3. MVP 1 제외 범위

```text
회원가입/로그인
서버 API
클라우드 DB
Shared Room
초대 링크
실시간 동기화
Group Replay
채팅
결제/상점
복잡한 방 꾸미기
사용자 제작 루틴
푸시 알림
앱스토어 배포
```

---

## 4. 사용자 흐름

```text
앱 첫 실행
-> Onboarding
-> 추천 결과 확인
-> My Room 입장
-> 오늘의 루틴 선택
-> 현재 루틴 선택 또는 시작
-> My Room에서 캐릭터 상태 확인
-> Setlog Frame 목록 확인
-> Daily Replay 확인
-> Closet/Archive placeholder 확인
```

재방문 흐름:

```text
앱 실행
-> My Room
-> 오늘의 루틴 확인/수정
-> Daily Replay 확인
```

---

## 5. 화면별 명세

### 5.1 Onboarding

목적:

```text
사용자의 루틴 성향을 가볍게 파악하고 캐릭터/방/추천 루틴을 제안한다.
```

기능:

```text
4개 질문 표시
각 질문은 4개 선택지 제공
선택 결과에 따라 캐릭터 프리셋 추천
추천 결과 화면 표시
추천 결과 수락
기본적인 대체 선택 허용
```

질문 예시:

```text
하루를 시작할 때 더 끌리는 것은?
집중이 잘 되는 공간은?
루틴이 실패했을 때 나에게 필요한 것은?
가장 먼저 도움받고 싶은 루틴은?
```

추천 결과:

```text
Character preset
Animal type
Base color
Room theme
Recommended routine presets
```

MVP 제약:

```text
복잡한 성격 시스템은 만들지 않는다.
점수 기반 간단 매핑으로 충분하다.
```

---

### 5.2 My Room

목적:

```text
사용자가 자신의 방과 현재 캐릭터 장면을 가장 먼저 확인하는 기본 화면.
```

구성:

```text
상단: 날짜와 현재 루틴 상태
중앙: 화면을 크게 차지하는 2D 방 장면
장면 내부/하단: 작은 동물 캐릭터와 현재 루틴 라벨
보조 영역: 루틴 설정과 Daily Replay 이동 버튼
하단 네비게이션: Room, Routine, Replay, Closet, Archive
```

기능:

```text
현재 선택된 루틴 표시
루틴에 따른 캐릭터 상태 문구 표시
Daily Replay로 이동
Routine setup으로 이동
Closet/Archive로 이동
```

MVP 시각화:

```text
실제 애니메이션 대신 정적 scene card 또는 간단한 2D 구성으로 시작한다.
루틴별 캐릭터 자세/소품은 텍스트와 간단한 그래픽으로 표현해도 된다.
My Room에서는 루틴 목록과 프레임 목록보다 방 장면을 우선한다.
루틴 목록은 Routine 화면에서, 프레임 목록은 Replay 화면에서 확인한다.
```

---

### 5.3 Today's Routine Setup

목적:

```text
사용자가 오늘 수행할 루틴을 프리셋에서 선택한다.
```

루틴 프리셋:

```text
Code / Work
Read
Workout
Plan
Review
Create
Rest
```

기능:

```text
프리셋 루틴 목록 표시
여러 루틴 선택 가능
선택된 루틴 저장
현재 루틴 선택 가능
My Room으로 돌아가기
```

MVP 제약:

```text
사용자 커스텀 루틴 생성은 제공하지 않는다.
루틴별 세부 시간 설정은 제공하지 않아도 된다.
```

---

### 5.4 Setlog Frame List

목적:

```text
오늘의 루틴이 1시간 단위 기록물로 쌓이는 느낌을 보여준다.
```

기능:

```text
초기 seed Setlog Frame 목록 표시
My Room에서 현재 루틴 기준 Setlog Frame 수동 생성
시간, 루틴, 상태, variation 표시
프레임 선택 시 시간, 루틴, 상태, 장면, variation 상세 표시
```

Frame 예시:

```text
08:00 Plan - planner board
10:00 Code / Work - laptop desk
14:00 Rest - tea break
18:00 Workout - yoga mat
22:00 Read - sofa reading
```

MVP 제약:

```text
실제 매시 정각 자동 생성은 구현하지 않는다.
우선 seed 데이터와 수동 생성으로 화면 경험을 검증한다.
```

---

### 5.5 Daily Replay

목적:

```text
하루 루틴을 기록물처럼 요약해 다시 볼 수 있게 한다.
```

구성:

```text
날짜
Routine Summary
Generated Frames
간단한 stat
Archive 저장 상태
```

기능:

```text
오늘 생성된 frame을 시간순으로 표시
루틴별 총 시간/상태 표시
My Room으로 돌아가기
Archive placeholder로 이동
```

문구 원칙:

```text
감성 문장보다 로그 정보를 우선한다.
시간, 루틴, 상태, 수치 중심으로 표시한다.
```

---

### 5.6 Closet Placeholder

목적:

```text
캐릭터/아이템 커스터마이징이 확장될 자리를 보여준다.
```

MVP 기능:

```text
현재 캐릭터 프리셋 표시
현재 animal type/base color 표시
Coming soon 또는 placeholder 상태 표시
```

---

### 5.7 Archive Placeholder

목적:

```text
Daily Replay와 Setlog 결과물이 저장되는 공간을 예고한다.
```

MVP 기능:

```text
오늘 Daily Replay 카드 표시
과거 기록 placeholder 표시
```

---

## 6. Mock Data

MVP 1은 다음 mock 데이터를 사용한다.

```text
User:
- id
- nickname

Avatar:
- preset
- animalType
- baseColor

MyRoom:
- theme
- furniture placeholders

Routine:
- type
- title
- status

SetlogFrame:
- timestamp
- routineType
- routineStatus
- variationLabel
- sceneLabel

DailyReplay:
- date
- frameIds
- routineSummary
- stats
```

---

## 7. 완료 기준

MVP 1은 다음이 가능하면 완료로 본다.

```text
앱을 실행할 수 있다.
온보딩을 완료할 수 있다.
추천 캐릭터/방 결과를 볼 수 있다.
My Room에 진입할 수 있다.
오늘의 루틴을 선택할 수 있다.
현재 루틴에 따라 캐릭터 상태가 바뀐다.
Setlog Frame 목록을 볼 수 있다.
My Room에서 현재 루틴 기준 Setlog Frame을 생성할 수 있다.
Daily Replay 화면에서 생성된 frame 기반 요약을 볼 수 있다.
Closet/Archive placeholder를 볼 수 있다.
```

품질 기준:

```text
모바일 화면에서 텍스트가 겹치지 않는다.
주요 버튼을 한 손 조작으로 누를 수 있다.
미연시/관계성 게임처럼 보이지 않는다.
방과 루틴 로그가 화면의 중심이다.
```
