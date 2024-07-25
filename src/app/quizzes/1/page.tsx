// src/app/second-grade/page.tsx
import Quiz from '../../../components/quiz';
import { questions } from '../../../data/questions';

const SecondGradeQuiz = () => {
  return <Quiz questions={questions.secondGrade} grade="2nd Grade" />;
};

export default SecondGradeQuiz;