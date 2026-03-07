import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-yellow-400 mb-10 text-center">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          <div>
            <h2 className="text-2xl font-semibold mb-4">Restaurant Info</h2>

            <p className="text-gray-300 mb-2">
              📍 Location: Sylhet, Bangladesh
            </p>

            <p className="text-gray-300 mb-2">
              📞 Phone: +880 1234 567890
            </p>

            <p className="text-gray-300 mb-2">
              📧 Email: spicybiryani@gmail.com
            </p>

            <p className="text-gray-300 mt-4">
              We would love to hear from you. Feel free to send us a message.
            </p>
          </div>

          <ContactForm />

        </div>

      </div>
    </div>
  );
}