import React, { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import PharmarDetailModal from "./PharmarDetailModal";
import Filter from "./Filter";
import Table from "./Table";
import styles from "../styles.module.css";
import SearchBar from "../Common/SearchBar";

function TonTheoKho({ site }) {

    const apiURL = process.env.REACT_APP_API_URL;
    const [timeoutId, setTimeoutId] = useState(null);

    const [khoList, setKhoList] = useState([]);
    const [selectedKho, setSelectedKho] = useState({ id: 0, name: '' });

    const [pharmars, setPharmars] = useState([]);
    const [selectedPharmarId, setSelectedPharmarId] = useState(0);
    const [isShowModal, setIsShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewDatas, setViewDatas] = useState([]);

    // FILTER
    const [filterList, setFilterList] = useState([
        { id: 'dalieu', name: 'Đa liều', value: false },
        { id: 'bhyt', name: 'BHYT', value: false },
        { id: 'khangsinh', name: 'Kháng sinh', value: false },
    ])
    const [tyleBH, setTyleBH] = useState({id: '100', name: '100'});
    const [selectedAtc, setSelectedAtc] = useState({id:'', name: ''});

    useEffect(() => async () => {
        try {
            const fecthURL = apiURL + "/duoc/tonkho/theokho/dskho/" + site;
            const response = await fetch(fecthURL);
            const data = await response.json();
            setKhoList(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }, []);

    const filter = () => {
        const filterData = pharmars.filter((item) => {
            // Initialize match to true
            let matchesAllFilters = true;
            // Iterate through each filter in the list
            filterList.forEach(filter => {
                if (filter.id === 'dalieu' && filter.value === true) {
                    matchesAllFilters = matchesAllFilters && item.dalieu === 1;
                }
                if (filter.id === 'bhyt' && filter.value === true) {
                    if (tyleBH.id === 100) {
                        matchesAllFilters = matchesAllFilters && item.bhyt === 100;
                    }
                    else if (tyleBH.id === 0) {
                        matchesAllFilters = matchesAllFilters && item.bhyt === 0;
                    }
                    else {
                        matchesAllFilters = matchesAllFilters && item.bhyt > 0;
                    }
                }
                if (filter.id === 'notbhyt' && filter.value === true) {
                    matchesAllFilters = matchesAllFilters && item.bhyt === 0;
                }
                if (filter.id === 'khangsinh' && filter.value === true) {
                    matchesAllFilters = matchesAllFilters && item.duocbvid === 3;
                }
                
                // Add more conditions for other filters here
            });

            return matchesAllFilters;
        });

        return filterData;
    };

    const getPharmars = async () => {
        try {
            const fecthURL = apiURL + "duoc/tonkho/theokho/" + site + "/" + selectedKho.id;
            console.log(fecthURL)
            const response = await fetch(fecthURL);
            const data = await response.json();
            // console.log(data)
            setPharmars(data);
            setViewDatas(filter);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }
    const onClick = () => {
        console.log(selectedKho.id)
        if (selectedKho.id === 0) {
            return;
        }
        getPharmars();
    }

    useEffect(() => {
        getPharmars();
    }, [selectedKho]);


    const onClickPharmar = (pharmarid) => {
        setSelectedPharmarId(pharmarid);
        setIsShowModal(true);
    }

    const search = (data, seachValue) => {
        if (seachValue === '') {
            return data;
        }
        return data.filter((item) => item.mabd.toLowerCase().includes(seachValue.toLowerCase()) || item.tenbd.toLowerCase().includes(seachValue.toLowerCase()));
    }

    // Search
    const handleSearch = (event) => {
        const searchvalue = event.target.value;
        setSearchTerm(searchvalue);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            setViewDatas(search(pharmars, searchvalue));
        }, 1000);
        setTimeoutId(newTimeoutId);
    };

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            setViewDatas(search(pharmars, searchTerm));
        }, 1000);
        setTimeoutId(newTimeoutId);
    }, [searchTerm]);

    useEffect(() => {
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    return (
        <div className="px-4">

            <div className="flex items-center gap-10">
                <div className="flex items-center gap-2">
                    <label className="font-bold">Kho: </label>
                    <div className="w-96">
                        <Dropdown
                            data={khoList}
                            setSelectedOption={setSelectedKho}
                            placeholder="Chọn kho --- "
                            selectedOption={selectedKho}

                        />

                    </div>
                    <Filter
                        idkho={selectedKho.id}
                        site={site}
                        filter={filterList}
                        setFilter={setFilterList}
                        setSelectedAtc={setSelectedAtc}
                        setTyleBH={setTyleBH}
                    />
                    <button className={`${styles.btn} ${styles.btnNew }`} onClick={onClick} >
                        Xem
                    </button>
                </div>
               
                {selectedAtc.id}

                <div>
                    <SearchBar 
                    placeholder='Nhập Mã, Tên, HC' 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm}
                    handleSearch={handleSearch} />
                </div>
            </div>

            {/* Table */}
            <div>
                <Table data={viewDatas} setIsShowModal={setIsShowModal} setSelectedPharmarId={setSelectedPharmarId} />
            </div>

            {isShowModal && <PharmarDetailModal site={site} pharmarId={selectedPharmarId} setModalShow={setIsShowModal} />}

        </div >
    );
}
export default TonTheoKho;