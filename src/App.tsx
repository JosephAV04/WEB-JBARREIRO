import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/shared/ScrollToTop';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BottomNav from './components/layout/BottomNav';
import WhatsAppFAB from './components/layout/WhatsAppFAB';
import HomeView from './views/HomeView';
import ProductsView from './views/ProductsView';
import ProductDetailView from './views/ProductDetailView';
import ContactView from './views/ContactView';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 pb-20 md:pb-0">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/productos" element={<ProductsView />} />
              <Route path="/productos/:id" element={<ProductDetailView />} />
              <Route path="/contacto" element={<ContactView />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFAB />
          <BottomNav />
        </div>
      </Router>
    </HelmetProvider>
  );
}
