import React from 'react';

import { getURLMetaInfo } from '../../services';
import DeleteIcon from '../icons/delete-icon';

const LinkPreview = ({ previewList, toggleShowPreview }) => {
  const [metaData, setMetaData] = React.useState({
    data: null,
    offsetKey: null,
  });
  const [isLoading, setLoading] = React.useState(false);

  const fetchPreview = async (previewList) => {
    if(previewList.size) {
      setLoading(true);
      const firstLink = [...previewList]
      .map(([key, value]) => ({
        offsetKey: key,
        url: value.url,
        showPreview: value.showPreview
      })).filter(data => data.showPreview)[0];
      if (firstLink) {
        try {
          const { url } = firstLink;
          const resp = await getURLMetaInfo(url);
          setMetaData({data: resp, offsetKey: firstLink.offsetKey});
        } catch(e) {
          setMetaData({data: {
            image: '',
            title: 'Failed to load',
            description: 'Failed to load'
          }, offsetKey: firstLink.offsetKey});
        } finally {
          setLoading(false);
        }
      } else {
        setMetaData({data: null, offsetKey: null});
      }
    } else {
      setMetaData({data: null, offsetKey: null});
    }
  };

  React.useEffect(() => {
    if(previewList) {
      fetchPreview(previewList);
    }
  }, [previewList]);

  return (
    <>
    <style jsx>
      {`
        .asset-overview, .asset-overview-container {
          display: flex;
          flex-direction: column;
          color: #2F363F;
          text-decoration: none;
          border-radius: 8px;
        }
        .asset-overview-container {
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);
          margin-top: 24px;
          position: relative;
        }
        .meta-image-banner {
          width: 100%;
          height: 165px;
          object-fit: cover;
          border-radius: 8px;
        }
        .meta-container {
          width: 100%;
          border-bottom-left-radius: 8px;
          border-bottom-right-radius: 8px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #F9FAFC;
          padding: 12px;
        }
        .meta-title {
          padding: 4px 0;
          margin-bottom: 8px;
          font-size: 14px;
        }
        .meta-sub-title {
          padding: 4px 0;
          font-size: 12px;
        }
        .delete-icon {
          width: 32px;
          height: 25px;
          border-radius: 4px;
          padding: 4px, 8px, 4px, 8px;
          border: 1px solid #D1D5DB;
          background: #FFFFFF;
          position: absolute;
          top: -8px;
          right: -8px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .dummy-title {
          width: 140px;
          height: 24px;
        }
        .dummy-sub-title {
          width: 80px;
          height: 24px;
        }
        @media (max-width: 981px) {
          .desktop--only {
            display: none !important;
          }
        }
        @media (min-width: 981px) {
          .mob--only {
            display: none !important;
          }
        }
      `}
    </style>
    {
      isLoading ? (<>
      <div className="asset-overview-container">
        <div className="meta-image-banner rectangle loader">
        </div>
        <div className="meta-container">
          <div className="meta-title dummy-title rectangle loader">
          </div>
          <div className="meta-sub-title dummy-sub-title rectangle loader">
          </div>
        </div>
      </div>
      </>) : (<>
        {
          metaData.data && (
          <div className="asset-overview-container">
            <span className="delete-icon" onClick={() => {
              toggleShowPreview('toggleShow', {
                offsetKey: metaData.offsetKey
              });
            }}>
              <DeleteIcon />
            </span>
            <a className="asset-overview" href={metaData.url}>
              <div className="meta-image-banner rectangle">
                <img src={metaData.data.image} className="meta-image-banner"/>
              </div>
              <div className="meta-container">
                <div className="meta-title rectangle">
                  {metaData.data.title}
                </div>
                <div className="meta-sub-title rectangle">
                  {metaData.data.description}
                </div>
              </div>
            </a>
          </div>
          )
        }
      </>)
    }
    </>
  );
};

export default LinkPreview;
