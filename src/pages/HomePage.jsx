import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      {/* Top Nav with Logo */}
      <header className="flex items-center justify-start px-6 py-4">
        <img
          src="/personl-logo.png"
          alt="PersonL Logo"
          className="h-10"
        />
      </header>

      {/* Hero Section */}
      <section className="text-center py-6 px-4">
        <h1 className="text-3xl font-bold text-[#003594] italic">
          Bad Spelling. Great Product.
        </h1>
        <p className="mt-4 text-gray-600">Request File Transfer</p>
        <div className="flex justify-center mt-6 gap-4">
          <Link
            to="/educator/login"
            className="bg-[#003594] text-white font-semibold py-2 px-4 rounded hover:bg-blue-900"
          >
            Educators
          </Link>
          <Link
            to="/district/login"
            className="border border-[#003594] text-[#003594] font-semibold py-2 px-4 rounded hover:bg-blue-50"
          >
            Districts
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-gray-100 text-center">
        <h2 className="text-2xl font-bold mb-2">About PersonL</h2>
        <p className="max-w-2xl mx-auto text-gray-700">
          PersonL was created by a former teacher and HR Director who got tired of the current personnel file process — faxing forms, emailing PDFs, and chasing signatures.
          So we built a smarter system—one that makes transferring educator personnel files fast, secure, and simple.
        </p>
      </section>

      {/* Infographic Section */}
      <section className="py-8 text-center">
        <img
          src="/infographic-how-it-works.png"
          alt="Infographic showing the steps to request and transfer educator personnel files using PersonL"
          className="mx-auto rounded shadow-md w-full max-w-md sm:max-w-lg"
        />
      </section>

      {/* Footer Logo */}
      <footer className="py-8 text-center">
        <img
          src="/personl-logo.png"
          alt="PersonL Logo"
          className="mx-auto h-10 transition-transform duration-300 hover:scale-105"
        />
      </footer>
    </main>
  );
}
