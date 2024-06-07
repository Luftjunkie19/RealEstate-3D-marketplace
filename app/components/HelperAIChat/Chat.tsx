'use client'
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useAtom } from 'jotai';
import { Message } from 'openai/resources/beta/threads/messages.mjs';
import toast from 'react-hot-toast';
import { RiRobot3Line } from 'react-icons/ri';

import { userThreadAtom } from '@/atoms';
import { RunSubmitToolOutputsParams } from 'openai/resources/beta/threads/runs/runs.mjs';
import { usePathname } from 'next/navigation';

type Props={
  openState:boolean
}
export default function Chat({openState}:Props) {
  const [messages, setMessages]=useState<Message[]>([]);
  const [messageContent, setMessageContent]=useState('');
    const [userThread]=useAtom(userThreadAtom);
  const chatRef=useRef<HTMLDivElement>(null);
  const [run, setRun]=useState<any>(null);


  const startRun= async (thread:string, assistantId:string): Promise<string> =>{
    try {
      const fetchData = await fetch('/api/run/create', {
        method:"POST",
        body:JSON.stringify({
          threadId:thread,
          assistantId:assistantId
        }),
      });
      const {run, success, error}= await fetchData.json();

     
      if(!run || !success){
        toast.error('Unsuccessfully done !', {
          position:'bottom-right',
        });
        return ''
      };

      setRun(run);

      return run.id;
      
    } catch (error) {
      toast.error('No success', {
        position:'bottom-right',
      
      });
      return '';
    }
   
    
    //create run through api
  };

  const pollRunStatus= async (thread:string, runId:string):Promise<any> =>{

    const intervalId= setInterval(async()=>{
      try {
        const runRetrieved= await fetch('/api/run/retrieve', {method:'POST', body:JSON.stringify({runId, threadId:thread}), headers:{
          'Content-Type':'application/json',
        }});

        const {run, success, error}= await runRetrieved.json();
    
        if(error){
          return;
        }

        if(!run || !success){
          return;
        }

        
        
        if(run.status === 'completed'){
          clearInterval(intervalId);
          fetchMessages();
          return;
        }

        else if(run.status === 'failed'){
          clearInterval(intervalId);
          toast.error('Failed to run', {
            position:'bottom-right',
          });
          return;
        }
        setRun(run);
        
      } catch (error) {
        console.log(error);
      }
    }, 1000);
    //run retrieve
    return ()=>clearInterval(intervalId);
  }



  const fetchMessages= useCallback(async ()=>{

    if(!userThread) return;
    
    try {
      const fetchData= await fetch('/api/message/list', {method:'POST', body:JSON.stringify({threadId:userThread}), headers:{
        'Content-Type':'application/json',
      } });
      const data= await fetchData.json();
  
      if(data.success){
        setMessages(data.messages.sort((a:Message, b:Message)=> a.created_at - b.created_at).filter((msg:Message)=> msg.content[0].type === 'text' && msg.content[0].text.value.trim() !== '' ));
      }

     

      
    } catch (error) {
      console.log(error);
      setMessages([]);
    }
    //Fetch messages
  }, [userThread]);

  useEffect(()=>{
    const fetchInterval= setInterval(fetchMessages, 5000);

    return ()=>clearInterval(fetchInterval);
  },[fetchMessages]);

  const sendMessage = async (formData:FormData)=>{
    const messageContent= formData.get('message');
    console.log(messageContent, userThread);
    if(!userThread || !messageContent ||  messageContent.toString().trim().length === 0) return;

    const messageFetch= await fetch('/api/message/create', {
      method:'POST',
      body:JSON.stringify({threadId:userThread, message:messageContent })
    });

    const {message}= await messageFetch.json();

    if(!message) return;
    setMessages((prev)=>[...prev, message]);

   
   const runId = await startRun(userThread, process.env.NEXT_PUBLIC_OPENAI_ASSISTANTID as string);

   chatRef.current?.lastElementChild?.scrollIntoView( {behavior: 'smooth'} );
   pollRunStatus(userThread, runId);
  };

  const handleSubmitAction = useCallback( async ()=>{
    let toolOutputs: RunSubmitToolOutputsParams.ToolOutput[] = [];

    for (const toolCall of run?.required_action?.submit_tool_outputs
      .tool_calls ?? []) {
      console.log(`toolCall`, toolCall);
      if (toolCall.function.name === "getETFsData") {
        const { ticker, success, errorMessage } = JSON.parse(
          toolCall.function.arguments
        );
        if (!success || errorMessage) {
          toast.error(
            errorMessage ?? "Something went wrong fetching data for stocks",
            {  position:'bottom-right' }
          );
        }

        if (!ticker) {
          toast.error("No symbol found", {  position:'bottom-right',
             });
        }
        
        

        try {
          const response = await fetch(`/api/getETFsData`, {
            method: "POST",
            body: JSON.stringify({ ticker }),
            headers:{
              'Content-Type': 'application/json',
            }
          });

          const { errorMessage, success, result } = await response.json();

          console.log(errorMessage, success, result);

          toolOutputs.push({
            tool_call_id: toolCall.id,
            output: JSON.stringify(result),
          });

          
        } catch (error) {
          console.log("Error fetching stock", error);
          toast.error("Error fetching stock", {  position:'bottom-right',
           });
        }
      } 
      
      if(toolCall.function.name === 'getEstimatedRentUSPropertyCost'){
        const { address, state, city, zipCode, success, errorMessage } = JSON.parse(
          toolCall.function.arguments
        );
        if (!success || errorMessage) {

        }

        if (!address || !state || !city || !zipCode || !success) {
         
        }
        
        

        try {
          const response = await fetch(`/api/getEstimatedRentPropertyCost`, {
            method: "POST",
            body: JSON.stringify({ address, state, city, zipCode }),
            headers:{
              'Content-Type': 'application/json',
            }
          });

          const { errorMessage, success, result } = await response.json();
          if (!success || errorMessage || !result) {
            return;
          }


          if(run.status === "failed" || run.status === 'cancelled' || run.status === 'expired'){
            break;
          }

          toolOutputs.push({
            tool_call_id: toolCall.id,
            output: JSON.stringify(result),
          });

          
        } catch (error) {
          console.log("Error fetching stock", error);
          toast.error("Error fetching stock", {  position:'bottom-right',
            });
        }
      }
      
      if(toolCall.function.name=== "getEstimatedPropertyCost"){
        const { address, state, city, zipCode, success, errorMessage } = JSON.parse(
          toolCall.function.arguments
        );
        if (!success || errorMessage) {

        }

        if (!address || !state || !city || !zipCode || !success) {
         
        }
        
        

        try {
          const response = await fetch(`/api/getEstimatedPropertyCost`, {
            method: "POST",
            body: JSON.stringify({ address, state, city, zipCode }),
            headers:{
              'Content-Type': 'application/json',
            }
          });

          const { errorMessage, success, result } = await response.json();
          if (!success || errorMessage || !result) {
            return;
          }


          if(run.status === "failed" || run.status === 'cancelled' || run.status === 'expired'){
            break;
          }

          toolOutputs.push({
            tool_call_id: toolCall.id,
            output: JSON.stringify(result),
          });

          
        } catch (error) {
          console.log("Error fetching stock", error);
          toast.error("Error fetching stock", {  position:'bottom-right',
            });
        }
      }

      if(toolCall.function.name=== "getUSPropertyData"){
        const { address, state, city, zipCode, success, errorMessage } = JSON.parse(
          toolCall.function.arguments
        );
        if (!success || errorMessage) {
          
        }

        if (!address || !state || !city || !zipCode || !success) {
         
        }
        
        

        try {
          const response = await fetch(`/api/getProperty`, {
            method: "POST",
            body: JSON.stringify({ address, state, city, zipCode }),
            headers:{
              'Content-Type': 'application/json',
            }
          });

          const { errorMessage, success, result } = await response.json();
          if (!success || errorMessage || !result) {
            return;
          }


          if(run.status === "failed" || run.status === 'cancelled' || run.status === 'expired'){
            break;
          }

          toolOutputs.push({
            tool_call_id: toolCall.id,
            output: JSON.stringify(result),
          });

          
        } catch (error) {
          console.log("Error fetching stock", error);
          toast.error("Error fetching stock", {  position:'bottom-right',
             });
        }
      }
      
    }

    console.log("toolOutputs", toolOutputs);
    if (toolOutputs.length > 0) {
      const response = await fetch("/api/run/submit-output",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( {
          runId: run?.id,
          threadId: userThread,
          toolOutputs: toolOutputs,
        })
      });

      const fullResponse= await response.json();

      console.log("Response data from submit tool output", fullResponse);

      if (fullResponse.success) {
        setRun(fullResponse.run);

      }
    }
  },[run?.id, run?.required_action?.submit_tool_outputs.tool_calls, run?.status, userThread]);

  useEffect(()=>{
    handleSubmitAction();

  },[handleSubmitAction])

  const pathname = usePathname();

  return (
    <div className={`${openState && !pathname.includes('channel')  ? 'flex opacity-100 z-[99999999999]' : 'hidden opacity-0'}  transition-all  flex-col gap-6 fixed bottom-10 right-6 w-full max-h-96 h-full bg-purple rounded-lg max-w-xs`}>
   <p className="text-white text-lg p-4 font-bold justify-around flex gap-4 items-center w-full border-b-2 border-darkGray"><RiRobot3Line size={24} className="text-bgColor"/> VirtuAIssistant</p>
   <div ref={chatRef} className="flex h-5/6 w-full p-1 flex-col gap-2 overflow-y-auto will-change-scroll modal-scroll cursor-all-scroll ">
    {messages.length === 0 && <p>No messages yet...</p>}
   {messages.length > 0 && messages.map((msg:Message) => (
        <div key={msg.id} className={`text-white ${msg.role === 'user' ? 'self-start' : 'self-end'} bg-darkGray p-2 rounded-lg w-fit`}>
         {msg.role === 'user' ? 'User: ' : 'Virtu: '} {msg.content[0].type === 'text' && msg.content[0].text.value.split('/n').map((msgText,)=> msgText )}
         
        </div>
      ))}
   </div>

      <form action={sendMessage} className='bg-darkGray rounded-b-lg w-full p-2'>
        <input
        name="message"
          className="w-full p-2 rounded-lg outline-none text-white shadow-xl"
          value={messageContent}
          placeholder="Say something..."
          onChange={(e)=>setMessageContent(e.target.value)}
        />
      </form>
    </div>
  )
}