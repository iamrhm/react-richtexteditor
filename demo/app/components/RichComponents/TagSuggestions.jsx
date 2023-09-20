/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-array-index-key */
import React from 'react';

import CloseIcon from '../icons/close-icon';

const renderProfileSuggestionRow = (profileData) => (
  <>
    <div className="flex">
      <div className="w-8 h-8 mr-2 border border-gray-200 rounded-full">
        <img
          src={profileData?.image}
          className="w-8 h-8 mr-2 border border-gray-200 rounded-full"
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            {profileData?.name}
          </div>
        </div>
        <div className="text-xs text-slate-400">
          {profileData?.intro}
        </div>
      </div>
    </div>
  </>
);

const TagSuggestions = ({
  suggestions,
  trigger,
  handleAddTag,
  onClose,
}) => {
  return (
    <>
      <div className="relative">
        <div className="absolute right-0 top-0 p-2 z-30">
          <span
            className="py-2 px-2 hover:bg-slate-100 text-white flex items-center justify-center rounded cursor-pointer text-xs"
            onClick={onClose}
          >
            <CloseIcon />
          </span>
        </div>
        <div className="relative h-52 overflow-y-auto">
          {suggestions.map(data => (
            <div
              className="py-3 px-4 cursor-pointer hover:bg-slate-100"
              key={data.id}
              onClick={() => handleAddTag(data)}
            >
              {renderProfileSuggestionRow(data)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TagSuggestions;
