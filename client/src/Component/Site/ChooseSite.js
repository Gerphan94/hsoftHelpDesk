import React from "react";
import styles from "../styles.module.css"

function ChooseSite({ sites, setSite,  setModalShow }) {



    const handleClick = (id) => {
        setSite(id);
        setModalShow(false);
    }
    return (
        <>
            <div>
                <div className="fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative lg:w-1/3 md:w-2/3 top-1/4 w-full my-6 mx-auto max-w-3xl bg-white">
                        <div className="grid grid-cols-2 p-10 gap-10">
                            {sites.map((site) => (
                                <div 
                                    className="border rounded-md p-3 hover:bg-[#9BB0C1] hover:text-white cursor-pointer"
                                    onClick={() => handleClick(site.id)}
                                >
                                    {site.name}

                                    </div>
                            ))}

                        </div>
                     
                    </div>
                </div>
                <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
            </div>
        </>
    )
}

export default ChooseSite;

