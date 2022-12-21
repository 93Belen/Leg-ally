import { colors, fonts, svg } from "../fonts_colors";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAge, selectAllStates, selecthealthRisk, selectLmp, selectMinorsInfo, selectRape, selectState } from "../../redux/Store&Selectors/selectors";


export const Map = () => {
    // All states
    const statesOfAmericaArr = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];


    // Colors
    let red = 'B67249';
    let orange = 'F1AC44';
    let yellow = 'ECDB58';
    let lightgreen = 'A9CB2F';
    let green = '7AB748';
    // Selectors
    let age = useSelector(selectAge);
    let lmpInput = useSelector(selectLmp);
    let rapeInput = useSelector(selectRape);
    let healthInput = useSelector(selecthealthRisk);
    let allStates = useSelector(selectAllStates);
    let minorsInfo = useSelector(selectMinorsInfo);
    // weeks since last menstrual period
    let lmp = lmpInput;
    // Where is the user
    // Speacial case?
    let rape = rapeInput;
    let healthRisk = healthInput;

    useEffect(() => {
        // Function that will show label with info when mouse over State
        const showLabel = (e) => {
            let message = e.target.dataset.display
            e.target.style.stroke = 'gold';
            e.target.style.strokeWidth = '1';
            //let p = document.createElement("http://www.w3.org/2000/svg", "text");
            const p = document.createElementNS("http://www.w3.org/2000/svg", "text");
            p.setAttribute("x", "51%");
            p.setAttribute("y", "95%");
            p.setAttribute("textLength", "fit-content");
            p.setAttribute("fill", "black");
            p.setAttribute("class", "created-p");
            p.style.fontFamily = fonts.titleLight.fontFamily;
            p.style.fontSize = '14px';
            e.target.parentNode.appendChild(p);
            p.innerHTML = message;
            console.log(p);
            
        }
        const goBackToNormal = (e) => {
            e.target.style.stroke = 'black';
            e.target.style.strokeWidth = '0.5';
            let createdP = document.getElementsByClassName('created-p');
            while(createdP[0]){
                createdP[0].remove();
            }
        }

        // Check states with no info
        for(const state of statesOfAmericaArr){
            let stateSvg = document.getElementById(`${state.toLowerCase()}`);
            if(stateSvg !== null){
                stateSvg.style.fill = "lightgrey";
                stateSvg.dataset.display = "No data available";
                stateSvg.addEventListener('mouseover', showLabel);
                stateSvg.addEventListener('mouseout', goBackToNormal);
            }
        }


        // Check Lmp -> Get states where is legal regarding lmp (the states where abortion is ilegal have lmp = 0. So those are discarted here as well)
        for(const state in allStates){
            // Avoid spaces in name
            let arrName = state.split(" ");
            console.log(arrName.join(""))
            // Grab state
            let stateSvg = document.getElementById(`${arrName.join("").toLowerCase()}`);
            // If abortion is ilegal
            if(allStates[state]["banned_after_weeks_since_LMP"] === 0){
                if(stateSvg !== null){
                    stateSvg.style.fill = red;
                    stateSvg.dataset.display= "Illegal in most cases";
                }
                // If there is a special case
                if(healthRisk){
                    // If health risk
                    if(allStates[state]["exception_health"]){
                        // If health excepcions are restricted
                        if(allStates[state]["exception_health"] !== 'Any' && allStates[state]["exception_health"] !== true){
                            if(stateSvg !== null){
                                stateSvg.style.fill = yellow;
                                stateSvg.dataset.display= "Few exceptions when there are health risks";
                            }
                        }
                        // If any health risk matters
                        else {
                            if(stateSvg !== null){
                                stateSvg.style.fill = green;
                                stateSvg.dataset.display= "Legal when there are health risks";
                            }
                        }
                    }
                    // If life risk
                    else if(allStates[state]["exception_life"]){
                            if(stateSvg !== null){
                                stateSvg.style.fill = orange;
                                stateSvg.dataset.display= "Exceptions only when there is risk of death";
                            }
                    }
                }
                if(rape){
                    if(allStates[state]["exception_rape_or_incest"]){
                            if(stateSvg !== null){
                                stateSvg.style.fill = green;
                                stateSvg.dataset.display= "Legal in case of rape or incest";
                            }
                    }
                }
            }
            // If can be legal (99 means is always legal)
            if(allStates[state]["banned_after_weeks_since_LMP"] > lmp || allStates[state]["banned_after_weeks_since_LMP"] === 99){
                // If user is a minor
                // Get States where minors can get an abortion
                if(age < 18){
                    // If minor is adult in one state (some states consider adult after 16)
                    if(minorsInfo[state]["below_age"] < age){
                        // Turn light green
                        if(stateSvg !== null){
                            stateSvg.style.fill = lightgreen;
                            stateSvg.dataset.display= "Considered adult";
                        }
                    }
                    // If minor can get abortion by own decision
                    else if(minorsInfo[state]["allows_minor_to_consent_to_abortion"]){
                        // If State is not null (ex: hawaii is missing). Turn state green
                        if(stateSvg !== null){
                            stateSvg.style.fill = green;
                            stateSvg.dataset.display= "Legal";
                        }
                    }
                    // legal with parents consent
                    else if(minorsInfo[state]["parental_consent_required"]){

                        // if only one parent required turn yellow
                        if(minorsInfo[state]["parents_required"] === 1){
                            if(stateSvg !== null){
                                stateSvg.style.fill = yellow;
                                stateSvg.dataset.display= "Legal with one parental consent";
                            }
                        }
                        // If two parents are required turn orange
                        else if(minorsInfo[state]["parents_required"] === 2){
                            if(stateSvg !== null){
                                stateSvg.style.fill = orange;
                                stateSvg.dataset.display= "Legal with parental consent from both parents";
                            }
                        }
                    }
                    // If parental notification required turn orange
                    else if(minorsInfo[state]["parental_notification_required"]){
                        if(stateSvg !== null){
                                stateSvg.style.fill = orange;
                                stateSvg.dataset.display= "Legal with parental notification";
                        }
                    }
                    // Go back to original
                    else {
                        if(stateSvg !== null){
                            stateSvg.style.fill = '';
                        }
                    }
                }
                // If adult
                else {
                    // Turn green
                    if(stateSvg !== null){
                        stateSvg.style.fill = green;
                        stateSvg.dataset.display= "Legal";
                    }
                }

            }
            // If weeks since lmp is more than allowed
            else {
                if(stateSvg !== null && allStates[state]["banned_after_weeks_since_LMP"] !== 0){
                    stateSvg.style.fill = red;
                    stateSvg.dataset.display= "Too long since last menstrual period";
                }
                // If there is a special case
                if(healthRisk){
                    // If health risk
                    if(allStates[state]["exception_health"]){
                        // If health excepcions are restricted
                        if(allStates[state]["exception_health"] !== 'Any' && allStates[state]["exception_health"] !== true){
                            if(stateSvg !== null){
                                stateSvg.style.fill = yellow;
                                stateSvg.dataset.display= "Few exceptions when there are health risks";
                            }
                        }
                        // If any health risk matters
                        else {
                            if(stateSvg !== null){
                                stateSvg.style.fill = green;
                                stateSvg.dataset.display= "Legal when there are health risks";
                            }
                        }
                    }
                    // If life risk
                    else if(allStates[state]["exception_life"]){
                            if(stateSvg !== null){
                                stateSvg.style.fill = orange;
                                stateSvg.dataset.display= "Legal when there is risk of death";
                            }
                    }
                }
                if(rape){
                    if(allStates[state]["exception_rape_or_incest"]){
                            if(stateSvg !== null){
                                stateSvg.style.fill = green;
                                stateSvg.dataset.display= "Legal in case of rape or incest";
                            }
                    }
                }
            }

            // Add hover effect
            if(stateSvg !== null){
                stateSvg.addEventListener('mouseover', showLabel);
                stateSvg.addEventListener('mouseout', goBackToNormal);

            }


        }
        
    })



    return (
        <svg style={svg} viewBox="0 0 500 250" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="512" y1="9" x2="217" y2="9" stroke="#211A12" stroke-width="0.5"/>
            <line x1="460" x2="460" y2="180" stroke="#211A12" stroke-width="0.5"/>
              <svg viewBox="0 0 410 270" fill="hsla(34, 47%, 97%, 1)" xmlns="http://www.w3.org/2000/svg">
    <path d="M339 101.528L329.5 103.5V108M339 101.528L356 98L360 109H364L362 121.5L360 118.5L362 114L360 112H356V106.5L355 102L353.5 109L356 114L357 118.5L351 115.5L349 112H347.5L349 108L345.5 106.5L343.5 104.5L341.5 106.5L340 104.5L343.5 103.5L339 101.528Z" stroke="black" id='maryland' stroke-width="0.5"/>
    <path d="M363 105L365 108.5H360L356.5 98V95.5H360L361.5 91L357.5 87V85L360 82V80L367.5 83L368.5 86L366.5 88H368.5L369.5 95.5L366.5 100.5L365 103.5V102L359 98L363 105Z" stroke="black" id='newjersey' stroke-width="0.5"/>
    <path d="M369 86L374 84.5L380.5 79.5L379 78L374 81.5H371.5L369 83.5L374 78L380.5 75L379 69.5L369 72L368.5 83" stroke="black" id='connecticut' stroke-width="0.5"/>
    <path d="M329.5 108.5V103.5H327.5L323 104.5L320 99V105.5L314 110V114H311.5V118L308.5 119.5V123L314 127L316 130L327.5 125.5L329.5 114L331.5 115.5H334.5V112L336.75 108.25L339 104.5L344 103.5L338 101.5L329.5 108.5Z" stroke="black" id='westVirginia' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M380 62H372V54V50V47.5L373.5 44.5V40.5V37H375.5L381.5 54L383.5 56.5L380 62Z" stroke="black" id='newHampshire' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M377 35L375.5 37L382 53L384.5 55V49.5L389 47.5V46L392.5 45V39.5L395.5 41V39.5H397.5L399 37L405 33L404 32L401.5 30H399V27L395.5 25.5L392.5 14L388 12L384.5 15.5L382 12L379 20V30L377 32V35Z" stroke="black" id='maine' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M384.5 56L384.321 56.5367M384.321 56.5367L383.5 59L384.5 60L383.5 62.5L389.5 68H391.5V69.5L389.5 70.5H386.5L385 72L382 68L368.5 71.5L367.5 64.5L372 62.5H380.5L384.321 56.5367Z" stroke="black" id='massachusetts' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M383 73.5L381.5 68.5L378.5 70L380.5 72.5V75.5L383 73.5Z" stroke="black" id='rhodeIsland' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M271 92.5H269L271 115.5L270.5 117V118.5L272.5 120.5L269 126.5V129.5H273.5L276.5 130.5L277.5 128L279.5 129.5L281 125L282.5 127H284.5L285 125.5L286 125V122H287L287.5 118L289.5 120.5L291.5 118V115.5L288 90.5L287.5 89.5L272.5 91L271 92.5Z" stroke="blackk" id='indiana' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M322.5 79.5L318.5 82L320 96.5L320.5 99.5L321 100.5L322.5 104.5L356 98V96L360 95L361.5 90.5L358 87L357.5 85L360 82V79.5H358L354 75L323.5 82L322.5 79.5Z" stroke="black" id='pennsylvania' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M328 73.5L323 79V79.5L324 81L354.5 74.5L358 79L360.5 78.5V80L367 82.5L368.5 80L366 57H364V54L363 53.5L363.5 49L360.5 43.5L350.5 45.5L343 55.5V57H345V61.5L341 65L338.5 65.5L336.5 67L333.5 65.5L326 68.5L328 73.5Z" stroke="black" id='newyork' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M372.5 39.5L361 43L364 48.5L363 53L364.5 53.5V56.5H366.5L367.5 64L371.5 62V56.5V53L372.5 49.5L371.5 47.5L374 45L373.5 43L372.5 39.5Z" stroke="black" id='vermont' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M268.5 92.5L265.5 85L246 86.5L249 90.5L247.5 92.5L247 95.5L241.5 96.5L244 101L242 104L241.5 105L240.5 107.5V112L247.5 118V121.5H250L251.5 122L250 127L257.5 133.5V137L259.5 139L261.5 136.5L265.5 138L266.5 136.5L265 135L268.5 133V132.5V130V127L272 120L270 118.5V116.5L271 115L268.5 92.5Z" stroke="black" id='illinois' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M76 23L78.5 12.5L116 19L153.874 23.0454C153.449 23 152.205 61.4295 151.5 61.5C146.5 62 133 59.5 129 59.5C125.8 59.5 111 57.5 104 56.5L103 59.5L101.5 56.5L97.5 59L90.5 59.5L89.5 55H88L89 52L88 51.5L86.5 51V50L85 45.5L82.5 47.5L81.5 46.5L82 46L83.5 43.5V41L85.5 36.5L83.5 35.5L77.5 28V24.5L76 23Z" stroke="black" id='montana' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M200 24.5L153.5 23L152.5 53L202.5 55L204.5 53L203.5 50.5L202.5 46.5L201.5 36L199 32L200 24.5Z" stroke="black" id='northdakota' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M201 57.5L201.5 55.5L204 53L203 50L202 46.5L201.5 36L199 31.5L199.5 24.5H211.5V21.5H214L215.5 27H227L231 31L232.5 30L236.5 33L241 30.5L243.5 31L248.5 32L245.5 35.5H242L232 45.5V53L228 55.5L229.5 59V65L233.5 69H236.5L239.5 71.5L240.5 77.5H204V60.5L201 57.5Z" stroke="black" id='minnesota' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M286.5 42.5L285 43.5V44H279L278.5 42.5L277 43.5L273 44L269 45.5L267 45L265 46L264 45.5L261.5 43H258.5L258 43.5H256.5V41.5L259.5 37.5L257.5 38L251 43.5L249 44L245 47L247 49L253 49.5L254.5 51H259.5L262.5 54L265 57.5L268.5 51L270.5 53L272.5 49.5L276 50L277.5 48H280L283 50V48H291V46.5L288.5 47L286.5 42.5Z" stroke="black" class='michigan' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M50.5 6.5C48.5 6.1 38 2.66667 33 1V4.5H31V8H28.5L21.5 3.5L20.5 6.5V9.5L21 10.5V18.5L23 20.5L20.5 23L19.5 25L20.5 27H23L23.5 29L26.5 30V34.5L29.5 36.5L31 35.5L34.5 36.5L37 38.5H40.5H42.5L45 37.5L66 39C68 29.6667 71.7 11 70.5 11C69 11 53 7 50.5 6.5Z" stroke="black" id='washington' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M303 78V74L298 66.5L296 67.5L295.5 69L292.5 70.5L290.5 68.5V66L292 65L294 62.5L293.5 59L292 56L292.5 54.5L292 54L288 54.5L286 53L282 52.5V54L280 56V60L278.5 59.5V56L274.5 62L273.5 67.5V73L276 78L277 83L274 90.5L287.5 89L288.5 90.5L298 87.5L299 83L303 78Z" stroke="black" id='michigan' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M302 90L298 88L288 91L291.5 115.5H294.5L296 117.5H298L299 119.5L302 117.5L303 119.5L305.5 117.5L308.5 119.5L311 117.5V113.5H314V110.5L315.5 109L320 105.5V96.5L318 82.5L310 89H306.5L305.5 90H302Z" stroke="black" id='ohio' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M235 45.5H232.5L232 53L228 55.5L229.5 59V65L233.5 69H236.5L239.5 71.5L240.5 78L242.5 79.5L241 82.5L242.5 84.5H245L246 86L265.5 85V81.5V69.5L267.5 67.5L265.5 65L267.5 61.5L268 57L262.5 65L261.5 64L264 61V58L263.5 56.5L262 55.5L259 51H254.5L253 50L246 49L244 46.5L240.5 45.5V43L235 45.5Z" stroke="black" id='wisconsin' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M20 29.5V27H22.5L23.5 29L26.5 30V34.5L29.5 36H31H34.5L37 38H40.5L42.5 39L44.5 37.5L55.5 38L66 39L67.5 44.5L64.5 48L63 51L61 53.5V56L63 57.5L60 62L57.5 77.5L7.5 66L6.5 62L7.5 59L7 57L11.5 52.5L20 29.5Z" stroke="black" id='oregon' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M78.5 12.5L71 11L66 39L67.5 44.5L64 48.5L63 51L61 53.5V56L62.5 57.5L60 61.5L58 77C64 78.3333 76.9 81.6 78.5 82C80.1 82.4 93.3333 84.8333 99.5 85.5L103.5 60.5L101.5 56.5L98 58.5L90.5 59.5L89.5 55L88 55.5L88.5 52L86.5 50L85 46L82.5 47.5L81.5 47L83 44L83.5 41L85.5 36.5L83.5 35.5L77.5 28V24.5L75.5 22.5L78.5 12.5Z" stroke="black" id='idaho' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M98.5 94.5L104 56.5L151.5 62L149 100.5C141.667 99.8333 126.2 98.5 123 98.5C119.8 98.5 105.333 95.8333 98.5 94.5Z" stroke="black" id='wyoming' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M68 139.5L78 82L58.5 77.5L36.5 73L29 102L61.5 147L63.5 137.5L68 139.5Z" stroke="black" id='nevada' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M107.5 136L70 130.5L78 82L99.5 85.5L98.5 94.5L112.5 97.5L107.5 136Z" stroke="black" id='utah' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M164 101.5L112.5 97.5L108 136L136 139.5C142.4 140.3 155.667 141.333 161.5 141L164 101.5Z" stroke="black" id='colorado' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M202 55L152.5 52.5L151 66.5L150 80.5L189 82.5L193 87.5L194.5 84.5H199L199.5 86.5H203L204 82.5V77.5V61L201 57.5L202 55Z" stroke="black" id='southdakota' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M149 100.5L150.5 81L188.5 82.5L193 87L194.5 84.5H199V87H203.5L204.5 90.5L208 94L206.5 98L208 101.5L209 108.5L212 112L164 111V101.5L149 100.5Z" stroke="black" id='nebraska' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M6 67.5L7.5 65.5L36.5 73L29 102L61.5 146.5L62.5 153.5L65 157L60.5 159L59.5 162.5L58 164.5L59.5 168.5V171L36.5 168.5V161.5L31.5 155.5H29V151.5H26.5L22 146.5L13.5 143.5L15.5 137H13.5L15.5 134L11.5 128L8.5 121.5L11.5 119.5V117.5L7.5 116.5V110.5L10 112.5V107.5H15.5L10 105.5L7.5 107.5L4.5 105.5L6 103L3 97V91L4.5 87.5L1 80L6 75V73L7.5 71.5L6 67.5Z" stroke="black" id='california' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M83.5 188.5L56.5 172L59.5 171V168.5L58 164.5L59.5 162L60.5 159L64.5 157L62.5 153L61.5 146.5L63.5 137.5L68 139.5L69.5 130.5L108 136L101 190.5L83.5 188.5Z" stroke="black" id='arizona' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M101.5 190.5L108.5 136L131 139L154.5 141.5V145L150.5 189.5L121.5 186L120.5 188H108.5L107.5 191.5L101.5 190.5Z" stroke="black" id='new mexico' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M162 140.5L163.5 111L212 112L216 114L214.5 118L218.5 121L219.5 141.5L162 140.5Z" stroke="black" id='kansas' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M203.5 78H240L242 79.5L241 82.5C242.449 84.9588 243.355 84.9383 245 84.5L249 90.5L247 93V95.5L242 96.5L244 101L242 104.5L241 105.5V106.5L238 105.5H208.5V102.5L206.5 98L208.5 94L204.5 90.5L203.5 86.5L204.5 81.5L203.5 78Z" stroke="black" id='iowa' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M154.5 145.5V141L150.5 190L122 186.5L121 188.5L135 204.5V208.5L142.5 215.5L149 217.5L154.5 211.5H162.5L169.5 217.5L171.5 224L175.5 232L179 233V239L182 245L193.5 248L197 250.5C197.667 249.167 198.6 245 197 239C195 231.5 201.5 232 201.5 229C201.5 226.6 210.833 222.667 215.5 221L218 217.5L226.5 212.5L228 208.5V204.5L229.5 198L228 196.5L224.5 190V174H219.5L214.5 170L209.5 172.5L205.5 174L201.5 170L199 174L195.5 170L192.5 172.5V170H188.5L182 168.5V166L181 167L176.5 164.5V146.5L154.5 145.5Z" stroke="black" id='texas' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M155 145.5L154.5 141H186.5L219.5 141.5V146L221 155L219 173L214.5 169.5L206 174L201.5 169.5L199 174L195.5 169.5L192.5 172.5V169.5L188.5 170L182 168.5V166L181 167L176.5 164V146.5L155 145.5Z" stroke="black" id='oklahoma' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M216 114L212.5 112.5L209.5 108.5L209 105.5H238.5L240.5 106.5V112L247.5 118V121.5L251.5 122L250 127L257.5 133.5V137L259.5 139.5L260.5 138.5V143L257.5 145.5V150L252.5 149L254 147L252.5 145.5H219.5L218 120.5L214.5 118L216 114Z" stroke="black" id='missouri' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M252.5 146H219.5L221 155L219 173.5L224.5 174V180L248 181V177V173.5L250 169.5L251 167.5L251.5 165.5V161L253.5 159.5L254.5 156.5L256 152.5L257 150H255.5L252.5 149L253.5 147L252.5 146Z" stroke="black" id='arkansas' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M261.5 136.5L260.5 143.5H270V141.5L304 138L310 134V131.5L313.5 127.5L308.5 123V119L306 118L303 119L301.5 118L299 119L298 118H295V116H291.5V119L289.5 120.5L287.5 118L286 125.5L283.5 127.5L281 125.5L280 130L278 128.5L276.5 130H274H268.5V133L265.5 135L266.5 136.5L265.5 138L261.5 136.5Z" stroke="black" id='kentucky' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M257.5 150L254 158.5L280.5 157L300 154L302.5 150V148.5H306.5L311 142L313 144L314 142H316L318 138.5V136.5L270.5 142V144H260L257.5 146.5V150Z" stroke="black" id='tennessee' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M247 181L224.5 180V189.5L226 193L229.5 198L228 204.5V208.5L227 212H231.5V210.5L235.5 213.5L244 215L243 210.5L248 213.5L249.5 215.5H256.5L257.5 217.5L259 215.5L258.5 212L266 217.5L267.5 215L262 212L264.5 210.5L262 207H255.5L262 204.5L260.5 200.5V198L245.5 199V195.5L248 192L251 186L248 183.5L247 181Z" stroke="black" id='louisiana' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M270.5 159H254L251.5 161.5V166L250 170L248 173.5V177.5V180.5V182.5L251.5 186L246 195.5V198.5L261 197.5V200.5L263 205.5L266.5 204L272.5 203L270.5 191V159Z" stroke="black" id='mississippi' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M290 156.5L271 157.5V192L273 203L274.5 204.5L275.5 199.5V204.5L280.5 203L278 197L299 194V192L297.5 187L299 180.5L296.5 177.5L290 156.5Z" stroke="black" id='alabama' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M284 200L280.5 203L278 197L298.5 194.5H301L312.5 194L323 193.5L324.5 192H328.5L330 193C330 194.667 330.5 198.9 332.5 202.5C334.5 206.1 338 210.333 339.5 212L338 213L348.5 229L347 243.5L340.5 244.5L338 240L334.5 238.5L330 229L328 231L324 226.5L325.5 223V220.5L322.5 223V213L321 209H317L311 202.5H308.5L306.5 204.5L298.5 207L297 204.5L290 200L284 202.5V200Z" stroke="black" id='florida' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M297 177L290 156L308.5 153.5V156L313 158.5L317 163.5L319 166H321L322 168.5L326 170.5V174L329 175.5V178L331.5 179L330.5 180.5V184L329 186.5L330.5 187L328.5 192H324L323 193.5L299.5 194.5V191.5L298 187L299.5 180.5L297 177Z" stroke="black" id='georgia' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M313.5 152L309 153V155.5L313.5 158.5L319 165L321.5 166L322.5 168L326 170L326.5 173.5L329.5 174.5V177.5L332.5 178.5L332 176H334V173.5L335.5 174.5L343.5 166L342 164L346 158.5L336.5 150.5L328.5 152L326 149.5L315 150.5L313.5 152Z" stroke="black" id='southcarolina' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M328.5 135L318.5 136V138L316 142.5H314.5L313 144.5L311 143L306 149L303 148V150L300 154L307.5 153L313 151.5L315 150L325.5 149L328.5 151.5L336.5 150L346.5 158L352.5 157V154L357.5 148L361 147L363 144L366 141L368 138L365.5 134L362 136V134L357.5 135L364.5 131.5L363 128L328.5 135Z" stroke="black" id='northcarolina' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M330 134.5L305.5 137.5L310.5 134.5V131.5L314 127.5L316 130.5L322 127.5L327.5 125.5V124L330 114.5L331 115.5H334.5V112L336.5 108.5L339 104.5L342 105.5L344 104L345 106.5L349 108.5L347.5 112L349 111L350.5 115.5L357.5 119V124L350 123L356 125.5L361 125L362.5 127.5L330 134.5Z" stroke="black" id='virginia' stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <line x1="28.25" y1="57" x2="28.25" y2="257" stroke="#211A12" stroke-width="0.5"/>
            <line y1="235" x2="255" y2="235" stroke="#211A12" stroke-width="0.5"/>
        </svg>
    )
}