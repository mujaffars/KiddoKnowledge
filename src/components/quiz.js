import { useState } from 'react';
import { Formik, Form, Field } from 'formik';

const Quiz = ({ questions, grade }) => {
  const [result, setResult] = useState(null);

  const handleSubmit = (values) => {
    let score = 0;
    questions.forEach((question, index) => {
      if (values[`question${index}`] === question.answer) {
        score += 1;
      }
    });
    setResult(score);
  };

  return (
    <div>
      <h2>{grade} Quiz</h2>
      <Formik
        initialValues={questions.reduce((acc, _, index) => {
          acc[`question${index}`] = '';
          return acc;
        }, {})}
        onSubmit={handleSubmit}
      >
        <Form>
          {questions.map((question, index) => (
            <div key={index}>
              <p>{question.question}</p>
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex}>
                  <Field type="radio" name={`question${index}`} value={option} />
                  {option}
                </label>
              ))}
            </div>
          ))}
          <button type="submit">Submit</button>
        </Form>
      </Formik>
      {result !== null && <h3>Your Score: {result}/{questions.length}</h3>}
    </div>
  );
};

export default Quiz;