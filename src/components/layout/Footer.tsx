import { useApp } from '@/store/AppContext';
import { Wrench, Phone, Mail, MapPin, Clock, Globe, Camera, MessageCircle, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui';
import { useState } from 'react';

export default function Footer() {
  const { setCurrentView } = useApp();
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-dark-900 text-white border-t border-dark-800">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Stay on the Road</h3>
              <p className="text-primary-200 mt-1">Get maintenance tips, exclusive discounts & service reminders.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full md:w-72 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <Button variant="accent" size="lg" onClick={() => setEmail('')}>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">APEX AUTO</h4>
                <p className="text-[10px] text-primary-400 tracking-widest">GARAGE & SERVICE</p>
              </div>
            </div>
            <p className="text-dark-400 text-sm leading-relaxed mb-4">
              Your trusted partner for quality auto repair and maintenance. ASE-certified technicians, 
              transparent pricing, and modern diagnostic technology.
            </p>
            <div className="flex gap-3">
              {[Globe, Camera, MessageCircle, PlayCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-dark-800 hover:bg-primary-600 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-dark-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Services */}
          <div>
            <h4 className="font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2.5">
              {['Engine Repair', 'Brake Service', 'Oil Changes', 'Tire Services', 'Transmission', 'AC Repair', 'Electrical', 'State Inspection'].map(s => (
                <li key={s}>
                  <button onClick={() => setCurrentView('services')} className="text-sm text-dark-400 hover:text-primary-400 transition-colors">{s}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Book Appointment', view: 'booking' },
                { label: 'Track Repair', view: 'tracker' },
                { label: 'Get Estimate', view: 'booking' },
                { label: 'Membership Plans', view: 'home' },
                { label: 'Customer Portal', view: 'account' },
                { label: 'Blog', view: 'blog' },
                { label: 'Careers', view: 'contact' },
                { label: 'About Us', view: 'contact' },
              ].map(l => (
                <li key={l.label}>
                  <button onClick={() => setCurrentView(l.view)} className="text-sm text-dark-400 hover:text-primary-400 transition-colors">{l.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="font-bold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-dark-400">1234 Auto Drive<br />Springfield, IL 62701</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-sm text-dark-400 hover:text-white">(555) 123-4567</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@apexauto.com" className="text-sm text-dark-400 hover:text-white">info@apexauto.com</a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-dark-400">
                  <p>Mon-Fri: 7:30 AM - 6:00 PM</p>
                  <p>Saturday: 8:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              {['ASE Certified', 'BBB A+', '5★ Google'].map(b => (
                <span key={b} className="px-2 py-1 bg-dark-800 text-dark-400 text-xs font-medium rounded-lg border border-dark-700">{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-dark-500">© 2025 Apex Auto Garage. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-dark-500">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
