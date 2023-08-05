import { useState } from 'react';
import './App.css';
import Bio from './common/Bio'
import EditBio from './common/EditBio';
import Skills from './common/Skills';
import Users from './common/Users';
import Resume from './common/Resume';

function App() {
  const [type, setType] = useState("HOME");
  const [aboutValues, setAboutValues] = useState(null);
  const [skillValues, setSkillValues] = useState(null);
  const [userSubType, setUserSubType] = useState("CODE")

  return (
    <div className="App">
      <div className='container mx-4 border-2 border-black rounded-md'>
        <div className='overflow-y-auto'>
          {type === "ABOUT" ? 
            <EditBio onClick={() => setType("HOME")} setAboutValues={setAboutValues} values={aboutValues} /> 
            :
            type === "SKILLS" ? <Skills onClick={() => setType("HOME")} setSkillValues={setSkillValues} values={skillValues} />
            :
            type === "USERS" ? <Users onClick={() => setType("HOME")} userSubType={userSubType} />
            :
            type === "RESUME" ? <Resume onClick={() => setType("HOME")} file={aboutValues?.resume} />
            :
            <Bio values={aboutValues} skillValues={skillValues} onClick={(val) => setType(val)} onClickSubType={(val) => setUserSubType(val)} /> }
        </div>
      </div>
    </div>
  );
}

export default App;
