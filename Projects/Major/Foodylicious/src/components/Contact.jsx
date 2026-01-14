import { useState } from "react";
import SectionHeader from "./ui/SectionHeader";

function Contact() {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (event) => {
    // 1. Create a simplified copy of the current data
    const newData = { ...formData };

    // 2. Update the specific field (like "email") in that copy
    newData[event.target.name] = event.target.value;

    // 3. Save the new data to state
    setFormData(newData);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    // Stop the page from refreshing automatically
    event.preventDefault();

    // UI Only: show an alert
    alert(`Thanks ${formData.name}, message sent!`);

    // Reset form to empty strings
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    // You are writing this extra code to get two "superpowers" that HTML doesn't give you automatically:
    // 1. No Refresh: You stay on the same page (smooth experience).
    // 2. Auto-Clear: You can wipe the form clean instantly after sending.
  };

  return (
    <section id="contact" className="py-5 bg-white">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <SectionHeader
              title="Get in Touch"
              subtitle="Have questions? We'd love to hear from you."
            />

            {/* Contact Form - Added onSubmit and name attributes */}
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control border-0 border-bottom rounded-0 px-0 py-2 contact-input"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-sm-6">
                  <input
                    type="email"
                    name="email"
                    className="form-control border-0 border-bottom rounded-0 px-0 py-2 contact-input"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    name="subject"
                    className="form-control border-0 border-bottom rounded-0 px-0 py-2 contact-input"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <textarea
                    name="message"
                    className="form-control border-0 border-bottom rounded-0 px-0 py-2 contact-textarea"
                    rows="3"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-dark px-5 py-2">
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
