import React from 'react';
import { createPortal } from 'react-dom';

const Menu: React.FC<{ node: Element | DocumentFragment }> = ({ node }) => {
  return createPortal(
    <div className='absolute top-0 -left-10'>Menu Button Here</div>,
    node
  );
};

export default Menu;
