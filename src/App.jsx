import {Showcase} from './components/showcase/Showcase.jsx';
import { appStyle } from './AppStyle.js';
import { Form } from './components/form/Form.jsx';
import { svg } from './components/fonts_colors';
import { Map } from './components/map/Map'

// Added Divs to visualize where the rest of the element go
function App() {
  return (
    <div style={appStyle} className="App">
      <div style={{gridColumn:'1/4', border:'black solid 1px', marginLeft:-50, marginRight:-50}}>Header</div>
      <svg style={svg} viewBox="0 0 512 257" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="512" y1="21.25" x2="217" y2="21.25" stroke="#211A12" stroke-width="0.5"/>
            <line x1="428.25" x2="428.25" y2="179" stroke="#211A12" stroke-width="0.5"/>
            <line x1="28.25" y1="57" x2="28.25" y2="257" stroke="#211A12" stroke-width="0.5"/>
            <line y1="221.75" x2="255" y2="221.75" stroke="#211A12" stroke-width="0.5"/>
        </svg>
      <Map />
      <div style={{gridColumn:'3', width: 200, border:'black solid 1px'}}>Side Thing</div>
      <div style={{gridColumn:'1/4', border:'black solid 1px'}}>Rest</div>
    </div>
  );
}

export default App;
