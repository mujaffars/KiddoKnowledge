import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <h1>Welcome to the Educational Website</h1>
      <div>
        <Link href="/nursery">
          <a>Nursery</a>
        </Link>
      </div>
      <div>
        <Link href="/first-grade">
          <a>1st Grade</a>
        </Link>
      </div>
      <div>
        <Link href="/second-grade">
          <a>2nd Grade</a>
        </Link>
      </div>
    </div>
  );
}
