// Hier pflegst du das Turnier.
// Resultate eintragen als score: "6:3 6:4" oder "6:3 4:6 10:8".
// Noch nicht gespielte Matches: score: ""

const tournament = {
  title: "Sommer Tennis Open 2026",
  subtitle: "Gruppenphase · 4 Gruppen à 5 Spieler",
  pointsForWin: 1,
  updatedAt: "2026-07-03 12:00",
  groups: {
    "Gruppe A": ["A1", "A2", "A3", "A4", "A5"],
    "Gruppe B": ["B1", "B2", "B3", "B4", "B5"],
    "Gruppe C": ["C1", "C2", "C3", "C4", "C5"],
    "Gruppe D": ["D1", "D2", "D3", "D4", "D5"]
  },
  matches: [
    // Gruppe A
    { group: "Gruppe A", p1: "A1", p2: "A2", score: "" },
    { group: "Gruppe A", p1: "A3", p2: "A4", score: "" },
    { group: "Gruppe A", p1: "A5", p2: "A1", score: "" },
    { group: "Gruppe A", p1: "A2", p2: "A3", score: "" },
    { group: "Gruppe A", p1: "A4", p2: "A5", score: "" },
    { group: "Gruppe A", p1: "A1", p2: "A3", score: "" },
    { group: "Gruppe A", p1: "A2", p2: "A4", score: "" },
    { group: "Gruppe A", p1: "A3", p2: "A5", score: "" },
    { group: "Gruppe A", p1: "A4", p2: "A1", score: "" },
    { group: "Gruppe A", p1: "A5", p2: "A2", score: "" },

    // Gruppe B
    { group: "Gruppe B", p1: "B1", p2: "B2", score: "" },
    { group: "Gruppe B", p1: "B3", p2: "B4", score: "" },
    { group: "Gruppe B", p1: "B5", p2: "B1", score: "" },
    { group: "Gruppe B", p1: "B2", p2: "B3", score: "" },
    { group: "Gruppe B", p1: "B4", p2: "B5", score: "" },
    { group: "Gruppe B", p1: "B1", p2: "B3", score: "" },
    { group: "Gruppe B", p1: "B2", p2: "B4", score: "" },
    { group: "Gruppe B", p1: "B3", p2: "B5", score: "" },
    { group: "Gruppe B", p1: "B4", p2: "B1", score: "" },
    { group: "Gruppe B", p1: "B5", p2: "B2", score: "" },

    // Gruppe C
    { group: "Gruppe C", p1: "C1", p2: "C2", score: "" },
    { group: "Gruppe C", p1: "C3", p2: "C4", score: "" },
    { group: "Gruppe C", p1: "C5", p2: "C1", score: "" },
    { group: "Gruppe C", p1: "C2", p2: "C3", score: "" },
    { group: "Gruppe C", p1: "C4", p2: "C5", score: "" },
    { group: "Gruppe C", p1: "C1", p2: "C3", score: "" },
    { group: "Gruppe C", p1: "C2", p2: "C4", score: "" },
    { group: "Gruppe C", p1: "C3", p2: "C5", score: "" },
    { group: "Gruppe C", p1: "C4", p2: "C1", score: "" },
    { group: "Gruppe C", p1: "C5", p2: "C2", score: "" },

    // Gruppe D
    { group: "Gruppe D", p1: "D1", p2: "D2", score: "" },
    { group: "Gruppe D", p1: "D3", p2: "D4", score: "" },
    { group: "Gruppe D", p1: "D5", p2: "D1", score: "" },
    { group: "Gruppe D", p1: "D2", p2: "D3", score: "" },
    { group: "Gruppe D", p1: "D4", p2: "D5", score: "" },
    { group: "Gruppe D", p1: "D1", p2: "D3", score: "" },
    { group: "Gruppe D", p1: "D2", p2: "D4", score: "" },
    { group: "Gruppe D", p1: "D3", p2: "D5", score: "" },
    { group: "Gruppe D", p1: "D4", p2: "D1", score: "" },
    { group: "Gruppe D", p1: "D5", p2: "D2", score: "" }
  ]
};
