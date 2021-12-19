import React from 'react';

import './style.css';
import mockMentionData from '../../../../__mocks__/data.json';

const MentionSuggestion = ({
  handleAddMention = () => {}
}) => {

  return (
    <div>
      {
        mockMentionData.map((data, index) => (
          <div className="item" key={index}>
            <div className="item-title" onClick={() => {
                handleAddMention(data)
              }}>
              { data.title }
            </div>
            <div className="item-subtitle">
              { data.subtitle }
            </div>
          </div>
        ))
      }
    </div>
  );
}


export default MentionSuggestion;