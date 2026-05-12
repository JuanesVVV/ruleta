import Roulette from "./uno/ruleta";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Sorteo Rápido
        </h1>
        <p className="text-gray-500 mt-2">Configura tus opciones y gira la ruleta</p>
      </div>

      <Roulette />
      
      <footer className="mt-12 text-gray-400 text-sm">
        Hecho con Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
