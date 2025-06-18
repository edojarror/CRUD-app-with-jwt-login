
const menuList = ["create", "read", "update", "delete"];
export default function Dropdown ({ isDropdownShown }) {
    return (
        <div style={{
                position: "absolute", 
                display: "flex", 
                gap: "20px",
                justifyContent: "space-evenly",
                width: "100%" 
        }}>
            {
            
                menuList.map((menu,index) => <li key={index} style={{listStyle: "none", display: isDropdownShown ? "block" : "none"}}>{menu}</li>)
            
            }    
            
        </div>
    )
}