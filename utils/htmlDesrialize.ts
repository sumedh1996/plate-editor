/* eslint-disable */
import { ELEMENT_MEDIA_EMBED, ELEMENT_IMAGE } from '@udecode/plate';
import { ELEMENT_CODE_BLOCK } from '@udecode/plate-code-block';
import { ELEMENT_CODE_LINE } from '@udecode/plate';
// import * as Sentry from '@sentry/nextjs';

function getNodesForCode(html: any, parentNode: any) {
  try {
    for (let node of html.childNodes) {
      if (node?.hasChildNodes()) {
        switch (node?.nodeName.toLowerCase()) {
          case 'p':
          case 'code': {
            if (node.getAttribute('wrapper') === 'true') {
              getNodesForCode(node, parentNode);
            } else {
              let currentNode;
              currentNode = {
                id: Math.round(Math.random() * 1000000000000),
                type: ELEMENT_CODE_LINE,
                children: [],
              };
              let index = parentNode.children.length;
              parentNode.children.push(currentNode);
              getNodesForCode(node, parentNode.children[index]);
            }
            break;
          }
          case 'span': {
            let currentNode: any = {
              text: node.innerText,
            };
            if (node.classList.contains('underline')) {
              currentNode = {
                ...currentNode,
                underline: true,
              };
            }
            if (node.classList.contains('font-bold')) {
              currentNode = {
                ...currentNode,
                bold: true,
              };
            }
            if (node.classList.contains('italic')) {
              currentNode = {
                ...currentNode,
                italic: true,
              };
            }
            if (node.classList.contains('inline-code')) {
              currentNode = {
                ...currentNode,
                code: true,
              };
            }
            parentNode.children.push(currentNode);
            break;
          }
        }
      } else {
        if (node?.textContent) {
          node.textContent = node.textContent.replace('<br>', /\n/g);
          node.textContent = node.textContent.replace('<br />', /\n/g);
          node.textContent = node.textContent.replace('<br/>', /\n/g);
          node.textContent.split(/\r\n|\r|\n/).forEach((text) => {
            let currentNode: any = {
              type: ELEMENT_CODE_LINE,
              children: [
                {
                  text,
                },
              ],
            };
            parentNode?.children?.push(currentNode);
          });
        }
      }
    }
  } catch (err) {
    // Sentry.captureException(err);
  }
}

function getNodesFromHtml(html: any, parentNode: any) {
  try {
    for (let node of html.children) {
      if (
        node.getAttribute('data-node-type') !== null &&
        node.getAttribute('data-node-type') !== 'leaf'
      ) {
        switch (node?.nodeName.toLowerCase()) {
          case 'p': {
            let type = node.getAttribute('data-node-type');
            let currentNode: any;
            if (node?.children.length) {
              currentNode = {
                id: Math.round(Math.random() * 1000000000000),
                type,
                children: [],
              };
              let index = parentNode.children.length;
              parentNode.children.push(currentNode);
              getNodesFromHtml(node, parentNode.children[index]);
            } else if (node?.innerText.trim()) {
              currentNode = {
                id: Math.round(Math.random() * 1000000000000),
                type,
                children: [
                  {
                    text: node.innerText,
                  },
                ],
              };
              parentNode.children.push(currentNode);
            } else {
              currentNode = {
                id: Math.round(Math.random() * 1000000000000),
                type,
                children: [
                  {
                    text: '',
                  },
                ],
              };
              parentNode.children.push(currentNode);
            }
            break;
          }
          case 'h1':
          case 'h2':
          case 'h3':
          case 'ul':
          case 'li':
          case 'ol':
          case 'ul':
          case 'blockquote': {
            let type = node.getAttribute('data-node-type');
            let currentNode: any;
            if (node?.children.length) {
              currentNode = {
                id: Math.round(Math.random() * 1000000000000),
                type,
                children: [],
              };
              let index = parentNode.children.length;
              parentNode.children.push(currentNode);
              getNodesFromHtml(node, parentNode.children[index]);
            } else {
              currentNode = {
                id: Math.round(Math.random() * 1000000000000),
                type,
                children: [
                  {
                    text: '',
                  },
                ],
              };
              parentNode.children.push(currentNode);
            }
            break;
          }
          case 'a': {
            let type = node.getAttribute('data-node-type');
            let currentNode = {
              id: Math.round(Math.random() * 1000000000000),
              type,
              url: node.href,
              children: [],
            };
            let index = parentNode.children.length;
            parentNode.children.push(currentNode);
            getNodesFromHtml(node, parentNode.children[index]);
            break;
          }
          case 'figure': {
            let type = node.getAttribute('data-node-type');
            let currentNode;
            if (type === ELEMENT_IMAGE) {
              if (
                node?.children[1]?.getAttribute('unsplash-link') === 'present'
              ) {
                currentNode = {
                  id: Math.round(Math.random() * 1000000000000),
                  type,
                  url: node.children[0].src,
                  ...(node.children[0].alt && { alt: node.children[0].alt }),
                  userUrl: node.children[1].children[0].href,
                  children: [
                    {
                      text: '',
                    },
                  ],
                  caption: [
                    {
                      text: node.children[1] ? node.children[1].innerText : '',
                    },
                  ],
                };
              } else {
                currentNode = {
                  id: Math.round(Math.random() * 1000000000000),
                  type,
                  url: node.children[0].src,
                  ...(node.children[0].alt && { alt: node.children[0].alt }),
                  children: [
                    {
                      text: '',
                    },
                  ],
                  caption: [
                    {
                      text: node.children[1] ? node.children[1].innerText : '',
                    },
                  ],
                };
              }
            }
            parentNode.children.push(currentNode);
            break;
          }
          case 'hr': {
            let type = node.getAttribute('data-node-type');
            let currentNode;
            currentNode = {
              id: Math.round(Math.random() * 1000000000000),
              type,
              children: [
                {
                  text: '',
                },
              ],
            };
            parentNode.children.push(currentNode);
            break;
          }
          case 'div':
          case 'pre': {
            let type = node.getAttribute('data-node-type');
            let currentNode;
            let docString = node.children[0]?.srcdoc;
            if (type === ELEMENT_MEDIA_EMBED) {
              if (
                node.getAttribute('script-embed') &&
                node.getAttribute('script-embed') === 'true'
              ) {
                currentNode = {
                  id: Math.round(Math.random() * 1000000000000),
                  type,
                  url: '',
                  children: [{ text: '' }],
                  script: true,
                  htmlToEmbed: docString,
                  height: node.children[0].height,
                  embedType: docString?.includes('twitter-tweet')
                    ? 'tweet'
                    : 'other',
                };
              } else {
                currentNode = {
                  id: Math.round(Math.random() * 1000000000000),
                  type,
                  url: node.children[0].src,
                  script: false,
                  children: [
                    {
                      text: '',
                    },
                  ],
                };
              }
              parentNode.children.push(currentNode);
            } else if (type === ELEMENT_CODE_BLOCK) {
              currentNode = {
                id: Math.round(Math.random() * 1000000000000),
                type,
                children: [],
              };
              let index = parentNode.children.length;
              parentNode.children.push(currentNode);
              getNodesForCode(node, parentNode.children[index]);
            }
            break;
          }
        }
      } else {
        let currentNode: any = {
          text: node.innerText,
        };
        if (node.classList.contains('underline')) {
          currentNode = {
            ...currentNode,
            underline: true,
          };
        }
        if (node.classList.contains('font-bold')) {
          currentNode = {
            ...currentNode,
            bold: true,
          };
        }
        if (node.classList.contains('italic')) {
          currentNode = {
            ...currentNode,
            italic: true,
          };
        }
        if (node.classList.contains('inline-code')) {
          currentNode = {
            ...currentNode,
            code: true,
          };
        }
        parentNode.children.push(currentNode);
      }
    }
  } catch (err) {
    // Sentry.captureException(err);
  }
}

export function convertHtmlToNode(html: any) {
  let convertedObject = {
    children: [],
  };
  getNodesFromHtml(html, convertedObject);

  return convertedObject.children;
}
