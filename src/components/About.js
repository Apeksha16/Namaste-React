import User from "./User";
import UserClass from "./UserClass";

const About = () =>{
    return (
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8 text-center animate-fade-in">
                        <h1 className="text-4xl font-extrabold mb-4 text-orange-600 animate-bounce">About Us</h1>
                        <p className="text-gray-700 mb-4 text-lg">Welcome to <span className="font-bold text-orange-500">Swiggy React Clone</span>!<br/>This project is a modern, fully responsive food delivery web app inspired by Swiggy, built with React and Tailwind CSS.</p>
                        <div className="flex flex-col items-center gap-2 mb-4">
                            <span className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm animate-pulse">🚀 Fast Delivery</span>
                            <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm animate-pulse">🥗 Fresh Food</span>
                            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm animate-pulse">💳 Secure Payments</span>
                        </div>
                        <p className="text-gray-500">Created by <span className="font-semibold">Apeksha Verma</span>.<br/>Explore, order, and enjoy delicious food delivered to your doorstep!</p>
                </div>
    );
};

export default About;
