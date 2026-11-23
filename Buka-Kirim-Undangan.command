#!/bin/bash
cd "$(dirname "$0")"
echo "==========================================================="
echo "🌿 Membuka Web UI Kirim Undangan WhatsApp Akila & Gagas..."
echo "==========================================================="
# Bebaskan port 3001 jika masih ada proses lama yang gantung
lsof -ti :3001 | xargs kill -9 2>/dev/null || true
npm run wa:ui


