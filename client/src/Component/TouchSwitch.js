import React from "react";

function TouchSwitch(props) {


    return (
        <>

        <div className="flex">
        <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                <input
                    type="checkbox"
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"

                />
                <label
                    htmlFor="toggle"
                    className={`toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer `}
                />
            </div>
            <div>Nhập khoa</div>

        </div>
            
        </>
    )
}


export default TouchSwitch;