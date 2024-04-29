import React, { useContext } from 'react'
import { UserContext } from '../contexts/userContext';



export function useAuthContext() {
 
    const userContext= useContext(UserContext);

    if(!userContext){
        throw new Error('No Context available');
    }

    return userContext;
}

