'use client';

import React, { createContext, useEffect, useReducer } from 'react'

import {User, Session} from '@supabase/supabase-js';
import { supabase } from '../supabase/client';
type Props = {
    user: User | null,
    session: Session | null,
    isUserReady: boolean,
}

export const authReducer=(state: any, action: { type: any; payload: any; })=>{
switch(action.type){

    case 'LOGIN':
        return {...state, user: action.payload.user, session:action.payload.session};


    case 'IS_USER_READY':
        return {user:action.payload.user, session:action.payload.session, isUserReady:true}

    case 'LOGOUT':

        return {...state, user: null, session:null};

    default: return state;
}
}

export const UserContext = createContext<Props>({user: null, session:null, isUserReady:true});

export default function AuthProvider({children}:{children:React.ReactNode}) {

    const [state, dispatch]=useReducer(authReducer, {user:null, session:null});

    useEffect(()=>{
        supabase.auth.onAuthStateChange((e, session)=>{
            dispatch({type:'IS_USER_READY', payload:{session:session, user:session?.user }});
        })
    })

    return (<UserContext.Provider value={{ ...state, dispatch }}>
{children}
    </UserContext.Provider>)

    
}

