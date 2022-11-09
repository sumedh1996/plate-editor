import React from 'react';
import dynamic from 'next/dynamic';

const NewEditor = dynamic(import('../components/editor'), {
  ssr: false,
});

const NewEditorPage = () => <div style={{maxWidth: 800, marginInline: 'auto'}}><NewEditor /></div>;

export default NewEditorPage;