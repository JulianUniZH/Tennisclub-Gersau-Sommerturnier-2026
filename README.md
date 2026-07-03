# Tennis-Turnier-Website

Statische Website für ein Tennisturnier mit 4 Gruppen à 5 Spieler.

## Nutzung

1. `data.js` öffnen.
2. Spielernamen in `groups` ersetzen.
3. Ergebnisse in `matches` eintragen, z. B. `score: "6:3 6:4"`.
4. `updatedAt` anpassen.
5. `index.html` im Browser öffnen oder den Ordner hosten.

## Hosting-Ideen

- GitHub Pages
- Netlify Drop
- Cloudflare Pages
- Jeder einfache Webspace

## Ranglistenlogik

Sortierung nach:

1. Punkte / Siege
2. Satzdifferenz
3. Game-Differenz
4. Gewonnene Sätze
5. Gewonnene Games
6. Name

Head-to-Head ist bewusst nicht eingebaut, weil das bei Dreier-Gleichständen schnell komplex wird.
