
import React from "react"
import "./../style/vaccine.scss"
const VaccineListElement = ({ data }) => {
    const [expanded,setExpanded] = React.useState(false);
    return<>
        <div className={"vaccine__list-element" + (expanded? " active" : "")} >
            <div className={"element-header" + (expanded? " active" : "")}  onClick={()=>setExpanded(!expanded)}>
            <h2>{data.candidate}</h2>  
            <h3>{data.mechanism}</h3>  
            <i>{!expanded ? "+" : "-"}</i>
            </div>
            {expanded && 
            <div className="element-body">
            <h2>{data.trialPhase}</h2>  
            <p>{data.details}</p>
            </div>
            }
        </div>

    </>
}

export default VaccineListElement