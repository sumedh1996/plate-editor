/* eslint-disable */
// import useCreatorAPI from '@/Hooks/api/useCreatorAPI';
import React, { useContext, useState } from 'react';

export const EditorContext = React.createContext({});

export default function EditorContextProvider(props: {
  children: React.ReactNode;
}) {
  // const { canMakeExclusive } = props;
  const [editorLocation, setEditorLocation] = useState<any>(false);
  const [emojiVisible, setEmojiVisible] = useState<any>(false);
  const [linkLocation, setLinkLocation] = useState<any>(null);
  const [linkData, setLinkData] = useState<any>(null);
  // const { creatorSubscriptionPlanActive } = useCreatorAPI();

  return (
    <EditorContext.Provider
      value={{
        editorLocation,
        setEditorLocation,
        emojiVisible,
        setEmojiVisible,
        linkLocation,
        setLinkLocation,
        linkData,
        setLinkData,
        // creatorSubscriptionPlanActive,
        // canMakeExclusive,
      }}
    >
      {props.children}
    </EditorContext.Provider>
  );
}

export const useEditorContext: () => any = () => {
  const editorCtx = useContext(EditorContext);
  return editorCtx;
};
