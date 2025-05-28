const textsOnMenu = ["Create", "Read",  "Update", "Delete"];

export default function DropdownMenu ({isDropdownShown}) {
    const menuStyles = {
        margin: "0.4em 0"
    }

    const buttonStyles = {
        background: "linear-gradient(to right, #ffffff 0%, #ffffff 100%)",
        border: "none",
        fontSize: "18px"
    }
    return (
        <div style={{
            boxSizing: "border-box",
            display: isDropdownShown ? "flex" : "none",
            flexDirection: "column",
            justifyContent: "flex-start",
            textAlign: "initial",
            paddingLeft: "2em",
            border: "1px solid green",
            position: "absolute",
            width: "100%",
            background: "linear-gradient(to right, #ffffff 0%, #ffffff 100%)"
            // backgroundColor: "#CCC"
        }}>
            {
                textsOnMenu.map((text, index) => {
                    return (
                        <div key={index} style={menuStyles}>
                            <button style={buttonStyles}>{text}</button>
                        </div>    
                    )
                })
            }
        </div>
    )
}