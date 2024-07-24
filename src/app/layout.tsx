// src/app/layout.tsx
import '../styles/globals.css';
import Navbar from '../components/navbar';
import ProgressBar from '../components/ProgressBar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <ProgressBar /> {/* Ensure this is included and properly set up */}
        <div className="container mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}
