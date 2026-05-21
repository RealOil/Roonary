# Roonary

Roonary는 현실 루틴을 작은 동물 캐릭터의 방 장면으로 바꿔주는 코지 생산성 로그 게임입니다.

1차 MVP는 개인 루프에 집중합니다.

```text
Onboarding -> My Room -> Today's Routine -> Setlog Frames -> Daily Replay
```

Shared Room, 초대 링크, Group Replay는 MVP 2 범위입니다.

---

## Documents

먼저 볼 문서:

- [Product PRD](docs/product/prd.md)
- [MVP 1 Spec](docs/product/mvp1-spec.md)
- [Screen Flow](docs/product/screen-flow.md)
- [Development Strategy](docs/project/development-strategy.md)
- [Implementation Plan](docs/project/implementation-plan.md)
- [Data Model](docs/technical/data-model.md)
- [Changelog](CHANGELOG.md)

---

## Current Status

```text
Stage: MVP 1 prototype
Target MVP: Mobile-first React Native + Expo app
Backend: MVP 1에서는 사용하지 않음
Data: seed/local data
Internal product language: 한국어
```

---

## Run Locally

필요 조건:

```text
Node.js LTS with npm
```

의존성 설치:

```bash
npm install
```

Expo 개발 서버 실행:

```bash
npm run start
```

이후 Expo Go로 QR 코드를 스캔하거나, 웹 확인이 필요하면 `npm run web`을 실행합니다.

유용한 확인 명령:

```bash
npm run typecheck
npm run android
npm run web
```

---

## MVP 1 Check Flow

```text
1. 온보딩 4문항을 선택한다.
2. 추천 결과를 확인하고 내 방으로 들어간다.
3. 내 방에서 방 장면이 크게 보이는지 확인한다.
4. 루틴 설정에서 현재 루틴을 바꿔본다.
5. 내 방에서 프레임 생성을 누른다.
6. 데일리 리플레이에서 요약과 생성된 프레임을 확인한다.
7. 프레임을 선택해 상세 정보가 바뀌는지 확인한다.
8. 옷장과 아카이브 placeholder가 열리는지 확인한다.
```
