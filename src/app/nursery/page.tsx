import Quiz from '../../components/quiz';
import { questions } from '../../data/questions';

const NurseryQuiz = () => {
  return <Quiz questions={questions.nursery} grade="Nursery" />;
};

export default NurseryQuiz;