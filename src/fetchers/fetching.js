export const FetchGet =  async (url) => {
    try{
        let data;
        await fetch(url,{        
            method:'GET',
            headers:{
                "Content-Type":"application/json",            
            },        
        })
        .then(response => response.json())
        .then(response => data = response)        
        return data;             
    }catch(err){
        const error = "error"
        return error
    }      
}