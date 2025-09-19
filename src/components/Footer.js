const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Swiggy Clone</h3>
            <p className="text-gray-400 mb-4">
              © 2024 Swiggy Clone Ltd. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">📱</a>
              <a href="#" className="text-gray-400 hover:text-white">📧</a>
              <a href="#" className="text-gray-400 hover:text-white">🐦</a>
              <a href="#" className="text-gray-400 hover:text-white">📘</a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Team</a></li>
              <li><a href="#" className="hover:text-white">Swiggy One</a></li>
              <li><a href="#" className="hover:text-white">Swiggy Instamart</a></li>
              <li><a href="#" className="hover:text-white">Swiggy Genie</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact us</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Help & Support</a></li>
              <li><a href="#" className="hover:text-white">Partner with us</a></li>
              <li><a href="#" className="hover:text-white">Ride with us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Investor Relations</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              We deliver to: Bangalore, Gurgaon, Hyderabad, Delhi, Mumbai, Pune & more
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Download App:</span>
              <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700">
                📱 iOS
              </button>
              <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700">
                🤖 Android
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;