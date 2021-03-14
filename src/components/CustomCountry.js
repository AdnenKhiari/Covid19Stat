import { useParams } from "react-router-dom";
import React from 'react'
import TsComponent from "./TsStatsComponent"
import{useFetch} from "./../utils/customHooks"
import { CountryStat } from "./TsStats";
import CardStatComponent from "./CardStatComponents"


const CustomCountry = ( {allData,map,tsData,tsDataLoading,allDataLoading,dayCount}) => {
    var {country,province} = useParams()

    const notFoundError = "Error , it seems like the country specific infos is not supported by the dataset or that the name is incorrect , please review your country and make sure it is on the dataset";
    const [unableError, setIsUnableError] = React.useState(false);
    const [historicalData, setHistoricalData] = React.useState(null);
    const [mydata,setMyData] = React.useState(null);
    var [countriesSummaryStat,countriesSummaryStatLoading,countriesSummaryStatError] = useFetch("https://disease.sh/v3/covid-19/countries/"+country+"?strict=false&allowNull=true");
    var [oldcountriesSummaryStat,oldcountriesSummaryStatLoading,oldcountriesSummaryStatError] = useFetch("https://disease.sh/v3/covid-19/countries/"+country+"?yesterday=true&strict=false&allowNull=true");
    var [oldoldcountriesSummaryStat,oldoldcountriesSummaryStatLoading,oldoldcountriesSummaryStatError] = useFetch("https://disease.sh/v3/covid-19/countries/"+country+"?twoDaysAgo=true&strict=false&allowNull=true");

    React.useEffect(() => {
        if(!tsDataLoading && !allDataLoading && tsData!== null && allData!== null ){

        let foundFromTsData = tsData.find(x => x.country === country && (x.province === province));
        let foundFromMyData = allData.find(x => x.country === country && (x.province === province));
        let newmydata= {...foundFromMyData,...foundFromTsData}
        if((!foundFromMyData || !foundFromTsData)){
            console.log(tsData,allData,"my data")
            setIsUnableError(true)
        }else {
            setIsUnableError(false)
            console.log("gut")
            if(!mydata || (mydata && ((newmydata.country !== mydata.country)  || (newmydata.province !== mydata.province))))
                setMyData(newmydata)
        
        if(map !== null && mydata !== null )
           map.flyTo([mydata.coordinates.latitude,mydata.coordinates.longitude],10,{duration:1.5})
        if(mydata !== null ){
            const queryUrl = province !== "null" ? "https://disease.sh/v3/covid-19/historical/"+country+"/"+province+"?lastdays="+"all" :  "https://disease.sh/v3/covid-19/historical/"+country+"?lastdays="+"all";
            fetch(queryUrl).then((data) => {
                return data.json()
            }).then((data) => {
                setHistoricalData(data);      
            }).catch((err)=>{
                setIsUnableError(true)
            })
        }
            }
       }
       if(!countriesSummaryStatLoading)
       console.log(countriesSummaryStat ,"new")
    }, [tsData,allData,mydata,country,province,tsDataLoading,allDataLoading,dayCount,countriesSummaryStatLoading])

        return(<>
            <div> 
                {/*unableError!==null ? notFoundError : "Found :"+country + " " + province*/}
            </div>
            {  <CardStatComponent  arr = {   ['cases', 'deaths', 'recovered', 'tests', 'population'] }
data = {oldcountriesSummaryStat} dataLoading = {oldcountriesSummaryStatLoading} lastData = {oldoldcountriesSummaryStat} lastDataLoading = {oldoldcountriesSummaryStatLoading} />}
            {(historicalData!==null && mydata !== null) &&  (<TsComponent historicalData = {historicalData} mydata = {mydata} />)}
        </>
    ) 
}


export default CustomCountry;