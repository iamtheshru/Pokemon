import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";


function Home() {
    const [formdata, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const isAuth = localStorage.getItem("token");
        if (isAuth) {
            navigate("/logout");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formdata);

        try {
            const response = await fetch('http://localhost:5000/v3/user/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: formdata.email, password: formdata.password })
            });

            const data = await response.json();
            console.log(data);

            if (data.token) {
                localStorage.setItem("token", data.token);
                navigate("/logout");
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {/* <form onSubmit={handleSubmit} className="w-12 m-auto border rounded-lg bg-gray-50 " >
                <input className="border px-2" type="email" name="email" value={formdata.email} onChange={handleChange} placeholder="Email" />
                <br />
                <input type="password" name="password" value={formdata.password} onChange={handleChange} placeholder="Password" />
                <br />
                <button type="submit">Submit</button>
            </form> */}

            <div className="flex items-center justify-center min-h-screen ">
                <form
                    onSubmit={handleSubmit}
                    className="w-full sm:w-1/3 bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between min-h-[300px]"
                >
                    <h3 className="text-3xl font-serif font-semibold text-center text-gray-800 pb-6">Login to Pokedex</h3>

                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-600 font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formdata.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="john.doe@company.com"
                            required
                            aria-label="Email address"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-600 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formdata.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="•••••••••"
                            required
                            aria-label="Password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Login
                    </button>
                </form>
            </div>



        </>
    );
}

export default Home;
