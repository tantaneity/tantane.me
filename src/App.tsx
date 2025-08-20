import React from 'react';
import Layout from './components/Layout';
import Avatar from './components/Avatar';
import Header from './components/Header';
import Card from './components/Card';
import { APP_CONSTANTS } from './constants/app';
import { userProfile } from './data/profile';
import './App.css';

const App: React.FC = () => {
  return (
    <Layout useDynamicColors={true} avatarSrc={APP_CONSTANTS.USER_AVATAR}>
      <Avatar
        src={APP_CONSTANTS.USER_AVATAR}
        size={APP_CONSTANTS.AVATAR_SIZE}
      />
      
      <Header username={APP_CONSTANTS.USERNAME} />
      
      <Card title={<>About me</>} expandable defaultExpanded>
        <p>{userProfile.bio}</p>
      </Card>

      <Card title={<>Stack</>} expandable>
        <div className="skills-container">
          <h3>Skills</h3>
          
          {userProfile.skillSections.map((section, index: number) => (
            <div key={index} className="skill-section">
              <h4>{section.title}</h4>
              <p>{section.skills}</p>
            </div>
          ))}
        </div>
      </Card>
    </Layout>
  );
};

export default App;
