import {useFetch} from "./../utils/customHooks"
import React from 'react'
import "./../style/vaccine.scss"
import VaccineListElement from "./VaccineListElement"
const Vaccines = ()=>{
    const [vaccineData,vaccineDataLoading,vaccineDataError] = useFetch("https://disease.sh/v3/covid-19/vaccine");
    return <>
    <div className ="stat-header">
        <h1>{"Vaccines :"}</h1>

    </div>        
    <div className="vaccine">
        {!vaccineDataLoading && vaccineData.data.map((item,index) =>{
            return <VaccineListElement data = {item} key={index} />
        })}

    </div>
    <small className="source"> <span>Source : </span>{vaccineData && vaccineData.source}</small>

    </>
}
export default Vaccines