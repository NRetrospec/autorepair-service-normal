import { useApp } from '@/store/AppContext';
import { Button, Card, Badge } from '@/components/ui';
import { services, reviews, membershipPlans, promotions } from '@/data/seedData';
import { ArrowRight, Star, Shield, Clock, Award, CheckCircle2, Phone, Zap, Users, Sparkles } from 'lucide-react';
import { cn } from '@/utils/cn';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const { setCurrentView } = useApp();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    setHeroLoaded(true);
    const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % reviews.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { icon: <Users className="w-5 h-5" />, value: '12,500+', label: 'Happy Customers' },
    { icon: <Award className="w-5 h-5" />, value: '18+', label: 'Years Experience' },
    { icon: <Star className="w-5 h-5" />, value: '4.9★', label: 'Google Rating' },
    { icon: <Shield className="w-5 h-5" />, value: '100%', label: 'Satisfaction' },
  ];

  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/33814736/pexels-photo-33814736.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600"
            alt="Modern auto repair shop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/95 via-dark-950/80 to-dark-950/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 lg:py-40">
          <div className="max-w-2xl">
            {/* Live Status */}
            <div className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6 transition-all duration-700', heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-green-400">Shop Open — 3 Bays Available</span>
            </div>

            <h1 className={cn('text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight transition-all duration-700 delay-100', heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
              Expert Auto Repair
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400 mt-1">You Can Trust</span>
            </h1>

            <p className={cn('mt-5 text-lg text-dark-300 leading-relaxed max-w-xl transition-all duration-700 delay-200', heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
              ASE-certified technicians, transparent pricing, and real-time repair tracking. 
              Book online and get back on the road with confidence.
            </p>

            <div className={cn('mt-8 flex flex-wrap gap-3 transition-all duration-700 delay-300', heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
              <Button variant="accent" size="xl" icon={<Zap className="w-5 h-5" />} onClick={() => setCurrentView('booking')}>
                Book Appointment
              </Button>
              <Button variant="outline" size="xl" icon={<Phone className="w-5 h-5" />} className="border-white/30 text-white hover:bg-white/10 hover:text-white" onClick={() => setCurrentView('contact')}>
                Get Free Estimate
              </Button>
            </div>

            {/* Trust Badges */}
            <div className={cn('mt-10 flex flex-wrap items-center gap-4 transition-all duration-700 delay-[400ms]', heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
              {['ASE Certified', 'BBB A+ Rated', '2-Year Warranty', 'Free Diagnostics'].map(badge => (
                <div key={badge} className="flex items-center gap-1.5 text-sm text-dark-300">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative bg-dark-900/80 backdrop-blur-lg border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary-500/10 text-primary-400">{stat.icon}</div>
                  <div>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-dark-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="info" size="md">Our Services</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-dark-900 dark:text-white">Complete Auto Care Solutions</h2>
            <p className="mt-3 text-dark-500 dark:text-dark-400 max-w-2xl mx-auto">From routine maintenance to complex repairs, our certified technicians handle it all with precision and care.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.slice(0, 8).map((service) => (
              <Card key={service.id} hover className="group overflow-hidden">
                <div className="relative h-40 overflow-hidden">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-lg">{service.icon} {service.name}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-dark-500 dark:text-dark-400 line-clamp-2">{service.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">{service.priceRange}</span>
                    <span className="text-xs text-dark-400">{service.duration}</span>
                  </div>
                  <button
                    onClick={() => setCurrentView('booking')}
                    className="mt-3 w-full flex items-center justify-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors"
                  >
                    Book Service <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={() => setCurrentView('services')} icon={<ArrowRight className="w-4 h-4" />}>
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-16 md:py-24 bg-dark-50 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="info" size="md">Why Apex Auto</Badge>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-dark-900 dark:text-white">
                Modern Auto Care,<br />
                <span className="text-primary-600 dark:text-primary-400">Old-Fashioned Trust</span>
              </h2>
              <p className="mt-4 text-dark-600 dark:text-dark-400 leading-relaxed">
                We combine cutting-edge diagnostic technology with honest, transparent service.
                Every repair comes with real-time updates, detailed photo reports, and a 2-year warranty.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { icon: <Clock className="w-5 h-5" />, title: 'Real-Time Tracking', desc: 'Follow your repair from check-in to pickup with live status updates.' },
                  { icon: <Shield className="w-5 h-5" />, title: 'Transparent Pricing', desc: 'No surprises. Approve all work and costs before we start repairs.' },
                  { icon: <Award className="w-5 h-5" />, title: 'ASE Certified Team', desc: 'Factory-trained technicians with an average of 12+ years experience.' },
                  { icon: <Sparkles className="w-5 h-5" />, title: 'Digital Inspections', desc: 'Photo and video documentation of every repair with detailed reports.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700">
                    <div className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 flex-shrink-0 h-fit">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-dark-900 dark:text-white">{item.title}</h4>
                      <p className="text-sm text-dark-500 dark:text-dark-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/36281956/pexels-photo-36281956.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=500"
                alt="Mechanic working"
                className="rounded-2xl shadow-2xl w-full"
              />
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-dark-800 rounded-2xl shadow-2xl p-5 border border-dark-200 dark:border-dark-700 max-w-[240px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((__, idx) => <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <span className="text-sm font-bold text-dark-900 dark:text-white">4.9</span>
                </div>
                <p className="text-sm text-dark-600 dark:text-dark-400">Based on 2,500+ Google reviews</p>
              </div>
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-accent-500 text-white rounded-2xl shadow-xl p-4 text-center">
                <p className="text-2xl font-bold">18+</p>
                <p className="text-xs font-medium">Years of<br/>Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROMOTIONS ===== */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="warning" size="md">🎉 Special Offers</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-dark-900 dark:text-white">Current Promotions</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {promotions.map(promo => (
              <Card key={promo.id} hover className="p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-accent-500 text-white text-sm font-bold rounded-bl-xl">
                  {promo.discount}
                </div>
                <h4 className="font-bold text-dark-900 dark:text-white text-lg mt-4">{promo.title}</h4>
                <p className="text-sm text-dark-500 dark:text-dark-400 mt-2">{promo.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <code className="px-2 py-1 bg-dark-100 dark:bg-dark-700 text-primary-600 dark:text-primary-400 text-sm font-mono font-bold rounded">{promo.code}</code>
                  <span className="text-xs text-dark-400">Until {promo.validUntil}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 md:py-24 bg-dark-50 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="success" size="md">Customer Reviews</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-dark-900 dark:text-white">What Our Customers Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <Card key={review.id} hover className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((__, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-dark-600 dark:text-dark-300 text-sm leading-relaxed italic">"{review.text}"</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-dark-900 dark:text-white">{review.customerName}</p>
                    <p className="text-xs text-dark-500">{review.service}</p>
                  </div>
                  {review.verified && <Badge variant="success">✓ Verified</Badge>}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {reviews.slice(0, 3).map((_, i) => (
              <button key={i} className={cn('w-2.5 h-2.5 rounded-full transition-all', i === activeTestimonial % 3 ? 'bg-primary-500 w-8' : 'bg-dark-300 dark:bg-dark-600')} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== MEMBERSHIP PLANS ===== */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="purple" size="md">Membership Plans</Badge>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-dark-900 dark:text-white">Save More with a Membership</h2>
            <p className="mt-3 text-dark-500 dark:text-dark-400 max-w-2xl mx-auto">Join our membership program for exclusive discounts, priority service, and peace of mind.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {membershipPlans.map((plan) => (
              <Card key={plan.id} hover className={cn('p-6 relative', plan.popular && 'border-primary-500 dark:border-primary-500 ring-2 ring-primary-500/20')}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="info" size="md">Most Popular</Badge>
                  </div>
                )}
                <div className="text-center mb-6 pt-2">
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white">{plan.name}</h3>
                  <div className="mt-3">
                    <span className="text-4xl font-extrabold text-dark-900 dark:text-white">${plan.price}</span>
                    <span className="text-dark-500">{plan.period}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-dark-600 dark:text-dark-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full"
                  onClick={() => setCurrentView('booking')}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/8478244/pexels-photo-8478244.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=1600"
            alt="Mechanic workshop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 to-dark-900/90" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Ready to Get Your Car Fixed?</h2>
          <p className="mt-4 text-lg text-primary-200 max-w-2xl mx-auto">
            Schedule your appointment in minutes. Same-day service available for most repairs.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="accent" size="xl" icon={<Zap className="w-5 h-5" />} onClick={() => setCurrentView('booking')}>
              Book Appointment Now
            </Button>
            <Button size="xl" className="bg-white/10 text-white hover:bg-white/20 border border-white/20" icon={<Phone className="w-5 h-5" />}>
              Call (555) 123-4567
            </Button>
          </div>
        </div>
      </section>

      {/* ===== MAP SECTION ===== */}
      <section className="py-16 bg-white dark:bg-dark-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge variant="info" size="md">Find Us</Badge>
              <h2 className="mt-4 text-3xl font-bold text-dark-900 dark:text-white">Visit Our Shop</h2>
              <p className="mt-3 text-dark-500 dark:text-dark-400">Conveniently located with easy access from I-72. Free parking available.</p>

              <div className="mt-6 space-y-4">
                <div className="flex gap-3 items-center">
                  <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">📍</div>
                  <div>
                    <p className="font-medium text-dark-900 dark:text-white">1234 Auto Drive, Springfield, IL 62701</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">🕐</div>
                  <div>
                    <p className="text-sm text-dark-600 dark:text-dark-400">Mon-Fri: 7:30 AM - 6:00 PM</p>
                    <p className="text-sm text-dark-600 dark:text-dark-400">Saturday: 8:00 AM - 4:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Map Placeholder */}
            <div className="h-80 bg-dark-100 dark:bg-dark-800 rounded-2xl overflow-hidden flex items-center justify-center border border-dark-200 dark:border-dark-700 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-blue-100/50 dark:from-primary-900/20 dark:to-blue-900/20" />
              <div className="relative text-center p-6">
                <div className="text-5xl mb-3">📍</div>
                <p className="font-bold text-dark-900 dark:text-white text-lg">Apex Auto Garage</p>
                <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">1234 Auto Drive, Springfield, IL</p>
                <Button variant="primary" size="sm" className="mt-4" onClick={() => window.open('https://maps.google.com', '_blank')}>
                  Open in Google Maps
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MOBILE STICKY BAR ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-dark-900 border-t border-dark-200 dark:border-dark-800 px-4 py-3 flex gap-2">
        <a href="tel:+15551234567" className="flex-1">
          <Button variant="secondary" size="lg" className="w-full" icon={<Phone className="w-4 h-4" />}>Call Now</Button>
        </a>
        <Button variant="accent" size="lg" className="flex-1" icon={<Zap className="w-4 h-4" />} onClick={() => setCurrentView('booking')}>Book Now</Button>
      </div>
    </div>
  );
}
