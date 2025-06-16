---
title: 3편 - 코드
category: moviesite
tag: project
---

## 1. TMDB API 연동 준비
- TMDB 공식 사이트에서 계정 생성, API 키 발급
- 환경변수 파일에 API 키 등록
- 향후 fetch/axios 등으로 외부 API를 호출할 수 있도록 사전 준비

![TMDB API](/tmdb_api.png)

처음으로는 공식홈페이지에서 로그인을 하고 api 키를 가져와야 한다. 

이걸 어디에 추가해야하냐면 
이미 만들어 놓은 .env 파일에 넣으면 된다.

```js
VITE_SUPABASE_URL=*************
VITE_SUPABASE_ANON_KEY=********
VITE_TMDB_API_KEY=*************
```
이렇게 설정하면 된다.

다음은 영화 API를 호출할 차례이다. 
API 호출을 통해서 인기 영화 목록을 가져오는 함수를 만들어야 한다.

```js
//src/utils/api.js

const TMDB_API_KEY= import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL= "https://api.themoviedb.org/3";

export async function fetchPopularMovies (page = 1) {
    const res = await fetch(
        `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=ko-KR&page=${page}`
    );
    if(!res.ok) throw new Error("영화 못불러왔어요");
    return res.json();
}
```
---

다음으로 할 일은 API 함수를 불러와서 상태에 데이터를 저장하고 화면에 나타내줘야 하는 차례이다.

일단 영화카드목록을 만들기 위해 목록 하나의 카드를 만들어보자.

```js
//src/components/MovieCard.jsx
export default function MovieCard({ movie}) {
    return (
        <div className= "p-2 bg-gray-800 rounded shadow text-center">
            <img
            src={'https://image.tmdb.org/t/p/w300${movie.poster_path}'}
            alt={movie.title}
            className="mx-auto rounded mb-2"
            style={{ width: 150}}
            />
            <h3 className="font-bold text-base">{movie.title}</h3>
            <div className="text-sm text-gray-400">{movie.release_date}</div>
            <div className="text-yellow-400 font-semibold">⭐{movie.vote_average}</div>
        </div>
    );
} 
```

이제는 이걸 목록으로 만들어줄 차례이다.

여기는 단계별로 코드를 짜보려고 한다.

```js
//src/components/MovieList.jsx
export default function MovieList() {
    return <div>영화 목록</div>;
}
```

이젠 목록 상태와 로딩상태를 만들어줘야한다.

```js
//src/components/MovieList.jsx

import {useState} from "react";

export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    return <div>영화 목록</div>;
}
```

이젠 꼭 필요한 API호출을 넣어야한다.

```js
//src/components/MovieList.jsx

import {useState, useEffect} from "react";
import {fetchPopularMovies} from "../utils/api";

export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        fetchPopularMovies()
        .then(data => {
            setMovies(data.results);
            setLoading(false);
        })
        .catch(err => {
            alert("영화 데이터 불러오기 실패: " + err.message);
            setLoading(false);
        });
    }, []);

    return <div>영화 목록</div>;
}
```

로딩상태를 보여줘야할 상황도 있을 수 있으니 로딩 중 UI도 넣어주려고 한다.
그리고 위에서 만들었던 MovieCard 컴포넌트를 map함수를 이용하여 렌더링 한다.

```js
//src/components/MovieList.jsx

import {useState, useEffect} from "react";
import {fetchPopularMovies} from "../utils/api";
import MovieCard from "./Moviecard";

export default function MovieList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        fetchPopularMovies()
        .then(data => {
            setMovies(data.results);
            setLoading(false);
        })
        .catch(err => {
            alert("영화 데이터 불러오기 실패: " + err.message);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>로딩중...</div>;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movies.map(movie => (
                <MovieCard key = {movie.id} movie={movie} />
        ))}
        </div>
    );
}
```