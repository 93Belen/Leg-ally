import { minorResponse } from "./minorResponse";
import { response } from "./Response";


// fake response just to get shit done while waiting for the API to work
let fakeResponse = response;


// Adults and general info API call
export const getAbortionInfo = async() => {
    try{
        const response = await fetch("http://localhost:8080/apicall", {
        });
            if(response.ok){
                const jsonResponse = response.json();
                return jsonResponse;
            }
            throw new Error('Resquest failed!')
    }
    catch(error){
        console.log(error)
    }

 }




let minorFakeResponse = minorResponse;
// Minors API call => only call once the form is submited and the user is a minor
export const getMinorAbortionInfo = async() => {
    try{
        const response = await fetch("http://localhost:8080/apicallMinor", {
        });
            if(response.ok){
                const jsonResponse = response.json();
                return jsonResponse;
            }
            throw new Error('Resquest failed!')
    }
    catch(error){
        console.log(error)
    }


}


