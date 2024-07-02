import React, { useEffect, useState } from "react";

function ListMenu({ data }) {


    const [showIndex, setShowIndex] = useState(0);
    const [selectedNhom, setSelectedNhom] = useState(0);

    // theonhombhyt
    const handleClickNhom = (id) => {
        if (showIndex === id) {
            setShowIndex(0);
            return
        }

        setShowIndex(id);
        setSelectedNhom(id);
    }

    return (

        <>
            {data.map((item) => (
                <div className="text-left">
                    <div className=" px-2 py-1 text-white bg-[#35374B] hover:bg-[#667BC6] hover:border-b-white select-none" 
                    onClick={() => handleClickNhom(item.id)}>
                        {item.name}
                        </div>
                    {showIndex === item.id && (
                        <div className="px-2">
                            {item.child.map((item1) => (
                                <div className="px-2 py-1 ">{item1.name}</div>
                            ))}
                            
                        </div>
                    )}


                </div>
            ))}

        </>
    )

}

export default ListMenu