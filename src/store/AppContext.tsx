import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface AppState {
  darkMode: boolean;
  currentView: string;
  isAdmin: boolean;
  isLoggedIn: boolean;
  userName: string;
  userRole: 'customer' | 'admin' | 'mechanic';
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  notifications: Notification[];
  chatOpen: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  time: string;
}

interface AppContextType extends AppState {
  toggleDarkMode: () => void;
  setCurrentView: (view: string) => void;
  toggleAdmin: () => void;
  login: (name: string, role: 'customer' | 'admin' | 'mechanic') => void;
  logout: () => void;
  toggleSidebar: () => void;
  toggleMobileMenu: () => void;
  toggleChat: () => void;
  markNotificationRead: (id: string) => void;
  addNotification: (n: Omit<Notification, 'id' | 'read'>) => void;
}

const defaultNotifications: Notification[] = [
  { id: 'n1', title: 'Repair Complete', message: 'Jennifer Martinez\'s Honda Civic brake repair is ready for pickup.', type: 'success', read: false, time: '5 min ago' },
  { id: 'n2', title: 'New Appointment', message: 'Emily Davis booked an oil change for Jan 16 at 8:30 AM.', type: 'info', read: false, time: '15 min ago' },
  { id: 'n3', title: 'Low Inventory Alert', message: 'Air Filters (Multi-Fit) below minimum stock level.', type: 'warning', read: false, time: '1 hr ago' },
  { id: 'n4', title: 'Payment Received', message: 'Robert Williams paid invoice #INV-002 - $123.12', type: 'success', read: true, time: '2 hrs ago' },
  { id: 'n5', title: 'Customer Approval Needed', message: 'Waiting for Robert Williams to approve additional engine work.', type: 'warning', read: false, time: '3 hrs ago' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    darkMode: true,
    currentView: 'home',
    isAdmin: false,
    isLoggedIn: false,
    userName: '',
    userRole: 'customer',
    sidebarOpen: true,
    mobileMenuOpen: false,
    notifications: defaultNotifications,
    chatOpen: false,
  });

  const toggleDarkMode = useCallback(() => setState(s => ({ ...s, darkMode: !s.darkMode })), []);
  const setCurrentView = useCallback((view: string) => setState(s => ({ ...s, currentView: view, mobileMenuOpen: false })), []);
  const toggleAdmin = useCallback(() => setState(s => ({ ...s, isAdmin: !s.isAdmin, currentView: !s.isAdmin ? 'dashboard' : 'home' })), []);
  const login = useCallback((name: string, role: 'customer' | 'admin' | 'mechanic') => setState(s => ({ ...s, isLoggedIn: true, userName: name, userRole: role, isAdmin: role === 'admin', currentView: role === 'admin' ? 'dashboard' : 'home' })), []);
  const logout = useCallback(() => setState(s => ({ ...s, isLoggedIn: false, userName: '', userRole: 'customer', isAdmin: false, currentView: 'home' })), []);
  const toggleSidebar = useCallback(() => setState(s => ({ ...s, sidebarOpen: !s.sidebarOpen })), []);
  const toggleMobileMenu = useCallback(() => setState(s => ({ ...s, mobileMenuOpen: !s.mobileMenuOpen })), []);
  const toggleChat = useCallback(() => setState(s => ({ ...s, chatOpen: !s.chatOpen })), []);
  const markNotificationRead = useCallback((id: string) => setState(s => ({ ...s, notifications: s.notifications.map(n => n.id === id ? { ...n, read: true } : n) })), []);
  const addNotification = useCallback((n: Omit<Notification, 'id' | 'read'>) => setState(s => ({ ...s, notifications: [{ ...n, id: `n${Date.now()}`, read: false }, ...s.notifications] })), []);

  return (
    <AppContext.Provider value={{ ...state, toggleDarkMode, setCurrentView, toggleAdmin, login, logout, toggleSidebar, toggleMobileMenu, toggleChat, markNotificationRead, addNotification }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
