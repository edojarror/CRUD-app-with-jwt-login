import { useState } from 'react';
import { useNavigate } from "react-router";
import { FaBars, FaUser } from "react-icons/fa6";
import DropdownMenu from './DropdownMenu';

const textsOnMenu = ["Create", "Read",  "Update", "Delete"];

export default function Navbar () {
    const navigate = useNavigate();
    const handleLogout = (path, navigate) => {
        localStorage.removeItem("token");
        navigate(path);
    }
    return (
        <MobileMode handleLogout={handleLogout} navigate={navigate} />
        // <DesktopMode handleLogout={handleLogout} navigate={navigate} />
    )
}

    const NavButtonStyles = {
        fontSize: "16px", 
        padding: "4px", 
        borderRadius: "50%"
    }

const DesktopMode = ({handleLogout, navigate}) => {
    const desktopWrapperStyles = {
        boxSizing: "border-box",
        padding: "30px 0",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
    const containerStyle = {
    boxSizing: "border-box",
    display: "flex",
    border: "3px solid black",
    width: "60%",
    height: "60px"
    }
    
    const navLeft = {
        boxSizing: "border-box",
        width: "20%",
        display: "flex",
        justifyContent: "flex-start",
    }
    const navCenter = {
        boxSizing: "border-box",
        width: "60%",
        border: "1px solid green",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px"
    }
    const navRight = {
        boxSizing: "border-box",
        width: "20%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: "4px",
        marginRight: "4px"
    }

    return (
        <div style={desktopWrapperStyles}>
            <div style={containerStyle}>

            <div style={navLeft}>
                <img src="/img/jarror-logo.png" alt="jarror_logo" height="30px"  />
                <p style={{fontSize: "20px", fontWeight: 700, marginLeft: "10px", paddingTop: "10px"}}>Jarror's</p>
            </div>

            <div style={navCenter}>
                {
                        textsOnMenu.map((text, index) => {
                            return (
                                <div key={index}>
                                    <button style={NavButtonStyles}>{text}</button>
                                </div>    
                            )
                        })
                    }
            </div>
        
            <div style={navRight}>
                <div style={{paddingRight: "2.5em"}}>
                    <button style={{fontSize: "16px", borderRadius: "4px"}} onClick={() => handleLogout("/login_page", navigate)}><FaUser /> </button>
                </div>
            </div>
            
            
        </div>    
        </div>
    
    )
}

const MobileMode = ({handleLogout, navigate}) => {
    const [isDropdownShown, setIsDropdownShown] = useState(false);
    const wrapperStyles = {
        boxSizing: "border-box",
        position: "relative",
    }
    const navbarContainerStyles = {
        display: "flex",
        width: "100%",
        border: "2px double blue",
        background: "linear-gradient(to right, #fdfdfd 0%, #fdfdfd 100%)",
    }
    const buttonStyles = {
        background: "linear-gradient(to right, #ffffff 0%, #ffffff 100%)",
        border: "none",
        fontSize: "22px",
        padding: "2px 16px",
        marginRight: "6px"
    }
    const mobileLogoStyles = {
        boxSizing: "border-box",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
    }
    const userprofileIconStyles = {
        boxSizing: "border-box",
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: "4px",
        marginRight: "14px"
    }

    return (
        <div style={wrapperStyles}>
            <div style={navbarContainerStyles}>
                <button onClick={() => setIsDropdownShown(!isDropdownShown)} style={buttonStyles}>
                    <FaBars /> 
                </button>   
            <div style={mobileLogoStyles}>
                <div>
                    <img src="/img/jarror-logo.png" alt="jarror_logo" height="60px"  />    
                </div>
                <div style={{}}>
                    <p style={{fontSize: "22px", fontWeight: 700, margin: "0", paddingBottom: "8px"}}>Jarror's</p>    
                </div>
                
            </div>
            <div style={userprofileIconStyles}>
                <button style={NavButtonStyles}>
                    <FaUser />    
                </button>
                
            </div>


            </div>
            <DropdownMenu isDropdownShown={isDropdownShown} />
        </div>
    
    )
}