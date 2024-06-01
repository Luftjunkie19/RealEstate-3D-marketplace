import { supabase } from "./client"

export const getCurrentData=(tableName:string, addToArray:(value:any)=>void, data:any[], filter?:string)=>{

  const channel = supabase
  .channel('room1')
  .on('postgres_changes', { event: '*', schema: 'public', table: tableName, filter}, payload => {
  if(payload.eventType === 'INSERT'){
   if(payload.new && data){
     addToArray([...data, payload.new]);
   }
  }

  if(payload.eventType === 'DELETE'){
   if(payload.old && data){
    addToArray(data.filter((item:any)=>item.id !== payload.old.id));
   }

   
  }
if(payload.eventType === 'UPDATE'){
  if(payload.new && data){
    addToArray(data.map((item:any)=>item.id === payload.new.id ? payload.new : item));
  }
}

  })
  .subscribe();

  return ()=>{supabase.removeChannel(channel); }

}