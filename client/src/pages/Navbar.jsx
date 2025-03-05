function Navbar() {
    const tokendata = localStorage.getItem("token")
    return (<>
        {tokendata ? <>
            <div>
                <div className="row flex justify-between bg-red-500 px-4 mb-3">
                    <div className="col">logo</div>
                    <div className="col">
                        <svg class="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 10">
                            <path d="M15.434 1.235A2 2 0 0 0 13.586 0H2.414A2 2 0 0 0 1 3.414L6.586 9a2 2 0 0 0 2.828 0L15 3.414a2 2 0 0 0 .434-2.179Z" />
                        </svg>

                    </div>
                </div>
            </div>
        </> : <>
            <div className=" bg-red-500 p-0 mb-3">
                <div className="col text-start logo ">Logo</div>
            </div>
        </>}


    </>);
}

export default Navbar;