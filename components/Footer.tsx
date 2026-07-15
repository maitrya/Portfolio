"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer>
      <div>&copy; {year} Maitrya Anupam</div>
      <div>
        <a href="mailto:maitryainfinity@gmail.com">maitryainfinity@gmail.com</a>
      </div>
    </footer>
  );
}
