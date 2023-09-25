import React from 'react';

export default function Modal({ children }: {children: JSX.Element}) {
  return(
    <>
      <style jsx>
        {`
          .fixed-modal-backdrop {
            position: fixed;
            width: 100%;
            height: 100vh;
            top: 0;
            left: 0;
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(0, 0, 0, 0.5);
          }
        `}
      </style>
      <div className="fixed top-0 left-0 right-0 z-50 w-full h-screen flex items-center justify-center">
        <div className="fixed top-0 left-0 right-0 w-full h-screen bg-slate-900 flex items-center justify-center opacity-80" />
        {children}
      </div>
    </>
  );
}