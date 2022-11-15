/* eslint-disable */
// stale
import React, { useContext } from 'react';
import { useEditorRef } from '@udecode/plate-core';
// import AddIcon from '@/../../public/Add.svg';
import { useEditorContext } from '../../../../context/EditorContext';
import LineBreakBtn from '../LineBreak';
import EmbedButton from '../EmbedButton';
// import EmbedButton from '../InsertMediaButton';
// import ImageSearch from '../ImageButton';
// import ImageUpload from '../ImageUpload';
// import { EditorContext } from '@/Context/EditorContext';
// import LineBreakBtn from '../LineBreak';
// import PhotoComp from '../../elements/imageGallery/PhotoComp';
// import { IImageArr } from '@/Types/Editor';
// import DividerButton from '../DividerButton';

interface Props {
  children: React.ReactNode;
}

interface PopupMenuProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
  setNode: React.Dispatch<
    React.SetStateAction<Element | DocumentFragment | null>
  >;
  // imageArr: IImageArr[];
  // setImageArr: React.Dispatch<React.SetStateAction<IImageArr[]>>;
  // hasDivider: number;
  // canMakeExclusive: boolean;
}

function SideBarButton({ children }: Props) {
  return (
    <button
      style={{
        border: '2px solid var(--text-secondary)',
        borderRadius: '15px',
        padding: '3px',
        paddingInline: '10px',
        margin: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        background: 'none',
        height: '30px',
        overflow: 'hidden',
      }}
    >
      {children}
    </button>
  );
}

function PopupMenu({
  setVisible,
  visible,
  setNode,
}: // imageArr,
// setImageArr,
// hasDivider,
// canMakeExclusive,
PopupMenuProps) {
  const editor = useEditorRef();
  const { editorLocation } = useEditorContext();

  const buttons = [
    <LineBreakBtn setNode={setNode} />,
    <EmbedButton editor={editor} location={editorLocation} setNode={setNode} />,
  ];

  // if (
  //   canMakeExclusive &&
  //   creatorSubscriptionPlanActive === 'active' &&
  //   hasDivider < 0
  // )
  //   buttons.push(<DividerButton setNode={setNode} />);

  return (
    <span
      style={{
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: '-10px',
        transition: 'all 1s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        zIndex: 50,
      }}
      contentEditable={false}
    >
      <button
        style={{
          transform: visible
            ? 'rotateZ(45deg) scale(1.3)'
            : 'rotateZ(0deg) scale(1.3)',
          transition: 'all 0.3s ease-in-out',
        }}
        onMouseDown={() => {
          setVisible((prev: boolean) => !prev);
        }}
      >
        +
      </button>
      {visible && (
        <div
          className='bg-backgroundColor-skin-secondary'
          style={{
            width: '800px',
            fontSize: '14px',
            height: '20px',
            position: 'relative',
            left: '10px',
            transition: 'all 1s ease',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <>
            {buttons.map((element, index) => (
              <SideBarButton>{element}</SideBarButton>
            ))}
          </>
        </div>
      )}
    </span>
  );
}

export default PopupMenu;
