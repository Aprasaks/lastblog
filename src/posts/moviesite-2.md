---
title: 영화 사이트 프로젝트 2편 - Supabase로 로그인/회원가입 구현
category: moviesite
tag: project
---

# 🎬 2편 - Supabase 인증/소셜로그인 구현

다른 컴포넌트 코드를 짜기 전에 **Supabase**를 먼저 다루는 이유를 간단히 짚고 넘어가자면,  
**서비스의 기본 골격(인증/회원 관리)**을 먼저 잡고 가야 전체 설계가 명확해지기 때문이다.

대부분의 웹서비스는 **인증이 “기본”**이고,  
**인증 및 로그인이 완성**되면  
이후 페이지/기능 설계도 자연스럽게 잡히기 때문에  
이번 2편에서는 **Supabase를 활용한 인증**을 먼저 구현한다.

---

## 1. 인증 기능 설계

- **이메일 / 비밀번호 회원가입**
- **이메일 로그인**
- **소셜 로그인**  
  (구글, 카카오톡, 깃허브 **3개** 구현)

---

## 2. Supabase 프로젝트 세팅

-  **Supabase 가입 / 프로젝트 생성**
-  **환경변수 연결** (`.env`)
-  **Supabase 클라이언트 코드 작성**

---

## 3. 로그인/회원가입 UI 및 기능

-  `Login.jsx` 컴포넌트 작성
-  입력폼 상태 관리 (React 상태/폼)
-  로그인/회원가입 **분기** 처리
-  **오류 / 로딩 처리** UI

```
//Login.jsx
export default function Login() {
  return (
    <div>
      <h2>로그인 또는 회원가입</h2>
    </div>
  )
};
```
```
export default function Login() {
    return (
        <div>
            <h2>로그인 또는 회원가입</h2>
            <form>
                <input placeholdeer="이메일" />
                <input type="password" placeholder="비밀번호" />
                <button type="submit">로그인</button>
            </form>
        </div>
    )
};
```
```
import {useState} from "react";

export default function Login() {

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    return (
        <div>
            <h2>로그인 또는 회원가입</h2>
            <form>
                <input placeholder="이메일"
                value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="비밀번호"
                value={pw} onChange={e => setPw(e.target.value)} />
                <button type="submit">로그인</button>
            </form>
            <div>이메일: {email}</div>
            <div>비밀번호: {pw}</div>
        </div>
    )
};
```
```
import {useState} frm "react";

export default function Login () {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("폼 제출!");
  };

  return (
    <div>
    <h2>로그인 또는 회원가입</h2>
    <form onSubmit={handleSubmit}>
      <input placeholder="이메일"
      value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="비밀번호"
      value={pw} onChange={e => setPw(e.target.value)} />
      <button type="submit">로그인</button>
    </form>
    <div>이메일: {email}</div>
    <div>비밀번호: {pw}</div>
    </div>
  );
}
```
```
// src/components/Login.jsx
import {useState} from "react";
import supabase from "../utils/supabaseClient";

export default function Login() {

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [mode, setMode] = useState("login");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ( mode === "signup") {

            const {error} = await supabase.auth.signUp ({email, password:pw});
            if (error) {
                alert ("회원가입 실패:" + error.message);
            } else {
                alert ("회원가입 성공~ 이메일을 기억해주세요!");
            }
        } else {
            
            const {error} = await supabase.auth.signInWithPassword({ email, password:pw});
            if (error) {
                alert("로그인 실패:" + error.message);
            } else {
                alert ("로그인 성공~");
            }
        }
    
    };

    return (
        <div>
            <h2>로그인 또는 회원가입</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="이메일"
                value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="비밀번호"
                value={pw} onChange={e => setPw(e.target.value)} />
                <button type="submit"> {mode === "signup" ? "회원가입" : "로그인"}</button>
            </form>

            <button 
            type="button"
            onClick ={()=> setMode (mode === "signup" ? "login" : "signup")}
            >
                {mode === "signup" ? "로그인" : "회원가입"}으로 전환
            </button>
            <div>이메일: {email}</div>
            <div>비밀번호: {pw}</div>
        </div>
    )
};
```


---

## 4. 소셜로그인 적용

-  **구글 / 카카오톡 / 깃허브 버튼** 구현
-  Supabase **소셜로그인 함수** 적용  
  (예: `signInWithOAuth('google')`)
-  **리다이렉트** 처리

---

## 5. 인증 완료 후 처리

-  **로그인 성공 시 유저정보 저장**  
  (`Context` 또는 전역 상태)
-  상단바 **로그인 / 로그아웃** 토글

---

## 6. 느낀 점 / 이슈 / 트러블슈팅

- 막혔던 부분 & 해결 방법  
  (예: **Supabase SQL** / **소셜로그인 연동** 등)

---