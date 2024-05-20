import React from 'react';

import TaoLichHen from './TaoLich';
import LichHenSai from './LichHenSai';

function DatKham({ site }) {

    return (
        <>
        <div className='p-4'>
        <LichHenSai site={site} />
        <TaoLichHen site={site} />
        </div>
        

        </>
    )
}
export default DatKham;