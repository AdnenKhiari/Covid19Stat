import "./../style/nav.scss"
import hmImg from "./../assets/home.svg"
import covidImg from "./../assets/coronavirus.svg"
import virusImg from "./../assets/virus.svg"
import testImg from "./../assets/test-sanguin.svg"
import vaccineImg from "./../assets/syringe.svg"
import React from "react"
import{Link, Router,Route} from "react-router-dom"
const NavBar = ({nv})=> {

    return <>
     <nav ref={nv}>

        <div className="nav__holder"> 
        <h1> Covid 19</h1>
        <ul className="nav__navigation">
            <li> <img src={hmImg} alt=""/> <Link to="/" >World</Link></li>
            <li> <img src={covidImg} alt=""/>  <Link to="/custom/">Custom Map</Link></li>
            <li> <img src={vaccineImg} alt=""/>  <Link to="/vaccine/">Vaccine</Link></li>
            <li> <img src={testImg} alt=""/>  <a href="https://www.who.int/fr/emergencies/diseases/novel-coronavirus-2019" target="__blank">Infos</a></li>
        </ul>
        </div>
    </nav>
    
    </>
}
export default NavBar;

/*            <li> <img src={virusImg} alt=""/>  <Link to="/aboutus">About Us</Link></li>
*/