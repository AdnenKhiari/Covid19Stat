import Card from "./Card"
import React from "react"
import Loading from "./Loading"

const CardStatComponent = ({ data, dataLoading, lastData, lastDataLoading ,arr}) => {
   /* React.useEffect(()=> {
        console.log(data,lastData)
    },[lastData,data])*/
    return <>
        <div className ="stat-header">
    <h1 >Summary Statistics :</h1>
    </div>
    {( !dataLoading && !lastDataLoading)? <React.Suspense fallback={<Loading/>}>
    < Card data = { data }
    lastData = { lastData }
    dataArray = { arr}
    /> 
    </React.Suspense> : <Loading/> }
    </>
}

export default  CardStatComponent