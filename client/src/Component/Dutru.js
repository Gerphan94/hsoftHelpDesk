import React from "react";

function Dutru({ data }) {

    return (

        <>

            <div className="grid grid-cols-2 p-4">
                <div className="">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-300">
                                <th className="w-10">STT</th>
                                <th className="w-20">ID</th>
                                <th className="text-left">Tên phiếu</th>
                                <th>Ngày tạo</th>
                                <th>Tình trạng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((ele, index) => (
                                <tr className="hover:bg-slate-100">
                                    <td><div className="px-2 py-1 border-r">{index + 1}</div></td>
                                    <td><div className="px-2 py-1 border-r">{ele.phieu.id}</div></td>
                                    <td><div className="px-2 py-1 text-left border-r">{ele.phieu.ten}</div></td>
                                    <td></td>
                                    <td><div>{ele.phieu.trangthai}</div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>STT</th>
                                <th>STT</th>

                                <th>STT</th>
                                <th>STT</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>

                            </tr>
                        </tbody>


                    </table>

                </div>


            </div>



        </>
    )
}

export default Dutru;