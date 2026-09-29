# kv-work.co.kr — 한국상품권협회 창업컨설팅 (정적 사이트)

영카트(그누보드) 사이트에서 프론트만 추출해 정적 HTML로 재구성한 버전입니다.
GitHub → Cloudflare Pages 자동 배포용.

## 폴더 구조
```
kv-work-site/
├─ index.html                     메인 원페이지 (기업소개·연혁·사업소개·가맹안내·창업상담·고객센터)
├─ css/
│  ├─ colorset.css                사이트 커스텀 스타일 (원본 thema/Basic/colorset/Basic/colorset.css)
│  ├─ default.css / apms.css / basic.css / bootstrap.min.css   원본 공통 스타일 (레이아웃 유지용)
│  ├─ swiper-bundle.min.css / aos.css                          라이브러리 (로컬 번들)
├─ js/
│  ├─ main.js                     헤더·슬라이더·AOS 초기화 (원본 인라인 스크립트 통합)
│  ├─ jquery.min.js / swiper-bundle.min.js / aos.js            라이브러리 (로컬 번들)
├─ img/                           로고·섹션 이미지·배경·파비콘
│  └─ giftcard/                   취급상품권 이미지 48개 → 아래 스크립트로 채우기
├─ download-giftcard-images.sh    취급상품권 이미지 다운로드 스크립트
├─ scripts-giftcard-images.txt    이미지 URL 목록 (스크립트가 읽음)
├─ 404.html                      없는 주소 응답용 (noindex) — 없으면 Pages가 모든 경로를 index.html 로 200 응답
├─ _redirects                     옛 영카트 URL(/shop/*) → 메인 301 (/bbs/* 는 404 로 떨어뜨림)
├─ robots.txt / sitemap.xml / _headers / .gitignore
```

## 1. 취급상품권 이미지 채우기 (배포 전 1회)
이미지 원본이 kv-work.com 서버에 있어 별도로 내려받아야 합니다.
```bash
# WSL2 Ubuntu, 사이트 루트에서
bash download-giftcard-images.sh
ls img/giftcard | wc -l     # 48 이면 완료
```
kv-work.com 서버가 내려가 실패하면 `img/giftcard/` 에 같은 파일명으로 직접 넣거나
`scripts-giftcard-images.txt` 3번째 열(상품권 이름)을 보고 새 이미지를 준비하면 됩니다.

## 2. 로컬 확인
```bash
python3 -m http.server 8080     # 브라우저에서 http://localhost:8080
```
(file:// 로 직접 열면 절대경로(/css/…) 때문에 스타일이 안 붙습니다. 서버로 여세요.)

## 3. GitHub + Cloudflare Pages 배포
```bash
git init && git add . && git commit -m "kv-work 정적 사이트 초기 버전"
git branch -M main
git remote add origin git@github.com:increw01-alt/kv-work-site.git
git push -u origin main
```
Cloudflare Pages: Create → Connect to Git → `kv-work-site`
- Framework preset: **None** / Build command: (비움) / Build output directory: `/`
- Custom domains: `kv-work.co.kr`, `www.kv-work.co.kr`
- SSL/TLS: Full — 인증서는 Cloudflare가 자동 발급·갱신

## 원본 대비 변경 사항
- 로그인·회원가입·장바구니·사이드바 등 그누보드/영카트 기능 UI 제거
- 공지사항·상담 Q&A 게시글 링크 → 채널톡 상담으로 연결 (게시판은 정적 사이트에서 운영 불가)
- 창업상담신청 "바로가기" 버튼 → 로그인 요구 대신 채널톡 상담 창 열기
- jQuery 1.8 + 3.6 이중 로딩, Swiper 9 + 10 이중 로딩 → 각 1개로 정리, 모두 로컬 번들
- `http://` 폰트/캐노니컬 → `https://`, canonical/OG/JSON-LD(Organization)/sitemap/robots 추가
- 네이버 애널리틱스(wcs) 코드 유지

## 검색엔진(SEO) 관련 메모 (2026-09-29)
- Google Search Console: kv-work.co.kr / kv-work.com 모두 DNS TXT 로 도메인 속성 등록됨. 사이트맵 `https://kv-work.co.kr/sitemap.xml` 제출.
- 옛 사이트 자유게시판(`/bbs/board.php?bo_table=free&wr_id=…`)에 스팸 글 수만 건이 구글에 색인되어 있음.
  → `_redirects` 에 `/bbs/*` 규칙을 두지 않아 404.html(404 상태)로 응답 → 구글이 자연 삭제. 
  → Search Console ▸ 삭제 ▸ "새 요청" 에서 접두어 `https://kv-work.co.kr/bbs/` 임시 삭제 요청하면 더 빨리 빠짐.
- 도메인 4개(kv-work.co.kr, www.kv-work.co.kr, kv-work.com, www.kv-work.com)가 같은 내용을 서비스 중. canonical 은 kv-work.co.kr.
  → Cloudflare 대시보드 ▸ 각 존 ▸ Rules ▸ Redirect Rules 에서 301 통합 필요 (Pages `_redirects` 는 도메인 단위 리다이렉트 미지원):
    - kv-work.com 존: 호스트가 `kv-work.com` 또는 `www.kv-work.com` → `https://kv-work.co.kr` + 경로, 301
    - kv-work.co.kr 존: 호스트가 `www.kv-work.co.kr` → `https://kv-work.co.kr` + 경로, 301 (템플릿 "Redirect from WWW to root")

## 배포 전 확인할 것
- [x] `img/og_img.png` (1200×630) 추가 — 2026-09-29 Pillow로 생성
- [ ] 푸터 사업자 정보(대표자명·주소·번호)가 현재 기준으로 맞는지 확인
- [ ] 네이버 서치어드바이저에 kv-work.co.kr 재등록 후 `naver-site-verification` 값 교체
- [ ] 푸터 Partner Site 중 `href="#!"` 인 3개(한국상품권거래소·플러스인·상품권전용쇼핑몰) 주소 입력
- [ ] 채널톡 링크(`koreagiftcard.channel.io`)가 현재 사용 중인 채널인지 확인
