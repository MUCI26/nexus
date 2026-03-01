#!/bin/bash
# Vercel Environment Variables

echo "Setting Vercel Environment Variables..."

# Production URLs
echo "https://riajoenqhgfphxmlqsxx.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production 2>/dev/null
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpYWpvZW5xaGdmcGh4bWxxc3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNDA1MzIsImV4cCI6MjA4NzkxNjUzMn0.POXxhEiVLYYSp3K7mPOa_EXiRSSiZW0yTxzyK8HYbeQ" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production 2>/dev/null
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpYWpvZW5xaGdmcGh4bWxxc3h4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM0MDUzMiwiZXhwIjoyMDg3OTE2NTMyfQ.003o25iFmkYRYBPeyxo9JWl1ycTkayzmCVcUl96WisI" | vercel env add SUPABASE_SERVICE_ROLE_KEY production 2>/dev/null
echo "postgresql://postgres:NEXUSapptest26@db.riajoenqhgfphxmlqsxx.supabase.co:5432/postgres" | vercel env add DATABASE_URL production 2>/dev/null

echo "✅ Environment variables set!"
