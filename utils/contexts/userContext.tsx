'use client';

import React, { createContext, useEffect, useReducer } from 'react'

import {User, Session, UserResponse} from '@supabase/supabase-js';
import { supabase } from '../supabase/client';
type Props = {
    user: User | null,
    session: Session | null,
    isUserReady: boolean,
    dispatch: React.Dispatch<{ type: any; payload?: any; }> | null,
}

export const authReducer=(state: any, action: { type: any; payload?: any; })=>{
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

export const UserContext = createContext<Props>({user: null, session:null, isUserReady:true, dispatch:null});

export default function AuthProvider({children}:{children:React.ReactNode}) {

    const [state, dispatch]=useReducer(authReducer, {user:null, session:null});

    useEffect(()=>{

     const subscription = supabase.auth.onAuthStateChange(async (e, session)=>{

           if(e === 'SIGNED_IN'){
            dispatch({type:'LOGIN', payload:{session:session, user:session?.user }});
        }
        if(e === 'SIGNED_OUT'){
            dispatch({
                type: 'LOGOUT',
            });
           }
        dispatch({type:'IS_USER_READY', payload:{session:session, user:session?.user }});

        });
       ()=>  subscription.data.subscription.unsubscribe();
    }, []);

    return (<UserContext.Provider value={{ ...state, dispatch }}>
{children}
    </UserContext.Provider>)

    
}

