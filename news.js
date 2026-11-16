// Meldungen für den Bereich "Aktuelles".
//
// Neue Meldung: einen Block { ... }, kopieren und GANZ OBEN einfügen.
// Die oberste Meldung ist die neueste und wird immer angezeigt,
// alle weiteren erst nach Klick auf "Alle Meldungen anzeigen".
//
// - title:    Überschrift
// - text:     Text; eine Leerzeile erzeugt einen neuen Absatz
// - image:    Foto (optional), am besten in images/photos/ ablegen
// - images:   statt "image" für mehrere Fotos – sie wechseln automatisch,
//             antippen zeigt das nächste: images: ["…/a.jpeg", "…/b.jpeg"],
//             Videos (.mp4) gehen auch – sie laufen stumm bis zum Ende;
//             als erstes Element aber immer ein Foto (Vorschaubild)
// - imageAlt: kurze Bildbeschreibung (für Screenreader und falls das Bild nicht lädt)
//
// Text zwischen ` ` (Backticks) darf über mehrere Zeilen gehen.
// Nach jedem Block } ein Komma setzen.

window.NEWS = [
  {
    title: "Training an der Schule läuft!",
    images: [
      "images/photos/volleyball1.jpeg",
      "images/photos/run.jpeg",
      "images/photos/tennis.mp4",
    ],
    imageAlt:
      "Schüler:innen der Ballsport Akademie beim Volleyball-, Fußball- und Tennistraining an der MS Reichenau",
    text: `Restlos begeistert sind die Trainer und Schüler:innen der Ballsport
Akademie von den sportartspezifischen Unterrichtseinheiten an der Mittelschule
Reichenau. Egal ob beim Tennis mit Trainer Mischa Shumskyi, Volleyball mit
Rogelio Hernandez oder Fußball mit Ahmet Duran – in allen Hallen wird eifrig
geübt und an den Techniken gearbeitet. Die in Zusammenarbeit mit den
Spezialverbänden angebotenen Trainings an der Schule sind – neben der
Ganztagesklasse – eines der Markenzeichen der Ballsport Akademie.`,
  },
  {
    title: "Ballsport Akademie taucht ab",
    images: ["images/photos/swim1.jpeg", "images/photos/swim2.jpeg"],
    imageAlt:
      "Schüler:innen der Ballsport Akademie bei den Schwimmtagen im Stubay in Telfes",
    text: `Noch vor den Herbstferien konnten die Schüler:innen der Ballsport
Akademie im Rahmen der schulischen Schwimmtage ihre Fähigkeiten im Wasser
trainieren. Beim mehrtägigen Kurs im „Stubay“ in Telfes im Stubaital ging es
hauptsächlich um Technik und Sicherheit im Wasser, aber natürlich auch um viel
Spaß auf den Rutschen und im Strudel. Danke an die freundliche Unterstützung vor
Ort!`,
  },
  {
    title: "Bürgermeister Anzengruber besucht Ballsport Akademie",
    image: "images/photos/buergermeister.jpeg",
    imageAlt:
      "Bürgermeister Johannes Anzengruber mit Volleyball-Schülerinnen der Ballsport Akademie",
    text: `Mitte Oktober 2026 besuchte der Innsbrucker Bürgermeister und einer
der treibenden Kräfte hinter der Ballsport Akademie, Johannes Anzengruber, die
Schülerinnen an der Mittelschule Reichenau. Als Zaungast beim Volleyball-Training
war Anzengruber vom Einsatz der Athletinnen restlos begeistert.`,
  },
  {
    title: "Ballsport-Athleten beim Orientierungslauf",
    image: "images/photos/orientierungslauf.jpeg",
    imageAlt:
      "Schüler:innen der Ballsport Akademie bei den Tiroler Schulmeisterschaften im Orientierungslauf",
    text: `Im Rahmen ihrer multisportiven Ausbildung hatten einige Schüler:innen
der Ballsport Akademie im Oktober 2026 die Gelegenheit, an den Tiroler
Schulmeisterschaften im Orientierungslauf teilzunehmen.`,
  },
  {
    title: "Sportkoordinatoren treffen sich an Ballsport Akademie",
    image: "images/photos/sportkoordinatoren.jpeg",
    imageAlt: "Gruppenfoto der Sport-Koordinator:innen an der MS Reichenau",
    text: `Beim alljährlichen Treffen der Sport-Koordinator:innen der
Innsbrucker Volks- und Mittelschulen konnten sich die Gäste an der MS Reichenau
genau über die Ballsport Akademie informieren. Nach den Grußworten von
Bürgermeister und Sportreferent Johannes Anzengruber berichtete Esmeralda
Mildner über Neuigkeiten aus dem Nachwuchskompetenzzentrum Tirol. Anschließend
nutzten die Teilnehmer:innen die Möglichkeit zum Austausch und Netzwerken bei
einem Umtrunk und Snacks.`,
  },
  {
    title: "BA-Fußballer im Schülerliga-Einsatz",
    image: "images/photos/schuelerliga.jpeg",
    imageAlt: "Fußballer der MS Reichenau beim Schülerliga-Turnier",
    text: `Beim Fußball-Schülerliga-Turnier Anfang Oktober an der Innsbrucker
Wiesengasse feierten die Spieler der Ballsport Akademie ihren ersten Auftritt im
Team der MS Reichenau. Bei diesem Vorbereitungsturnier nutzten alle Teams die
Möglichkeit, die neuen Spieler ins Team zu integrieren, um für die Meisterschaft
bereit zu sein.`,
  },
];
