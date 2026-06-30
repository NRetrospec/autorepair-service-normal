import { Button, Card, Input, Textarea } from '@/components/ui';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950">
      <section className="bg-gradient-to-br from-primary-600 to-primary-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Contact Us</h1>
          <p className="mt-3 text-primary-200 max-w-xl mx-auto">Have a question? Need an estimate? We're here to help.</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-4">
              {[
                { icon: <Phone className="w-5 h-5" />, title: 'Phone', lines: ['(555) 123-4567', 'Emergency: (555) 999-0000'] },
                { icon: <Mail className="w-5 h-5" />, title: 'Email', lines: ['info@apexauto.com', 'service@apexauto.com'] },
                { icon: <MapPin className="w-5 h-5" />, title: 'Address', lines: ['1234 Auto Drive', 'Springfield, IL 62701'] },
                { icon: <Clock className="w-5 h-5" />, title: 'Hours', lines: ['Mon-Fri: 7:30 AM - 6:00 PM', 'Sat: 8:00 AM - 4:00 PM', 'Sun: Closed'] },
              ].map(item => (
                <Card key={item.title} className="p-4">
                  <div className="flex gap-3">
                    <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 h-fit">{item.icon}</div>
                    <div>
                      <h4 className="font-semibold text-dark-900 dark:text-white">{item.title}</h4>
                      {item.lines.map(line => <p key={line} className="text-sm text-dark-500 dark:text-dark-400">{line}</p>)}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="p-6">
                {sent ? (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-xl font-bold text-dark-900 dark:text-white">Message Sent!</h3>
                    <p className="text-dark-500 mt-2">We'll get back to you within 1 business day.</p>
                    <Button variant="outline" className="mt-4" onClick={() => setSent(false)}>Send Another</Button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-4 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary-500" /> Send Us a Message
                    </h3>
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input label="Name" placeholder="Your name" />
                        <Input label="Email" type="email" placeholder="your@email.com" />
                      </div>
                      <Input label="Phone" type="tel" placeholder="(555) 000-0000" />
                      <Input label="Subject" placeholder="How can we help?" />
                      <Textarea label="Message" placeholder="Tell us about your vehicle issue or question..." />
                      <Button variant="primary" size="lg" className="w-full" icon={<Send className="w-4 h-4" />} onClick={() => setSent(true)}>
                        Send Message
                      </Button>
                    </div>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
