# 영어 단어 암기 앱

React + TypeScript + Vite로 만든 영어 단어 암기 웹 애플리케이션입니다.

## 기능

- 📚 카테고리별 단어 학습 (어휘, 독해어휘, 숙어)
- 📖 페이지별 선택 학습
- 🎯 두 가지 학습 모드:
  - **시험 모드**: 4지선다 퀴즈
  - **학습 모드**: 플래시카드
- 🔄 영어→한글, 한글→영어 양방향 학습
- 📊 학습 결과 및 틀린 문제 복습

## 시작하기

### 의존성 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 앱을 확인할 수 있습니다.

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 빌드 미리보기

```bash
npm run preview
```

## 배포

### Vercel 배포

1. [Vercel](https://vercel.com)에 가입
2. GitHub 저장소 연결
3. 프로젝트 import
4. 자동으로 빌드 및 배포

### Netlify 배포

1. [Netlify](https://netlify.com)에 가입
2. "New site from Git" 클릭
3. GitHub 저장소 연결
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy 클릭

### GitHub Pages 배포

1. `vite.config.ts`에서 base 경로 설정:
```ts
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

2. `package.json`에 배포 스크립트 추가:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.1.1"
  }
}
```

3. 배포:
```bash
npm install gh-pages --save-dev
npm run deploy
```

## 프로젝트 구조

```
voca/
├── public/             # 정적 파일
├── src/
│   ├── components/     # React 컴포넌트
│   ├── data/          # 단어 데이터
│   ├── hooks/         # 커스텀 훅
│   ├── types/         # TypeScript 타입 정의
│   ├── App.tsx        # 메인 앱 컴포넌트
│   ├── main.tsx       # 진입점
│   └── index.css      # 글로벌 스타일
├── index.html         # HTML 템플릿
├── package.json       # 의존성 및 스크립트
├── tsconfig.json      # TypeScript 설정
└── vite.config.ts     # Vite 설정
```

## 기술 스택

- **React 18**: UI 라이브러리
- **TypeScript**: 타입 안정성
- **Vite**: 빠른 빌드 도구
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **Lucide React**: 아이콘

## 라이선스

MIT
