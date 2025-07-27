import { useState } from "react";

const sentences = [
  { jp: "きょうだいをおしえます", te: "おしえて", pl: "Uczę rodzeństwa", type: "verb" },
  { jp: "かんじをわすれます", te: "わすれて", pl: "Zapominam kanji", type: "verb" },
  { jp: "ドアをあけます", te: "あけて", pl: "Otwieram drzwi", type: "verb" },
  { jp: "ドアをしめます", te: "しめて", pl: "Zamykam drzwi", type: "verb" },
  { jp: "ひこうきをおります", te: "おりて", pl: "Wysiadam z samolotu", type: "verb" },
  { jp: "ろめんでんしゃにのります", te: "のって", pl: "Wsiadam do tramwaju", type: "verb" },
  { jp: "ちかてつにのります", te: "のって", pl: "Wsiadam do metra", type: "verb" },
  { jp: "でんきをつけます", te: "つけて", pl: "Włączam światło", type: "verb" },
  { jp: "でんきをけします", te: "けして", pl: "Wyłączam światło", type: "verb" },
  { jp: "ほんをかります", te: "かりて", pl: "Pożyczam książkę", type: "verb" },
  { jp: "ほんをかします", te: "かして", pl: "Wypożyczam książkę (komuś)", type: "verb" },
  { jp: "あるきます", te: "あるいて", pl: "Idę pieszo", type: "verb" },
  { jp: "たばこをすいます", te: "すって", pl: "Palę papierosa", type: "verb" },
  { jp: "こどもとあそびます", te: "あそんで", pl: "Bawię się z dzieckiem", type: "verb" },
  { jp: "おかあさんをてつだいます", te: "てつだって", pl: "Pomagam mamie", type: "verb" },
  { jp: "しゃしんをとります", te: "とって", pl: "Robię zdjęcie", type: "verb" },
  { jp: "いそいで、ください！", te: "", pl: "Pospiesz się, proszę!", type: "verb" },
  { jp: "いえにはいります", te: "はいって", pl: "Wchodzę do domu", type: "verb" },
  { jp: "だいがくにでかけます", te: "でかけて", pl: "Wychodzę na uniwersytet", type: "verb" },
  { jp: "にもつをもちます", te: "もって", pl: "Niosę bagaż", type: "verb" },
  { jp: "おみやげをもってきます", te: "もってきて", pl: "Przynoszę pamiątkę", type: "verb" },
  { jp: "はしをつかいます", te: "つかって", pl: "Używam pałeczek", type: "verb" },
  { jp: "きょうかしょをもちます", te: "もって", pl: "Niosę podręcznik", type: "verb" },
  { jp: "せんせいをつれてきます", te: "つれてきて", pl: "Przyprowadzam nauczyciela", type: "verb" },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [plainAnswer, setPlainAnswer] = useState("");
  const [teAnswer, setTeAnswer] = useState("");

  const checkAnswer = () => {
    const plainOk = sentences[current].jp.includes(plainAnswer.trim());
    const teOk = sentences[current].te === teAnswer.trim();
    alert(
      `Forma zwykła: ${plainOk ? "✔️" : "❌"}\nForma て: ${teOk ? "✔️" : "❌"}`
    );
  };

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6 font-sans">
      <div className="border rounded p-6 shadow">
        <h1 className="text-2xl font-bold mb-4">Japoński – ćwiczenie czasowników</h1>
        <p className="text-xl mb-6">{sentences[current].jp}</p>
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Forma zwykła (np. のります)"
            className="w-full p-2 border rounded"
            value={plainAnswer}
            onChange={(e) => setPlainAnswer(e.target.value)}
          />
          <input
            type="text"
            placeholder="Forma て (np. のって)"
            className="w-full p-2 border rounded"
            value={teAnswer}
            onChange={(e) => setTeAnswer(e.target.value)}
          />
        </div>
        <button
          onClick={checkAnswer}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Sprawdź
        </button>
        <button
          onClick={() => setShowHint(!showHint)}
          className="ml-4 px-4 py-2 border rounded hover:bg-gray-100 transition"
        >
          {showHint ? "Ukryj podpowiedź" : "Pokaż podpowiedź"}
        </button>
        {showHint && (
          <p className="mt-4 italic text-gray-700">{sentences[current].pl}</p>
        )}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => {
              setShowHint(false);
              setPlainAnswer("");
              setTeAnswer("");
              setCurrent((prev) => (prev - 1 + sentences.length) % sentences.length);
            }}
            className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          >
            ← Wstecz
          </button>
          <button
            onClick={() => {
              setShowHint(false);
              setPlainAnswer("");
              setTeAnswer("");
              setCurrent((prev) => (prev + 1) % sentences.length);
            }}
            className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          >
            Dalej →
          </button>
        </div>
      </div>
    </main>
  );
}
