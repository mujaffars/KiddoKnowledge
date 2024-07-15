// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">
          <Link href="/">SmartStart Academy</Link>
        </div>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-gray-300">Home</Link>
          <Link href="/nursery" className="text-white hover:text-gray-300">Nursery</Link>
          <Link href="/first-grade" className="text-white hover:text-gray-300">1st Grade</Link>
          <Link href="/second-grade" className="text-white hover:text-gray-300">2nd Grade</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;