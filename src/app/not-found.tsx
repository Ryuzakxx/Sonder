export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0d0d0d] text-center px-4">
      <h1 className="text-6xl font-bold text-[#1e1e1e] mb-4">404</h1>
      <p className="text-[#555] text-lg mb-6">Questa pagina non esiste</p>
      <a href="/" className="text-[#c8a97e] hover:text-[#e8c99e] text-sm transition-colors">Torna alla home →</a>
    </main>
  );
}
