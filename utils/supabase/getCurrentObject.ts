import { supabase } from "./client";

export const getCurrentObject=(tableName:string, filter:string, setObject:(obj:any)=>void)=>{
    const channel = supabase
    .channel('room1').on('postgres_changes', {event:'*', schema:'public', filter},(payload)=>{
        if(payload.eventType === 'UPDATE'){}
    }).subscribe();

    return ()=>{supabase.removeChannel(channel);}
}