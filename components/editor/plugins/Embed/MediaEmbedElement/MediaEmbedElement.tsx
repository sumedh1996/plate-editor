/* eslint-disable */
import * as React from 'react';
import { useEditorRef } from '@udecode/plate-core';
import { MediaEmbedElementProps } from './MediaEmbedElement.types';
import { ReactEditor } from 'slate-react';
import { getMediaEmbedElementStyles, setNodes } from '@udecode/plate';

export const MediaEmbedElement = (props: MediaEmbedElementProps) => {
  const {
    attributes,
    children,
    nodeProps,
    styles: _styles,
    element,
    classNames,
    prefixClassNames,
    ...rootProps
  } = props;
  const [iframeHeight, setIframeHeight] = React.useState('26rem');

  const embedRef = React.useRef<HTMLIFrameElement>();

  React.useEffect(() => {
    if (element.script) {
      if (isNaN(Number(embedRef.current.style.height.slice(0, -2)))) {
        handleIframeResize(
          embedRef.current.contentWindow.document.body.scrollHeight + 30 + 'px'
        );
      } else {
        handleIframeResize(
          Math.max(
            embedRef.current.contentWindow.document.body.scrollHeight + 30,
            Number(embedRef.current.style.height.slice(0, -2))
          ) + 'px'
        );
      }
    }
  }, []);

  function handleIframeResize(height) {
    const path = ReactEditor.findPath(editor as ReactEditor, element);
    setNodes(
      editor,
      {
        ...element,
        height: element.embedType === 'tweet' ? '37rem' : height,
      },
      { at: path }
    );
    setIframeHeight(height);
  }

  const editor = useEditorRef();
  const { url } = element;
  const querySeparator = url.includes('?') ? '' : '?';

  const styles = getMediaEmbedElementStyles(props);

  return (
    <div
      {...attributes}
      className={styles.root.className}
      {...rootProps}
      style={{
        width: '100% !important',
      }}
    >
      <div
        contentEditable={false}
        style={{
          width: '100% !important',
        }}
      >
        {element.script ? (
          <div className={styles.iframeWrapper?.className}>
            <iframe
              ref={embedRef}
              style={{
                margin: 'auto',
                height: element.embedType === 'tweet' ? '37rem' : iframeHeight,
              }}
              onLoadedData={() => {
                handleIframeResize(
                  embedRef.current.contentWindow.document.body.offsetHeight +
                    30 +
                    'px'
                );
              }}
              onLoad={() => {
                handleIframeResize(
                  embedRef.current.contentWindow.document.body.offsetHeight +
                    30 +
                    'px'
                );
              }}
              // css={styles.iframe?.css}
              className={styles.iframe?.className}
              title="embed"
              srcDoc={element.htmlToEmbed}
              frameBorder="0"
              width="100%"
              {...nodeProps}
            />
          </div>
        ) : (
          <div className={styles.iframeWrapper?.className}>
            <iframe
              style={{
                minHeight: '26rem',
              }}
              // css={styles.iframe?.css}
              className={styles.iframe?.className}
              title="embed"
              src={`${url}${querySeparator}&title=0&byline=0&portrait=0`}
              frameBorder="0"
              width="100%"
              {...nodeProps}
            />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
