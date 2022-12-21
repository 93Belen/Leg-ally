import {button} from './buttonStyles.js';
import { useDispatch } from "react-redux";
import store from '../../redux/Store&Selectors/Store.js';
import { getAbortionInfo, getMinorAbortionInfo } from "../../APIs/abortionApi";
import { useNavigate } from 'react-router';
import { response } from '../../APIs/Response.js';


export const FormButton = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    // Once the button is clicked
    const onClick = async(e) => {
        e.preventDefault();

        // Get inputs
        let lmp = document.getElementById('wlp-input').value;
        let age = Number(document.getElementById('age-input').value);
        let rape = document.getElementById('rape-incest-input').checked;
        let healthRisk = document.getElementById('health-risks-input').checked;

            // When was user's LMP
        // Have to calculate weeks since lmp
        let today = new Date();
        // Get today's day and month
        let day = String(today.getDate()).padStart(2, '0');
        let month = String(today.getMonth() + 1).padStart(2, '0');
        let year = String(today.getFullYear());
        // Get day and month of lmp
        let dateLmp = lmp.split('-');
        let dayLmp = dateLmp[2];
        let monthLmp = dateLmp[1];
        let yearLmp = dateLmp[0];
        // How many weeks since lmp (calculate months and multiply by 4 weeks each / Calculate days and divide by 7. Then round it)
        let monthsSinceLmp = (month - monthLmp) * 4;
        let daysAddToMonth = Math.round(Math.abs(dayLmp - day) / 7);
        // Weeks since last menstrual period
        let weeksSinceLmp
        if(year === yearLmp){
            weeksSinceLmp = monthsSinceLmp + daysAddToMonth;
        }


        // inputs object
        let inputSlice = {
            lmp: weeksSinceLmp,
            age: age,
            rape: rape,
            healthRisk: healthRisk
        }


        // Set all states but homeState slice
        dispatch({type: 'inputs/setState', payload: inputSlice});
        let generalInfo = await getAbortionInfo();
        let minorInfo = await getMinorAbortionInfo();
        //console.log("This hsould be third:", generalInfo);
        //console.log("This should be fourth");
        dispatch({type: 'adult/setState', payload: generalInfo});
        dispatch({type: 'minor/setState', payload: minorInfo});


        console.log("Last", store.getState());
        navigate('/states', {replace: true});
    }

    return <button onClick={(e) => {onClick(e)}} style={button}>Help me!</button>
}