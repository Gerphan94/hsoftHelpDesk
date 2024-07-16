import React from "react";
import styles from "../styles.module.css"

function ThuocModal({ setModalShow }) {

    const title = 'THUỐC';

    const apiURL = process.env.REACT_APP_API_URL;

    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none p-14 w-screen h-screen ">
                    <div className="relative w-full h-full  mx-auto bg-white">
                        <div className="h-full flex flex-col justify-between">
                            {/* HEADER */}
                            <div className="text-left text-lg font-bold border-b-black w-full px-4 py-3 bg-[#9BB0C1]">
                                {title}
                            </div>

                            {/* BODY */}
                            <div className="flex h-full ">
                                <div className="w-1/3 h-full bg-slate-200 text-left">
                                

                                    List phiếu

                                </div>
                                <div className="w-2/3 h-full bg-orange-400">
                                    list thuốc
                                </div>
                                
                            </div>
                            {/* FOOTER  */}
                            <div className="w-full flex gap-4 items-center justify-end px-4 py-3 bg-[#f5f5f5] relative">
                                <button
                                    className={`${styles.btn} ${styles.btnClose}`}
                                    type="button"
                                    onClick={() => setModalShow(false)}
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>


                    </div>
                </div>
                <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
            </div>
        </>
    )
}

export default ThuocModal;

