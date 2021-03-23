import React from 'react'
import MainMap from './MainMap'
import Loading from "./Loading"
const AllData = ({setMap,allDataLoading,allDataError,allData}) => {
   /* React.useEffect(() => {
        console.log("hi ",allDataLoading,allDataError)

    }, [allDataLoading,allDataError]);*/
    return (  <>{ allDataLoading ? <Loading/> : (allDataError!==null? allDataError :  <MainMap allData = {allData} setMap = {setMap} />) }</>)
}
export default AllData;