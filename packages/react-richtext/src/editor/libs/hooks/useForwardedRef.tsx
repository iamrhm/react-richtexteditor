import React from 'react';

const useForwardedRef = (ref: React.ForwardedRef<HTMLDivElement>) => {
  const innerRef = React.useRef(null);
  React.useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  });
  return innerRef;
};

export default useForwardedRef;
