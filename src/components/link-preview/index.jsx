import React from 'react';

import { getURLMetaInfo }  from '../../services';

const LinkPreview = ({context}) => {
  const data = context.getLinkPreview();

  const fetchMetaInfo = async (url) => {
    const urlMetaInfo = await getURLMetaInfo(url);
  };

  React.useEffect(() => {
    if(data && data.url) {
      fetchMetaInfo(data.url);
    }
  }, [data]);
  return (
    <div>

    </div>
  );
}

export default LinkPreview;
