import Link from "next/link";
import { 
  FaGithub, 
  FaFacebookF, 
  FaYoutube, 
  FaLinkedinIn 
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-[#111827] text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10">
        
        {/* Logo & Description */}
        <div>
        <Logo></Logo>
          <p className="text-sm leading-relaxed">
            Authentic taste with premium ingredients. 
            Serving happiness in every bite.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <Link href="/" className="hover:text-yellow-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/menu" className="hover:text-yellow-400 transition">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-yellow-400 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Follow Us
          </h3>
          <div className="flex gap-4">
            
            <a
              href="https://github.com/Fahmida0010"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-500 hover:text-black transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.facebook.com/nihsanga.cetana"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-500 hover:text-black transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://www.youtube.com/channel/UCW_QSH-znO-5qn6q9r7dHFA"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-500 hover:text-black transition"
            >
              <FaYoutube />
            </a>

            <a
              href="https://x.com/fahmida105623"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-black
               hover:text-white transition"
            >
              <FaXTwitter/>
            </a>

            <a
              href="https://www.linkedin.com/in/fahmida-akter-tanjina-3b1986299"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-700 hover:text-black transition"
            >
              <FaLinkedinIn />
            </a>

          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
        © {new Date().getFullYear()} The Spicy Biryani. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;