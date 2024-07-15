import Quiz from '../components/Quiz';
import { questions } from '../data/questions';

const SecondGradeQuiz = () => {
  return <Quiz questions={questions.secondGrade} grade="2nd Grade" />;
};

export default SecondGradeQuiz;