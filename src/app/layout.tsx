// src/app/layout.tsx
import '../styles/globals.css';
import Navbar from '../components/navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <div className="container mx-auto p-4">{children}</div>
      </body>
    </html>
  );
}