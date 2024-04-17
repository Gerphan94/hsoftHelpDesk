import React from "react";


function DanhMuc() {

    const dm_list = [
        { id: "duoc", name: "Biệt Dược" },
        { id: "giavp", name: "Biệt Dược" }
    ]



    return (

        <>
            <div>DANH MỤC</div>
            <div>
                {dm_list.map((dm) =>
                    <button>{dm.name}</button>
                )}
            </div>
        </>
    )
}
export default DanhMuc;