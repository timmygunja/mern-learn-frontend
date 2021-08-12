import "./NavBar.css"
import { useState } from "react";


const NavBar = () => {

    return (
        <div className={"navbar"}>
            <div className={"logo"}>
                <div><img className={"logopic"} src={"airplane.svg"}/></div>
                <div className={"logotext"}>E-Shop</div>
            </div>

            <div className={"mainbar"}>
                <a href={"#"}><span>Sort</span></a>
                <a href={"#"}>By</a>
                <a href={"#"}>Filter</a>
                <a href={"#"}>Click</a>
                <a href={"#"}>Cart</a>
            </div>
        </div>
    )
}

export default NavBar