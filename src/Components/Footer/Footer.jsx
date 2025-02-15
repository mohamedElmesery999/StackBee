import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaCcVisa, FaCcMastercard } from "react-icons/fa";

export default function Footer() {
  return (
    <div>
      <footer className="bg-emerald-800 text-white pt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">StackBee</h3>
              <p className="text-gray-300 leading-relaxed">
                We provide you with the best products at competitive prices with a fast and safe delivery service.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>About the company</li>
                <li>Products</li>
                <li>Frequently Asked Questions</li>
                <li>Terms and Conditions</li>
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Contact Us</li>
                <li>Return Policy</li>
                <li>Privacy Policy</li>
                <li>Order Tracking</li>
              </ul>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <span className="p-2 bg-emerald-700 rounded-full">
                  <FaFacebook size={20} />
                </span>
                <span className="p-2 bg-emerald-700 rounded-full">
                  <FaTwitter size={20} />
                </span>
                <span className="p-2 bg-emerald-700 rounded-full">
                  <FaInstagram size={20} />
                </span>
                <span className="p-2 bg-emerald-700 rounded-full">
                  <FaLinkedin size={20} />
                </span>
              </div>
              <div className="mt-8">
                <h4 className="text-xl font-semibold mb-4">Payment Methods</h4>
                <div className="flex space-x-4">
                  <FaCcVisa size={30} className="text-gray-300" />
                  <FaCcMastercard size={30} className="text-gray-300" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-emerald-700 mt-8 py-6">
            <div className="text-center text-gray-300">
              <p>© 2025 Fresh Cart. All rights reserved.</p>
              <p className="mt-2 text-xl">Designed and developed by M.Elmesery</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
