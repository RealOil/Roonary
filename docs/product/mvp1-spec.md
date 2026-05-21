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

## 1.1 제품 방향 결정

Roonary는 최종적으로 단순 집중 타이머가 아니라 **루틴과 일정이 방 안의 하루 장면으로 바뀌는 앱**을 지향한다.

다만 MVP 1에서는 반복 루틴, 일정, 캘린더까지 구현하지 않는다.

```text
최종 제품 방향:
반복 루틴 + 일정 + 집중 세션 + 오늘 로그가 하나의 방 경험으로 연결되는 앱

MVP 1 구현 방향:
현재 하는 루틴을 선택하고, 집중 세션처럼 기록하고, 오늘 로그로 확인하는 흐름

확장 방향:
오늘의 루틴 -> 반복 루틴 -> 일정/캘린더 -> 위젯 -> 공유 방
```

판단 기준:

```text
지금 당장 눌러서 집중할 수 있어야 한다.
나중에는 매일/매주 반복되는 루틴과 일정까지 같은 화면 흐름에 들어와야 한다.
캘린더 대체 가능성은 장기 방향으로 열어둔다.
하지만 초기 MVP에서 캘린더 기능을 만들지는 않는다.
```

위젯 방향:

```text
위젯은 MVP 1 범위가 아니다.
나중에 모바일 홈 화면에서 현재 루틴, 다음 루틴/일정, 오늘 로그 진행도, 작은 방/캐릭터 상태를 보여주는 확장 기능으로 검토한다.
위젯은 앱을 열지 않아도 Roonary의 방이 곁에 있는 느낌을 주는 보조 화면이다.
```

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
Routine / Today Log combined screen
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
-> My Room에서 방 장면 확인
-> Routine 화면에서 Setlog Frame 목록과 오늘 로그 확인
-> Closet/Archive placeholder 확인
```

재방문 흐름:

```text
앱 실행
-> My Room
-> Routine 화면에서 오늘의 루틴 확인/수정
-> Routine 화면에서 오늘 로그 확인
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
상단: 날짜, 현재 시간, 현재 루틴
중앙: 화면을 크게 차지하는 2.5D 코너룸 장면
장면 내부: 작은 동물 캐릭터와 루틴별 소품
하단 네비게이션: Room, Routine, Closet, Archive
```

기능:

```text
현재 선택된 루틴 표시
현재 시간 표시
루틴에 따른 캐릭터 장면 표시
하단 네비게이션으로 다른 화면 이동
```

MVP 시각화:

```text
실제 애니메이션 대신 정적 2.5D 코너룸 구성으로 시작한다.
벽 2면과 바닥 면이 보이는 원근감 있는 작은 방을 기본 표현으로 한다.
루틴별 캐릭터 자세/소품은 텍스트와 간단한 그래픽으로 표현해도 된다.
My Room에서는 루틴 목록과 프레임 목록보다 방 장면을 우선한다.
My Room에는 감성 상태 문구, 루틴 목록, 프레임 목록, 액션 버튼을 두지 않는다.
사용자가 켜놓고 집중할 수 있도록 방과 캐릭터를 중심에 둔다.
루틴 목록, 프레임 목록, 오늘 로그는 Routine 화면에서 확인한다.
```

아트 에셋 방향:

```text
현재 MVP의 도형 기반 방/캐릭터/소품은 구조 검증용이다.
MVP 이후에는 실제 PNG/WebP 레이어드 에셋으로 교체한다.
방 전체를 한 장 이미지로 고정하기보다 배경, 벽/바닥, 가구, 캐릭터, 의상, 소품, 루틴 오브젝트를 분리한다.
레이어를 분리해야 루틴 변화, 옷장 꾸미기, 방 꾸미기, Setlog Frame 생성에 같은 에셋 조합을 재사용할 수 있다.
SVG는 아이콘이나 단순 UI 소품에 사용하고, 메인 방/캐릭터 아트는 래스터 에셋을 우선한다.
Lottie/Rive 같은 애니메이션 에셋은 캐릭터 숨쉬기, 타이핑, 독서 같은 작은 반복 동작을 붙일 때 검토한다.
```

---

### 5.3 Routine / Today Log

목적:

```text
사용자가 오늘 수행할 루틴을 프리셋에서 선택하고, 같은 화면에서 오늘 로그를 확인한다.
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
현재 루틴 기준 Setlog Frame 수동 생성
오늘 로그 요약 표시
생성된 Setlog Frame 목록 표시
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
Routine 화면에서 현재 루틴 기준 Setlog Frame 수동 생성
시간, 루틴, 상태, variation 표시
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

### 5.5 Today Log Summary

목적:

```text
하루 루틴을 기록물처럼 요약해 같은 Routine 화면 안에서 볼 수 있게 한다.
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
```

문구 원칙:

```text
감성 문장보다 로그 정보를 우선한다.
시간, 루틴, 상태, 수치 중심으로 표시한다.
```

---

### 5.6 Closet

목적:

```text
캐릭터와 방 커스터마이징이 확장될 자리를 탭 구조로 보여준다.
```

MVP 기능:

```text
캐릭터 꾸미기 탭
방 꾸미기 탭
캐릭터 큰 미리보기 표시
동물, 색상, 의상, 소품 탭 표시
색상 옵션은 실제 색 네모로 표시
동물, 의상, 소품 옵션은 작은 아이콘으로 표시
원근감 있는 방 큰 미리보기 표시
벽지, 바닥, 가구 탭 표시
벽지/바닥 옵션은 실제 색 네모로 표시
가구 옵션은 작은 아이콘으로 표시
옵션 선택 시 미리보기 반영
저장형 꾸미기 편집은 MVP 2 이후로 둔다.
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
현재 루틴에 따라 방 장면과 캐릭터 소품이 바뀐다.
Setlog Frame 목록을 볼 수 있다.
Routine 화면에서 현재 루틴 기준 Setlog Frame을 생성할 수 있다.
Routine 화면에서 생성된 frame 기반 요약을 볼 수 있다.
Closet/Archive placeholder를 볼 수 있다.
```

품질 기준:

```text
모바일 화면에서 텍스트가 겹치지 않는다.
주요 버튼을 한 손 조작으로 누를 수 있다.
미연시/관계성 게임처럼 보이지 않는다.
방과 루틴 로그가 화면의 중심이다.
```
