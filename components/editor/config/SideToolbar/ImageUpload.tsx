import React, { useContext } from 'react';
import { notification, Upload } from 'antd';
import { ELEMENT_IMAGE, insertNodes } from '@udecode/plate';
import { ELEMENT_DEFAULT, useEditorRef } from '@udecode/plate-core';
// import { ELEMENT_IMAGE } from '@udecode/plate-image';
// import { BsUpload } from 'react-icons/bs';
// import UploadIcon from '../../../../public/upload.svg';
// import { EditorContext } from '@/Context/EditorContext';
import { removeBlocksAndFocus } from '@udecode/plate';
import { ReactEditor } from 'slate-react';
import { useEditorContext } from '../../../../context/EditorContext';
// import { article } from '@/API_Nest';
// import { newObjectId } from '@/Utils/Helper';
// import { useToast } from '@/Hooks/useToast';

export const newObjectId = () => {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
  const objectId =
    timestamp +
    'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, () => Math.floor(Math.random() * 16).toString(16))
      .toLowerCase();

  return objectId;
};

const ImageUpload = ({ setNode, imageArr, setImageArr }: any) => {
  const editor = useEditorRef();
  const { editorLocation } = useEditorContext();
  // const { openErrorToast } = useToast();

  const fileToBuffer = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        resolve(event.target.result);
      };
      reader.readAsDataURL(file);
    });

  const props = {
    name: 'file',
    multiple: false,
    beforeUpload: (file: any) => {
      let req;
      const location = editorLocation ? editorLocation.anchor : [0, 0];
      const id = window.location.href.split('/').pop();

      if (file.type.indexOf('image/') === 0) {
        const extension = file.name.split('.').pop();
        req = {
          fileName: `${id}/${newObjectId()}.${extension}`,
          fileType: `${file.type}`,
        };
        // article
        //   .uploadImage(id, req.fileType, 'content', URL.createObjectURL(file))
        //   .then((data) => {
        //     if (data instanceof Error) {
        //       ReactEditor.focus(editor);
        //       const position = {
        //         offset: 0,
        //         // @ts-ignore
        //         path: [location.path[0] + 1, 0],
        //       };
        //       removeBlocksAndFocus(editor, { at: position });
        //       // openErrorToast({
        //       //   title: 'Image not uploaded',
        //       //   subtitle: 'A error occured while uploading image',
        //       // });
        //     } else {
        //       setImageArr([
        //         ...imageArr,
        //         {
        //           fileName: req.fileName,
        //           url: data.imageUrl,
        //         },
        //       ]);
        //     }
        //   });
      }
      fileToBuffer(file).then((file: any) => {
        insertNodes(
          editor,
          [
            {
              type: ELEMENT_IMAGE,
              url: file,
              fileName: req.fileName,
              children: [{ text: '' }],
            },
            {
              type: ELEMENT_DEFAULT,
              children: [{ text: '' }],
            },
          ],
          {
            at: location,
          }
        );
        setNode(null);
      });
      return false;
    },
  };

  return (
    <Upload
      {...props}
      maxCount={1}
      showUploadList={false}
      className='upload-btn-custom'
    >
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          color: 'var(--article-body)',
        }}
      >
        <span>Upload Image</span>&nbsp;&nbsp;
        <span>{/* <UploadIcon /> */}</span>
      </span>
    </Upload>
  );
};

export default ImageUpload;
