import { checkboxDiv, checkboxInput, form, formDiv, input, label} from './formStyles.js';
import React from 'react';
import { FormButton } from '../FormButton/FormButton.js';
export const Form = () => {
    return(
        <div style={formDiv}>
        <form action='' method='GET' style={form}>
            <label for='wlp-input' style={label}>When was your last period?</label>
            <input name='wlp-input' id='wlp-input' type ='date' style={input}/>
            <label for='age-input' style={label}>How old are you?</label>
            <input name='age-input' id='age-input' type='number' min='5' max='70' style={input} required/>
            <legend style={label}>Is any of these your case?</legend>
            <fieldset id='special-inputs' style={checkboxDiv}>
                <input id='rape-incest-input' name='incest-rape-input' type='checkbox' style={checkboxInput}/>
                <label for='rape-incest-input'>Rape / Incest</label>
                <input id='health-risks-input' name='health-risk-input' type='checkbox' style={checkboxInput}/>
                <label for='health-risks-input'>Health Risks</label>
            </fieldset>
            <FormButton />
         </form>
         </div>
    )
}