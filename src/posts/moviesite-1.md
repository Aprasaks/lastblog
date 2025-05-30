---
title: 영화 사이트 프로젝트 1편 - 기획과 설계
category: moviesite
tag: project
---

# 🎬 영화 사이트 1편 - 프로젝트 기획과 설계

> *이 시리즈는 영화 정보를 제공하는 웹사이트를 직접 만들면서  
> 설계, 구현, 배포까지 전 과정을 기록하는  프로젝트.*

---

## 1. 프로젝트 목표

- **최신 영화 정보를 빠르고 직관적으로 검색/조회**할 수 있는 사이트 만들기
- **로그인/회원가입**을 지원 (이메일, 소셜 로그인)
- 각 영화의 **상세정보** 구현 및 **즐겨찾기** 기능 구현 예정

---

## 2. 사용할 기술 

- **React**
- **Supabase** (회원가입, 로그인, 소셜 로그인, 데이터 저장)
- **TMDB API** (The Movie Database, 영화 데이터)
- **Tailwind CSS v3** (빠른 스타일링 & 반응형)
- **커스텀 React Hooks** (useDebounce, useInfiniteScroll 등)

---

## 3. 주요 기능 목록

- [x] 회원가입/로그인 (이메일/소셜 - 구글, 깃허브)
- [x] 영화 검색/리스트/상세 보기 (TMDB API)
- [x] 무한 스크롤 (영화 카드가 계속 로드됨)
- [x] 반응형 UI (모바일 ~ 데스크탑)
- [x] 찜하기/즐겨찾기 (추가 예정)
- [x] 예쁜 UI & 쉬운 UX

---

## 4. 폴더/파일/컴포넌트 구조 (예상)

/src
/components
Navbar.jsx            # 상단바 (로고, 검색, 로그인)
MovieCard.jsx         # 영화 리스트 카드
MovieCardDetail.jsx   # 영화 상세 페이지
Login.jsx             # 로그인/회원가입 공용 컴포넌트
/hooks
useDebounce.js        # 검색 딜레이용 커스텀 훅
useInfiniteScroll.js  # 무한스크롤 (추가 가능)
/pages (or /app)
index.jsx             # 메인페이지
login.jsx             # 로그인/회원가입
movie/[id].jsx        # 영화 상세
/utils
api.js                # TMDB/Supabase 관련 함수
/styles
tailwind.css

---

## 5. 핵심 설계 포인트

###  **메인 페이지**
- 상단 고정 Navbar: 로고 + 검색창 + 로그인 버튼
- 영화 카드 1행 4열 그리드, 무한스크롤 구현
- 모바일 퍼스트로 반응형 설계

###  **로그인/회원가입**
- Supabase Authentication 사용
- 소셜 로그인 (구글, 깃허브 등)도 추가 지원

###  **상세 페이지**
- 영화 카드 클릭 시 상세 정보 페이지 이동
- TMDB API로 해당 영화의 세부 정보 받아오기

---

## 6. 커스텀 훅/라이브러리

- `useDebounce`: 검색창 입력 지연 (API 과호출 방지)
- (추가) `useInfiniteScroll`: 스크롤 하단 감지해서 데이터 추가 로딩
- Supabase JS SDK, TMDB fetch 등 활용

---

## 7. 앞으로의 개발 플랜

1. **2편:** Supabase 회원가입/로그인/소셜로그인 구현
2. **3편:** TMDB API 연동 - 영화 리스트 출력
3. **4편:** 상세 페이지, 무한스크롤/검색
4. **5편:** 배포, 리팩토링, 찜하기 등 추가 기능

---

## 8. 처음해보는 것들

- Supabase와 TMDB API를 한 프로젝트에서 효율적으로 연결하는 구조 고민
- 무한스크롤, 반응형, 인증 등 실전에서 자주 쓰는 기능 연습
- 소셜로그인(구글/깃허브 등) 구현 시 리다이렉트, 콜백 처리 등 세부 설정 필요

---
