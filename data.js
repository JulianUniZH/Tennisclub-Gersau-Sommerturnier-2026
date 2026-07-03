// Hier pflegst du das Turnier.
// Resultate eintragen als score: "6:3 6:4" oder "6:3 4:6 10:8".
// Noch nicht gespielte Matches: score: ""

const tournament = {
  title: "Tennisclub Gersau Sommerturnier 2026",
  subtitle: "Gruppenphase · 4 Gruppen à 5 Spieler",
  pointsForWin: 1,
  updatedAt: "2026-07-03 12:00",
  groups: {
    "Gruppe A": [
      "Mitch Steffan",
      "Mario Camenzind",
      "Maximilian Weber",
      "Christian Schnyder",
      "Sabine Allemann"
    ],
    "Gruppe B": [
      "Julian Bolfing",
      "Pascal Steiner",
      "Sandro Schuler",
      "Alan Tarantino",
      "Marco Appert"
    ],
    "Gruppe C": [
      "Oliver Bolfing",
      "Marcel Gehringer",
      "Lars Nigg",
      "Philip Camenzind",
      "Petra Rotter"
    ],
    "Gruppe D": [
      "Urs Huber",
      "Vasco Sommacal",
      "Enzo Nigg",
      "Gianfranco Da Palma",
      "Marco Camenzind"
    ]
  },
  matches: [
    // Gruppe A
    { group: "Gruppe A", p1: "Mitch Steffan", p2: "Mario Camenzind", score: "" },
    { group: "Gruppe A", p1: "Maximilian Weber", p2: "Christian Schnyder", score: "" },
    { group: "Gruppe A", p1: "Sabine Allemann", p2: "Mitch Steffan", score: "" },
    { group: "Gruppe A", p1: "Mario Camenzind", p2: "Maximilian Weber", score: "" },
    { group: "Gruppe A", p1: "Christian Schnyder", p2: "Sabine Allemann", score: "" },
    { group: "Gruppe A", p1: "Mitch Steffan", p2: "Maximilian Weber", score: "" },
    { group: "Gruppe A", p1: "Mario Camenzind", p2: "Christian Schnyder", score: "" },
    { group: "Gruppe A", p1: "Maximilian Weber", p2: "Sabine Allemann", score: "" },
    { group: "Gruppe A", p1: "Christian Schnyder", p2: "Mitch Steffan", score: "" },
    { group: "Gruppe A", p1: "Sabine Allemann", p2: "Mario Camenzind", score: "" },

    // Gruppe B
    { group: "Gruppe B", p1: "Julian Bolfing", p2: "Pascal Steiner", score: "6:4 6:1" },
    { group: "Gruppe B", p1: "Sandro Schuler", p2: "Alan Tarantino", score: "" },
    { group: "Gruppe B", p1: "Marco Appert", p2: "Julian Bolfing", score: "" },
    { group: "Gruppe B", p1: "Pascal Steiner", p2: "Sandro Schuler", score: "" },
    { group: "Gruppe B", p1: "Alan Tarantino", p2: "Marco Appert", score: "" },
    { group: "Gruppe B", p1: "Julian Bolfing", p2: "Sandro Schuler", score: "" },
    { group: "Gruppe B", p1: "Pascal Steiner", p2: "Alan Tarantino", score: "" },
    { group: "Gruppe B", p1: "Sandro Schuler", p2: "Marco Appert", score: "" },
    { group: "Gruppe B", p1: "Alan Tarantino", p2: "Julian Bolfing", score: "" },
    { group: "Gruppe B", p1: "Marco Appert", p2: "Pascal Steiner", score: "" },

    // Gruppe C
    { group: "Gruppe C", p1: "Oliver Bolfing", p2: "Marcel Gehringer", score: "" },
    { group: "Gruppe C", p1: "Lars Nigg", p2: "Philip Camenzind", score: "" },
    { group: "Gruppe C", p1: "Petra Rotter", p2: "Oliver Bolfing", score: "" },
    { group: "Gruppe C", p1: "Marcel Gehringer", p2: "Lars Nigg", score: "" },
    { group: "Gruppe C", p1: "Philip Camenzind", p2: "Petra Rotter", score: "" },
    { group: "Gruppe C", p1: "Oliver Bolfing", p2: "Lars Nigg", score: "" },
    { group: "Gruppe C", p1: "Marcel Gehringer", p2: "Philip Camenzind", score: "" },
    { group: "Gruppe C", p1: "Lars Nigg", p2: "Petra Rotter", score: "" },
    { group: "Gruppe C", p1: "Philip Camenzind", p2: "Oliver Bolfing", score: "" },
    { group: "Gruppe C", p1: "Petra Rotter", p2: "Marcel Gehringer", score: "" },

    // Gruppe D
    { group: "Gruppe D", p1: "Urs Huber", p2: "Vasco Sommacal", score: "" },
    { group: "Gruppe D", p1: "Enzo Nigg", p2: "Gianfranco Da Palma", score: "" },
    { group: "Gruppe D", p1: "Marco Camenzind", p2: "Urs Huber", score: "" },
    { group: "Gruppe D", p1: "Vasco Sommacal", p2: "Enzo Nigg", score: "" },
    { group: "Gruppe D", p1: "Gianfranco Da Palma", p2: "Marco Camenzind", score: "" },
    { group: "Gruppe D", p1: "Urs Huber", p2: "Enzo Nigg", score: "" },
    { group: "Gruppe D", p1: "Vasco Sommacal", p2: "Gianfranco Da Palma", score: "" },
    { group: "Gruppe D", p1: "Enzo Nigg", p2: "Marco Camenzind", score: "" },
    { group: "Gruppe D", p1: "Gianfranco Da Palma", p2: "Urs Huber", score: "" },
    { group: "Gruppe D", p1: "Marco Camenzind", p2: "Vasco Sommacal", score: "" }
  ]
};