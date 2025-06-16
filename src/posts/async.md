---
title: 비동기 함수
category: javascript
tag: async
---

---

## 1. 동기 vs 비동기

- **동기(synchronous)**
  - 코드를 한 줄씩 순서대로 처리한다.
  - 앞 코드가 끝나야 다음 코드 실행됨.
- **비동기(asynchronous)**
  - 오래 걸리는 작업(API 요청, 파일 읽기 등)을 기다리는 동안
  - 코드 실행이 멈추지 않고 다음 작업을 먼저 처리함.

---

## 2. 왜 필요한가?

- 웹 개발은 대부분 서버에 “요청”을 보내고 “응답”을 받아야 한다. (시간이 걸림)
- 비동기 처리가 없으면, 데이터가 올 때까지 웹페이지 전체가 멈춰버린다!
- 사용자 경험(UX)과 성능을 위해 **비동기 처리**는 필수.

---

## 3. setTimeout (가장 쉬운 비동기 예시)

```js
console.log('A');
setTimeout(() => {
  console.log('B (3초 후)');
}, 3000);
console.log('C');
```

실행 결과:

A
C
B (3초 후)

setTimeout은 “비동기”라서, 3초 기다리는 동안 아래 코드가 먼저 실행됨!

⸻

4. async / await 기본 문법

```
async function fetchData() {
  const res = await fetch('https://api...');
  const data = await res.json();
  return data;
}
```

	•	async: 이 함수는 비동기 함수임을 선언
	•	await: “이 작업이 끝날 때까지 기다려줘!”
(여기서 잠깐 멈췄다가, 완료되면 아래 코드가 실행됨)

⸻

5. fetchPopularMovies 예시 해설

export async function fetchPopularMovies(page = 1) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=키&page=${page}`);
  if (!res.ok) throw new Error("실패");
  return res.json();
}

	•	TMDB에 영화 데이터 요청(비동기)
	•	다 받아올 때까지 기다림(await)
	•	데이터 받으면 결과 반환

⸻

6. 비동기/await 없이 쓴 코드 (then 사용)

function fetchMovies() {
  fetch('https://api...')
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}

	•	then()을 계속 써서 비동기 처리를 할 수도 있다.
	•	하지만 async/await을 쓰면 코드가 더 깔끔하고, 순서가 직관적임.

⸻

7. 결론
	•	JS에서 오래 걸리는 일(서버 통신, DB, 파일 등)은 대부분 비동기로 처리
	•	async/await을 쓰면
→ 코드가 “동기”처럼 순서대로 보여서
→ 실전 개발에 훨씬 유리!
	•	데이터 fetching, API, Supabase, TMDB 등 대부분의 작업에 필수

⸻

비동기를 알면,
웹 개발에서 데이터 처리와 API를 다루는 게
한결 자연스러워진다!

---
