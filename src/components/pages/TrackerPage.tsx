import { useApp } from '@/store/AppContext';
import { Button, Card, Badge, Input, ProgressBar } from '@/components/ui';
import { repairOrders } from '@/data/seedData';
import { Search, CheckCircle2, Clock, Wrench, Eye, Shield, Truck, ClipboardCheck, MessageSquare, Camera } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useState } from 'react';

const statusSteps = [
  { id: 'checked-in', label: 'Checked In', icon: <ClipboardCheck className="w-4 h-4" />, color: 'bg-blue-500' },
  { id: 'diagnosing', label: 'Diagnosing', icon: <Search className="w-4 h-4" />, color: 'bg-yellow-500' },
  { id: 'waiting-approval', label: 'Approval', icon: <Eye className="w-4 h-4" />, color: 'bg-orange-500' },
  { id: 'repairing', label: 'Repairing', icon: <Wrench className="w-4 h-4" />, color: 'bg-primary-500' },
  { id: 'quality-check', label: 'QC', icon: <Shield className="w-4 h-4" />, color: 'bg-purple-500' },
  { id: 'ready-pickup', label: 'Ready', icon: <Truck className="w-4 h-4" />, color: 'bg-green-500' },
];

function getStepIndex(status: string) {
  const idx = statusSteps.findIndex(s => s.id === status);
  return idx >= 0 ? idx : 0;
}

export default function TrackerPage() {
  useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(repairOrders[0]);

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-950">
      {/* Header */}
      <div className="bg-white dark:bg-dark-900 border-b border-dark-200 dark:border-dark-800">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white">Track Your Repair</h1>
          <p className="mt-2 text-dark-500 dark:text-dark-400">Enter your repair order number or phone number to check status</p>
          <div className="mt-6 max-w-md mx-auto flex gap-2">
            <Input placeholder="Order # or phone number" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} icon={<Search className="w-4 h-4" />} className="flex-1" />
            <Button variant="primary">Track</Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Active Repair Orders */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order List */}
          <div className="space-y-3">
            <h3 className="font-semibold text-dark-900 dark:text-white mb-2">Active Repairs</h3>
            {repairOrders.map(order => (
              <Card
                key={order.id}
                hover
                onClick={() => setSelectedOrder(order)}
                className={cn('p-4 cursor-pointer', selectedOrder?.id === order.id && 'ring-2 ring-primary-500')}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-dark-900 dark:text-white">{order.vehicleInfo}</p>
                    <p className="text-sm text-dark-500">{order.customerName}</p>
                    <p className="text-xs text-dark-400 mt-1">#{order.id.toUpperCase()}</p>
                  </div>
                  <Badge variant={order.status === 'repairing' ? 'info' : order.status === 'diagnosing' ? 'warning' : 'default'}>
                    {order.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div className="mt-3"><ProgressBar value={(getStepIndex(order.status) + 1)} max={statusSteps.length} color="bg-primary-500" size="sm" /></div>
              </Card>
            ))}
          </div>

          {/* Order Detail */}
          <div className="lg:col-span-2">
            {selectedOrder && (
              <Card className="overflow-hidden">
                {/* Status Header */}
                <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-xl font-bold">{selectedOrder.vehicleInfo}</h2>
                      <p className="text-primary-200 mt-1">Order #{selectedOrder.id.toUpperCase()}</p>
                    </div>
                    <Badge variant="info" size="md" className="bg-white/20 text-white">
                      {statusSteps[getStepIndex(selectedOrder.status)]?.label || selectedOrder.status}
                    </Badge>
                  </div>

                  {/* Progress Steps */}
                  <div className="mt-6 flex items-center justify-between">
                    {statusSteps.map((step, i) => {
                      const currentIdx = getStepIndex(selectedOrder.status);
                      const isCompleted = i < currentIdx;
                      const isCurrent = i === currentIdx;
                      return (
                        <div key={step.id} className="flex items-center flex-1">
                          <div className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0',
                            isCompleted ? 'bg-green-400 text-white' :
                            isCurrent ? 'bg-white text-primary-600 ring-4 ring-white/30' :
                            'bg-white/20 text-white/50'
                          )}>
                            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.icon}
                          </div>
                          {i < statusSteps.length - 1 && (
                            <div className={cn('flex-1 h-0.5 mx-1', isCompleted ? 'bg-green-400' : 'bg-white/20')} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-2 flex justify-between">
                    {statusSteps.map((step) => (
                      <p key={step.id} className="text-[10px] text-white/60 text-center" style={{ width: `${100 / statusSteps.length}%` }}>{step.label}</p>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-6">
                  {/* Services */}
                  <div>
                    <h3 className="font-semibold text-dark-900 dark:text-white mb-3">Services</h3>
                    <div className="space-y-2">
                      {selectedOrder.services.map((service, i) => (
                        <div key={i} className="flex items-center justify-between p-3 bg-dark-50 dark:bg-dark-700 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={cn('w-6 h-6 rounded-full flex items-center justify-center',
                              service.status === 'completed' ? 'bg-green-100 dark:bg-green-900/20' :
                              service.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/20' :
                              'bg-dark-200 dark:bg-dark-600'
                            )}>
                              {service.status === 'completed' ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> :
                               service.status === 'in-progress' ? <Wrench className="w-3.5 h-3.5 text-blue-500" /> :
                               <Clock className="w-3.5 h-3.5 text-dark-400" />}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-dark-900 dark:text-white">{service.name}</p>
                              <p className="text-xs text-dark-500">{service.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-dark-900 dark:text-white">${service.cost}</p>
                            <Badge variant={service.status === 'completed' ? 'success' : service.status === 'in-progress' ? 'info' : 'default'} size="sm">
                              {service.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Parts */}
                  {selectedOrder.parts.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-dark-900 dark:text-white mb-3">Parts Used</h3>
                      <div className="space-y-2">
                        {selectedOrder.parts.map((part, i) => (
                          <div key={i} className="flex justify-between text-sm p-2 bg-dark-50 dark:bg-dark-700 rounded-lg">
                            <span className="text-dark-700 dark:text-dark-300">{part.name} x{part.quantity}</span>
                            <span className="font-medium text-dark-900 dark:text-white">${part.totalCost.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technician Notes */}
                  <div>
                    <h3 className="font-semibold text-dark-900 dark:text-white mb-2">Technician Notes</h3>
                    <div className="p-3 bg-dark-50 dark:bg-dark-700 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-dark-600 dark:text-dark-300">{selectedOrder.notes}</p>
                      </div>
                    </div>
                  </div>

                  {/* Cost Summary */}
                  <div className="border-t border-dark-200 dark:border-dark-700 pt-4">
                    <h3 className="font-semibold text-dark-900 dark:text-white mb-3">Cost Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-dark-500">Parts</span><span className="text-dark-900 dark:text-white">${selectedOrder.totalParts.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span className="text-dark-500">Labor ({selectedOrder.laborHours} hrs @ ${selectedOrder.laborRate}/hr)</span><span className="text-dark-900 dark:text-white">${selectedOrder.totalLabor.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span className="text-dark-500">Tax</span><span className="text-dark-900 dark:text-white">${selectedOrder.tax.toFixed(2)}</span></div>
                      <div className="flex justify-between font-bold text-base border-t border-dark-200 dark:border-dark-700 pt-2 mt-2">
                        <span className="text-dark-900 dark:text-white">Total</span>
                        <span className="text-primary-600 dark:text-primary-400">${selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    {selectedOrder.status === 'waiting-approval' && (
                      <Button variant="accent" icon={<CheckCircle2 className="w-4 h-4" />}>Approve Repairs</Button>
                    )}
                    <Button variant="outline" icon={<Camera className="w-4 h-4" />}>View Photos</Button>
                    <Button variant="ghost" icon={<MessageSquare className="w-4 h-4" />}>Message Technician</Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
