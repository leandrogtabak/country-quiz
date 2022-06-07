import styles from './ButtonAnswer.module.css';
import { useEffect, useState } from 'react';
import { HighlightOffRounded, CheckCircleOutlineRounded, SettingsSystemDaydreamOutlined } from '@material-ui/icons';

const ButtonAnswer = ({ letter, label, variant, handleClick, id, index }) => {
  const [wrong, setWrong] = useState(false);
  const [correct, setCorrect] = useState(false);

  useEffect(() => {
    switch (variant) {
      case 'correct':
        setCorrect(true);
        setWrong(false);
        break;
      case 'wrong':
        setCorrect(false);
        setWrong(true);
        break;
      default:
        setCorrect(false);
        setWrong(false);
    }
  }, [variant]);

  return (
    <>
      <button id={id} data-index={index} onClick={handleClick} className={styles.button}>
        <div className={`${styles.container} ${wrong && styles.wrong}  ${correct && styles.correct}`}>
          <p className={styles.letter}>{letter}</p> <p className={styles.label}>{label}</p>
          {correct && <CheckCircleOutlineRounded className={styles.icon} />}
          {wrong && <HighlightOffRounded className={styles.icon} />}
        </div>
      </button>
    </>
  );
};
export default ButtonAnswer;
