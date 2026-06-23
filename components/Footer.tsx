"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <span>&copy; {year} Maitrya Anupam</span>
      <a href="mailto:maitryainfinity@gmail.com">maitryainfinity@gmail.com</a>
    </footer>
  );
}
