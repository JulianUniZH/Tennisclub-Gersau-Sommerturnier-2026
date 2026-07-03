const $ = (selector) => document.querySelector(selector);

function emptyStats(name) {
  return { name, played: 0, wins: 0, losses: 0, setsWon: 0, setsLost: 0, gamesWon: 0, gamesLost: 0, points: 0 };
}

function parseScore(score) {
  if (!score || !score.trim()) return null;
  const sets = score.trim().split(/\s+/).map(s => s.split(":").map(Number));
  if (sets.some(([a,b]) => Number.isNaN(a) || Number.isNaN(b))) return null;
  let p1Sets = 0, p2Sets = 0, p1Games = 0, p2Games = 0;
  for (const [a,b] of sets) {
    p1Games += a; p2Games += b;
    if (a > b) p1Sets++; else if (b > a) p2Sets++;
  }
  if (p1Sets === p2Sets) return null;
  return { p1Sets, p2Sets, p1Games, p2Games, winner: p1Sets > p2Sets ? "p1" : "p2" };
}

function standingsFor(groupName) {
  const stats = new Map(tournament.groups[groupName].map(p => [p, emptyStats(p)]));
  tournament.matches.filter(m => m.group === groupName).forEach(match => {
    const result = parseScore(match.score);
    if (!result) return;
    const a = stats.get(match.p1);
    const b = stats.get(match.p2);
    a.played++; b.played++;
    a.setsWon += result.p1Sets; a.setsLost += result.p2Sets;
    b.setsWon += result.p2Sets; b.setsLost += result.p1Sets;
    a.gamesWon += result.p1Games; a.gamesLost += result.p2Games;
    b.gamesWon += result.p2Games; b.gamesLost += result.p1Games;
    if (result.winner === "p1") {
      a.wins++; b.losses++; a.points += tournament.pointsForWin;
    } else {
      b.wins++; a.losses++; b.points += tournament.pointsForWin;
    }
  });

  return [...stats.values()].sort((a, b) =>
    b.points - a.points ||
    (b.setsWon - b.setsLost) - (a.setsWon - a.setsLost) ||
    (b.gamesWon - b.gamesLost) - (a.gamesWon - a.gamesLost) ||
    b.setsWon - a.setsWon ||
    b.gamesWon - a.gamesWon ||
    a.name.localeCompare(b.name)
  );
}

function groupCard(groupName) {
  const rows = standingsFor(groupName).map((p, idx) => `
    <tr class="${idx < 3 ? 'qualifier' : ''}">
      <td>${idx + 1}</td><td class="player">${p.name}</td><td>${p.played}</td><td>${p.wins}</td><td>${p.losses}</td>
      <td>${p.setsWon}:${p.setsLost}</td><td>${p.gamesWon}:${p.gamesLost}</td><td><strong>${p.points}</strong></td>
    </tr>`).join("");

  const matchList = tournament.matches.filter(m => m.group === groupName).map(m => {
    const done = parseScore(m.score);
    return `<li class="match ${done ? 'done' : ''}"><span>${m.p1} – ${m.p2}</span><strong>${m.score || 'offen'}</strong></li>`;
  }).join("");

  return `
    <article class="card group-card">
      <h2>${groupName}</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>#</th><th>Spieler</th><th>Sp</th><th>S</th><th>N</th><th>Sätze</th><th>Games</th><th>P</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <details>
        <summary>Spiele anzeigen</summary>
        <ul class="matches-small">${matchList}</ul>
      </details>
    </article>`;
}

function renderAllMatches() {
  const byGroup = Object.keys(tournament.groups).map(group => `
    <div class="match-group">
      <h3>${group}</h3>
      ${tournament.matches.filter(m => m.group === group).map(m => `<div class="match-row"><span>${m.p1}</span><span>${m.p2}</span><strong>${m.score || 'offen'}</strong></div>`).join("")}
    </div>`).join("");
  $("#matches").innerHTML = byGroup;
}

function svgLine(x1, y1, x2, y2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#111" stroke-width="4" stroke-linecap="square" />`;
}

function svgConnector(fromX, fromY, toX, toY) {
  const midX = fromX + 20;
  return [
    svgLine(fromX, fromY, midX, fromY),
    svgLine(midX, fromY, midX, toY),
    svgLine(midX, toY, toX, toY)
  ].join("");
}

function svgMatch(x, y, line1 = "", line2 = "", width = 360, height = 60) {
  const text1 = line1 || "";
  const text2 = line2 || "";
  return `
    <g>
      <rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#f8f9fb" stroke="#cfd5dc" stroke-width="2" />
      <rect x="${x}" y="${y}" width="28" height="${height}" fill="#b9c5d6" />
      <line x1="${x}" y1="${y + height / 2}" x2="${x + width}" y2="${y + height / 2}" stroke="#d7dce2" stroke-width="2" />
      <line x1="${x + width - 70}" y1="${y}" x2="${x + width - 70}" y2="${y + height}" stroke="#cfd5dc" stroke-width="2" />
      <text x="${x + 46}" y="${y + 22}" font-family="Arial, sans-serif" font-size="18" fill="#111">${text1}</text>
      <text x="${x + 46}" y="${y + 48}" font-family="Arial, sans-serif" font-size="18" fill="#111">${text2}</text>
    </g>
  `;
}

function mainBracketSvg() {
  const w = 360;
  const h = 60;

  const x1 = 0;
  const x2 = 420;
  const x3 = 840;
  const x4 = 1260;

  const m = [
    { x: x1, y: 0,   a: "-",                b: "-" },
    { x: x1, y: 90,  a: "Zweiter Gruppe C", b: "Dritter Gruppe D" },
    { x: x2, y: 45,  a: "Sieger Gruppe A",  b: "" },

    { x: x1, y: 210, a: "-",                b: "-" },
    { x: x1, y: 300, a: "Zweiter Gruppe D", b: "Dritter Gruppe C" },
    { x: x2, y: 255, a: "Sieger Gruppe B",  b: "" },

    { x: x1, y: 420, a: "-",                b: "-" },
    { x: x1, y: 510, a: "Zweiter Gruppe A", b: "Dritter Gruppe B" },
    { x: x2, y: 465, a: "Sieger Gruppe C",  b: "" },

    { x: x1, y: 630, a: "-",                b: "-" },
    { x: x1, y: 720, a: "Zweiter Gruppe B", b: "Dritter Gruppe A" },
    { x: x2, y: 675, a: "Sieger Gruppe D",  b: "" },

    { x: x3, y: 150, a: "", b: "" },
    { x: x3, y: 570, a: "", b: "" },

    { x: x4, y: 360, a: "", b: "" }
  ];

  const matches = m.map(item => svgMatch(item.x, item.y, item.a, item.b, w, h)).join("");

  const c = [
    svgConnector(x1 + w, 30,  x2, 75),
    svgConnector(x1 + w, 120, x2, 75),

    svgConnector(x1 + w, 240, x2, 285),
    svgConnector(x1 + w, 330, x2, 285),

    svgConnector(x1 + w, 450, x2, 495),
    svgConnector(x1 + w, 540, x2, 495),

    svgConnector(x1 + w, 660, x2, 705),
    svgConnector(x1 + w, 750, x2, 705),

    svgConnector(x2 + w, 75,  x3, 180),
    svgConnector(x2 + w, 285, x3, 180),

    svgConnector(x2 + w, 495, x3, 600),
    svgConnector(x2 + w, 705, x3, 600),

    svgConnector(x3 + w, 180, x4, 390),
    svgConnector(x3 + w, 600, x4, 390)
  ].join("");

  return `
    <svg class="bracket-svg" viewBox="0 0 1640 790" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tableau 1">
      ${matches}
      ${c}
    </svg>
  `;
}

function placementBracketSvg() {
  const w = 360;
  const h = 60;

  const x1 = 0;
  const x2 = 450;
  const x3 = 900;

  const m = [
    { x: x1, y: 0,   a: "Vierter Gruppe A", b: "Fünfter Gruppe D" },
    { x: x1, y: 170, a: "Vierter Gruppe B", b: "Fünfter Gruppe C" },
    { x: x1, y: 360, a: "Vierter Gruppe C", b: "Fünfter Gruppe B" },
    { x: x1, y: 530, a: "Vierter Gruppe D", b: "Fünfter Gruppe A" },

    { x: x2, y: 85,  a: "", b: "" },
    { x: x2, y: 445, a: "", b: "" },

    { x: x3, y: 265, a: "", b: "" }
  ];

  const matches = m.map(item => svgMatch(item.x, item.y, item.a, item.b, w, h)).join("");

  const c = [
    svgConnector(x1 + w, 30,  x2, 115),
    svgConnector(x1 + w, 200, x2, 115),

    svgConnector(x1 + w, 390, x2, 475),
    svgConnector(x1 + w, 560, x2, 475),

    svgConnector(x2 + w, 115, x3, 295),
    svgConnector(x2 + w, 475, x3, 295)
  ].join("");

  return `
    <svg class="bracket-svg" viewBox="0 0 1300 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tableau 2">
      ${matches}
      ${c}
    </svg>
  `;
}

function renderQualified() {
  $("#qualified").innerHTML = `
    <div class="ko-layout">
      <div class="ko-block">
        <h3>Tableau 1</h3>
        <p class="muted ko-note">Für Rang 1, 2, 3 jeder Gruppe.</p>
        <div class="bracket-scroll">
          ${mainBracketSvg()}
        </div>
      </div>

      <div class="ko-block">
        <h3>Tableau 2</h3>
        <p class="muted ko-note">Für Rang 4, 5 jeder Gruppe.</p>
        <div class="bracket-scroll">
          ${placementBracketSvg()}
        </div>
      </div>
    </div>
  `;
}

function render() {
  $("#tournament-title").textContent = tournament.title;
  $("#tournament-subtitle").textContent = tournament.subtitle;
  $("#last-updated").textContent = tournament.updatedAt;
  const played = tournament.matches.filter(m => parseScore(m.score)).length;
  $("#meta").innerHTML = `<span>${played}/${tournament.matches.length} Spiele gespielt</span><span>${Object.keys(tournament.groups).length} Gruppen</span>`;
  $("#groups").innerHTML = Object.keys(tournament.groups).map(groupCard).join("");
  renderAllMatches();
  renderQualified();
}

render();
