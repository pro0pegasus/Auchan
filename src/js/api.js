// import { steStoredData } from "./storage"

export function fetchData(){
    return fetch('/public/data/data.json') 
        .then(res => res.json())
}


