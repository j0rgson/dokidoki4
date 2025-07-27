"use client";
import { useState } from "react";

const allExamples = [
  {
    type: "rzeczownik",
    sentence: "わたしは＿でんしゃにのります。",
    answer: "えき",
    translation: "Wsiadam do pociągu na stacji.",
  },
  {
    type: "czasownik",
    sentence: "まいにち、にほんごを＿。",
    answer: "べんきょうします",
    translation: "Codziennie uczę się japońskiego.",
  },
  {
    type: "rzeczownik",
    sentence: "かぞくと＿にいきます。",
    answer: "こうえん",
    translation: "Idę z rodziną do parku.",
  },
  {
    type: "czasownik",
    sentence: "まいにちバスでがっこうに＿。",
    answer: "いきます",
    translation: "Codziennie jadę autobusem do szkoły.",
  },
  {
    type: "rzeczownik",
    sentence: "わたしの＿はきょうだいです。",
    answer: "かぞく",
    translation: "Moja rodzina to moje rodzeństwo.",
  },
  {
    type: "czasownik",
    sentence: "まいにち、いぬと＿。",
    answer: "さんぽします",
    translation: "Codziennie spaceruję z psem.",
  },
];

function getFilteredAndShuffledExamples(type: string) {
  const filtered = type === "wszystkie"
    ? allExamples
    : allExamples.filter((ex) => ex.type === type);

  return filtered.sort(() => Math.random() - 0.5);
}

export default function Home() {
  const [mode, setMode] = useState<"czasownik" | "rzeczownik" | "wszystkie">("wszystkie");
  const [examples, setExamples] = useState(() => getFilteredAndShuffledExamples("wszystkie"));
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [showCorrection, setShowCorrection] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const current = examples[index];

  const checkAnswer = () => {
    setShowCorrection(true);
    setShowHint(false);
  };

  const nextQuestion = () => {
    const nextIndex = index + 1;
    if (nextIndex < examples.length) {
      setIndex(nextIndex);
    } else {
      const newExamples = getFilteredAndShuffledExamples(mode);
      setExamples(newExamples);
      setIndex(0);
    }
    setInput("");
    setShowCorrection(false);
    setShowHint(false);
  };

  const handleModeChange = (newMode: "czasownik" | "rzeczownik" | "wszystkie") => {
    setMode(newMode);
    const newExamples = getFilteredAndShuffledExamples(newMode);
    setExamples(newExamples);
    setIndex(0);
    setInput("");
    setShowCorrection(false);
    setShowHint(false);
  };

  return (
    <main className="bg-[#fef7e0] max-w-xl mx-auto p-4 space-y-6 font-sans">
      <img
        src="https://cdn.gaijinpot.com/app/uploads/sites/6/2016/02/Mount-Fuji-New.jpg"
        alt="Mount Fuji"
        className="mx-auto rounded-2xl shadow-lg max-h-48 object-cover"
      />
      <h1 className="text-2xl font-bold text-center">Doki Doki rozdział 4</h1>

      <div className="flex justify-center gap-2">
        <button
          className={`px-3 py-1 rounded ${
            mode === "czasownik" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleModeChange("czasownik")}
        >
          Czasowniki
        </button>
        <button
          className={`px-3 py-1 rounded ${
            mode === "rzeczownik" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleModeChange("rzeczownik")}
        >
          Rzeczowniki
        </button>
        <button
          className={`px-3 py-1 rounded ${
            mode === "wszystkie" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleModeChange("wszystkie")}
        >
          Wszystkie
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        <p className="text-xl text-center">
          {current.sentence.replace("＿", "_____")}
        </p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Wpisz brakujące słowo"
        />

        {showCorrection && (
          <div
            className={`p-2 rounded text-center font-semibold ${
              input === current.answer ? "text-green-600" : "text-red-600"
            }`}
          >
            {input === current.answer
              ? "Dobrze!"
              : `Źle. Poprawna odpowiedź: ${current.answer}`}
          </div>
        )}

        {showHint && !showCorrection && (
          <div className="text-center text-gray-600">
            Podpowiedź: {current.answer}
          </div>
        )}

        <div className="flex justify-center gap-2">
          <button
            onClick={checkAnswer}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Sprawdź
          </button>
          <button
            onClick={() => setShowHint(true)}
            className="bg-yellow-400 text-black px-4 py-2 rounded"
          >
            Druga podpowiedź
          </button>
          <button
            onClick={nextQuestion}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Następne
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Tłumaczenie: {current.translation}
        </p>
      </div>
    </main>
  );
}
