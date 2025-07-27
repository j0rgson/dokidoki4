import { useState, useEffect } from "react";
import "@fontsource/sawarabi-mincho";

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
    <main
      className="min-h-screen max-w-xl mx-auto p-4 space-y-6 font-[\'Sawarabi Mincho\']"
      style={{ backgroundColor: "#f9c1d1" }} // delikatny róż 花見
    >
      <img
        src="https://cdn.gaijinpot.com/app/uploads/sites/6/2016/02/Mount-Fuji-New.jpg"
        alt="Fuji"
        className="w-full object-cover rounded-2xl shadow-md mb-4"
        style={{ height: "300px" }}
      />
      <h1 className="text-3xl font-bold text-center text-red-800 drop-shadow-sm">
        🌸 Doki Doki Rozdział 4 🌸
      </h1>

      <div className="flex justify-center gap-6 mb-4">
        <button
          className={`px-4 py-2 rounded transition font-semibold ${
            mode === "verb"
              ? "bg-blue-400 text-white hover:bg-blue-500"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
          onClick={() => setMode("verb")}
        >
          Ćwicz czasownik
        </button>
        <button
          className={`px-4 py-2 rounded transition font-semibold ${
            mode === "noun"
              ? "bg-blue-400 text-white hover:bg-blue-500"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
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
            setCurrent(
              (c) => (c - 1 + shuffledIndices.length) % shuffledIndices.length
            );
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
  );
}
