import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { toast.error('Please fill all fields.'); return; }
    toast.success('Message sent! We\'ll reply within 24 hours.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="badge-green mb-3 mx-auto">Get in Touch</span>
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle">Have questions? Our agronomists are here to help.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {[
            { icon: Mail, label: 'Email', value: 'support@agrismart.ai', color: 'text-green-400' },
            { icon: Phone, label: 'Helpline', value: '1800-XXX-XXXX (Toll Free)', color: 'text-amber-400' },
            { icon: MapPin, label: 'Office', value: 'Pune, Maharashtra, India', color: 'text-blue-400' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="card flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-green-900/50 flex items-center justify-center ${color} flex-shrink-0`}>
                <Icon size={18} />
              </div>
              <div>
                <p className="text-xs text-green-500 mb-0.5">{label}</p>
                <p className="text-green-200 font-medium text-sm">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="card space-y-4">
          <div>
            <label className="label">Name</label>
            <input className="input-field" placeholder="Your name" value={form.name} onChange={(e) => set('name', e.target.value)} />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" className="input-field" placeholder="you@example.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
          </div>
          <div>
            <label className="label">Message</label>
            <textarea rows={4} className="input-field resize-none" placeholder="How can we help?" value={form.message} onChange={(e) => set('message', e.target.value)} />
          </div>
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            Send Message <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
