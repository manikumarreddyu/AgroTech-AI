// useScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function UseScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}

export default UseScrollToTop;
