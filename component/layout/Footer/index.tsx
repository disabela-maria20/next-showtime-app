import React from 'react';
import text from '../../services/localization/pt.json';
const Footer = () => {
  return (
    <footer className="bg-black text-white py-14">
      <div className="container max-w-490 m-auto px-12">
        <div className="grid md:grid-cols-2 gap-3.5">
          <div className="">
            <h2>Precisa de ajuda?</h2>
            <p>Entre em contato com</p>
            <a href="mailto:exemplo@exemplo.com.br">exemplo@exemplo.com.br</a>
          </div>
          <div className="md:flex md:justify-end md:items-center">
            <img
              src={text.menu.logo.src}
              alt={text.menu.logo.src}
              className="max-w-50 object-cover"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
