import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/header';
import { HomePage } from './components/pages/home';
import { ExploreProperties } from './components/pages/explore';
import { PropertyDetails } from './components/pages/property-details';
import { BookAccommodation } from './components/pages/book';
import { BecomeHost } from './components/pages/host';
import { HostRegistration } from './components/pages/host/registration';
import { LoginPage } from './components/pages/login';
import { RegisterPage } from './components/pages/register';
import { MessagesPage } from './components/pages/messages';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExploreProperties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/book" element={<BookAccommodation />} />
            <Route path="/host" element={<BecomeHost />} />
            <Route path="/host/register" element={<HostRegistration />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/messages" element={<MessagesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}