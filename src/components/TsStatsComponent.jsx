import React from 'react'
import { CountryStat } from "./TsStats"

const TsComponent = ({historicalData,mydata})=>{
    return <> <CountryStat  title="Cases Per Day :" stat="cases" historicalData={historicalData}  mydata={mydata} />
            <CountryStat  title="Deaths Per Day :" stat="deaths" historicalData={historicalData}  mydata={mydata} />
            <CountryStat  title="Recovered Per Day :" stat="recovered" historicalData={historicalData}  mydata={mydata} />
        </>
}
export default TsComponent