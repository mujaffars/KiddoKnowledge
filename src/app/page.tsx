// src/app/page.tsx
import Link from 'next/link';
import { quizzes } from '../data/quizzes';

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li key={quiz.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{quiz.title}</h2>
            <p>{quiz.description}</p>
            <Link href={`/quizzes/${quiz.id}`} legacyBehavior>
              <a className="text-blue-500 underline">Start Quiz</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
