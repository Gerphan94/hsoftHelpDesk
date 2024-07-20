import React from "react";

function ThuocDetail({ data }) {
    return (
        <>
            {data.map((item) => (
                <div className="border rounded-md p-3 mb-3">
                    <div className="font-bold text-left">{item.ten_hamluong}</div>

                    <div className="text-sm">{item.doituong}</div>
                </div>
            ))}


        </>
    )
}

export default ThuocDetail;