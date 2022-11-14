import React from 'react';
import dynamic from 'next/dynamic';
import EditorContextProvider from '../context/EditorContext';

const NewEditor = dynamic(import('../components/editor'), {
  ssr: false,
});

const NewEditorPage = () => (
  <div style={{ marginInline: 'auto' }}>
    <EditorContextProvider>
      <NewEditor />
    </EditorContextProvider>
  </div>
);

export default NewEditorPage;
