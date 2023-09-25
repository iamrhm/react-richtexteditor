/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

const RichPopUp = ({
  className, children,
  hideSuggestions, editorRef,
}) => {
  const hintRef = React.useRef(null);

  const handleOutSideClick = (e) => {
    const elm = e.target;
    if (hintRef.current && elm && editorRef.current) {
      const isOutside =
        !hintRef.current.contains(elm) &&
        !editorRef.current.contains(elm);
      if (isOutside) {
        hideSuggestions();
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('click', handleOutSideClick);
    return () => {
      window.removeEventListener('click', handleOutSideClick);
    };
  }, []);

  return (
    <div
      className={`bg-white z-50 min-w-[420px] max-w-[500px] fixed border border-gray-200 rounded shadow-md ${className}`}
      ref={hintRef}
    >
      {children}
    </div>
  );
};

export default React.forwardRef(
  (props, ref) => {
  return (
    <RichPopUp editorRef={ref} {...props} />
  );
});