#!/usr/bin/env bash
# 취급상품권 이미지 48개(원본은 kv-work.com 서버에 있음)를 img/giftcard/ 로 내려받습니다.
# 실행: WSL2 Ubuntu에서 사이트 루트 폴더로 이동 후  bash download-giftcard-images.sh
set -u
cd "$(dirname "$0")"
mkdir -p img/giftcard
ok=0; fail=0
while IFS=$'\t' read -r url name label; do
  [ -z "$url" ] && continue
  if [ -s "img/giftcard/$name" ]; then ok=$((ok+1)); continue; fi
  if wget -q --no-check-certificate --timeout=15 --tries=2 --user-agent="Mozilla/5.0" -O "img/giftcard/$name" "$url"; then
    ok=$((ok+1))
  else
    rm -f "img/giftcard/$name"; fail=$((fail+1)); echo "실패: $label  ($url)"
  fi
done < scripts-giftcard-images.txt
echo "완료: 성공 $ok / 실패 $fail  (이미지 위치: img/giftcard/)"
