import React, { useState, useEffect } from "react";


function DutruCT({ data }) {


    return (
        <>
            <div>
                {data.map((ele, index) =>
                    <div className="p-3">
                        <div className="border p-2">
                            <div className="flex gap-2">
                                <div>
                                    {ele.id}

                                </div>
                                <div> {ele.mathuoc}</div>
                                <div> {ele.tenthuoc}</div>
                                <div> {ele.duongdung}</div>


                            </div>







                        </div>
                    </div>


                )}


            </div>


        </>
    )
}

export default DutruCT;