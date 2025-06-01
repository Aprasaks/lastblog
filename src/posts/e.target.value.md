---
title: React에서 input 상태 관리 – e.target.value의 의미
category: react
tag: post
---

# React에서 input value와 onChange로 상태 관리하기

리액트에서 input 입력값을 컴포넌트의 상태와 연동하는 “표준 패턴”.

---

## 코드 예시

```jsx
<input
  value={email}
  onChange={e => setEmail(e.target.value)}
/>
```

- **value={email}**  
  → input에 보여줄 값을 email 상태와 연결  
  (상태가 바뀌면 input도 같이 변한다)

- **onChange={e => setEmail(e.target.value)}**  
  → 사용자가 input에 입력할 때마다  
  → `e.target.value`로 입력값을 가져와서  
  → `setEmail`로 상태를 업데이트  
  (input에 입력 → 상태가 변함)