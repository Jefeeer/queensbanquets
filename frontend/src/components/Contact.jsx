import { useState } from 'react';
import { submitInquiry } from '../api/inquiries.js';
import { brand, contactChannels } from '../data/siteContent.js';
import SectionHeading from './SectionHeading.jsx';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  meetingDate: '',
  eventDate: '',
  coordinationNeed: 'Wedding coordination',
  guests: '',
  message: '',
};

function Contact() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState('idle');

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('submitting');

    try {
      await submitInquiry(formData);
      setFormData(initialFormState);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  }

  return (
    <section className="section contact-section" id="contact">
      <div>
        <SectionHeading eyebrow="Schedule a date" title="Book a coordination meeting with Marou.">
          Contact {brand.owner} directly or request a meeting date through the
          form. Share your wedding or event details so Marou can prepare the
          right coordination guidance.
        </SectionHeading>

        <ul className="contact-list">
          {contactChannels.map((channel) => (
            <li key={channel.label}>
              <span>{channel.label}</span>
              {channel.href ? <a href={channel.href}>{channel.value}</a> : <strong>{channel.value}</strong>}
            </li>
          ))}
        </ul>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>
          Full name
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </label>
        <label>
          Phone or Viber
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0917 767 7812"
          />
        </label>
        <div className="form-row">
          <label>
            Preferred meeting date
            <input
              name="meetingDate"
              type="date"
              value={formData.meetingDate}
              onChange={handleChange}
            />
          </label>
          <label>
            Coordination need
            <select name="coordinationNeed" value={formData.coordinationNeed} onChange={handleChange}>
              <option>Wedding coordination</option>
              <option>On-the-day coordination</option>
              <option>Planning consultation</option>
              <option>Reception program support</option>
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>
            Wedding or event date
            <input
              name="eventDate"
              type="date"
              value={formData.eventDate}
              onChange={handleChange}
            />
          </label>
          <label>
            Guests
            <input
              name="guests"
              type="number"
              min="1"
              value={formData.guests}
              onChange={handleChange}
              placeholder="150"
            />
          </label>
        </div>
        <label>
          Notes for Marou
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what coordination help you need, your venue, supplier status, and program concerns."
            rows="5"
          />
        </label>

        <button className="button button-primary" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending...' : 'Request Meeting'}
        </button>

        {status === 'success' ? (
          <p className="form-status">Thank you. Your meeting request is ready for Queen's Banquet Events.</p>
        ) : null}
        {status === 'error' ? (
          <p className="form-status form-status-error">Please try again or contact us directly.</p>
        ) : null}
      </form>
    </section>
  );
}

export default Contact;
