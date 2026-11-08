// import { steStoredData } from "./storage"

export function fetchData(){
    return fetch('./data/data.json') 
        .then(res => res.json())
}

export function fetchFakeData(){
    return fetch('https://randomuser.me/api/') 
        .then(res => res.json())
}
