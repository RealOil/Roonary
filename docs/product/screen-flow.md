# Roonary Screen Flow
> 목적: MVP 1의 화면 구조와 이동 흐름을 정의한다.

---

## 1. MVP 1 화면 목록

```text
Onboarding
Recommendation Result
My Room
Routine / Today Log
Closet Placeholder
Archive Placeholder
```

MVP 1에서는 Shared Room 관련 화면을 만들지 않는다.

---

## 2. 첫 실행 흐름

```mermaid
flowchart TD
  A["App Launch"] --> B{"Onboarding completed?"}
  B -->|No| C["Onboarding"]
  C --> D["Recommendation Result"]
  D --> E["My Room"]
  B -->|Yes| E
```

설명:

```text
첫 실행 사용자는 온보딩을 거친다.
온보딩 후 추천 캐릭터/방 결과를 확인한다.
추천 결과를 수락하면 My Room으로 이동한다.
재방문 사용자는 바로 My Room으로 이동한다.
```

---

## 3. 메인 탭 구조

MVP 1의 하단 네비게이션은 다음 구조를 권장한다.

```text
Room
Routine
Closet
Archive
```

Shared 탭은 MVP 2에서 추가한다.

```mermaid
flowchart LR
  Room["Room / My Room"] --- Routine["Routine"]
  Routine --- Closet["Closet"]
  Closet --- Archive["Archive"]
```

---

## 4. My Room 중심 흐름

```mermaid
flowchart TD
  A["My Room"] --> B["Routine / Today Log"]
  B --> A
  A --> E["Closet Placeholder"]
  E --> A
  A --> F["Archive Placeholder"]
  F --> B
```

My Room은 MVP 1의 홈 화면이다.

My Room에서 가능한 이동:

```text
루틴 및 오늘 로그 확인
Closet placeholder 확인
Archive placeholder 확인
```

---

## 5. 화면별 진입/이탈

### 5.1 Onboarding

진입:

```text
앱 첫 실행
설정 초기화 후 재시작
```

이탈:

```text
모든 질문 답변 -> Recommendation Result
```

뒤로가기 정책:

```text
이전 질문으로 이동 가능
첫 질문에서는 앱 종료 또는 시작 화면 유지
```

---

### 5.2 Recommendation Result

진입:

```text
Onboarding 완료 후
```

표시 정보:

```text
캐릭터 프리셋
동물 타입
기본 색상
방 테마
추천 루틴
```

이탈:

```text
Accept -> My Room
Adjust character -> 간단 선택 UI 또는 결과 화면 내 선택
Adjust room theme -> 간단 선택 UI 또는 결과 화면 내 선택
```

MVP에서는 별도 깊은 편집 화면을 만들지 않아도 된다.

---

### 5.3 My Room

진입:

```text
추천 결과 수락 후
앱 재실행 후
하단 Room 탭 선택
다른 화면에서 Back/Home 선택
```

표시 정보:

```text
날짜
현재 시간
현재 루틴
방 장면
```

주요 액션:

```text
Open Closet
Open Archive
```

---

### 5.4 Routine / Today Log

진입:

```text
하단 Routine 탭
```

표시 정보:

```text
루틴 프리셋 목록
선택 여부
현재 루틴 여부
Routine Summary
Generated Frames
Room/Focus/Wellness/Creativity stats
```

이탈:

```text
내 방으로 돌아가기 -> My Room
```

---

### 5.5 Closet

진입:

```text
하단 Closet 탭
```

표시 정보:

```text
캐릭터 꾸미기 탭
방 꾸미기 탭
현재 캐릭터 프리셋
현재 색상 프리셋
현재 방 테마와 가구 프리셋
```

이탈:

```text
Back 또는 Room 탭 -> My Room
```

---

### 5.6 Archive Placeholder

진입:

```text
하단 Archive 탭
```

표시 정보:

```text
오늘 로그 카드
과거 기록 placeholder
```

이탈:

```text
Room 탭 -> My Room
```

---

## 6. MVP 2에서 추가될 화면

MVP 2에서는 다음 화면을 추가한다.

```text
Shared Rooms
Create Shared Room
Invite Link
Join Shared Room
Live Shared Room
Room Setlog
Group Replay
```

MVP 1의 네비게이션은 MVP 2에서 다음처럼 확장될 수 있다.

```text
Room
Routine
Shared
Closet
Archive
```

---

## 7. 화면 흐름 원칙

```text
My Room을 항상 돌아올 수 있는 중심 화면으로 둔다.
온보딩은 첫 사용 경험을 돕되 길게 붙잡지 않는다.
Routine setup은 빠르게 선택하고 빠져나오는 화면이어야 한다.
Today Log는 감성 에세이가 아니라 기록물처럼 보여야 한다.
Closet과 Archive는 MVP 1에서 기능보다 확장 가능성을 보여주는 자리다.
Shared Room은 MVP 1 화면 흐름에 넣지 않는다.
```
