import React from "react";

function ThuocDetail ( { data } ) {
    return (
        <>
        {data.map((item) => (
            <div className="text-left">
                <div className="font-bold text-lg">{item.ten}</div>
                <div className="text-sm">{item.dvt}</div>
            </div>
        ))}

            
        </>
    )
}

export default ThuocDetail;