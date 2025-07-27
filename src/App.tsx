import { useState, useEffect } from "react";

const sentences = [
  { noun: "きょうだいを", verbPlain: "おしえます", verbTe: "おしえて", pl: "Uczę rodzeństwo." },
  { noun: "かんじを", verbPlain: "わすれます", verbTe: "わすれて", pl: "Zapominam kanji." },
  { noun: "ドアを", verbPlain: "あけます", verbTe: "あけて", pl: "Otwieram drzwi." },
  { noun: "ドアを", verbPlain: "しめます", verbTe: "しめて", pl: "Zamykam drzwi." },
  { noun: "ひこうきを", verbPlain: "おります", verbTe: "おりて", pl: "Wysiadać z samolotu." },
  { noun: "ろめんでんしゃに", verbPlain: "のります", verbTe: "のって", pl: "Wsiadać do tramwaju." },
  { noun: "でんきを", verbPlain: "つけます", verbTe: "つけて", pl: "Włączać światło." },
  { noun: "でんきを", verbPlain: "けします", verbTe: "けして", pl: "Wyłączać światło." },
  { noun: "ほんを", verbPlain: "かります", verbTe: "かりて", pl: "Pożyczać książkę." },
  { noun: "ほんを", verbPlain: "かします", verbTe: "かして", pl: "Pożyczać komuś książkę." },
  { noun: "", verbPlain: "あるきます", verbTe: "あるいて", pl: "Chodzić pieszo." },
  { noun: "たばこを", verbPlain: "すいます", verbTe: "すって", pl: "Palić papierosa." },
  { noun: "こどもと", verbPlain: "あそびます", verbTe: "あそって", pl: "Bawić się z dziećmi." },
  { noun: "おかあさんを", verbPlain: "てつだいます", verbTe: "てつだって", pl: "Pomagać mamie." },
  { noun: "しゃしんを", verbPlain: "とります", verbTe: "とって", pl: "Robić zdjęcia." },
  { noun: "", verbPlain: "いそいで、ください！", verbTe: "", pl: "Proszę się spieszyć!" },
  { noun: "いえに", verbPlain: "はいります", verbTe: "はいって", pl: "Wchodzić do domu." },
  { noun: "だいがくに", verbPlain: "でかけます", verbTe: "でかけて", pl: "Wychodzić na uniwersytet." },
  { noun: "にもつを", verbPlain: "もちます", verbTe: "もって", pl: "Trzymać bagaż." },
  { noun: "おみやげを", verbPlain: "もってきます", verbTe: "もってきて", pl: "Przynosić pamiątki." },
  { noun: "はしを", verbPlain: "つかいます", verbTe: "つかって", pl: "Używać pałeczek." },
  { noun: "きょうかしょを", verbPlain: "もちます", verbTe: "もって", pl: "Trzymać podręcznik." },
  { noun: "せんせいを", verbPlain: "つれてきます", verbTe: "つれてきて", pl: "Przyprowadzać nauczyciela." },
];

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [mode, setMode] = useState<"verb" | "noun">("verb");
  const [shuffledIndices, setShuffledIndices] = useState<number[]>(() =>
    shuffleArray(sentences.map((_, i) => i))
  );
  const [current, setCurrent] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [plainAnswer, setPlainAnswer] = useState("");
  const [teAnswer, setTeAnswer] = useState("");
  const [nounAnswer, setNounAnswer] = useState("");

  useEffect(() => {
    const newShuffled = shuffleArray(sentences.map((_, i) => i));
    setShuffledIndices(newShuffled);
    setCurrent(0);
    setShowHint(false);
    setShowAnswer(false);
    setPlainAnswer("");
    setTeAnswer("");
    setNounAnswer("");
  }, [mode]);

  const sentence = sentences[shuffledIndices[current]];

  const checkAnswer = () => {
    if (mode === "verb") {
      const plainOk = plainAnswer.trim() === sentence.verbPlain;
      const teOk = teAnswer.trim() === sentence.verbTe;
      alert(
        `Forma zwykła: ${plainOk ? "✔️" : "❌"}\nForma て: ${teOk ? "✔️" : "❌"}`
      );
    } else {
      const nounOk = nounAnswer.trim() === sentence.noun;
      alert(`Rzeczownik: ${nounOk ? "✔️" : "❌"}`);
    }
    setShowAnswer(false);
  };

  const renderSentence = () => {
    if (mode === "verb") {
      return (
        <p className="sentence-box">
          {sentence.noun}
          <span
            style={{
              textDecoration: "underline",
              borderBottom: "1px dotted black",
              marginLeft: 8,
              display: "inline-block",
              width: 96,
            }}
          >
            ＿＿＿＿＿＿
          </span>
        </p>
      );
    } else {
      return (
        <p className="sentence-box">
          <span
            style={{
              textDecoration: "underline",
              borderBottom: "1px dotted black",
              marginRight: 8,
              display: "inline-block",
              width: 160,
            }}
          >
            ＿＿＿＿＿＿＿＿＿＿＿＿
          </span>
          {sentence.verbPlain}
        </p>
      );
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <img
          src="https://cdn.gaijinpot.com/app/uploads/sites/6/2016/02/Mount-Fuji-New.jpg"
          alt="Mount Fuji"
          className="banner"
          style={{ height: 300, objectFit: "cover", borderRadius: 12 }}
        />
        <h1 className="text-red-800" style={{ fontWeight: "bold", fontSize: 32 }}>
          🌸 Doki Doki Rozdział 4 🌸
        </h1>
      </header>

      <main className="main">
        <div style={{ marginBottom: 24 }}>
          <button
            className={mode === "verb" ? "btnPrimary" : "btnSecondary"}
            onClick={() => setMode("verb")}
          >
            Ćwicz czasownik
          </button>
          <button
            className={mode === "noun" ? "btnPrimary" : "btnSecondary"}
            onClick={() => setMode("noun")}
          >
            Ćwicz rzeczownik
          </button>
        </div>

        {renderSentence()}

        <div>
          {mode === "verb" ? (
            <>
              <input
                type="text"
                placeholder="Forma zwykła (np. のります)"
                className="input"
                value={plainAnswer}
                onChange={(e) => setPlainAnswer(e.target.value)}
                spellCheck={false}
                autoComplete="off"
              />
              <input
                type="text"
                placeholder="Forma て (np. のって)"
                className="input"
                value={teAnswer}
                onChange={(e) => setTeAnswer(e.target.value)}
                spellCheck={false}
                autoComplete="off"
              />
            </>
          ) : (
            <input
              type="text"
              placeholder="Rzeczownik z partykułą (np. きょうだいを)"
              className="input"
              value={nounAnswer}
              onChange={(e) => setNounAnswer(e.target.value)}
              spellCheck={false}
              autoComplete="off"
            />
          )}
        </div>

        <div style={{ marginTop: 20 }}>
          <button
            className="btnSecondary"
            onClick={() => {
              setShowHint(false);
              setShowAnswer(false);
              setPlainAnswer("");
              setTeAnswer("");
              setNounAnswer("");
              setCurrent(
                (c) => (c - 1 + shuffledIndices.length) % shuffledIndices.length
              );
            }}
          >
            ← Wstecz
          </button>

          <button
            className="btnSecondary"
            onClick={() => {
              setShowHint(false);
              setShowAnswer(false);
              setPlainAnswer("");
              setTeAnswer("");
              setNounAnswer("");
              setCurrent((c) => (c + 1) % shuffledIndices.length);
            }}
          >
            Dalej →
          </button>
        </div>

        <div style={{ marginTop: 24 }}>
          <button className="btnGreen" onClick={checkAnswer}>
            Sprawdź
          </button>

          <button
            className="btnSecondary"
            onClick={() => setShowHint((v) => !v)}
            style={{ marginLeft: 10 }}
          >
            {showHint ? "Ukryj podpowiedź" : "Pokaż podpowiedź"}
          </button>

          <button
            className="btnSecondary"
            onClick={() => setShowAnswer((v) => !v)}
            style={{ marginLeft: 10 }}
          >
            {showAnswer ? "Ukryj odpowiedź" : "Pokaż odpowiedź"}
          </button>
        </div>

        {showHint && <p className="hint">{sentence.pl}</p>}

        {showAnswer && (
          <div className="answer">
            {mode === "verb" ? (
              <>
                <p>
                  Forma zwykła: <strong>{sentence.verbPlain}</strong>
                </p>
                <p>
                  Forma て: <strong>{sentence.verbTe}</strong>
                </p>
              </>
            ) : (
              <p>
                Rzeczownik: <strong>{sentence.noun || "(brak)"}</strong>
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
