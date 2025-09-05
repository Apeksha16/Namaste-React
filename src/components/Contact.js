const Contact =() => {
    return (
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8 text-center animate-fade-in">
                        <h1 className="text-4xl font-extrabold mb-4 text-orange-600 animate-bounce">Contact Us</h1>
                        <p className="text-gray-700 mb-4 text-lg">We'd love to hear from you!<br/>For queries, feedback, or support, reach out to us:</p>
                        <div className="flex flex-col items-center gap-2 mb-4">
                            <a href="mailto:support@swiggyclone.com" className="text-blue-500 underline text-lg animate-pulse">support@swiggyclone.com</a>
                            <span className="text-gray-500">Phone: <span className="font-semibold">+91-9876543210</span></span>
                            <span className="text-gray-500">Address: 123, Food Street, React City, India</span>
                        </div>
                        <form className="flex flex-col gap-3 items-center mt-4">
                            <input type="text" placeholder="Your Name" className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring" />
                            <input type="email" placeholder="Your Email" className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring" />
                            <textarea placeholder="Your Message" className="border rounded px-3 py-2 w-64 focus:outline-none focus:ring" rows="3"></textarea>
                            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition cursor-pointer animate-bounce">Send Message</button>
                        </form>
                </div>
    );
};

export default Contact;