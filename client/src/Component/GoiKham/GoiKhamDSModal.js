import React from "react";

function DSgoi({ setModalShow }) {

    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-56 h-96 my-6  left-40 top-24 max-w-3xl bg-white p-4">
                        <div className="min-h-20 text-left text-lg font-bold border-b-black w-full">
                        Thuốc
                        </div>
                        <div className="w-full flex items-center justify-end p-1 bg-[#f5f5f5]">
                            <button
                                className="text-red-500 background-transparent font-bold px-2 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 border-red-500 border opacity-80 hover:opacity-100"
                                type="button"
                                onClick={() => setModalShow(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
                <div className="opacity-fixed inset-0 z-40 bg-black"></div>
            </div>
        </>
    )
}

export default DSgoi;

