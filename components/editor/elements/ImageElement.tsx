/* eslint-disable */
import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { insertNodes, setNodes, TImageElement } from '@udecode/plate';
import { PlateRenderElementProps, useEditorRef } from '@udecode/plate-core';
import { ReactEditor, useFocused, useSelected } from 'slate-react';
import { getImageElementStyles } from '@udecode/plate';
import { removeBlocksAndFocus } from '@udecode/plate';
import { Input, Popover } from 'antd';
import Conditional from '../../Conditional';
import UIButton from '../../UIButton';
import { MyValue } from '../types/PlateTypes';
// import { ImageElementProps } from './ImageElement.types';
// import UIButton from '@/Components/UI/UIButton';
// import Conditional from '@/Components/Utils/Conditional';

export const ImageElement = (
  props: PlateRenderElementProps<MyValue, TImageElement>
) => {
  const {
    attributes,
    children,
    element,
    nodeProps,
    caption = {},
    align = 'center',
  } = props;

  const { placeholder = 'Write a caption...' } = caption;

  const {
    url,
    alt: altText,
    width: nodeWidth = '100%',
    caption: nodeCaption = [{ children: [{ text: '' }] }],
  } = element;

  const focused = useFocused();
  const selected = useSelected();
  const editor = useEditorRef();
  const [width, setWidth] = useState(nodeWidth);
  const [altTextEditorOpen, setAltTextEditorOpen] = useState(false);
  const [imageAltText, setImageAltText] = useState(altText);
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  useEffect(() => {
    setWidth(nodeWidth);
  }, [nodeWidth]);

  const styles = getImageElementStyles({
    ...props,
    align,
    focused,
    selected,
  } as any);

  const onChangeCaption: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      const path = ReactEditor.findPath(editor as ReactEditor, element);
      setNodes(editor, { caption: [{ text: e.target.value }] }, { at: path });
    },
    [editor, element]
  );

  const handleKeyDown: any = useCallback(
    (e: any) => {
      if (e.code === 'Backspace' && !e.target.value.trim()) {
        const path = ReactEditor.findPath(editor as ReactEditor, element);
        removeBlocksAndFocus(editor, { at: path });
      }
      if (e.code === 'Enter') {
        e.preventDefault();
        const path = ReactEditor.findPath(editor as ReactEditor, element);
        const newPath = [path[0] + 1];
        insertNodes(
          editor,
          [
            {
              type: 'p',
              children: [
                {
                  text: '',
                },
              ],
            },
          ],
          { at: newPath }
        );
        const newSelection = {
          anchor: {
            offset: 0,
            path: [...newPath, 0],
          },
          focus: {
            offset: 0,
            path: [...newPath, 0],
          },
        };
        editor.selection = newSelection;
        ReactEditor.focus(editor);
      }
    },
    [editor, element]
  );

  const onSaveAltText = useCallback(() => {
    const path = ReactEditor.findPath(editor as ReactEditor, element);
    setNodes(editor, { alt: imageAltText }, { at: path });
    setAltTextEditorOpen(false);
  }, [editor, element, imageAltText]);

  return (
    <div
      {...attributes}
      contentEditable={false}
      // @ts-ignore
      style={styles.root.css[1]}
      className={styles.root.className}
      onMouseEnter={() => setIsPopoverVisible(true)}
      onMouseLeave={() => {
        if (!altTextEditorOpen) {
          setIsPopoverVisible(false);
        }
      }}
    >
      <figure
        // @ts-ignore
        style={styles.figure?.css[1]}
        // @ts-ignore
        className={`group ${styles.figure?.className} relative`}
      >
        <Conditional condition={isPopoverVisible}>
          <Popover
            trigger='click'
            open={altTextEditorOpen}
            onOpenChange={(open) => setAltTextEditorOpen(open)}
            destroyTooltipOnHide={false}
            placement='bottom'
            color='#212121'
            overlayClassName='editor-img-alt'
            overlayInnerStyle={{
              borderRadius: 8,
            }}
            content={
              <div className='max-w-xs bg-[#212121] rounded-lg p-4 flex flex-col items-center'>
                <div className='alt-desc flex flex-col gap-2'>
                  <h3 className='text-white text-base font-medium'>Alt-text</h3>
                  <p className='text-[#BBBBBB] text-sm'>
                    You can add alt-text to your photos so they’re accessible to
                    even more people, including people who are blind or have low
                    vision.
                  </p>
                </div>
                <div className='w-full flex flex-col gap-4 mt-4'>
                  <Input.TextArea
                    maxLength={300}
                    rows={5}
                    // showCount
                    value={imageAltText}
                    onChange={(e) => setImageAltText(e.target.value)}
                    className='editor-img-alt-textarea px-2 bg-transparent text-white h-full w-full rounded-lg focus:outline-none focus:border-none border overflow-hidden border-[#bfbfbf]'
                  />

                  <div className='w-full flex justify-between gap-1'>
                    <UIButton
                      onClick={() => {
                        setAltTextEditorOpen(false);
                        setImageAltText(altText);
                      }}
                      className='w-full bg-transparent text-white'
                      variant='tertiary'
                    >
                      Cancel
                    </UIButton>
                    <UIButton
                      onClick={() => onSaveAltText()}
                      className='w-full'
                      variant='primary'
                    >
                      Save
                    </UIButton>
                  </div>
                </div>
              </div>
            }
          >
            <div className='bg-[#212121] text-white z-10 absolute top-2 right-2 px-3 py-1 rounded-lg cursor-pointer'>
              {imageAltText ? 'Edit' : 'Add'} alt text
            </div>
          </Popover>
        </Conditional>
        <img
          data-testid='ImageElementImage'
          // @ts-ignore
          style={{
            border: selected ? '5px solid teal' : 'none',
          }}
          className={`${styles.img?.className}`}
          src={url}
          {...nodeProps}
          alt={imageAltText}
        />
        <figcaption style={{ width }}>
          <TextareaAutosize
            style={{
              outline: 'none',
              width: '100%',
              textAlign: 'center',
              resize: 'none',
              color: 'var(--article-body)',
            }}
            className='bg-backgroundColor-skin-secondary'
            defaultValue={nodeCaption[0].text}
            placeholder={placeholder}
            onChange={onChangeCaption}
            onKeyDown={handleKeyDown}
          />
        </figcaption>
      </figure>
      {children}
    </div>
  );
};
