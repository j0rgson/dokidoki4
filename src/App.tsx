import { useState, useEffect } from "react";

const sentences = [
  { noun: "きょうだいを", verbPlain: "おしえます", verbTe: "おしえて", pl: "" },
  { noun: "かんじを", verbPlain: "わすれます", verbTe: "わすれて", pl: "" },
  { noun: "ドアを", verbPlain: "あけます", verbTe: "あけて", pl: "" },
  { noun: "ドアを", verbPlain: "しめます", verbTe: "しめて", pl: "" },
  { noun: "ひこうきを", verbPlain: "おります", verbTe: "おりて", pl: "" },
  { noun: "ろめんでんしゃに", verbPlain: "のります", verbTe: "のって", pl: "" },
  { noun: "でんきを", verbPlain: "つけます", verbTe: "つけて", pl: "" },
  { noun: "でんきを", verbPlain: "けします", verbTe: "けして", pl: "" },
  { noun: "ほんを", verbPlain: "かります", verbTe: "かりて", pl: "" },
  { noun: "ほんを", verbPlain: "かします", verbTe: "かして", pl: "" },
  { noun: "", verbPlain: "あるきます", verbTe: "あるいて", pl: "" },
  { noun: "たばこを", verbPlain: "すいます", verbTe: "すって", pl: "" },
  { noun: "こどもと", verbPlain: "あそびます", verbTe: "あそって", pl: "" },
  { noun: "おかあさんを", verbPlain: "てつだいます", verbTe: "てつだって", pl: "" },
  { noun: "しゃしんを", verbPlain: "とります", verbTe: "とって", pl: "" },
  { noun: "", verbPlain: "いそいで、ください！", verbTe: "", pl: "" },
  { noun: "いえに", verbPlain: "はいります", verbTe: "はいって", pl: "" },
  { noun: "だいがくに", verbPlain: "でかけます", verbTe: "でかけて", pl: "" },
  { noun: "にもつを", verbPlain: "もちます", verbTe: "もって", pl: "" },
  { noun: "おみやげを", verbPlain: "もってきます", verbTe: "もってきて", pl: "" },
  { noun: "はしを", verbPlain: "つかいます", verbTe: "つかって", pl: "" },
  { noun: "きょうかしょを", verbPlain: "もちます", verbTe: "もって", pl: "" },
  { noun: "せんせいを", verbPlain: "つれてきます", verbTe: "つれてきて", pl: "" },
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
          className="imageFuji"
        />
        <h1>🌸 Doki Doki Rozdział 4 🌸</h1>
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

        <div>
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

        <div>
          <button className="btnGreen" onClick={checkAnswer}>
            Sprawdź
          </button>

          <button className="btnSecondary" onClick={() => setShowHint((v) => !v)}>
            {showHint ? "Ukryj podpowiedź" : "Pokaż podpowiedź"}
          </button>

          <button
            className="btnSecondary"
            onClick={() => setShowAnswer((v) => !v)}
          >
            {showAnswer ? "Ukryj odpowiedź" : "Pokaż odpowiedź"}
          </button>
        </div>

        {showHint && <p className="hint-text">{sentence.pl}</p>}

        {showAnswer && (
          <div className="answer-box">
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
