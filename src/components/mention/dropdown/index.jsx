import React from 'react';

import Suggestion from '../list';
import './style.css';

import mockMentions from '../../../__mocks__/data.json';

const searchText = (query) => {
  const textFilter = query.replace('@', '');
  return mockMentions
    .filter(data =>
      data.title.toLowerCase().includes(textFilter.toLowerCase())
    ) || [];
}

const Dropdown = (props) => {
  const [isOpen, setOpen] = React.useState(false);
  const query = props.decoratedText;

  React.useEffect(() => {
    setOpen(true);
    return () => {
      setOpen(false);
    }
  }, []);
  const filteredMention = searchText(query);

  return (
    <span>
      <span>{props.children}</span>
      {
        isOpen && filteredMention.length ? (
          <div className="dropdown">
            {filteredMention.map((data, index) => (
              <React.Fragment key={index}>
                <Suggestion {...data} />
              </React.Fragment>
            ))}
          </div>
        ) : null
      }
    </span>
  );
}


export default Dropdown;