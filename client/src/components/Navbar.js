import { useState } from 'react';
import {faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dropdown from './Dropdown';
import './Navbar.css';

export default function Navbar () {
    return (
        <div>
            <DesktopNavbar />
            <MobileNavbar />
        </div>
    )
}

function MobileNavbar () {
    const [isDropdownShown, setIsDropdownShown]  = useState(false)
    const containerStyles = {
        display: "flex",
        alignItems: "center",
    }
    return (
        <div className='mobileNavbarContainer'>
            <div style={containerStyles}>
                <div className='mobileHamburger'>
                     <FontAwesomeIcon icon={faBars} fontSize='24px' onClick={() => setIsDropdownShown(!isDropdownShown)}
                      /> 
                </div>
                
                <div className='mobileJarrorLogo'>
                    <img src='/img/jarror-logo.png' alt='jarror-logo' height="56px" />
                    <p>Jarror</p>
                </div>
                <div className='mobileLogoutIcon'>
                    <FontAwesomeIcon icon={faUser} fontSize='18px'  />   
                </div>    
            </div>
            <Dropdown isDropdownShown={isDropdownShown} />
        </div>
    )
}

function DesktopNavbar () {
    const menuList = ["create", "read", "update", "delete"];
    return (
        <div className='desktopNavbarContainer'>
            <div style={{display: "flex"}}>
                <div className='desktopJarrorLogo'>
                    <img src='/img/jarror-logo.png' alt='jarror-logo' height="56px" />
                    <p>Jarror</p>
                </div>

                <div className='desktopMenuList'>
                {
                    menuList.map((menu,index) => <li key={index} style={{listStyle: "none",}}>{menu}</li>)
                } 
                </div>

                <div className='desktopLogoutIcon'>
                        <FontAwesomeIcon icon={faUser} fontSize='18px'  />   
                    </div>   
            </div>    
        </div>
        
    )
}