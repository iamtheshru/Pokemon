import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const [datas, setData] = useState([]);
    const [count, setCount] = useState(1);

    const navigate = useNavigate();
    useEffect(() => {
        handlegetdata();
    }, []);

    const handlegetdata = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/v1/pokemon?page=${count}`)
                .then((res) => {
                    const responcedata = res.data;
                    setData(responcedata.data);
                })
        } catch (error) {
            console.log("Error fetching data:", error);
            setData([]);
        }
    };

    const handleChanges = async (e) => {
        const response = await axios.get(`http://localhost:5000/v1/pokemon?q=${e.target.value}`)
            .then((res) => {
                const responcedata = res.data;
                setData(responcedata.data);
            })
    }

    const handaledata = () => {
        setCount(count + 1)
        handlegetdata();
    }
    const handlelogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }
    return (
        <>
            <div className="container-full bg-red-400 px-5 mb-5">
                <div className="row flex justify-between p-2 items-center">
                    <div className="col">
                        <div className="text-2xl text-center">
                            <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 21">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C17 15.4 17 16 16.462 16H3.538C3 16 3 15.4 3 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 10 3.464ZM4 3 3 2M2 7H1m15-4 1-1m1 5h1M6.54 16a3.48 3.48 0 0 0 6.92 0H6.54Z" />
                            </svg>
                        </div>
                    </div>
                    <div className="col">
                        <input type="text" onChange={handleChanges} placeholder="search" className=" px-4 py-2 me-2 border border-red-500 rounded-lg text-gray-900 focus:ring-red-500 focus:border-red-500" />
                        <button onClick={handlelogout} className="text-red-500">Logout</button>
                    </div>
                </div>
            </div>
            {datas.length === 0 ? (
                <p>Loading...</p>
            ) : (<>
                <div className="flex flex-wrap justify-center items-center gap-6 p-4">
                    {datas.map((pokemon) => (
                        <div
                            key={pokemon.id}
                            className={`w-full sm:w-1/5 md:w-1/4 lg:w-1/5 p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105  ${pokemon?.type[0]} border-2 border-transparent `}
                        >
                            <div className="text-center mb-4">
                                <img src={pokemon?.image?.thumbnail} alt={pokemon?.name?.english} className="inline-block " />
                            </div>
                            <div className="bg-white py-3 px-11 rounded-lg">
                                <p className="text-xl font-semibold text-center text-gray-800 ">{pokemon?.name?.english}</p>
                                <div className="my-8">
                                    <span className={`${pokemon?.type[0]} text-white px-2 py-1 mx-2 my-2`}>{pokemon?.type[0]} </span>
                                    <span className={`${pokemon?.type[1]}  text-white px-2 py-1 my-2`}>{pokemon?.type[1]}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={handaledata} className="bg-red-500 text-white px-8 mb-9 mt-5 focus:outline focus:outline-white">More</button>            </>
            )}
        </>
    );
}

export default Logout;
