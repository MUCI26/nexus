#!/bin/bash
cd ~/Projects/nexus

# GitHub Remote hinzufügen (user muss Repo manuell erstellen)
echo "1. Erstelle ein neues Repository auf:"
echo "   https://github.com/new"
echo "   Name: nexus"
echo "   Public"
echo ""
echo "2. Dann führe aus:"
echo "   git remote add origin https://github.com/DEIN_USERNAME/nexus.git"
echo "   git branch -M main"
echo "   git push -u origin main"
