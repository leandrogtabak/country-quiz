import styles from './QuizContainer.module.css';
import ButtonAnswer from '../ButtonAnswer/ButtonAnswer';
import { useState, useEffect } from 'react';

const NUM_OPTIONS = 4;

const QuizContainer = ({ countries }) => {
  const [options, setOptions] = useState([]);
  const [numberQuestion, setNumberQuestion] = useState(1);
  const [variant, setVariant] = useState([]);
  const [next, setNext] = useState(false);
  const [capital, setCapital] = useState('');
  const [flag, setFlag] = useState('');
  const [population, setPopulation] = useState('');
  const [okAnswer, setOkAnswer] = useState('');
  const [lose, setLose] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [counter, setCounter] = useState(0);
  const [clickable, setClickable] = useState(true);

  const questions = [`${capital} is the capital of...`, 'Which country does this flag belong to?', `Which country has ${population} inhabitants?`];

  const getOptions = (countries) => {
    const opt = [];
    const unOrderedOp = [];

    let cap;
    let fl;
    let popul;
    let country;
    let index;

    while (opt.length < NUM_OPTIONS) {
      index = Math.floor(Math.random() * countries.length);
      if (!opt.includes(countries[index].name)) {
        opt.push(countries[index].name);
      }
      if (cap === undefined) {
        cap = countries[index].capital;
        fl = countries[index].flag;
        country = countries[index].name;
        popul = countries[index].population;
      }
    }

    while (unOrderedOp.length < NUM_OPTIONS) {
      index = Math.floor(Math.random() * opt.length);
      if (!unOrderedOp.includes(opt[index])) {
        unOrderedOp.push(opt[index]);
      }
    }
    return {
      cap: cap,
      fl: fl,
      popul: popul,
      opts: unOrderedOp,
      country: country,
    };
  };

  const handleClick = (e) => {
    e.preventDefault();
    const variants = [];
    setClickable(false);
    if (okAnswer === e.currentTarget.id) {
      variants[e.currentTarget.dataset.index] = 'correct';
      setCounter(counter + 1);
      setVariant(variants);
    } else {
      variants[options.indexOf(okAnswer)] = 'correct';
      variants[e.currentTarget.dataset.index] = 'wrong';
      setVariant(variants);
      setLose(true);
    }
  };

  const handleNext = () => {
    setClickable(true);
    if (lose) {
      setShowResults(true);
    } else {
      setNext(!next);
    }
  };

  const handleTryAgain = () => {
    setCounter(0);
    setShowResults(false);
    setNext(!next);
  };

  useEffect(() => {
    const { cap, fl, popul, opts, country } = getOptions(countries);
    setOptions(opts);
    setNumberQuestion(Math.floor(Math.random() * questions.length));
    setCapital(cap);
    setPopulation(popul.toLocaleString());
    setFlag(fl);
    setOkAnswer(country);
    setVariant([]);
    setLose(false);
  }, [next]);

  return (
    (!showResults && (
      <div className={styles.container}>
        <h1 className={styles.title}>country quiz</h1>
        <img className={styles.imageQuiz} src='/undraw_adventure_4hum 1.svg' alt='' />
        {numberQuestion === 1 && <img className={styles.flag} src={flag} alt='' />}
        <p className={styles.question}>{questions[numberQuestion]}</p>

        <div className={styles.options}>
          {options.map((label, index) => {
            return (
              <ButtonAnswer
                handleClick={clickable ? handleClick : undefined}
                id={label}
                index={index}
                key={index}
                letter={String.fromCharCode(65 + index)}
                label={label}
                variant={variant[index]}
              />
            );
          })}
        </div>
        <button className={styles.next} onClick={handleNext}>
          Next
        </button>
      </div>
    )) ||
    (showResults && (
      <div className={styles.container}>
        <h1 className={styles.title}>country quiz</h1>
        <img className={styles.imageWinners} src='/undraw_winners_ao2o 2.svg' alt='' />
        <p className={styles.results}>Results</p>
        <p className={styles.scorePhrase}>
          You got <span className={styles.score}>{counter}</span> correct answers
        </p>
        <button onClick={handleTryAgain} className={styles.tryAgain}>
          Try again
        </button>
      </div>
    ))
  );
};

export default QuizContainer;
