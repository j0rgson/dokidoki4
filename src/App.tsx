import { useState, useEffect } from "react";

const sentences = [
  {
    full: "きょうだいをおしえます",
    noun: "きょうだいを",
    verbPlain: "おしえます",
    verbTe: "おしえて",
    pl: "Uczę rodzeństwa",
  },
  {
    full: "かんじをわすれます",
    noun: "かんじを",
    verbPlain: "わすれます",
    verbTe: "わすれて",
    pl: "Zapominam kanji",
  },
  {
    full: "ドアをあけます",
    noun: "ドアを",
    verbPlain: "あけます",
    verbTe: "あけて",
    pl: "Otwieram drzwi",
  },
  {
    full: "ドアをしめます",
    noun: "ドアを",
    verbPlain: "しめます",
    verbTe: "しめて",
    pl: "Zamykam drzwi",
  },
  {
    full: "ひこうきをおります",
    noun: "ひこうきを",
    verbPlain: "おります",
    verbTe: "おりて",
    pl: "Wysiadam z samolotu",
  },
  {
    full: "ろめんでんしゃにのります",
    noun: "ろめんでんしゃに",
    verbPlain: "のります",
    verbTe: "のって",
    pl: "Wsiadam do tramwaju",
  },
  {
    full: "ちかてつにのります",
    noun: "ちかてつに",
    verbPlain: "のります",
    verbTe: "のって",
    pl: "Wsiadam do metra",
  },
  {
    full: "でんきをつけます",
    noun: "でんきを",
    verbPlain: "つけます",
    verbTe: "つけて",
    pl: "Włączam światło",
  },
  {
    full: "でんきをけします",
    noun: "でんきを",
    verbPlain: "けします",
    verbTe: "けして",
    pl: "Wyłączam światło",
  },
  {
    full: "ほんをかります",
    noun: "ほんを",
    verbPlain: "かります",
    verbTe: "かりて",
    pl: "Pożyczam książkę",
  },
  {
    full: "ほんをかします",
    noun: "ほんを",
    verbPlain: "かします",
    verbTe: "かして",
    pl: "Wypożyczam książkę (komuś)",
  },
  {
    full: "あるきます",
    noun: "",
    verbPlain: "あるきます",
    verbTe: "あるいて",
    pl: "Idę pieszo",
  },
  {
    full: "たばこをすいます",
    noun: "たばこを",
    verbPlain: "すいます",
    verbTe: "すって",
    pl: "Palę papierosa",
  },
  {
    full: "こどもとあそびます",
    noun: "こどもと",
    verbPlain: "あそびます",
    verbTe: "あそんで",
    pl: "Bawię się z dzieckiem",
  },
  {
    full: "おかあさんをてつだいます",
    noun: "おかあさんを",
    verbPlain: "てつだいます",
    verbTe: "てつだって",
    pl: "Pomagam mamie",
  },
  {
    full: "しゃしんをとります",
    noun: "しゃしんを",
    verbPlain: "とります",
    verbTe: "とって",
    pl: "Robię zdjęcie",
  },
  {
    full: "いそいで、ください！",
    noun: "",
    verbPlain: "いそぐ",
    verbTe: "いそいで",
    pl: "Pospiesz się, proszę!",
  },
  {
    full: "いえにはいります",
    noun: "いえに",
    verbPlain: "はいります",
    verbTe: "はいって",
    pl: "Wchodzę do domu",
  },
  {
    full: "だいがくにでかけます",
    noun: "だいがくに",
    verbPlain: "でかけます",
    verbTe: "でかけて",
    pl: "Wychodzę na uniwersytet",
  },
  {
    full: "にもつをもちます",
    noun: "にもつを",
    verbPlain: "もちます",
    verbTe: "もって",
    pl: "Niosę bagaż",
  },
  {
    full: "おみやげをもってきます",
    noun: "おみやげを",
    verbPlain: "もってきます",
    verbTe: "もってきて",
    pl: "Przynoszę pamiątkę",
  },
  {
    full: "はしをつかいます",
    noun: "はしを",
    verbPlain: "つかいます",
    verbTe: "つかって",
    pl: "Używam pałeczek",
  },
  {
    full: "きょうかしょをもちます",
    noun: "きょうかしょを",
    verbPlain: "もちます",
    verbTe: "もって",
    pl: "Niosę podręcznik",
  },
  {
    full: "せんせいをつれてきます",
    noun: "せんせいを",
    verbPlain: "つれてきます",
    verbTe: "つれてきて",
    pl: "Przyprowadzam nauczyciela",
  },
];

// Funkcja do losowego tasowania tablicy (Fisher-Yates)
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
  const [plainAnswer, setPlainAnswer] = useState("");
  const [teAnswer, setTeAnswer] = useState("");
  const [nounAnswer, setNounAnswer] = useState("");

  // Resetuj shuffledIndices i current przy zmianie trybu
  useEffect(() => {
    const newShuffled = shuffleArray(sentences.map((_, i) => i));
    setShuffledIndices(newShuffled);
    setCurrent(0);
    setShowHint(false);
    setPlainAnswer("");
    setTeAnswer("");
    setNounAnswer("");
  }, [mode]);

  const sentence = sentences[shuffledIndices[current]];

  // Sprawdzenie odpowiedzi w zależności od trybu
  const checkAnswer = () => {
    if (mode === "verb") {
      const plainOk = plainAnswer.trim() === sentence.verbPlain;
      const teOk = teAnswer.trim() === sentence.verbTe;
      alert(
        `Forma zwykła: ${plainOk ? "✔️" : "❌"}\nForma て: ${teOk ? "✔️" : "❌"}`
      );
    } else {
      // tryb noun - sprawdzamy rzeczownik
      const nounOk = nounAnswer.trim() === sentence.noun;
      alert(`Rzeczownik: ${nounOk ? "✔️" : "❌"}`);
    }
  };

  // Render zdania z ukrytym czasownikiem lub rzeczownikiem
  const renderSentence = () => {
    if (mode === "verb") {
      return (
        <p className="text-xl font-bold">
          {sentence.noun}
          <span className="underline border-b border-dotted w-24 inline-block align-bottom ml-1">
            ＿＿＿＿＿＿
          </span>
        </p>
      );
    } else {
      return (
        <p className="text-xl font-bold">
          <span className="underline border-b border-dotted w-40 inline-block align-bottom mr-1">
            ＿＿＿＿＿＿＿＿＿＿＿＿
          </span>
          {sentence.verbPlain}
        </p>
      );
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6 font-sans">
      <h1 className="text-2xl font-bold text-center">Ćwiczenie japońskich zdań</h1>

      {/* Wybór trybu */}
      <div className="flex justify-center gap-6 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            mode === "verb" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("verb")}
        >
          Ćwicz czasownik
        </button>
        <button
          className={`px-4 py-2 rounded ${
            mode === "noun" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("noun")}
        >
          Ćwicz rzeczownik
        </button>
      </div>

      {/* Zdanie */}
      {renderSentence()}

      {/* Inputy */}
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

      {/* Przyciski */}
      <div className="flex justify-between space-x-4 mt-4">
        <button
          className="px-4 py-2 border rounded hover:bg-gray-100"
          onClick={() => {
            setShowHint(false);
            setPlainAnswer("");
            setTeAnswer("");
            setNounAnswer("");
            setCurrent((c) => (c - 1 + shuffledIndices.length) % shuffledIndices.length);
          }}
        >
          ← Wstecz
        </button>
        <button
          className="px-4 py-2 border rounded hover:bg-gray-100"
          onClick={() => {
            setShowHint(false);
            setPlainAnswer("");
            setTeAnswer("");
            setNounAnswer("");
            setCurrent((c) => (c + 1) % shuffledIndices.length);
          }}
        >
          Dalej →
        </button>
      </div>

      {/* Sprawdź i podpowiedź */}
      <div className="space-x-4 mt-6 flex justify-center items-center">
        <button
          onClick={checkAnswer}
          className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Sprawdź
        </button>
        <button
          onClick={() => setShowHint(!showHint)}
          className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          {showHint ? "Ukryj podpowiedź" : "Pokaż podpowiedź"}
        </button>
      </div>

      {showHint && (
        <p className="mt-4 italic text-center text-gray-700">{sentence.pl}</p>
      )}
    </main>
  );
}
