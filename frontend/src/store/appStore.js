import {defineStore} from 'pinia'
import {ref} from 'vue'


export const useAppStore =  defineStore('app', ()=>{

    /*  
    The composition API way of defining a Pinia store
    ref() s become state properties
    computed() s become getters
    function() s become actions  
    */ 

    // STATES 
  


    // ACTIONS
	
	const getText = async ()=> {
        // GET REQUEST EXAMPLE
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS  
        const controller    = new AbortController();
        const signal        = controller.signal;
        const id            = setTimeout(()=>{controller.abort()},60000);   
        const URL           = `/api/hello`;        
    
        try {
            const response  = await fetch(URL,{ method: 'GET', signal: signal  });                
            if (response.ok){
                const data      = await response.json();
                let keys        = Object.keys(data);
    
                if(keys.includes("status")){
    
                    if(data["status"] == "found" ){
                        console.log(data["data"]  )  
                        return data["data"];                                                   
                        }
                    if(data["status"] == "failed" ){                                                                      
                        console.log("no data returned");
                        } 
                }                
            }
            else{                
                const data      = await response.text();
                console.log(data);
            }
        }
        catch(err){     
        console.error('getText error: ', err.message);          
        }    
        return []         
    }
    
    const submitText = async (start,end)=> {
        // POST REQUEST EXAMPLE - FORM DATA
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS  
        const controller    = new AbortController();
        const signal        = controller.signal;
        const id            = setTimeout(()=>{controller.abort()},60000);   
        const URL           = `/api/test`;       
        
        const form          = new FormData(); 
        form.set("start", start)
        form.set("end", end)
        try {
            const response  = await fetch(URL,{ method: 'POST', body: form,signal: signal   });              
            if (response.ok){
                const data      = await response.json();
                let keys        = Object.keys(data);
    
                if(keys.includes("status")){
    
                    if(data["status"] == "found" ){
                        console.log(data["data"]  )  
                        return data["data"];                                                   
                        }
                    if(data["status"] == "failed" ){                                                                      
                        console.log("no data returned");
                        } 
                }                
            }
            else{                
                const data      = await response.text();
                console.log(data);
            }
        }
        catch(err){     
        console.error('submitText error: ', err.message);          
        }    
        return []         
    }

    return { 
    // EXPORTS	
    getText,
    submitText
       }
},{ persist: true  });