import React , {useState, useContext}  from "react";
import { useNavigate} from "react-router-dom";


export default function MainPage() {

    const [name,setName] = React.useState("");
    const [surname,setSurname] = React.useState("");
    const navigate = useNavigate();


    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "name"){
            setName(value);
        }
        if(id === "surname"){
            setSurname(value);
        }
    }

    return (
        <div>
            <div>AAA</div>
        </div>
    )
}
