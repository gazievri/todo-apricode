import React from 'react';
import './Footer.sass';

const Footer: React.FC = () => {
  return (
    <footer className='footer'>
      <p className="footer__copyright">{`© ${new Date().getFullYear()}, Ruslan Gaziev`}</p>
      <a className="footer__github" href="https://github.com/gazievri/todo-apricode" target="blank">Github</a>
    </footer>
  )
}

export default Footer;