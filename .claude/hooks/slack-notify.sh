#!/bin/bash
# slack-notify.sh
# Claude Code 훅 이벤트(Notification, Stop)를 슬랙 Incoming Webhook으로 전송합니다.
# 웹훅 URL은 환경변수 SLACK_WEBHOOK_URL(.claude/settings.local.json의 env)에서 읽습니다.

# 훅 입력(JSON)을 stdin에서 읽기
INPUT=$(cat)

# 웹훅 URL이 없으면 조용히 종료 (Claude 동작에 영향 없음)
if [ -z "$SLACK_WEBHOOK_URL" ]; then
  exit 0
fi

# Stop 훅이 다시 Stop을 유발하는 무한 루프 방지
if [ "$(echo "$INPUT" | jq -r '.stop_hook_active // false')" = "true" ]; then
  exit 0
fi

EVENT=$(echo "$INPUT" | jq -r '.hook_event_name // empty')
MESSAGE=$(jq -r '.message')
CWD=$(echo "$INPUT" | jq -r '.cwd // empty')
PROJECT=$(basename "${CWD:-$PWD}")

# 이벤트별 알림 문구 구성
case "$EVENT" in
  Notification)
    TEXT="🔐 [$PROJECT] 권한 승인이 필요합니다: $MESSAGE"
    ;;
  Stop)
    TEXT="✅ [$PROJECT] 작업이 완료되었습니다"
    ;;
  *)
    exit 0
    ;;
esac

# 슬랙 메시지 길이 제한 (300자)
TEXT="${TEXT:0:300}"

# jq로 JSON 페이로드 생성 (따옴표/개행 이스케이프 안전)
PAYLOAD=$(jq -n --arg text "$TEXT" '{text: $text}')

# 슬랙으로 전송 (실패해도 Claude 동작을 막지 않음)
curl -sS --max-time 5 -X POST \
  -H 'Content-type: application/json' \
  --data "$PAYLOAD" \
  "$SLACK_WEBHOOK_URL" >/dev/null 2>&1

exit 0
