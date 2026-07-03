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
    <tr class="${idx < 2 ? 'qualifier' : ''}">
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

function renderQualified() {
  const rows = Object.keys(tournament.groups).map(group => {
    const [first, second] = standingsFor(group);
    return `<div class="qualified-row"><span>${group}</span><strong>1. ${first.name}</strong><strong>2. ${second.name}</strong></div>`;
  }).join("");
  $("#qualified").innerHTML = rows;
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
