import React, { useState, useEffect } from 'react';
import SQLElement from './SQLElement';
import myData from "./sql.json"

function SQLCol() {

    const path = "./sql.json";
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(path);
            const data = await response.json();
            console.log(data)
            setJsonData(data);
          } catch (error) {
            console.error('Error fetching JSON data:', error);
          }
        };
    
        fetchData();
      }, []);


    return (
        <>
            <div>SQL</div>
            <div className=''>
                {myData.map((data) =>
                    <SQLElement data={data} />
            )}
                
            </div>
        </>
    )


}

export default SQLCol;