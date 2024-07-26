import React, { useEffect, useState } from "react";

function DichvuTable( { data=[] } ) {
    return (
        <>
            <div className="mt-2 flex-grow w-full h-full overflow-y-auto" >
                <table>
                    <thead>
                        <tr>
                            <th className="text-center w-10"><div className=" py-1 text-center">STT</div></th>
                            <th className="w-20"><div className="">Đối tượng</div></th>
                            <th className=""><div className="">Dịch vụ</div></th>
                            <th className="w-20"><div>Ngày</div></th>
                            <th><div>Ngày dự kiến</div></th>
                            <th><div className="text-center">Số phiếu</div></th>
                            <th><div className="text-center">Bệnh phẩm</div></th>
                            <th><div className="text-center">...</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td className="text-center w-10"><div className=" py-1 text-center">{index + 1}</div></td>
                                <td className="w-20"><div className="">{item.doituong}</div></td>
                                <td className="text-left"><div className="">{item.tendichvu}</div></td>
                                <td className=""><div>{item.ngayylenh}</div></td>
                                <td><div>{item.ngay_dk}</div></td>
                                <td><div className="text-center">{item.so_phi_ban}</div></td>
                                <td><div className="text-center">{item.benh_pham}</div></td>
                                <td><div className="text-center">...</div></td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>



        </>
    )
}


export default DichvuTable;