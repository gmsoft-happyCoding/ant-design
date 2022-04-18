import React from 'react';

const Footer = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      borderTop: '1px solid var(--borderColorBase, #e9e9e9)',
      padding: '10px 16px',
      background: 'var(--componentBgColor, #fff)',
      textAlign: 'right',
    }}
  >
    {children}
  </div>
);

export default Footer;
