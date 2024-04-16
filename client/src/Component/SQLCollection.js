import React, { useState, useEffect } from 'react';
import MarkdownReader from './MarkDownReader';

function SQLCol() {



    return (
        <>
            <div>SQL</div>
            <div className='px-4'>
                <div className='border text-left'>
                    <MarkdownReader filename="dutru.md" />
                </div>
            </div>




        </>
    )


}

export default SQLCol;