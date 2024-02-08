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

    const getData = async (start,end)=> {
        // GET REQUEST EXAMPLE
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS  
        const controller    = new AbortController();
        const signal        = controller.signal;
        const id            = setTimeout(()=>{controller.abort()},60000);   
        const URL           = `/api/data/${start}/${end}`;    // '/api/data/<start>/<end>'    
    
        // do not do this ---> "/api/data/${start}/${end}"
        try {
            const response  = await fetch(URL,{ method: 'GET', signal: signal  });                
            if (response.ok){
                const data      = await response.json();
                let keys        = Object.keys(data);
    
                if(keys.includes("status")){
    
                    if(data["status"] == "found" ){
                        // console.log(data["data"]  )  
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
        console.error('getData  error: ', err.message);          
        }    
        return []         
    }
    
    const submitForm = async (num1,num2)=> {
        // POST REQUEST EXAMPLE - FORM DATA
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS  
        const controller    = new AbortController();
        const signal        = controller.signal;
        const id            = setTimeout(()=>{controller.abort()},60000);   
        const URL           = `/api/mul/form`;       
        
        // CREATE FORM AND THEN ADD KEY VALUE PAIRS
        const form          = new FormData(); 
        form.set("num1", num1)
        form.set("num2", num2)

        try {
            const response  = await fetch(URL,{ method: 'POST', body: form,signal: signal   });              
            if (response.ok){
                const data      = await response.json();
                let keys        = Object.keys(data);
    
              
                if(keys.includes("status")){
    
                    if(data["status"] == "complete" ){
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
        console.error('submitForm error: ', err.message);          
        }    
        return []         
    }

    const submitJson = async (num1,num2)=> {
        // POST REQUEST EXAMPLE - FORM DATA
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS  
        const controller    = new AbortController();
        const signal        = controller.signal;
        const id            = setTimeout(()=>{controller.abort()},60000);   
        const URL           = `/api/div/json`;       
        
        // CREATE JSON OBJECT THEN CONVERT IT TO JSON STRING
        let data =  JSON.stringify({"num1": num1, "num2": num2})
         
        try {
            const response  = await fetch(URL,{ method: 'POST', body: data, headers: {'Accept': 'application/json', 'Content-Type': 'application/json',},signal: signal   });              
            if (response.ok){
                const data      = await response.json();
                let keys        = Object.keys(data);
    
                if(keys.includes("status")){
    
                    if(data["status"] == "complete" ){
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
    submitForm,
    submitJson,
    getData
       }
},{ persist: true  });