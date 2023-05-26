
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import axios from 'axios'

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
};


// organization:efb41bb0-9a54-11ea-825c-dd30ef2a5485

const OrgButton = () => {


    const hit = () => {

    axios.get('http://localhost:8010/proxy/user')
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

    }

    

    
    return (<button onClick={hit}>Org</button>);
};

export const App = () => {

   

    // headers: {
    //     Authorization: `Bearer ${token}`,
    //     'content-type': 'application/json',
    //     ...(request?.headers || {}),
    // },

    const auth = useAuth0();

    useEffect(()=>{
        console.log(auth.isAuthenticated, auth.)
    })


    return (
        <div>
            
            <LoginButton />

            <OrgButton />

        </div>
    )
}