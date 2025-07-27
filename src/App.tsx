import { useState, useEffect } from "react";
import "@fontsource/sawarabi-mincho";

const sentences = [
  // ... bez zmian (pełna lista zdań)
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
        <p className="text-xl font-bold text-black">
          {sentence.noun}
          <span className="underline border-b border-dotted w-24 inline-block align-bottom ml-1">
            ＿＿＿＿＿＿
          </span>
        </p>
      );
    } else {
      return (
        <p className="text-xl font-bold text-black">
          <span className="underline border-b border-dotted w-40 inline-block align-bottom mr-1">
            ＿＿＿＿＿＿＿＿＿＿＿＿
          </span>
          {sentence.verbPlain}
        </p>
      );
    }
  };

  return (
    <main className="min-h-screen bg-pink-100 max-w-xl mx-auto p-4 space-y-6 font-[\'Sawarabi Mincho\']">
      <img
        src="https://cdn.gaijinpot.com/app/uploads/sites/6/2016/02/Mount-Fuji-New.jpg"
        alt="Fuji"
        className="w-full max-h-64 object-cover rounded-2xl shadow-md mb-4"
      />
      <h1 className="text-3xl font-bold text-center text-red-800 drop-shadow-sm">
        🌸 Doki Doki Rozdział 4 🌸
      </h1>

      <div className="flex justify-center gap-6 mb-4">
        <button
          className={`px-4 py-2 rounded transition ${
            mode === "verb" ? "bg-blue-500 text-white" : "bg-white text-blue-700 border border-blue-300"
          }`}
          onClick={() => setMode("verb")}
        >
          Ćwicz czasownik
        </button>
        <button
          className={`px-4 py-2 rounded transition ${
            mode === "noun" ? "bg-blue-500 text-white" : "bg-white text-blue-700 border border-blue-300"
          }`}
          onClick={() => setMode("noun")}
        >
          Ćwicz rzeczownik
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow-md text-center">
        {renderSentence()}
      </div>

      <div className="space-y-4 mt-4">
        {mode === "verb" ? (
          <>
            <input
              type="text"
              placeholder="Forma zwykła (np. のります)"
              className="w-full p-2 border rounded"
              value={plainAnswer}
              onChange={(e) => setPlainAnswer(e.target.value)}
              spellCheck={false}
              autoComplete="off"
            />
            <input
              type="text"
              placeholder="Forma て (np. のって)"
              className="w-full p-2 border rounded"
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
            className="w-full p-2 border rounded"
            value={nounAnswer}
            onChange={(e) => setNounAnswer(e.target.value)}
            spellCheck={false}
            autoComplete="off"
          />
        )}
      </div>

      <div className="flex justify-between space-x-4 mt-4">
        <button
          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100"
          onClick={() => {
            setShowHint(false);
            setShowAnswer(false);
            setPlainAnswer("");
            setTeAnswer("");
            setNounAnswer("");
            setCurrent((c) => (c - 1 + shuffledIndices.length) % shuffledIndices.length);
          }}
        >
          ← Wstecz
        </button>
        <button
          className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100"
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

      <div className="space-x-4 mt-6 flex justify-center items-center">
        <button
          onClick={checkAnswer}
          className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Sprawdź
        </button>
        <button
          onClick={() => setShowHint(!showHint)}
          className="px-5 py-2 bg-blue-200 text-blue-800 rounded hover:bg-blue-300"
        >
          {showHint ? "Ukryj podpowiedź" : "Pokaż podpowiedź"}
        </button>
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showAnswer ? "Ukryj odpowiedź" : "Pokaż odpowiedź"}
        </button>
      </div>

      {showHint && (
        <p className="mt-4 italic text-center text-gray-700">{sentence.pl}</p>
      )}

      {showAnswer && (
        <div className="mt-4 p-4 bg-gray-100 rounded text-center font-mono">
          {mode === "verb" ? (
            <>
              <p>Forma zwykła: <strong>{sentence.verbPlain}</strong></p>
              <p>Forma て: <strong>{sentence.verbTe}</strong></p>
            </>
          ) : (
            <p>Rzeczownik: <strong>{sentence.noun || "(brak)"}</strong></p>
          )}
        </div>
      )}
    </main>
  );
}
