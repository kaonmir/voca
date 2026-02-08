# 배포 가이드

이 문서는 영어 단어 암기 앱을 다양한 플랫폼에 배포하는 방법을 안내합니다.

## 🚀 빠른 배포 (Vercel - 추천)

Vercel은 가장 간단하고 빠른 배포 방법입니다.

1. [Vercel](https://vercel.com)에 가입
2. "New Project" 클릭
3. GitHub 저장소 연결 (또는 프로젝트 폴더 업로드)
4. 자동으로 설정 감지 및 배포
5. 배포 완료! (보통 1-2분 소요)

**자동 설정:**
- Framework: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

## 📦 다른 배포 옵션

### Netlify

1. [Netlify](https://netlify.com) 가입
2. "New site from Git" 클릭
3. 저장소 연결
4. 설정 확인:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. "Deploy site" 클릭

**또는 드래그 앤 드롭:**
```bash
npm run build
# dist 폴더를 Netlify에 드래그 앤 드롭
```

### GitHub Pages

1. `vite.config.ts` 수정:
```typescript
export default defineConfig({
  base: '/your-repo-name/',  // 저장소 이름 입력
  // ...
})
```

2. 의존성 설치:
```bash
npm install gh-pages --save-dev
```

3. `package.json`에 스크립트 추가:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

4. 배포:
```bash
npm run deploy
```

5. GitHub 저장소 Settings > Pages에서 소스를 `gh-pages` 브랜치로 설정

### 자체 서버 (Docker)

프로젝트에 `Dockerfile` 생성:

```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

`nginx.conf` 생성:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

빌드 및 실행:

```bash
docker build -t vocab-quiz-app .
docker run -p 80:80 vocab-quiz-app
```

## 🔧 배포 전 체크리스트

- [ ] `npm run build`로 로컬에서 빌드 테스트
- [ ] `npm run preview`로 프로덕션 빌드 미리보기
- [ ] 환경 변수 설정 (필요한 경우)
- [ ] `.env` 파일이 `.gitignore`에 포함되어 있는지 확인
- [ ] README.md 업데이트

## 🌐 커스텀 도메인 설정

### Vercel
1. Project Settings > Domains
2. 도메인 입력 및 DNS 설정 지침 따르기

### Netlify
1. Site Settings > Domain Management
2. "Add custom domain" 클릭
3. DNS 설정 지침 따르기

## 📊 성능 최적화

배포 후 성능 향상을 위한 팁:

1. **이미지 최적화**: WebP 포맷 사용
2. **코드 스플리팅**: React.lazy() 사용
3. **번들 크기 분석**:
```bash
npm run build -- --report
```

4. **캐싱 설정**: Vercel/Netlify는 자동으로 최적화

## 🐛 문제 해결

### 빌드 실패
```bash
# 캐시 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 라우팅 문제 (404 에러)
- Vercel: `vercel.json` 파일 확인
- Netlify: `netlify.toml` 파일 확인
- GitHub Pages: `vite.config.ts`의 `base` 경로 확인

### 환경 변수
Vite에서는 `VITE_` 접두사 필요:
```env
VITE_API_URL=https://api.example.com
```

코드에서 사용:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 📱 Progressive Web App (PWA) 추가

PWA로 만들려면:

1. 의존성 설치:
```bash
npm install vite-plugin-pwa -D
```

2. `vite.config.ts` 수정:
```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: '영어 단어 암기',
        short_name: '단어암기',
        theme_color: '#F0CEF4',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

## 💡 추가 리소스

- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
- [Vercel 문서](https://vercel.com/docs)
- [Netlify 문서](https://docs.netlify.com)
- [GitHub Pages 가이드](https://pages.github.com)
