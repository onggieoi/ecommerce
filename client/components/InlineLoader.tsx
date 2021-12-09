import React, { useEffect } from 'react';
import NProgress from 'nprogress';

const InlineLoader = () => {
  useEffect(() => {
    NProgress.start();

    return () => {
      setTimeout(() => {
        NProgress.done();
      }, 1000);
    };
  });

  return <></>;
};

export default InlineLoader;