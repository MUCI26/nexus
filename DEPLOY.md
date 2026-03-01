# Nexus Deployment auf Vercel

## Schritt 1: Vercel Login
```bash
vercel login
```

## Schritt 2: Projekt verlinken
```bash
cd ~/Projects/nexus
vercel link
```

## Schritt 3: Umgebungsvariablen setzen
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
echo "https://riajoenqhgfphxmlqsxx.supabase.co" | pbcopy
# Dann Einfügen

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Kopiere: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Kopiere: eyJhbGciOiJIUzI1NiIs...

vercel env add DATABASE_URL
# Kopiere: postgresql://postgres:NEXUSapptest26@db...
```

## Schritt 4: Deployen
```bash
vercel --prod
```

## Fertig! 🎉
URL: https://nexus-[username]-vercel.app
