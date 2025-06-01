---
title: preventDefault의 의미와 사용법 – 리액트 폼에서 왜 필요할까?
category: react
tag: post
---

# e.preventDefault()란?

리액트(React)에서 `<form>`을 제출할 때  
자주 사용하는 메서드.  
“기본 동작(새로고침 등)”을 막고  
내가 원하는 로직(JS 코드)만 실행할 수 있게 해준다.

---

## 1. 기본 동작이란?

- `<form>`에서 `<button type="submit">`을 누르면  
  → 브라우저는 원래 “페이지 전체를 새로고침”한다!
- 하지만 리액트(SPA)에서는  
  **새로고침 없이 JS 코드로만 처리**해야 한다

---

## 2. preventDefault란?

- **e.preventDefault()**
  - `e`는 “이벤트 객체” (React가 함수에 자동으로 넘겨줌)
  - **preventDefault()**는 자바스크립트 내장 메서드
  - “이벤트의 기본 동작”을 막는다
  - 예: 폼 제출 시, 새로고침을 막음

---

## 3. 실제 코드 예시

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  // 여기서 내가 원하는 코드 실행!
};
```

## 4. 언제쓰는걸까?

  - 로그인/회원가입/댓글 등
폼(form) 관련 기능에서
새로고침 없이 동작시키고 싶을 때
항상 써야 한다!