import { useApp } from '@/store/AppContext';
import { Button, Card, Badge, StatCard, Avatar, Toggle } from '@/components/ui';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import {
  DollarSign, Users, Calendar, Wrench, TrendingUp, AlertTriangle,
  Search, Filter, Plus, MoreVertical,
  Bell, Settings, LogOut, BarChart3, FileText, UserCog, Megaphone,
  ClipboardList, Boxes, Home
} from 'lucide-react';
import {
  revenueData, serviceBreakdown, appointmentsByDay, customerRetention,
  appointments, repairOrders, invoices, customers, mechanics, inventory
} from '@/data/seedData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

type AdminView = 'overview' | 'appointments' | 'repairs' | 'invoices' | 'customers' | 'mechanics' | 'inventory' | 'crm' | 'settings';

export default function AdminDashboard() {
  const { setCurrentView, toggleAdmin, darkMode, notifications } = useApp();
  const [adminView, setAdminView] = useState<AdminView>('overview');
  const [sideCollapsed, setSideCollapsed] = useState(false);

  const navItems: { id: AdminView; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'overview', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { id: 'appointments', label: 'Appointments', icon: <Calendar className="w-5 h-5" />, badge: 8 },
    { id: 'repairs', label: 'Work Orders', icon: <ClipboardList className="w-5 h-5" />, badge: 2 },
    { id: 'invoices', label: 'Invoices', icon: <FileText className="w-5 h-5" />, badge: 1 },
    { id: 'customers', label: 'Customers', icon: <Users className="w-5 h-5" /> },
    { id: 'mechanics', label: 'Technicians', icon: <UserCog className="w-5 h-5" /> },
    { id: 'inventory', label: 'Inventory', icon: <Boxes className="w-5 h-5" />, badge: 2 },
    { id: 'crm', label: 'Marketing', icon: <Megaphone className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  // chart colors used inline

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-950 flex">
      {/* Sidebar */}
      <aside className={cn('fixed left-0 top-0 h-screen bg-white dark:bg-dark-900 border-r border-dark-200 dark:border-dark-800 z-50 transition-all duration-300 flex-col hidden md:flex',
        sideCollapsed ? 'w-16' : 'w-60')}>
        {/* Logo */}
        <div className="p-4 border-b border-dark-200 dark:border-dark-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0">
              <Wrench className="w-4 h-4 text-white" />
            </div>
            {!sideCollapsed && <span className="font-bold text-dark-900 dark:text-white text-sm">APEX ADMIN</span>}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setAdminView(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative',
                adminView === item.id
                  ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                  : 'text-dark-600 dark:text-dark-400 hover:bg-dark-50 dark:hover:bg-dark-800'
              )}
            >
              {item.icon}
              {!sideCollapsed && <span>{item.label}</span>}
              {item.badge && !sideCollapsed && (
                <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-dark-200 dark:border-dark-800">
          <button
            onClick={() => { toggleAdmin(); setCurrentView('home'); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-dark-500 hover:bg-dark-50 dark:hover:bg-dark-800 transition-all"
          >
            <LogOut className="w-5 h-5" />
            {!sideCollapsed && <span>Exit Admin</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn('flex-1 transition-all duration-300 md:ml-60', sideCollapsed ? 'md:ml-16' : 'md:ml-60')}>
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark-900/80 backdrop-blur-xl border-b border-dark-200 dark:border-dark-800">
          <div className="flex items-center justify-between px-6 h-14">
            <div className="flex items-center gap-3">
              <button onClick={() => setSideCollapsed(!sideCollapsed)} className="p-1.5 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800">
                <BarChart3 className="w-5 h-5 text-dark-500" />
              </button>
              <h2 className="text-lg font-bold text-dark-900 dark:text-white capitalize">{adminView}</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input className="pl-10 pr-4 py-2 bg-dark-50 dark:bg-dark-800 rounded-xl text-sm border-none focus:ring-2 focus:ring-primary-500 w-64 text-dark-900 dark:text-white" placeholder="Search..." />
              </div>
              <button className="relative p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800">
                <Bell className="w-5 h-5 text-dark-500" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Avatar name="Admin User" size="sm" />
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* ===== OVERVIEW ===== */}
          {adminView === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Revenue (MTD)" value="$38,900" change="+12.5% vs last month" changeType="positive" icon={<DollarSign className="w-5 h-5 text-green-600" />} color="bg-green-50 dark:bg-green-900/20" />
                <StatCard title="Appointments" value="95" change="+8 from last week" changeType="positive" icon={<Calendar className="w-5 h-5 text-blue-600" />} color="bg-blue-50 dark:bg-blue-900/20" />
                <StatCard title="Active Repairs" value="12" change="3 awaiting approval" changeType="neutral" icon={<Wrench className="w-5 h-5 text-orange-600" />} color="bg-orange-50 dark:bg-orange-900/20" />
                <StatCard title="Customer Rating" value="4.9★" change="+0.1 this quarter" changeType="positive" icon={<TrendingUp className="w-5 h-5 text-purple-600" />} color="bg-purple-50 dark:bg-purple-900/20" />
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <Card className="lg:col-span-2 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-dark-900 dark:text-white">Revenue Overview</h3>
                    <div className="flex gap-3 text-xs">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Revenue</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Profit</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="profGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={v => `$${v / 1000}k`} />
                      <Tooltip contentStyle={{ background: darkMode ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }} />
                      <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#revGrad)" strokeWidth={2} />
                      <Area type="monotone" dataKey="profit" stroke="#22c55e" fill="url(#profGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Card>

                {/* Service Breakdown */}
                <Card className="p-5">
                  <h3 className="font-bold text-dark-900 dark:text-white mb-4">Service Mix</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={serviceBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                        {serviceBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-1.5 mt-2">
                    {serviceBreakdown.slice(0, 5).map(s => (
                      <div key={s.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                          <span className="text-dark-600 dark:text-dark-400">{s.name}</span>
                        </div>
                        <span className="font-medium text-dark-900 dark:text-white">{s.value}%</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Second Row */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Appointments by Day */}
                <Card className="p-5">
                  <h3 className="font-bold text-dark-900 dark:text-white mb-4">Appointments by Day</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={appointmentsByDay}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ background: darkMode ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px' }} />
                      <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card>

                {/* Customer Retention */}
                <Card className="p-5">
                  <h3 className="font-bold text-dark-900 dark:text-white mb-4">Customer Retention</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={customerRetention}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                      <Tooltip contentStyle={{ background: darkMode ? '#1e293b' : '#fff', border: 'none', borderRadius: '12px' }} />
                      <Line type="monotone" dataKey="returning" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="newCustomers" stroke="#f97316" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </div>

              {/* Today's Schedule & Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-dark-900 dark:text-white">Today's Schedule</h3>
                    <Badge variant="info">{appointments.filter(a => a.date === '2025-01-15').length} appointments</Badge>
                  </div>
                  <div className="space-y-2">
                    {appointments.slice(0, 4).map(apt => (
                      <div key={apt.id} className="flex items-center gap-3 p-3 bg-dark-50 dark:bg-dark-800 rounded-xl">
                        <div className="text-center flex-shrink-0 w-14">
                          <p className="text-sm font-bold text-primary-600 dark:text-primary-400">{apt.time}</p>
                          <p className="text-xs text-dark-400">{apt.duration}m</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-dark-900 dark:text-white text-sm truncate">{apt.customerName}</p>
                          <p className="text-xs text-dark-500 truncate">{apt.serviceType} • {apt.vehicleInfo}</p>
                        </div>
                        <Badge variant={apt.status === 'in-progress' ? 'info' : apt.status === 'completed' ? 'success' : 'default'} size="sm">
                          {apt.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Alerts & Notifications */}
                <Card className="p-5">
                  <h3 className="font-bold text-dark-900 dark:text-white mb-4">Alerts</h3>
                  <div className="space-y-2">
                    {notifications.filter(n => !n.read).slice(0, 4).map(n => (
                      <div key={n.id} className="flex items-start gap-3 p-3 bg-dark-50 dark:bg-dark-800 rounded-xl">
                        <div className={cn('w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                          n.type === 'success' ? 'bg-green-500' : n.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500')} />
                        <div>
                          <p className="font-medium text-dark-900 dark:text-white text-sm">{n.title}</p>
                          <p className="text-xs text-dark-500 mt-0.5">{n.message}</p>
                          <p className="text-xs text-dark-400 mt-1">{n.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Mechanic Status */}
              <Card className="p-5">
                <h3 className="font-bold text-dark-900 dark:text-white mb-4">Technician Status</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {mechanics.map(m => (
                    <div key={m.id} className="p-3 bg-dark-50 dark:bg-dark-800 rounded-xl text-center">
                      <div className="text-3xl mb-1">{m.avatar}</div>
                      <p className="font-semibold text-dark-900 dark:text-white text-sm">{m.name}</p>
                      <p className="text-xs text-dark-500">{m.role}</p>
                      <Badge variant={m.status === 'available' ? 'success' : m.status === 'busy' ? 'warning' : 'default'} size="sm" className="mt-2">
                        {m.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* ===== APPOINTMENTS VIEW ===== */}
          {adminView === 'appointments' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-dark-900 dark:text-white">All Appointments</h3>
                <Button variant="primary" icon={<Plus className="w-4 h-4" />}>New Appointment</Button>
              </div>
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-dark-50 dark:bg-dark-800">
                      <tr>
                        {['Customer', 'Vehicle', 'Service', 'Technician', 'Date/Time', 'Status', 'Est. Cost', ''].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-dark-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-100 dark:divide-dark-800">
                      {appointments.map(apt => (
                        <tr key={apt.id} className="hover:bg-dark-50 dark:hover:bg-dark-800/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <Avatar name={apt.customerName} size="sm" />
                              <span className="text-sm font-medium text-dark-900 dark:text-white">{apt.customerName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-dark-600 dark:text-dark-400">{apt.vehicleInfo}</td>
                          <td className="px-4 py-3 text-sm text-dark-600 dark:text-dark-400">{apt.serviceType}</td>
                          <td className="px-4 py-3 text-sm text-dark-600 dark:text-dark-400">{apt.mechanicName}</td>
                          <td className="px-4 py-3">
                            <p className="text-sm text-dark-900 dark:text-white">{apt.date}</p>
                            <p className="text-xs text-dark-400">{apt.time} ({apt.duration}m)</p>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={apt.status === 'in-progress' ? 'info' : apt.status === 'completed' ? 'success' : apt.status === 'cancelled' ? 'danger' : 'default'}>
                              {apt.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-dark-900 dark:text-white">${apt.estimatedCost}</td>
                          <td className="px-4 py-3">
                            <button className="p-1 hover:bg-dark-100 dark:hover:bg-dark-700 rounded"><MoreVertical className="w-4 h-4 text-dark-400" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ===== REPAIRS VIEW ===== */}
          {adminView === 'repairs' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-dark-900 dark:text-white">Work Orders</h3>
                <Button variant="primary" icon={<Plus className="w-4 h-4" />}>New Work Order</Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {repairOrders.map(ro => (
                  <Card key={ro.id} hover className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-dark-900 dark:text-white">{ro.vehicleInfo}</h4>
                        <p className="text-sm text-dark-500">{ro.customerName} • {ro.mechanicName}</p>
                      </div>
                      <Badge variant={ro.status === 'repairing' ? 'info' : ro.status === 'diagnosing' ? 'warning' : 'default'} size="md">
                        {ro.status.replace(/-/g, ' ')}
                      </Badge>
                    </div>
                    <div className="space-y-1.5 mb-4">
                      {ro.services.map((s, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className={cn('w-1.5 h-1.5 rounded-full', s.status === 'completed' ? 'bg-green-500' : s.status === 'in-progress' ? 'bg-blue-500' : 'bg-dark-300')} />
                            <span className="text-dark-700 dark:text-dark-300">{s.name}</span>
                          </div>
                          <span className="text-dark-500">${s.cost}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-dark-200 dark:border-dark-700">
                      <span className="text-lg font-bold text-primary-600 dark:text-primary-400">${ro.total.toFixed(2)}</span>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ===== INVOICES VIEW ===== */}
          {adminView === 'invoices' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-dark-900 dark:text-white">Invoices</h3>
                <Button variant="primary" icon={<Plus className="w-4 h-4" />}>New Invoice</Button>
              </div>
              {/* Invoice Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Card className="p-4 text-center">
                  <p className="text-2xl font-bold text-green-600">${invoices.filter(i => i.status === 'paid').reduce((a, i) => a + i.total, 0).toFixed(0)}</p>
                  <p className="text-xs text-dark-500 mt-1">Paid</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-2xl font-bold text-yellow-600">${invoices.filter(i => i.status === 'sent').reduce((a, i) => a + i.total, 0).toFixed(0)}</p>
                  <p className="text-xs text-dark-500 mt-1">Pending</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-2xl font-bold text-red-600">${invoices.filter(i => i.status === 'overdue').reduce((a, i) => a + i.total, 0).toFixed(0)}</p>
                  <p className="text-xs text-dark-500 mt-1">Overdue</p>
                </Card>
                <Card className="p-4 text-center">
                  <p className="text-2xl font-bold text-primary-600">${invoices.reduce((a, i) => a + i.total, 0).toFixed(0)}</p>
                  <p className="text-xs text-dark-500 mt-1">Total</p>
                </Card>
              </div>
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-dark-50 dark:bg-dark-800">
                      <tr>
                        {['Invoice', 'Customer', 'Vehicle', 'Amount', 'Status', 'Date', 'Due', ''].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-dark-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-100 dark:divide-dark-800">
                      {invoices.map(inv => (
                        <tr key={inv.id} className="hover:bg-dark-50 dark:hover:bg-dark-800/50">
                          <td className="px-4 py-3 font-medium text-sm text-primary-600 dark:text-primary-400">#{inv.id.toUpperCase()}</td>
                          <td className="px-4 py-3 text-sm text-dark-900 dark:text-white">{inv.customerName}</td>
                          <td className="px-4 py-3 text-sm text-dark-500">{inv.vehicleInfo}</td>
                          <td className="px-4 py-3 text-sm font-bold text-dark-900 dark:text-white">${inv.total.toFixed(2)}</td>
                          <td className="px-4 py-3">
                            <Badge variant={inv.status === 'paid' ? 'success' : inv.status === 'overdue' ? 'danger' : inv.status === 'sent' ? 'warning' : 'default'}>
                              {inv.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-dark-500">{inv.createdAt}</td>
                          <td className="px-4 py-3 text-sm text-dark-500">{inv.dueDate}</td>
                          <td className="px-4 py-3"><button className="p-1 hover:bg-dark-100 dark:hover:bg-dark-700 rounded"><MoreVertical className="w-4 h-4 text-dark-400" /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ===== CUSTOMERS VIEW ===== */}
          {adminView === 'customers' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-dark-900 dark:text-white">Customers</h3>
                <Button variant="primary" icon={<Plus className="w-4 h-4" />}>Add Customer</Button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customers.map(c => (
                  <Card key={c.id} hover className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar name={c.name} size="md" />
                      <div>
                        <h4 className="font-semibold text-dark-900 dark:text-white">{c.name}</h4>
                        <p className="text-xs text-dark-500">{c.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-dark-50 dark:bg-dark-700 rounded-lg text-center">
                        <p className="font-bold text-dark-900 dark:text-white">${c.totalSpent.toLocaleString()}</p>
                        <p className="text-xs text-dark-400">Spent</p>
                      </div>
                      <div className="p-2 bg-dark-50 dark:bg-dark-700 rounded-lg text-center">
                        <p className="font-bold text-dark-900 dark:text-white">{c.loyaltyPoints}</p>
                        <p className="text-xs text-dark-400">Points</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <Badge variant={c.membershipTier === 'platinum' ? 'purple' : c.membershipTier === 'gold' ? 'warning' : 'default'}>{c.membershipTier}</Badge>
                      <span className="text-xs text-dark-400">Since {c.joinDate}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ===== MECHANICS VIEW ===== */}
          {adminView === 'mechanics' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold text-dark-900 dark:text-white">Technician Management</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mechanics.map(m => (
                  <Card key={m.id} className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-4xl">{m.avatar}</div>
                      <div>
                        <h4 className="font-bold text-dark-900 dark:text-white">{m.name}</h4>
                        <p className="text-sm text-dark-500">{m.role}</p>
                        <Badge variant={m.status === 'available' ? 'success' : m.status === 'busy' ? 'warning' : 'default'} size="sm">{m.status}</Badge>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-dark-500">Experience</span><span className="text-dark-900 dark:text-white">{m.yearsExperience} years</span></div>
                      <div className="flex justify-between"><span className="text-dark-500">Rating</span><span className="text-dark-900 dark:text-white">⭐ {m.rating}</span></div>
                      <div className="flex justify-between"><span className="text-dark-500">Completed</span><span className="text-dark-900 dark:text-white">{m.completedJobs} jobs</span></div>
                      <div className="flex justify-between"><span className="text-dark-500">Rate</span><span className="text-dark-900 dark:text-white">${m.hourlyRate}/hr</span></div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {m.certifications.map(c => <Badge key={c} variant="info" size="sm">{c}</Badge>)}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {m.specialties.map(s => <Badge key={s} variant="default" size="sm">{s}</Badge>)}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ===== INVENTORY VIEW ===== */}
          {adminView === 'inventory' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-dark-900 dark:text-white">Parts Inventory</h3>
                <div className="flex gap-2">
                  <Button variant="outline" icon={<Filter className="w-4 h-4" />}>Filter</Button>
                  <Button variant="primary" icon={<Plus className="w-4 h-4" />}>Add Part</Button>
                </div>
              </div>
              {/* Low Stock Alerts */}
              {inventory.filter(i => i.quantity <= i.minStock).length > 0 && (
                <Card className="p-4 border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/10">
                  <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-400">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-semibold">Low Stock Alert:</span>
                    <span className="text-sm">{inventory.filter(i => i.quantity <= i.minStock).map(i => i.name).join(', ')}</span>
                  </div>
                </Card>
              )}
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-dark-50 dark:bg-dark-800">
                      <tr>
                        {['Part', 'Part #', 'Category', 'Qty', 'Min', 'Cost', 'Vendor', 'Location', 'Status'].map(h => (
                          <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-dark-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-100 dark:divide-dark-800">
                      {inventory.map(item => (
                        <tr key={item.id} className="hover:bg-dark-50 dark:hover:bg-dark-800/50">
                          <td className="px-4 py-3 text-sm font-medium text-dark-900 dark:text-white">{item.name}</td>
                          <td className="px-4 py-3 text-sm font-mono text-dark-500">{item.partNumber}</td>
                          <td className="px-4 py-3 text-sm text-dark-500">{item.category}</td>
                          <td className="px-4 py-3 text-sm font-bold text-dark-900 dark:text-white">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm text-dark-400">{item.minStock}</td>
                          <td className="px-4 py-3 text-sm text-dark-900 dark:text-white">${item.unitCost}</td>
                          <td className="px-4 py-3 text-sm text-dark-500">{item.vendor}</td>
                          <td className="px-4 py-3 text-sm text-dark-400">{item.location}</td>
                          <td className="px-4 py-3">
                            <Badge variant={item.quantity <= item.minStock ? 'danger' : item.quantity <= item.minStock * 1.5 ? 'warning' : 'success'}>
                              {item.quantity <= item.minStock ? 'Low' : item.quantity <= item.minStock * 1.5 ? 'Medium' : 'Good'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* ===== CRM VIEW ===== */}
          {adminView === 'crm' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-xl font-bold text-dark-900 dark:text-white">Marketing & CRM</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-5">
                  <h4 className="font-bold text-dark-900 dark:text-white mb-3">📧 Email Campaigns</h4>
                  <div className="space-y-3">
                    {['Winter Service Reminder', 'Holiday Promo', 'New Year Special'].map(c => (
                      <div key={c} className="p-3 bg-dark-50 dark:bg-dark-700 rounded-lg flex items-center justify-between">
                        <span className="text-sm text-dark-700 dark:text-dark-300">{c}</span>
                        <Badge variant="success" size="sm">Sent</Badge>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full">Create Campaign</Button>
                  </div>
                </Card>
                <Card className="p-5">
                  <h4 className="font-bold text-dark-900 dark:text-white mb-3">📱 SMS Promotions</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-dark-50 dark:bg-dark-700 rounded-lg">
                      <p className="text-sm text-dark-700 dark:text-dark-300 font-medium">Brake Service Reminder</p>
                      <p className="text-xs text-dark-400 mt-1">Sent to 145 customers</p>
                      <p className="text-xs text-green-500 mt-0.5">12% redemption rate</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">New SMS Blast</Button>
                  </div>
                </Card>
                <Card className="p-5">
                  <h4 className="font-bold text-dark-900 dark:text-white mb-3">⭐ Review Requests</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-dark-50 dark:bg-dark-700 rounded-lg text-center">
                      <p className="text-3xl font-bold text-dark-900 dark:text-white">4.9</p>
                      <p className="text-sm text-dark-500">Google Rating</p>
                      <p className="text-xs text-dark-400 mt-1">2,500+ reviews</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">Send Review Request</Button>
                  </div>
                </Card>
              </div>
              {/* Referral Program */}
              <Card className="p-5">
                <h4 className="font-bold text-dark-900 dark:text-white mb-3">🎁 Referral Program</h4>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-dark-50 dark:bg-dark-700 rounded-lg">
                    <p className="text-2xl font-bold text-primary-600">48</p>
                    <p className="text-xs text-dark-500">Total Referrals</p>
                  </div>
                  <div className="text-center p-3 bg-dark-50 dark:bg-dark-700 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">32</p>
                    <p className="text-xs text-dark-500">Converted</p>
                  </div>
                  <div className="text-center p-3 bg-dark-50 dark:bg-dark-700 rounded-lg">
                    <p className="text-2xl font-bold text-accent-600">67%</p>
                    <p className="text-xs text-dark-500">Conversion Rate</p>
                  </div>
                  <div className="text-center p-3 bg-dark-50 dark:bg-dark-700 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">$3,200</p>
                    <p className="text-xs text-dark-500">Revenue</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* ===== SETTINGS VIEW ===== */}
          {adminView === 'settings' && (
            <div className="space-y-6 animate-fade-in max-w-2xl">
              <h3 className="text-xl font-bold text-dark-900 dark:text-white">Shop Settings</h3>
              <Card className="p-5">
                <h4 className="font-semibold text-dark-900 dark:text-white mb-4">Business Information</h4>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">Shop Name</label>
                      <input className="w-full px-3 py-2 rounded-lg bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white" defaultValue="Apex Auto Garage" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">Phone</label>
                      <input className="w-full px-3 py-2 rounded-lg bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white" defaultValue="(555) 123-4567" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">Address</label>
                    <input className="w-full px-3 py-2 rounded-lg bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white" defaultValue="1234 Auto Drive, Springfield, IL 62701" />
                  </div>
                </div>
              </Card>
              <Card className="p-5">
                <h4 className="font-semibold text-dark-900 dark:text-white mb-4">Notifications</h4>
                <div className="space-y-4">
                  <Toggle checked={true} onChange={() => {}} label="Email notifications for new appointments" />
                  <Toggle checked={true} onChange={() => {}} label="SMS alerts for repair status changes" />
                  <Toggle checked={false} onChange={() => {}} label="Low inventory alerts" />
                  <Toggle checked={true} onChange={() => {}} label="Daily summary reports" />
                </div>
              </Card>
              <Card className="p-5">
                <h4 className="font-semibold text-dark-900 dark:text-white mb-4">Labor Rates</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">Standard Rate</label>
                    <input className="w-full px-3 py-2 rounded-lg bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white" defaultValue="$85/hr" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-600 dark:text-dark-400 mb-1">Diagnostic Rate</label>
                    <input className="w-full px-3 py-2 rounded-lg bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 text-dark-900 dark:text-white" defaultValue="$120/hr" />
                  </div>
                </div>
              </Card>
              <Button variant="primary" size="lg">Save Settings</Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
