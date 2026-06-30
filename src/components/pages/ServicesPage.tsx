import { useApp } from '@/store/AppContext';
import { Button, Card, Badge } from '@/components/ui';
import { services } from '@/data/seedData';
import { ArrowRight, Clock, CheckCircle2, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useState } from 'react';

export default function ServicesPage() {
  const { setCurrentView } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      {/* Header */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <Badge variant="info" size="md" className="bg-white/10 text-white border-white/20">Our Services</Badge>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-white">Complete Auto Care</h1>
          <p className="mt-4 text-lg text-primary-200 max-w-2xl mx-auto">
            From routine oil changes to complex engine rebuilds, our ASE-certified technicians handle every aspect of vehicle care.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid gap-6">
            {services.map((service) => (
              <Card key={service.id} className={cn('overflow-hidden transition-all duration-300', expandedId === service.id && 'ring-2 ring-primary-500/30')}>
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                    <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-dark-900 dark:text-white">
                          {service.icon} {service.name}
                        </h3>
                        <p className="mt-1.5 text-dark-500 dark:text-dark-400 text-sm leading-relaxed max-w-xl">
                          {service.description}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-bold text-primary-600 dark:text-primary-400">{service.priceRange}</p>
                        <p className="text-xs text-dark-400 flex items-center gap-1 justify-end mt-1">
                          <Clock className="w-3 h-3" /> {service.duration}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.features.slice(0, expandedId === service.id ? undefined : 3).map((f) => (
                        <span key={f} className="flex items-center gap-1 text-xs px-2.5 py-1 bg-dark-50 dark:bg-dark-700 rounded-lg text-dark-600 dark:text-dark-300">
                          <CheckCircle2 className="w-3 h-3 text-green-500" /> {f}
                        </span>
                      ))}
                      {service.features.length > 3 && expandedId !== service.id && (
                        <button
                          onClick={() => setExpandedId(service.id)}
                          className="text-xs px-2.5 py-1 text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          +{service.features.length - 3} more
                        </button>
                      )}
                    </div>

                    {/* Expanded FAQ */}
                    {expandedId === service.id && (
                      <div className="mt-4 pt-4 border-t border-dark-200 dark:border-dark-700 animate-fade-in">
                        <h4 className="font-semibold text-dark-900 dark:text-white mb-3">Frequently Asked Questions</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-dark-700 dark:text-dark-300">How long does this service take?</p>
                            <p className="text-sm text-dark-500 dark:text-dark-400 mt-0.5">Most {service.name.toLowerCase()} jobs take {service.duration}. We'll provide an exact estimate when you book.</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-dark-700 dark:text-dark-300">Is there a warranty?</p>
                            <p className="text-sm text-dark-500 dark:text-dark-400 mt-0.5">All repairs come with our 2-year / 24,000-mile warranty on parts and labor.</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-dark-700 dark:text-dark-300">Do you offer financing?</p>
                            <p className="text-sm text-dark-500 dark:text-dark-400 mt-0.5">Yes! We offer 0% APR financing for 6 months on services over $500.</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-4 flex items-center gap-3">
                      <Button variant="primary" size="sm" onClick={() => setCurrentView('booking')} icon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Book This Service
                      </Button>
                      <button
                        onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
                        className="flex items-center gap-1 text-sm text-dark-500 hover:text-dark-700 dark:hover:text-dark-300 transition-colors"
                      >
                        {expandedId === service.id ? 'Show Less' : 'Learn More'}
                        <ChevronDown className={cn('w-4 h-4 transition-transform', expandedId === service.id && 'rotate-180')} />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark-50 dark:bg-dark-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dark-900 dark:text-white">Not Sure What You Need?</h2>
          <p className="mt-3 text-dark-500 dark:text-dark-400">Schedule a free diagnostic consultation and we'll identify exactly what your vehicle needs.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="accent" size="lg" onClick={() => setCurrentView('booking')}>Free Diagnostic Check</Button>
            <Button variant="outline" size="lg" onClick={() => setCurrentView('contact')}>Contact Us</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
