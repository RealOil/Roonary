# Roonary Development Strategy
> 목적: Roonary를 아이디어 단계에서 실제 MVP 코드베이스로 옮기기 위한 개발 전략을 정리한다.

---

## 1. 개발 방식 결정

Roonary는 **AI-assisted SDLC** 방식으로 개발한다.

```text
SDLC 구조는 유지한다.
AI는 구현 속도를 높이는 도구로 사용한다.
제품 방향, 범위, 검수 책임은 사람이 가진다.
```

Roonary는 단순 CRUD 앱이 아니라 루틴, 방, 캐릭터, 프레임, 리플레이, 공유 기능이 연결되는 앱이다. 따라서 처음부터 "AI에게 앱 전체를 만들어줘"라고 맡기기보다, 작은 기능 단위로 나누어 설계하고 구현한다.

---

## 2. AI 도구 사용 원칙

### 2.1 AI 앱 빌더

Lovable, Bolt, Replit, Google AI Studio 같은 AI 앱 빌더는 참고용으로 사용할 수 있다.

사용 목적:

```text
빠른 화면 아이디어 확인
랜딩/프로토타입 실험
UI 분위기 참고
짧은 데모 제작
```

제한:

```text
프로덕션 코드베이스의 기준으로 삼지 않는다.
보안, 데이터 구조, 권한 설계는 별도로 검토한다.
생성된 코드를 이해하지 못한 채 확장하지 않는다.
```

### 2.2 코딩 에이전트

Codex 같은 코딩 에이전트는 실제 코드베이스 작업에 사용한다.

역할 분담:

```text
사용자:
- 제품 방향 결정
- MVP 범위 결정
- 요구사항 검수
- 화면/기능 승인

AI:
- 보일러플레이트 생성
- 컴포넌트 구현
- mock 데이터 작성
- 테스트/검증 보조
- 리팩터링 제안
```

좋은 요청 방식:

```text
PRD와 MVP 1 명세를 읽고, My Room 화면만 구현해줘.
mock 데이터를 사용하고, Shared Room은 아직 구현하지 마.
변경 파일과 실행 방법을 마지막에 알려줘.
```

나쁜 요청 방식:

```text
Roonary 앱 전체 만들어줘.
```

---

## 3. 1차 기술 스택

MVP 1의 기본 스택은 다음을 우선 검토한다.

```text
App: React Native + Expo
Language: TypeScript
Data: mock/local data
Backend: 없음
Auth: 없음
```

선택 이유:

```text
Android/iOS를 한 코드베이스로 시작할 수 있다.
모바일 앱다운 흐름을 빠르게 만들 수 있다.
Expo로 초기 개발/테스트 장벽이 낮다.
AI 코딩 도구가 React/TypeScript 작업을 잘 수행한다.
MVP 2에서 Supabase/Firebase/FastAPI로 확장하기 쉽다.
```

초기에는 서버, 로그인, DB를 붙이지 않는다. 먼저 앱의 핵심 감각을 확인한다.

---

## 4. MVP 개발 원칙

### 4.0 내부 언어

MVP 1의 앱 내부 표시 언어는 한국어로 고정한다.

```text
사용자에게 보이는 화면 문구: 한국어
루틴/프레임/리플레이 라벨: 한국어
문서와 코드 식별자: 필요 시 영어 사용 가능
제품명 Roonary: 그대로 사용
```

### 4.1 작게 만든다

MVP 1은 다음 질문 하나를 검증한다.

```text
내 현실 루틴이 작은 캐릭터의 방 장면과 Daily Replay로 바뀌는 것이 다시 보고 싶을 만큼 유용하고 귀여운가?
```

### 4.2 가짜 데이터로 시작한다

처음에는 실제 시간 자동 생성, 서버 저장, 로그인 없이 mock 데이터로 만든다.

```text
고정 사용자
고정 캐릭터 프리셋
고정 방 테마
고정 루틴 목록
고정 Setlog Frame 샘플
고정 Daily Replay 샘플
```

### 4.3 공유 기능은 미룬다

Shared Room, 링크 초대, Group Replay는 MVP 2로 미룬다.

이유:

```text
사용자/권한/동기화/초대 링크/세션 종료 등 복잡도가 크게 증가한다.
개인 루틴 기록 감각이 검증되기 전에는 공유 기능의 가치도 판단하기 어렵다.
```

---

## 5. 개발 단계

### Phase 0. 문서 정리

산출물:

```text
docs/product/prd.md
docs/product/mvp1-spec.md
docs/product/screen-flow.md
docs/project/development-strategy.md
```

목표:

```text
무엇을 만들지, 무엇을 만들지 않을지 명확히 한다.
```

### Phase 1. 앱 뼈대 만들기

산출물:

```text
Expo 프로젝트
기본 라우팅
공통 디자인 토큰
mock 데이터
기본 네비게이션
```

목표:

```text
화면을 하나씩 붙일 수 있는 구조를 만든다.
```

### Phase 2. MVP 1 화면 구현

구현 순서:

```text
1. Onboarding
2. My Room
3. Today's Routine
4. Setlog Frame list
5. Daily Replay
6. Closet placeholder
7. Archive placeholder
```

목표:

```text
서버 없이도 앱의 핵심 루프를 눌러볼 수 있게 만든다.
```

### Phase 3. 실제 기기 테스트

검증:

```text
Android/iOS 화면 깨짐 여부
작은 화면에서 텍스트 겹침 여부
루틴 선택 흐름이 이해되는지
Daily Replay를 다시 보고 싶은지
앱을 닫았다가 다시 켜는 흐름에서 어색한 점이 없는지
```

### Phase 4. MVP 2 설계

MVP 1의 감각이 괜찮으면 Shared Room을 설계한다.

추가 검토:

```text
로그인
DB
초대 링크
방 참여 권한
Room Setlog 저장
Group Replay 공유
```

---

## 6. 초기에는 하지 않는 것

```text
로그인
서버 API
DB 설계 구현
실시간 Shared Room
링크 초대
채팅
결제
상점
복잡한 방 꾸미기 에디터
AI 이미지 생성
앱스토어 배포
```

위 항목은 중요하지 않다는 뜻이 아니라, MVP 1 검증 이후로 미룬다는 뜻이다.

---

## 7. 첫 개발 목표

첫 번째 동작 가능한 버전은 다음 정도면 충분하다.

```text
앱을 연다.
짧은 온보딩을 한다.
추천 캐릭터와 방이 나온다.
My Room에 들어간다.
오늘의 루틴을 선택한다.
현재 루틴에 따라 방 장면과 캐릭터 소품이 바뀐다.
mock Setlog Frame 목록을 본다.
Daily Replay 화면에서 하루 요약을 본다.
```

이 버전은 완성 앱이 아니라 **제품 감각 검증용 앱**이다.
