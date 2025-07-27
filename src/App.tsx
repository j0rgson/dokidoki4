import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const sentences = [
  {
    jp: "きょうだいをおしえます",
    plain: "おしえます",
    te: "おしえて",
    pl: "Uczę rodzeństwa",
    type: "verb",
  },
  {
    jp: "かんじをわすれます",
    plain: "わすれます",
    te: "わすれて",
    pl: "Zapominam kanji",
    type: "verb",
  },
  {
    jp: "ドアをあけます",
    plain: "あけます",
    te: "あけて",
    pl: "Otwieram drzwi",
    type: "verb",
  },
  {
    jp: "ドアをしめます",
    plain: "しめます",
    te: "しめて",
    pl: "Zamykam drzwi",
    type: "verb",
  },
  {
    jp: "ひこうきをおります",
    plain: "おります",
    te: "おりて",
    pl: "Wysiadam z samolotu",
    type: "verb",
  },
  {
    jp: "ろめんでんしゃにのります",
    plain: "のります",
    te: "のって",
    pl: "Wsiadam do tramwaju",
    type: "verb",
  },
  {
    jp: "ちかてつにのります",
    plain: "のります",
    te: "のって",
    pl: "Wsiadam do metra",
    type: "verb",
  },
  {
    jp: "でんきをつけます",
    plain: "つけます",
    te: "つけて",
    pl: "Włączam światło",
    type: "verb",
  },
  {
    jp: "でんきをけします",
    plain: "けします",
    te: "けして",
    pl: "Wyłączam światło",
    type: "verb",
  },
  {
    jp: "ほんをかります",
    plain: "かります",
    te: "かりて",
    pl: "Pożyczam książkę",
    type: "verb",
  },
  {
    jp: "ほんをかします",
    plain: "かします",
    te: "かして",
    pl: "Wypożyczam książkę (komuś)",
    type: "verb",
  },
  {
    jp: "あるきます",
    plain: "あるきます",
    te: "あるいて",
    pl: "Idę pieszo",
    type: "verb",
  },
  {
    jp: "たばこをすいます",
    plain: "すいます",
    te: "すって",
    pl: "Palę papierosa",
    type: "verb",
  },
  {
    jp: "こどもとあそびます",
    plain: "あそびます",
    te: "あそんで",
    pl: "Bawię się z dzieckiem",
    type: "verb",
  },
  {
    jp: "おかあさんをてつだいます",
    plain: "てつだいます",
    te: "てつだって",
    pl: "Pomagam mamie",
    type: "verb",
  },
  {
    jp: "しゃしんをとります",
    plain: "とります",
    te: "とって",
    pl: "Robię zdjęcie",
    type: "verb",
  },
  {
    jp: "いそいで、ください！",
    plain: "",
    te: "",
    pl: "Pospiesz się, proszę!",
    type: "verb",
  },
  {
    jp: "いえにはいります",
    plain: "はいります",
    te: "はいって",
    pl: "Wchodzę do domu",
    type: "verb",
  },
  {
    jp: "だいがくにでかけます",
    plain: "でかけます",
    te: "でかけて",
    pl: "Wychodzę na uniwersytet",
    type: "verb",
  },
  {
    jp: "にもつをもちます",
    plain: "もちます",
    te: "もって",
    pl: "Niosę bagaż",
    type: "verb",
  },
  {
    jp: "おみやげをもってきます",
    plain: "もってきます",
    te: "もってきて",
    pl: "Przynoszę pamiątkę",
    type: "verb",
  },
  {
    jp: "はしをつかいます",
    plain: "つかいます",
    te: "つかって",
    pl: "Używam pałeczek",
    type: "verb",
  },
  {
    jp: "きょうかしょをもちます",
    plain: "もちます",
    te: "もって",
    pl: "Niosę podręcznik",
    type: "verb",
  },
  {
    jp: "せんせいをつれてきます",
    plain: "つれてきます",
    te: "つれてきて",
    pl: "Przyprowadzam nauczyciela",
    type: "verb",
  },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [plainAnswer, setPlainAnswer] = useState("");
  const [teAnswer, setTeAnswer] = useState("");

  const normalize = (str: string) => str.trim();

  const checkAnswer = () => {
    const plainOk =
      sentences[current].plain === ""
        ? plainAnswer.trim() === ""
        : normalize(sentences[current].plain) === normalize(plainAnswer);
    const teOk =
      sentences[current].te === ""
        ? teAnswer.trim() === ""
        : normalize(sentences[current].te) === normalize(teAnswer);
    alert(
      `Forma zwykła: ${plainOk ? "✔️" : "❌"}\nForma て: ${teOk ? "✔️" : "❌"}`
    );
  };

  return (
    <main className="max-w-xl mx-auto p-4 space-y-4">
      <Card>
        <CardContent className="p-4 space-y-4">
          <p className="text-xl font-bold">{sentences[current].jp}</p>
          <div className="space-y-2">
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
          <Button onClick={checkAnswer}>Sprawdź</Button>
          <Button variant="secondary" onClick={() => setShowHint(!showHint)}>
            {showHint ? "Ukryj podpowiedź" : "Pokaż podpowiedź"}
          </Button>
          {showHint && <p className="italic">{sentences[current].pl}</p>}
          <div className="flex justify-between">
            <Button
              onClick={() => {
                setShowHint(false);
                setPlainAnswer("");
                setTeAnswer("");
                setCurrent((prev) => (prev - 1 + sentences.length) % sentences.length);
              }}
              variant="outline"
            >
              ← Wstecz
            </Button>
            <Button
              onClick={() => {
                setShowHint(false);
                setPlainAnswer("");
                setTeAnswer("");
                setCurrent((prev) => (prev + 1) % sentences.length);
              }}
              variant="outline"
            >
              Dalej →
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
