---
title: 2편 - 코드
category: moviesite
tag: project
---

## 2. Supabase 프로젝트 세팅

-  **Supabase 가입 / 프로젝트 생성**
-  **환경변수 연결** (`.env`)
-  **Supabase 클라이언트 코드 작성**

![supabase anon](/supabase_anon.png)
![supabase url](/supabase_url.png)


그리고 위 코드들은 환경변수로 들어가기 때문에

.env 파일을 만들어주면 된다.

```js
VITE_SUPABASE_URL=******************
VITE_SUPABASE_ANON_KEY=****************
```

입력할 때 유의할 점은 띄어쓰기 하지말 것! 
최상위 폴더에 .env 파일을 만들 것!
Github에 올라간다면 .gitignore에 .env 파일을 등록할 것!

---

Supabase 클라이언트 파일을 만들어야 한다.

```js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
```

---

## 3. 로그인/회원가입 UI 및 기능

-  `Login.jsx` 컴포넌트 작성
-  입력폼 상태 관리 (React 상태/폼)
-  로그인/회원가입 **분기** 처리
-  **오류 / 로딩 처리** UI

```js
//src/components/Login.jsx
export default function Login() {
    return (
        <div>
        <h2>로그인 회원가입</h2>
        <form>
            <input placeholder="이메일" />
            <input type="password" placeholder="비밀번호" />
            <button type="submit">로그인</button>
        </form>
        </div>
    );
}
```

그리고 이 파일을 렌더링할 페이지에 추가를 시켜야 한다.

```js
//src/pages/login.jsx
import Login from '../components/Login';

export  default function LoginPage() {
    return <Login />;
}
```

다음은 이메일과 비밀번호를 상태로 관리를 해야할 차례이다.

```js
//src/components/Login.jsx
import {useState} from "react";

export default function Login() {

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    return (
        <div>
            <h2>로그인 회원가입</h2>
            <form>
                <input 
                    placeholder="이메일"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
                <input
                    type="password" 
                    placeholder="비밀번호"
                    value={pw}
                    onChange={e => setPw(e.target.value)}/>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}
```

아직 css 를 적용을 안한 상태이고 제대로 뜨나 확인을 해보자

![로그인 기본확인](/login_1.png)



이제는 로그인 버튼을 누르면 form을 제출하는 걸 만들 차례이다.

```js
//src/components/Login.jsx
import {useState} from "react";

export default function Login() {

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("제출확인 완료!");
    };

    return (
        <div>
            <h2>로그인 회원가입</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="이메일"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
                <input
                    type="password" 
                    placeholder="비밀번호"
                    value={pw}
                    onChange={e => setPw(e.target.value)}/>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}
```

여기서 로그인과 회원가입을 따로 만들지 않았기 때문에 

토글로 관리해주려고 한다.

```js
//src/components/Login.jsx
import {useState} from "react";

export default function Login() {

    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [mode, setMode] = useState("login");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("제출확인 완료!");
    };

    return (
        <div>
            <h2>로그인 회원가입</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="이메일"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
                <input
                    type="password" 
                    placeholder="비밀번호"
                    value={pw}
                    onChange={e => setPw(e.target.value)}/>
                <button type="submit">
                    {mode === "signup" ? "회원가입" : "로그인"}
                </button>
            </form>
            <button
                type="button"
                onClick={() => setMode(mode === "login" ? "signup" : "login")}>
                {mode === "login" ? "회원가입으로 전환" : "로그인으로 전환"}
            </button>
        </div>
    );
}
```
![토글관리](/toggle_1.png)
![토글관리](/toggle_2.png)

이제 기본적인 토글까지 됬으니 supabase와 연동을 시켜줘야 한다.

```js
import { useState } from "react";
import supabase from "../utils/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [mode, setMode] = useState("login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password: pw });
      if (error) alert("회원가입 실패: " + error.message);
      else alert("회원가입 성공! 이메일을 확인하세요.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (error) alert("로그인 실패: " + error.message);
      else alert("로그인 성공!");
    }
  };

  return (
    <div>
      <h2>로그인 회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={e => setPw(e.target.value)}
        />
        <button type="submit">
          {mode === "signup" ? "회원가입" : "로그인"}
        </button>
      </form>
      <button
        type="button"
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
      >
        {mode === "login" ? "회원가입으로 전환" : "로그인으로 전환"}
      </button>
    </div>
  );
}
```

---

## 4. 소셜로그인 적용

-  **구글 / 카카오톡 / 깃허브 버튼** 구현
-  Supabase **소셜로그인 함수** 적용  
  (예: `signInWithOAuth('google')`)
-  **리다이렉트** 처리

다음은 소셜로그인 적용을 해봐야 할 차례이다.

```js
import { useState } from "react";
import supabase from "../utils/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [mode, setMode] = useState("login");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password: pw });
      if (error) alert("회원가입 실패: " + error.message);
      else alert("회원가입 성공! 이메일을 확인하세요.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (error) alert("로그인 실패: " + error.message);
      else alert("로그인 성공!");
    }
  };

  const onGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider : "google" });
  };
  const onGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider : "github" });
  };
  const onKakaoLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider : "kakao" });
  };
  
    
  

  return (
    <div>
      <h2>로그인 회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={e => setPw(e.target.value)}
        />
        <button type="submit">
          {mode === "signup" ? "회원가입" : "로그인"}
        </button>
      </form>
      <button
        type="button"
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
      >
        {mode === "login" ? "회원가입으로 전환" : "로그인으로 전환"}
      </button>
      <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
        <button type="button" onClick={onGoogleLogin}>Google 로그인</button>
        <button type="button" onClick={onGithubLogin}>Github 로그인</button>
        <button type="button" onClick={onKakaoLogin}>Kakao 로그인</button>
      </div>
    </div>
  );
}
```
![소셜로그인](/sociallogin_1.png)


소셜로그인의 이 다음단계는
4편에서 

버튼추가
코드작성 
콘솔 Provider 세팅을 다룰 예정이며 

구체적인 로그인 회원가입에 대한 것 또한 4편에서 다룰 예정이다.