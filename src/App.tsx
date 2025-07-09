import { useState, useEffect, useRef } from "react";
import "./App.css";

type DataItem = {
  sentence: string;
  answer: string;
  romaji: string;
  translation: string;
};

const DATA: DataItem[] = [
  {
    sentence: "わたしの＿＿はかわいいです。",
    answer: "いぬ",
    romaji: "watashi no inu wa kawaii desu",
    translation: "Mój pies jest słodki.",
  },
  {
    sentence: "＿＿をかきました。",
    answer: "え",
    romaji: "e wo kakimashita",
    translation: "Namalowałem obraz.",
  },
  {
    sentence: "＿＿にメールをおくりました。",
    answer: "スマホ",
    romaji: "sumaho ni meeru wo okurimashita",
    translation: "Wysłałem e-mail na smartfon.",
  },
  {
    sentence: "きょうだいは＿＿にいます。",
    answer: "いっしょ",
    romaji: "kyoudai wa issho ni imasu",
    translation: "Rodzeństwo jest razem.",
  },
  {
    sentence: "＿＿でんきをつけてください。",
    answer: "でんき",
    romaji: "denki wo tsukete kudasai",
    translation: "Proszę włącz światło.",
  },
  {
    sentence: "たんじょうびに＿＿をもらいました。",
    answer: "プレゼント",
    romaji: "tanjoubi ni purezento wo moraimashita",
    translation: "Dostałem prezent na urodziny.",
  },
  {
    sentence: "まいにち＿＿をつかいます。",
    answer: "パソコン",
    romaji: "mainichi pasokon wo tsukaimasu",
    translation: "Codziennie używam komputera.",
  },
  {
    sentence: "あしたは＿＿にいきます。",
    answer: "プール",
    romaji: "ashita wa puuru ni ikimasu",
    translation: "Jutro idę na basen.",
  },
  {
    sentence: "きのう、＿＿でえいがをみました。",
    answer: "クラス",
    romaji: "kinou kurasu de eiga wo mimashita",
    translation: "Wczoraj na zajęciach oglądałem film.",
  },
  {
    sentence: "＿＿にでんしゃでいきました。",
    answer: "まち",
    romaji: "machi ni densha de ikimashita",
    translation: "Pojechałem pociągiem do miasta.",
  },
  {
    sentence: "＿＿をおしえてください。",
    answer: "さくぶん",
    romaji: "sakubun wo oshiete kudasai",
    translation: "Proszę naucz mnie wypracowania.",
  },
  {
    sentence: "＿＿はたくさんあります。",
    answer: "にもつ",
    romaji: "nimotsu wa takusan arimasu",
    translation: "Mam dużo bagażu.",
  },
  {
    sentence: "＿＿をとってください。",
    answer: "カメラ",
    romaji: "kamera wo totte kudasai",
    translation: "Zrób zdjęcie aparatem.",
  },
  {
    sentence: "この＿＿はおもしろいです。",
    answer: "きょうかしょ",
    romaji: "kono kyoukasho wa omoshiroi desu",
    translation: "Ten podręcznik jest ciekawy.",
  },
  {
    sentence: "＿＿をかりたいです。",
    answer: "きっぷ",
    romaji: "kippu wo karitai desu",
    translation: "Chcę pożyczyć bilet.",
  },
  {
    sentence: "かれは＿＿をもってきました。",
    answer: "おみやげ",
    romaji: "kare wa omiyage wo motte kimashita",
    translation: "On przyniósł pamiątkę z podróży.",
  },

  // Czasowniki
  {
    sentence: "せんせいが＿＿をおしえます。",
    answer: "にほんご",
    romaji: "sensei ga nihongo wo oshiemasu",
    translation: "Nauczyciel uczy japońskiego.",
  },
  {
    sentence: "きょうは＿＿をはじめます。",
    answer: "クラス",
    romaji: "kyou wa kurasu wo hajimemasu",
    translation: "Dziś zaczynam zajęcia.",
  },
  {
    sentence: "かばんを＿＿のをわすれました。",
    answer: "もつ",
    romaji: "kaban wo motsu no wo wasuremashita",
    translation: "Zapomniałem trzymać torbę.",
  },
  {
    sentence: "あそぶのがすきです。",
    answer: "あそぶ",
    romaji: "asobu no ga suki desu",
    translation: "Lubię się bawić.",
  },
  {
    sentence: "ドアを＿＿ください。",
    answer: "しめる",
    romaji: "doa wo shimeru kudasai",
    translation: "Proszę zamknąć drzwi.",
  },
  {
    sentence: "しゃしんを＿＿。",
    answer: "とる",
    romaji: "shashin wo toru",
    translation: "Robić zdjęcie.",
  },
  {
    sentence: "でんしゃから＿＿。",
    answer: "おりる",
    romaji: "densha kara oriru",
    translation: "Wysiadać z pociągu.",
  },
  {
    sentence: "バスを＿＿。",
    answer: "まつ",
    romaji: "basu wo matsu",
    translation: "Czekać na autobus.",
  },
  {
    sentence: "じてんしゃに＿＿。",
    answer: "のる",
    romaji: "jitensha ni noru",
    translation: "Jechać na rowerze.",
  },
  {
    sentence: "いそいで＿＿！",
    answer: "いそぐ",
    romaji: "isoide isogu",
    translation: "Spiesz się!",
  },
  {
    sentence: "でんきを＿＿。",
    answer: "けす",
    romaji: "denki wo kesu",
    translation: "Wyłączyć światło.",
  },
  {
    sentence: "かさを＿＿。",
    answer: "もつ",
    romaji: "kasa wo motsu",
    translation: "Trzymać parasol.",
  },
  {
    sentence: "ともだちを＿＿。",
    answer: "つれてくる",
    romaji: "tomodachi wo tsuretekuru",
    translation: "Przyprowadzić przyjaciela.",
  },
  {
    sentence: "ほんを＿＿。",
    answer: "かりる",
    romaji: "hon wo kariru",
    translation: "Pożyczać książkę.",
  },
  {
    sentence: "おかねを＿＿。",
    answer: "かす",
    romaji: "okane wo kasu",
    translation: "Pożyczać pieniądze.",
  },
  {
    sentence: "こうえんを＿＿。",
    answer: "あるく",
    romaji: "kouen wo aruku",
    translation: "Chodzić po parku.",
  },
  {
    sentence: "みずのなかで＿＿。",
    answer: "およぐ",
    romaji: "mizu no naka de oyogu",
    translation: "Pływać w wodzie.",
  },

  // Słowa z transportu i miejsca
  {
    sentence: "＿＿でバスにのりました。",
    answer: "バスてい",
    romaji: "basu tei de basu ni norimashita",
    translation: "Wsiadłem do autobusu na przystanku.",
  },
  {
    sentence: "＿＿はやいです。",
    answer: "しんかんせん",
    romaji: "shinkansen wa hayai desu",
    translation: "Shinkansen jest szybki.",
  },
  {
    sentence: "＿＿ででんしゃをまちます。",
    answer: "えき",
    romaji: "eki de densha wo machimasu",
    translation: "Czekam na pociąg na stacji.",
  },
  {
    sentence: "ひこうきで＿＿にいきます。",
    answer: "とうきょう",
    romaji: "hikouki de toukyou ni ikimasu",
    translation: "Lecę samolotem do Tokio.",
  },
  {
    sentence: "＿＿をあるいていきます。",
    answer: "みち",
    romaji: "michi wo aruite ikimasu",
    translation: "Idę pieszo ulicą.",
  },

  // Kilka dodatkowych z Twojej listy
  {
    sentence: "おふろに＿＿かんはいりました。",
    answer: "2",
    romaji: "ofuro ni ni jikan hairimashita",
    translation: "Wszedłem do wanny na 2 godziny.",
  },
  {
    sentence: "さっき＿＿をたべました。",
    answer: "ごはん",
    romaji: "sakki gohan wo tabemashita",
    translation: "Wcześniej zjadłem ryż.",
  },
  {
    sentence: "たくさんの＿＿があります。",
    answer: "もの",
    romaji: "takusan no mono ga arimasu",
    translation: "Jest dużo rzeczy.",
  },
];


export default function ClozePractice() {
  const [mode, setMode] = useState<"practice" | "test" | "review">("practice");
  const [testData, setTestData] = useState<DataItem[]>([]);
  const [index, setIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState<DataItem[]>([]);
  const [score, setScore] = useState(0);
  const [shakeInput, setShakeInput] = useState(false);
  const [musicOn, setMusicOn] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioStartedRef = useRef(false);

  useEffect(() => {
    if (musicOn && audioStartedRef.current) {
      audioRef.current?.play().catch(() => {});
    } else {
      audioRef.current?.pause();
    }
  }, [musicOn]);

  const current = (mode === "practice" ? DATA : testData)[index];

  const startTest = (reviewMode = false) => {
    const source = reviewMode ? wrongAnswers : DATA;
    const shuffled = [...source].sort(() => Math.random() - 0.5).slice(0, 10);
    setTestData(shuffled);
    setIndex(0);
    setScore(0);
    setWrongAnswers([]);
    setUserInput("");
    setShowAnswer(false);
    setShowHint(false);
    setMode(reviewMode ? "review" : "test");
  };

  const checkAnswer = () => {
    if (!audioStartedRef.current) {
      audioRef.current?.play().catch(() => {});
      audioStartedRef.current = true;
    }

    const correct = userInput.trim() === current.answer;
    if (!correct) {
      setWrongAnswers([...wrongAnswers, current]);
      setShakeInput(true);
    }
    if (mode === "test" || mode === "review") {
      if (correct) setScore(score + 1);
    }
    setShowAnswer(true);
    setShowHint(false);
  };

  const nextSentence = () => {
    if (mode === "practice") {
      const next = Math.floor(Math.random() * DATA.length);
      setIndex(next);
      setUserInput("");
      setShowAnswer(false);
      setShowHint(false);
    } else {
      if (index + 1 >= testData.length) {
        setMode("practice");
      } else {
        setIndex(index + 1);
        setUserInput("");
        setShowAnswer(false);
        setShowHint(false);
      }
    }
  };
  

  const onAnimationEnd = () => {
    if (shakeInput) setShakeInput(false);
  };

  return (
    <div className="app-container">
      <audio ref={audioRef} src="/zelda.mp3" loop preload="auto" />
      <header className="header">
        <img
          src="https://cdn.gaijinpot.com/app/uploads/sites/6/2016/02/Mount-Fuji-New.jpg"
          alt="Mount Fuji"
          className="banner"
        />
        <h1>📝 Doki Doki 4 Quiz</h1>
        <p className="subtitle">
          <br />
          Uzupełnij brakujące słowo (tylko hiragana i katakana). <br />
          Możesz użyć podpowiedzi w języku polskim.
        </p>
        <button
          className="music-button"
          onClick={() => setMusicOn((prev) => !prev)}
          aria-label="Toggle music"
          type="button"
        >
          {musicOn ? "🔈 Wyłącz muzykę" : "🔇 Włącz muzykę"}
        </button>
        <h2>
          {mode === "practice"
            ? "Tryb ćwiczenia"
            : mode === "test"
            ? `Test — pytanie ${index + 1}/${testData.length}`
            : "Test z błędnych odpowiedzi"}
        </h2>
      </header>
      <main className="main">
        <p className="question">{current.sentence.replace("＿＿", "_____")}</p>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Wpisz brakujące słowo"
          className={`input ${shakeInput ? "shake" : ""}`}
          onAnimationEnd={onAnimationEnd}
        />
        {!showAnswer && (
          <button className="hint-button" onClick={() => setShowHint(true)}>
            Pokaż podpowiedź po polsku
          </button>
        )}
        {showHint && <div className="hint">Tłumaczenie: {current.translation}</div>}
        {showAnswer && (
          <div
            className={`answer ${
              userInput === current.answer ? "correct" : "incorrect"
            }`}
          >
            {userInput === current.answer ? "Dobrze! 🎉" : "Spróbuj jeszcze raz 😞"}
            <br />
            Poprawna odpowiedź: {current.answer}
            <br />
            Romaji: {current.romaji}
            <br />
            Tłumaczenie: {current.translation}
          </div>
        )}
        <div className="controls">
          {!showAnswer ? (
            <button className="action-button" onClick={checkAnswer}>
              Sprawdź
            </button>
          ) : (
            <button className="action-button" onClick={nextSentence}>
              {index + 1 >= (mode === "practice" ? DATA : testData).length
                ? mode === "practice"
                  ? "Losuj kolejne"
                  : "Zakończ test"
                : "Następne"}
            </button>
          )}
        </div>
        {mode !== "test" && mode !== "review" && (
          <div className="test-controls">
            <button className="test-button" onClick={() => startTest(false)}>
              Rozpocznij test (10 pytań)
            </button>
            {wrongAnswers.length > 0 && (
              <button className="test-button" onClick={() => startTest(true)}>
                Test z błędnych ({wrongAnswers.length})
              </button>
            )}
          </div>
        )}
        {mode !== "practice" && index + 1 >= testData.length && (
          <div className="score">
            <strong>
              Wynik: {score} / {testData.length}
            </strong>
          </div>
        )}
      </main>
    </div>
  );
}


