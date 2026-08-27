#!/bin/bash

set -e

npm run build

rm -f app.zip

zip -r app.zip . \
  -x "node_modules/*" \
  -x ".next/*" \
  -x ".git/*" \
  -x ".env*" \
  -x "app.zip"

echo ""
echo "✅ app.zip を生成しました。Hanamii の「再デプロイ」へアップロードしてください。"
