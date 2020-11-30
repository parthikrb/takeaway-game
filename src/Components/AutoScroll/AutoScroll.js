import React, { useEffect, useRef } from "react";

/**
 * Component to scroll the view to bottom of conversation automatically
 */
const AutoScroll = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

export default AutoScroll;
