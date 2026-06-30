import { useApp } from '@/store/AppContext';
import { cn } from '@/utils/cn';
import { Phone, Menu, X, Sun, Moon, Bell, User, Shield, ChevronDown, Wrench } from 'lucide-react';
import { Button } from '@/components/ui';
import { useState } from 'react';

export default function Header() {
  const { darkMode, toggleDarkMode, currentView, setCurrentView, isAdmin, toggleAdmin, isLoggedIn, login, logout, mobileMenuOpen, toggleMobileMenu, notifications } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'booking', label: 'Book Now' },
    { id: 'tracker', label: 'Track Repair' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-primary-600 text-white py-1.5 text-center text-sm font-medium hidden md:block">
        <span>🔧 Winter Special: 15% off all brake services! Use code <strong>WINTER25</strong> </span>
        <button onClick={() => setCurrentView('booking')} className="underline ml-2 hover:text-primary-200">Book Now →</button>
      </div>

      {/* Main Header */}
      <header className={cn('sticky top-0 z-40 border-b transition-colors duration-300',
        darkMode ? 'bg-dark-900/95 border-dark-800 backdrop-blur-xl' : 'bg-white/95 border-dark-200 backdrop-blur-xl')}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => setCurrentView('home')} className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20 group-hover:shadow-primary-600/40 transition-shadow">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-dark-900 dark:text-white leading-tight">APEX AUTO</h1>
                <p className="text-[10px] font-semibold text-primary-600 dark:text-primary-400 tracking-widest -mt-0.5">GARAGE & SERVICE</p>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all',
                    currentView === item.id
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white hover:bg-dark-100 dark:hover:bg-dark-800'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Emergency Call */}
              <a href="tel:+15551234567" className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-accent-600 dark:text-accent-400 hover:text-accent-700 transition-colors">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </a>

              {/* Dark Mode */}
              <button onClick={toggleDarkMode} className="p-2 rounded-lg text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 rounded-lg text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors relative">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-dark-200 dark:border-dark-700 overflow-hidden z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-dark-200 dark:border-dark-700">
                      <h4 className="font-semibold text-dark-900 dark:text-white">Notifications</h4>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.slice(0, 5).map(n => (
                        <div key={n.id} className={cn('px-4 py-3 border-b border-dark-100 dark:border-dark-700/50 hover:bg-dark-50 dark:hover:bg-dark-700/30', !n.read && 'bg-primary-50/50 dark:bg-primary-900/10')}>
                          <div className="flex items-start gap-2">
                            <div className={cn('w-2 h-2 rounded-full mt-2 flex-shrink-0', n.type === 'success' ? 'bg-green-500' : n.type === 'warning' ? 'bg-yellow-500' : n.type === 'error' ? 'bg-red-500' : 'bg-blue-500')} />
                            <div>
                              <p className="text-sm font-medium text-dark-900 dark:text-white">{n.title}</p>
                              <p className="text-xs text-dark-500 dark:text-dark-400 mt-0.5">{n.message}</p>
                              <p className="text-xs text-dark-400 dark:text-dark-500 mt-1">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Admin Toggle */}
              <button
                onClick={() => { toggleAdmin(); if (!isAdmin) login('Admin User', 'admin'); else logout(); }}
                className={cn('hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  isAdmin ? 'bg-primary-600 text-white' : 'text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-800')}
              >
                <Shield className="w-4 h-4" />
                {isAdmin ? 'Admin' : 'Admin'}
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => { if (!isLoggedIn) { login('Robert Williams', 'customer'); } else setShowUserMenu(!showUserMenu); }}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    {isLoggedIn ? <span className="text-white text-xs font-bold">RW</span> : <User className="w-4 h-4 text-white" />}
                  </div>
                  <ChevronDown className="w-3 h-3 text-dark-400 hidden md:block" />
                </button>
                {showUserMenu && isLoggedIn && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-2xl shadow-2xl border border-dark-200 dark:border-dark-700 overflow-hidden z-50 animate-fade-in">
                    <div className="px-4 py-3 border-b border-dark-200 dark:border-dark-700">
                      <p className="font-semibold text-dark-900 dark:text-white">Robert Williams</p>
                      <p className="text-xs text-dark-500">robert.w@email.com</p>
                    </div>
                    <div className="py-1">
                      {['My Account', 'My Vehicles', 'Repair History', 'Invoices'].map(item => (
                        <button key={item} onClick={() => { setCurrentView('account'); setShowUserMenu(false); }} className="w-full text-left px-4 py-2.5 text-sm text-dark-700 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-700/50">
                          {item}
                        </button>
                      ))}
                    </div>
                    <div className="py-1 border-t border-dark-200 dark:border-dark-700">
                      <button onClick={() => { logout(); setShowUserMenu(false); }} className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10">
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Book Button */}
              <Button variant="accent" size="sm" onClick={() => setCurrentView('booking')} className="hidden md:flex">
                Book Now
              </Button>

              {/* Mobile Menu Toggle */}
              <button onClick={toggleMobileMenu} className="lg:hidden p-2 rounded-lg text-dark-500 hover:bg-dark-100 dark:hover:bg-dark-800">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-dark-200 dark:border-dark-800 bg-white dark:bg-dark-900 animate-fade-in">
            <div className="px-4 py-3 space-y-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    currentView === item.id
                      ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-dark-600 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800'
                  )}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-dark-200 dark:border-dark-700">
                <Button variant="accent" size="lg" className="w-full" onClick={() => setCurrentView('booking')}>Book Appointment</Button>
              </div>
              <div className="pt-2">
                <a href="tel:+15551234567" className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl font-semibold">
                  <Phone className="w-4 h-4" /> Emergency: (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
