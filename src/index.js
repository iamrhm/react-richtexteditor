import React from 'react';
import Provider from './context/Provider';
import Editor from './App';

export default function () {
  return (
    <Provider>
      <Editor />
    </Provider>
  )
}