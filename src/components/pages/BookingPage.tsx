import { useApp } from '@/store/AppContext';
import { Button, Card, Badge, Input, Select, Textarea } from '@/components/ui';
import { services, mechanics, timeSlots } from '@/data/seedData';
import { Calendar, Wrench, Car, CheckCircle2, ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useState } from 'react';

type Step = 1 | 2 | 3 | 4;

export default function BookingPage() {
  const { setCurrentView, addNotification } = useApp();
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    mechanic: '',
    date: '',
    time: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    vehicleVin: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
    isEmergency: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string | boolean) => setFormData(p => ({ ...p, [field]: value }));

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      if (d.getDay() !== 0) {
        dates.push({
          value: d.toISOString().split('T')[0],
          label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          day: d.toLocaleDateString('en-US', { weekday: 'short' }),
          date: d.getDate(),
        });
      }
    }
    return dates;
  };

  const availableDates = generateDates();

  const handleSubmit = () => {
    setSubmitted(true);
    addNotification({ title: 'Appointment Booked!', message: `Your ${formData.serviceType || 'service'} appointment has been confirmed.`, type: 'success', time: 'Just now' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark-950 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full p-8 text-center">
          <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white">Appointment Confirmed!</h2>
          <p className="mt-2 text-dark-500 dark:text-dark-400">We've sent a confirmation to {formData.email || 'your email'}.</p>
          <div className="mt-6 p-4 bg-dark-50 dark:bg-dark-700 rounded-xl text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-dark-500">Service:</span>
              <span className="font-medium text-dark-900 dark:text-white">{formData.serviceType || 'General Service'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-500">Date:</span>
              <span className="font-medium text-dark-900 dark:text-white">{formData.date || 'TBD'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-500">Time:</span>
              <span className="font-medium text-dark-900 dark:text-white">{formData.time || 'TBD'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-500">Vehicle:</span>
              <span className="font-medium text-dark-900 dark:text-white">{formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-500">Confirmation #:</span>
              <span className="font-medium text-primary-600 dark:text-primary-400">APX-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button variant="outline" size="lg" className="flex-1" onClick={() => setCurrentView('tracker')}>Track Repair</Button>
            <Button variant="primary" size="lg" className="flex-1" onClick={() => setCurrentView('home')}>Back to Home</Button>
          </div>
        </Card>
      </div>
    );
  }

  const steps = [
    { num: 1, label: 'Service', icon: <Wrench className="w-4 h-4" /> },
    { num: 2, label: 'Schedule', icon: <Calendar className="w-4 h-4" /> },
    { num: 3, label: 'Vehicle', icon: <Car className="w-4 h-4" /> },
    { num: 4, label: 'Confirm', icon: <CheckCircle2 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-dark-50 dark:bg-dark-950">
      {/* Header */}
      <div className="bg-white dark:bg-dark-900 border-b border-dark-200 dark:border-dark-800">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-dark-900 dark:text-white">Book an Appointment</h1>
          <p className="mt-1 text-dark-500 dark:text-dark-400">Schedule your service in a few simple steps</p>

          {/* Progress Steps */}
          <div className="mt-6 flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center flex-1">
                <button
                  onClick={() => setStep(s.num as Step)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium',
                    step === s.num ? 'bg-primary-600 text-white' :
                    step > s.num ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                    'bg-dark-100 text-dark-400 dark:bg-dark-800'
                  )}
                >
                  {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.icon}
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < steps.length - 1 && <div className={cn('flex-1 h-0.5 mx-2', step > s.num ? 'bg-green-400' : 'bg-dark-200 dark:bg-dark-700')} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Emergency Toggle */}
        <div className="mb-6">
          <button
            onClick={() => update('isEmergency', !formData.isEmergency)}
            className={cn(
              'flex items-center gap-2 px-4 py-3 rounded-xl border transition-all w-full text-left',
              formData.isEmergency
                ? 'bg-red-50 border-red-300 dark:bg-red-900/20 dark:border-red-700'
                : 'bg-white border-dark-200 dark:bg-dark-800 dark:border-dark-700'
            )}
          >
            <AlertTriangle className={cn('w-5 h-5', formData.isEmergency ? 'text-red-500' : 'text-dark-400')} />
            <div>
              <p className={cn('font-medium', formData.isEmergency ? 'text-red-700 dark:text-red-400' : 'text-dark-700 dark:text-dark-300')}>Emergency Repair Request</p>
              <p className="text-xs text-dark-500">Toggle this for urgent, same-day repair needs</p>
            </div>
          </button>
        </div>

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-4">Select a Service</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {services.map(service => (
                <button
                  key={service.id}
                  onClick={() => { update('serviceType', service.name); setStep(2); }}
                  className={cn(
                    'p-4 rounded-xl border text-left transition-all hover:shadow-md',
                    formData.serviceType === service.name
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 ring-2 ring-primary-500/20'
                      : 'border-dark-200 bg-white dark:bg-dark-800 dark:border-dark-700 hover:border-primary-300'
                  )}
                >
                  <div className="text-2xl mb-2">{service.icon}</div>
                  <h4 className="font-semibold text-dark-900 dark:text-white">{service.name}</h4>
                  <p className="text-xs text-dark-500 mt-1">{service.priceRange}</p>
                  <p className="text-xs text-dark-400 mt-0.5">{service.duration}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-4">Choose Date & Time</h2>

            {/* Mechanic Selection */}
            <Card className="p-5 mb-6">
              <h3 className="font-semibold text-dark-900 dark:text-white mb-3">Preferred Technician (Optional)</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => update('mechanic', '')}
                  className={cn('px-4 py-2 rounded-lg text-sm font-medium border transition-all',
                    !formData.mechanic ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'border-dark-200 dark:border-dark-700 text-dark-500')}
                >
                  Any Available
                </button>
                {mechanics.filter(m => m.status !== 'off-duty').map(m => (
                  <button
                    key={m.id}
                    onClick={() => update('mechanic', m.name)}
                    className={cn('px-4 py-2 rounded-lg text-sm font-medium border transition-all',
                      formData.mechanic === m.name ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'border-dark-200 dark:border-dark-700 text-dark-600 dark:text-dark-400')}
                  >
                    {m.avatar} {m.name} <span className="text-xs text-dark-400 ml-1">★{m.rating}</span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Date Selection */}
            <Card className="p-5 mb-6">
              <h3 className="font-semibold text-dark-900 dark:text-white mb-3">Select Date</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-2">
                {availableDates.slice(0, 14).map(d => (
                  <button
                    key={d.value}
                    onClick={() => update('date', d.value)}
                    className={cn(
                      'p-3 rounded-xl text-center transition-all border',
                      formData.date === d.value
                        ? 'border-primary-500 bg-primary-600 text-white'
                        : 'border-dark-200 dark:border-dark-700 hover:border-primary-300 bg-white dark:bg-dark-800'
                    )}
                  >
                    <p className={cn('text-xs font-medium', formData.date === d.value ? 'text-primary-200' : 'text-dark-500')}>{d.day}</p>
                    <p className={cn('text-lg font-bold', formData.date === d.value ? 'text-white' : 'text-dark-900 dark:text-white')}>{d.date}</p>
                  </button>
                ))}
              </div>
            </Card>

            {/* Time Selection */}
            <Card className="p-5">
              <h3 className="font-semibold text-dark-900 dark:text-white mb-3">Select Time</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
                {timeSlots.map(t => {
                  const isAvailable = Math.random() > 0.2;
                  return (
                    <button
                      key={t}
                      onClick={() => isAvailable && update('time', t)}
                      disabled={!isAvailable}
                      className={cn(
                        'py-2.5 px-3 rounded-xl text-sm font-medium border transition-all',
                        formData.time === t
                          ? 'border-primary-500 bg-primary-600 text-white'
                          : isAvailable
                          ? 'border-dark-200 dark:border-dark-700 text-dark-700 dark:text-dark-300 hover:border-primary-300 bg-white dark:bg-dark-800'
                          : 'border-dark-100 dark:border-dark-800 text-dark-300 dark:text-dark-600 bg-dark-50 dark:bg-dark-900 cursor-not-allowed line-through'
                      )}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </Card>

            <div className="mt-6 flex justify-between">
              <Button variant="ghost" size="lg" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => setStep(1)}>Back</Button>
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />} onClick={() => setStep(3)} disabled={!formData.date || !formData.time}>
                Continue
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Vehicle Info */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-4">Vehicle & Contact Information</h2>

            <Card className="p-5 mb-6">
              <h3 className="font-semibold text-dark-900 dark:text-white mb-4">Vehicle Details</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Select label="Year" options={[{ value: '', label: 'Select Year' }, ...Array.from({ length: 30 }, (_, i) => ({ value: String(2025 - i), label: String(2025 - i) }))]} value={formData.vehicleYear} onChange={e => update('vehicleYear', e.target.value)} />
                <Input label="Make" placeholder="e.g., Toyota" value={formData.vehicleMake} onChange={e => update('vehicleMake', e.target.value)} />
                <Input label="Model" placeholder="e.g., Camry" value={formData.vehicleModel} onChange={e => update('vehicleModel', e.target.value)} />
                <Input label="VIN (Optional)" placeholder="17-character VIN" value={formData.vehicleVin} onChange={e => update('vehicleVin', e.target.value)} />
              </div>
            </Card>

            <Card className="p-5 mb-6">
              <h3 className="font-semibold text-dark-900 dark:text-white mb-4">Contact Information</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full Name" placeholder="John Smith" value={formData.name} onChange={e => update('name', e.target.value)} />
                <Input label="Email" type="email" placeholder="john@email.com" value={formData.email} onChange={e => update('email', e.target.value)} />
                <Input label="Phone" type="tel" placeholder="(555) 000-0000" value={formData.phone} onChange={e => update('phone', e.target.value)} />
              </div>
            </Card>

            <Card className="p-5">
              <Textarea label="Additional Notes" placeholder="Describe any issues, symptoms, or specific requests..." value={formData.notes} onChange={e => update('notes', e.target.value)} />
            </Card>

            <div className="mt-6 flex justify-between">
              <Button variant="ghost" size="lg" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => setStep(2)}>Back</Button>
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />} onClick={() => setStep(4)}>Review</Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-4">Review & Confirm</h2>

            <Card className="p-6">
              <div className="space-y-4">
                {[
                  { label: 'Service', value: formData.serviceType || 'Not selected' },
                  { label: 'Technician', value: formData.mechanic || 'Any Available' },
                  { label: 'Date', value: formData.date || 'Not selected' },
                  { label: 'Time', value: formData.time || 'Not selected' },
                  { label: 'Vehicle', value: `${formData.vehicleYear} ${formData.vehicleMake} ${formData.vehicleModel}`.trim() || 'Not provided' },
                  { label: 'Name', value: formData.name || 'Not provided' },
                  { label: 'Email', value: formData.email || 'Not provided' },
                  { label: 'Phone', value: formData.phone || 'Not provided' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-dark-100 dark:border-dark-700 last:border-0">
                    <span className="text-sm text-dark-500 dark:text-dark-400">{item.label}</span>
                    <span className="text-sm font-medium text-dark-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
                {formData.notes && (
                  <div className="pt-2">
                    <p className="text-sm text-dark-500 dark:text-dark-400 mb-1">Notes</p>
                    <p className="text-sm text-dark-700 dark:text-dark-300 bg-dark-50 dark:bg-dark-700 p-3 rounded-lg">{formData.notes}</p>
                  </div>
                )}
                {formData.isEmergency && (
                  <Badge variant="danger" size="md">🚨 Emergency Request — Priority Scheduling</Badge>
                )}
              </div>

              <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/10 rounded-xl">
                <p className="text-sm text-primary-800 dark:text-primary-300">
                  <strong>Note:</strong> A confirmation email and SMS will be sent upon booking. You can reschedule or cancel up to 2 hours before your appointment.
                </p>
              </div>
            </Card>

            <div className="mt-6 flex justify-between">
              <Button variant="ghost" size="lg" icon={<ArrowLeft className="w-4 h-4" />} onClick={() => setStep(3)}>Back</Button>
              <Button variant="accent" size="xl" icon={<CheckCircle2 className="w-5 h-5" />} onClick={handleSubmit}>
                Confirm Appointment
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
