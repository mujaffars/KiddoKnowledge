import Quiz from '../components/Quiz';
import { questions } from '../data/questions';

const FirstGradeQuiz = () => {
  return <Quiz questions={questions.firstGrade} grade="1st Grade" />;
};

export default FirstGradeQuiz;