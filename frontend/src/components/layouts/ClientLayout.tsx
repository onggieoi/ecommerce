import React from 'react';
import Footer from './Footer';

import Header from './Header';

type ClientLayoutProps = {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />

      <main id="main">
        {children}
      </main>

      <Footer />

      <a href="#" className="back-to-top"><i className="fa fa-chevron-up"></i></a>
    </>
  );
};

export default ClientLayout;
