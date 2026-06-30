import { AppProvider, useApp } from '@/store/AppContext';
import { cn } from '@/utils/cn';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from '@/components/pages/HomePage';
import ServicesPage from '@/components/pages/ServicesPage';
import BookingPage from '@/components/pages/BookingPage';
import TrackerPage from '@/components/pages/TrackerPage';
import BlogPage from '@/components/pages/BlogPage';
import ContactPage from '@/components/pages/ContactPage';
import AccountPage from '@/components/pages/AccountPage';
import AdminDashboard from '@/components/admin/AdminDashboard';
import ChatBot from '@/components/ChatBot';

function AppContent() {
  const { darkMode, currentView, isAdmin } = useApp();

  const renderPage = () => {
    if (isAdmin) return <AdminDashboard />;
    switch (currentView) {
      case 'home': return <HomePage />;
      case 'services': return <ServicesPage />;
      case 'booking': return <BookingPage />;
      case 'tracker': return <TrackerPage />;
      case 'blog': return <BlogPage />;
      case 'contact': return <ContactPage />;
      case 'account': return <AccountPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className={cn(darkMode && 'dark')}>
      <div className="min-h-screen bg-white dark:bg-dark-950 text-dark-900 dark:text-white transition-colors duration-300">
        {!isAdmin && <Header />}
        <main>{renderPage()}</main>
        {!isAdmin && <Footer />}
        <ChatBot />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
