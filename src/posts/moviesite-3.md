---
title: 3편 – TMDB API 연동과 무비카드 리스트 구현
category: moviesite
tag: project
---

# 🎬 3편 – TMDB API 연동 & 영화 리스트/무한스크롤 준비

이번 단계에서는  
실제 영화 데이터를 받아오는 API 연동과  
메인페이지에서 “무비카드” 형태로  
여러 영화들을 예쁘게 보여주는 기능을 구현한다.

---

## 1. TMDB API 연동 준비
- TMDB 공식 사이트에서 계정 생성, API 키 발급
- 환경변수 파일에 API 키 등록
- 향후 fetch/axios 등으로 외부 API를 호출할 수 있도록 사전 준비

---

## 2. 영화 데이터 호출 설계
- API에서 받은 “인기 영화” 데이터(제목, 포스터, 개봉일 등)만 추려서 사용
- 한 번에 불러올 영화 개수와 페이지네이션(무한스크롤) 고려
- 에러 처리와 로딩 상태 관리 필요

---

## 3. 무비카드 컴포넌트 설계
- 각 영화별 카드(포스터, 제목, 평점 등) 컴포넌트로 분리
- map 함수를 이용해 여러 개의 무비카드를 한 번에 렌더링
- 클릭 시 상세페이지로 이동(후속단계에서 구현 예정)

---

## 4. 메인페이지에서 리스트 렌더링
- useEffect로 첫 렌더 시 영화 데이터 불러오기
- 무비카드 컴포넌트를 반복적으로 렌더
- 스켈레톤 UI, 로딩 메시지 등 사용자 경험 고려

---

## 5. 무한스크롤/페이지네이션 준비
- 사용자가 스크롤할 때마다 추가 영화 데이터를 불러올 수 있도록 로직 설계
- Intersection Observer, 버튼 클릭 등 다양한 방식 고려
- 성능 및 UX 개선 포인트 체크

---

