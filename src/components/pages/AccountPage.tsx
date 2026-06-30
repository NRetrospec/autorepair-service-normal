import { useApp } from '@/store/AppContext';
import { Button, Card, Badge, Tabs, ProgressBar, Avatar } from '@/components/ui';
import { customers, vehicles, invoices, repairOrders } from '@/data/seedData';
import { Car, FileText, History, Settings, Star, CreditCard, Bell, Shield, Award, Download, Eye, Calendar } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useState } from 'react';

export default function AccountPage() {
  const { setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState('vehicles');
  const customer = customers[0];
  const customerVehicles = vehicles.filter(v => v.customerId === customer.id);

  const tabs = [
    { id: 'vehicles', label: 'My Vehicles', icon: <Car className="w-4 h-4" /> },
    { id: 'history', label: 'Service History', icon: <History className="w-4 h-4" /> },
    { id: 'invoices', label: 'Invoices', icon: <FileText className="w-4 h-4" /> },
    { id: 'loyalty', label: 'Loyalty', icon: <Award className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-950">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar name={customer.name} size="lg" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-white">{customer.name}</h1>
              <p className="text-primary-200">{customer.email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="info" size="md" className="bg-white/10 text-white border-white/20">
                  <Star className="w-3 h-3 mr-1" /> {customer.membershipTier.toUpperCase()} Member
                </Badge>
                <Badge variant="success" size="md" className="bg-white/10 text-white border-white/20">
                  {customer.loyaltyPoints} Points
                </Badge>
              </div>
            </div>
            <Button variant="accent" onClick={() => setCurrentView('booking')} icon={<Calendar className="w-4 h-4" />}>Book Service</Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total Spent', value: `$${customer.totalSpent.toLocaleString()}`, color: 'text-primary-600 dark:text-primary-400' },
            { label: 'Vehicles', value: customerVehicles.length.toString(), color: 'text-accent-600 dark:text-accent-400' },
            { label: 'Service Visits', value: '14', color: 'text-green-600 dark:text-green-400' },
            { label: 'Loyalty Points', value: customer.loyaltyPoints.toLocaleString(), color: 'text-purple-600 dark:text-purple-400' },
          ].map(stat => (
            <Card key={stat.label} className="p-4 text-center">
              <p className={cn('text-2xl font-bold', stat.color)}>{stat.value}</p>
              <p className="text-xs text-dark-500 mt-1">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} />

        <div className="mt-6">
          {/* Vehicles Tab */}
          {activeTab === 'vehicles' && (
            <div className="grid md:grid-cols-2 gap-4">
              {customerVehicles.map(v => (
                <Card key={v.id} hover className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center text-2xl">🚗</div>
                      <div>
                        <h4 className="font-bold text-dark-900 dark:text-white">{v.year} {v.make} {v.model}</h4>
                        <p className="text-sm text-dark-500">{v.color} • {v.licensePlate}</p>
                      </div>
                    </div>
                    <Badge variant="info">{v.mileage.toLocaleString()} mi</Badge>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="p-2 bg-dark-50 dark:bg-dark-700 rounded-lg">
                      <p className="text-dark-400 text-xs">VIN</p>
                      <p className="font-mono text-dark-700 dark:text-dark-300 text-xs mt-0.5">{v.vin}</p>
                    </div>
                    <div className="p-2 bg-dark-50 dark:bg-dark-700 rounded-lg">
                      <p className="text-dark-400 text-xs">Last Service</p>
                      <p className="font-medium text-dark-700 dark:text-dark-300 text-xs mt-0.5">{v.lastService}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-dark-400 mb-1">Next service due: {v.nextServiceDue}</p>
                    <ProgressBar value={75} color="bg-yellow-500" size="sm" />
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentView('booking')}>Book Service</Button>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentView('tracker')}>View History</Button>
                  </div>
                </Card>
              ))}
              <Card hover className="p-5 flex items-center justify-center border-dashed min-h-[200px]" onClick={() => {}}>
                <div className="text-center">
                  <div className="text-4xl mb-2">➕</div>
                  <p className="font-semibold text-dark-500">Add Vehicle</p>
                </div>
              </Card>
            </div>
          )}

          {/* Service History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {repairOrders.map(ro => (
                <Card key={ro.id} className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-dark-900 dark:text-white">{ro.services.map(s => s.name).join(', ')}</h4>
                      <p className="text-sm text-dark-500">{ro.vehicleInfo} • {ro.mechanicName}</p>
                      <p className="text-xs text-dark-400 mt-1">{new Date(ro.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-dark-900 dark:text-white">${ro.total.toFixed(2)}</span>
                      <Badge variant={ro.status === 'completed' ? 'success' : 'info'}>{ro.status}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div className="space-y-3">
              {invoices.map(inv => (
                <Card key={inv.id} className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-dark-900 dark:text-white">Invoice #{inv.id.toUpperCase()}</h4>
                      <p className="text-sm text-dark-500">{inv.vehicleInfo}</p>
                      <p className="text-xs text-dark-400 mt-1">Created: {inv.createdAt} • Due: {inv.dueDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-dark-900 dark:text-white">${inv.total.toFixed(2)}</span>
                      <Badge variant={inv.status === 'paid' ? 'success' : inv.status === 'overdue' ? 'danger' : inv.status === 'sent' ? 'warning' : 'default'}>
                        {inv.status}
                      </Badge>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" icon={<Eye className="w-3.5 h-3.5" />}>View</Button>
                        <Button variant="ghost" size="sm" icon={<Download className="w-3.5 h-3.5" />}>PDF</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Loyalty Tab */}
          {activeTab === 'loyalty' && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-4">Your Loyalty Status</h3>
                <div className="text-center mb-6">
                  <div className="text-5xl mb-2">🏆</div>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{customer.membershipTier.toUpperCase()}</p>
                  <p className="text-dark-500">{customer.loyaltyPoints} points earned</p>
                </div>
                <ProgressBar value={customer.loyaltyPoints} max={5000} color="bg-primary-500" showLabel />
                <p className="text-sm text-dark-400 mt-2 text-center">{5000 - customer.loyaltyPoints} points to Platinum</p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-4">Rewards Available</h3>
                <div className="space-y-3">
                  {[
                    { points: 500, reward: '$50 Service Credit' },
                    { points: 1000, reward: 'Free Oil Change' },
                    { points: 2000, reward: 'Free Brake Inspection' },
                    { points: 5000, reward: 'Free Full Service' },
                  ].map(r => (
                    <div key={r.points} className="flex items-center justify-between p-3 bg-dark-50 dark:bg-dark-700 rounded-lg">
                      <div>
                        <p className="font-medium text-dark-900 dark:text-white">{r.reward}</p>
                        <p className="text-xs text-dark-400">{r.points} points</p>
                      </div>
                      <Button variant={customer.loyaltyPoints >= r.points ? 'primary' : 'ghost'} size="sm" disabled={customer.loyaltyPoints < r.points}>
                        {customer.loyaltyPoints >= r.points ? 'Redeem' : 'Locked'}
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <Card className="p-6">
              <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-6">Account Settings</h3>
              <div className="space-y-6">
                {[
                  { icon: <Bell className="w-5 h-5" />, title: 'Notification Preferences', desc: 'Manage email and SMS notifications' },
                  { icon: <Shield className="w-5 h-5" />, title: 'Security', desc: 'Update password and security settings' },
                  { icon: <CreditCard className="w-5 h-5" />, title: 'Payment Methods', desc: 'Manage saved payment methods' },
                ].map(item => (
                  <div key={item.title} className="flex items-center justify-between p-4 bg-dark-50 dark:bg-dark-700 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">{item.icon}</div>
                      <div>
                        <p className="font-medium text-dark-900 dark:text-white">{item.title}</p>
                        <p className="text-sm text-dark-500">{item.desc}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Manage</Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
