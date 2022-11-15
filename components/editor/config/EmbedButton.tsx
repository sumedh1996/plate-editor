// /* eslint-disable import/no-extraneous-dependencies */
// /* eslint-disable no-mixed-spaces-and-tabs */
// /* eslint-disable react/button-has-type */
// /* eslint-disable no-tabs */
// import React, { useState } from "react";
// import { Input } from "antd";
// import Modal from "antd/lib/modal/Modal";
// import {
//   ELEMENT_MEDIA_EMBED,
//   ELEMENT_PARAGRAPH,
//   insertNodes,
// } from "@udecode/plate";

// const EmbedButton = ({ editor, location, setNode }: any) => {
//   const [url, setUrl] = useState("");
//   const [visible, setVisible] = useState(false);

//   function handleSubmit() {
//     const theUrl = url;
//     if (
//       (theUrl.indexOf("youtube") >= 0 || theUrl.indexOf("youtu.be") >= 0) &&
//       !theUrl.includes("</iframe>")
//     ) {
//       const _url = new URL(theUrl);
//       const videoId = _url.searchParams.get("v");
//       const startId = _url.searchParams.get("t");
//       if (videoId) {
//         insertNodes(
//           editor,
//           [
//             {
//               type: ELEMENT_MEDIA_EMBED,
//               url: startId
//                 ? `https://www.youtube.com/embed/${videoId}?start=${startId}`
//                 : `https://www.youtube.com/embed/${videoId}`,
//               children: [{ text: "" }],
//               script: false,
//             },
//             {
//               type: ELEMENT_PARAGRAPH,
//               children: [
//                 {
//                   text: "",
//                 },
//               ],
//             },
//           ],
//           {
//             at: location ? location.anchor : [0, 0],
//           }
//         );
//       } else {
//         insertNodes(
//           editor,
//           [
//             {
//               type: ELEMENT_MEDIA_EMBED,
//               url: startId
//                 ? `https://www.youtube.com/embed/${
//                     theUrl
//                       .split("/")
//                       [theUrl.split("/").length - 1].split("?")[0]
//                   }?start=${startId}`
//                 : `https://www.youtube.com/embed/${
//                     theUrl
//                       .split("/")
//                       [theUrl.split("/").length - 1].split("?")[0]
//                   }`,
//               children: [{ text: "" }],
//               script: false,
//             },
//             {
//               type: ELEMENT_PARAGRAPH,
//               children: [
//                 {
//                   text: "",
//                 },
//               ],
//             },
//           ],
//           {
//             at: location ? location.anchor : [0, 0],
//           }
//         );
//       }
//     } else if (theUrl.indexOf("vimeo") >= 0) {
//       insertNodes(
//         editor,
//         [
//           {
//             type: ELEMENT_MEDIA_EMBED,
//             url: `https://player.vimeo.com/video/${
//               theUrl.split("/")[theUrl.split("/").length - 1]
//             }`,
//             children: [{ text: "" }],
//             script: false,
//           },
//           {
//             type: ELEMENT_PARAGRAPH,
//             children: [
//               {
//                 text: "",
//               },
//             ],
//           },
//         ],
//         {
//           at: location ? location.anchor : [0, 0],
//         }
//       );
//     } else if (
//       theUrl.includes("https://platform.twitter.com/widgets.js") ||
//       theUrl.includes("https://www.linkedin.com/embed") ||
//       theUrl.includes("https://www.youtube.com/embed")
//     ) {
//       let embedType = "other";
//       if (theUrl.includes("twitter-tweet")) {
//         embedType = "tweet";
//       }
//       if (theUrl.includes("https://www.linkedin.com/embed")) {
//         embedType = "linkedin";
//       }
//       const emptyScripts = new RegExp('<[A-Za-z1-9=". /:-]*></script>', "g");
//       const scripts = new RegExp("</script>", "g");

//       if (
//         (!!theUrl.match(emptyScripts) &&
//           !!theUrl.match(scripts) &&
//           theUrl.match(emptyScripts).length === theUrl.match(scripts).length) ||
//         theUrl.match(emptyScripts) === theUrl.match(scripts)
//       ) {
//         insertNodes(
//           editor,
//           [
//             {
//               type: ELEMENT_MEDIA_EMBED,
//               url: "",
//               children: [{ text: "" }],
//               script: true,
//               htmlToEmbed: `<style>
// 								div {
// 									margin: auto;
// 								}
// 							</style>
// 							${theUrl}`,
//               height: "0px",
//               width: "0px",
//               embedType,
//             },
//             {
//               type: ELEMENT_PARAGRAPH,
//               children: [
//                 {
//                   text: "",
//                 },
//               ],
//             },
//           ],
//           {
//             at: location ? location.anchor : [0, 0],
//           }
//         );
//       } else {
//         // openInfoToast({
//         //   title: "Information",
//         //   subtitle: "Make sure the script tags are empty",
//         // });
//       }
//     } else if (theUrl.includes("https://gist.github.com")) {
//       const embedType = "other";
//       if (theUrl.includes("<script") && theUrl.includes("</script>")) {
//         const emptyScripts = new RegExp('<[A-Za-z1-9=". /:-]*></script>', "g");
//         const scripts = new RegExp("</script>", "g");
//         if (
//           (!!theUrl.match(emptyScripts) &&
//             !!theUrl.match(scripts) &&
//             theUrl.match(emptyScripts).length ===
//               theUrl.match(scripts).length) ||
//           theUrl.match(emptyScripts) === theUrl.match(scripts)
//         ) {
//           insertNodes(
//             editor,
//             [
//               {
//                 type: ELEMENT_MEDIA_EMBED,
//                 url: "",
//                 children: [{ text: "" }],
//                 script: true,
//                 htmlToEmbed: `<style>
// 									div {
// 										margin: auto;
// 									}
// 								</style>
// 								${theUrl}`,
//                 height: "0px",
//                 width: "0px",
//                 embedType,
//               },
//               {
//                 type: ELEMENT_PARAGRAPH,
//                 children: [
//                   {
//                     text: "",
//                   },
//                 ],
//               },
//             ],
//             {
//               at: location ? location.anchor : [0, 0],
//             }
//           );
//         } else {
//           //   openInfoToast({
//           //     title: "Information",
//           //     subtitle: "Make sure the script tags are empty",
//           //   });
//         }
//       } else {
//         const htmlToEmbed = `<style>
// 					div {
// 						margin: auto;
// 					}
// 				</style><script src="${theUrl}.js" ></script>`;
//         insertNodes(
//           editor,
//           [
//             {
//               type: ELEMENT_MEDIA_EMBED,
//               url: "",
//               children: [{ text: "" }],
//               script: true,
//               htmlToEmbed,
//               height: "0px",
//               width: "0px",
//               embedType,
//             },
//             {
//               type: ELEMENT_PARAGRAPH,
//               children: [
//                 {
//                   text: "",
//                 },
//               ],
//             },
//           ],
//           {
//             at: location ? location.anchor : [0, 0],
//           }
//         );
//       }
//     } else {
//       //   openInfoToast({
//       //     title: "Information",
//       //     subtitle:
//       //       "We don't support embed from this site, do let us know about it.",
//       //   });
//     }
//     setNode(null);
//     setVisible(false);
//   }

//   function handleCancel() {
//     setVisible(false);
//   }

//   return (
//     <>
//       <button
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-around",
//           width: "80px",
//         }}
//         onMouseDown={() => setVisible(true)}
//       >
//         <span>Embed</span>
//         <span>
//           <p>Embed</p>
//         </span>
//       </button>
//       <Modal
//         title="Embed"
//         onOk={handleSubmit}
//         visible={visible}
//         onCancel={handleCancel}
//         className="embed-modal-editor"
//         width={640}
//         style={{ top: 20 }}
//         bodyStyle={{
//           background: "var(--background-secondary)",
//           borderColor: "var(--border-primary)",
//           display: "flex",
//           flexDirection: "column",
//           paddingTop: 36,
//           paddingBottom: 24,
//         }}
//         okButtonProps={{
//           style: {
//             background: "var(--brandColor)",
//             borderRadius: "4px",
//             textAlign: "center",
//           },
//         }}
//         cancelButtonProps={{
//           style: {
//             background: "var(--background-secondary)",
//             color: "var(--text-secondary)",
//             border: "1px solid var(--border-secondary)",
//             borderRadius: "4px",
//             textAlign: "center",
//           },
//         }}
//       >
//         <Input
//           className="bg-backgroundColor-skin-secondary text-textColor-skin-primary border-borderColor-skin-secondary rounded-[4px]"
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="add a url or embed script here"
//         />
//       </Modal>
//     </>
//   );
// };

// export default EmbedButton;

/* eslint-disable */
import React, { useState } from "react";
import { ELEMENT_DEFAULT, useEditorRef } from "@udecode/plate-core";
import { ELEMENT_HR, ELEMENT_MEDIA_EMBED, insertNodes } from "@udecode/plate";
import { useEditorContext } from "../../../context/EditorContext";
import { Input, Modal } from "antd";

const EmbedButton: React.FC<{
  setNode: React.Dispatch<
    React.SetStateAction<Element | DocumentFragment | null>
  >;
}> = ({ setNode }) => {
  const [url, setUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const editor = useEditorRef();
  const { editorLocation } = useEditorContext();

  function handleSubmit() {
    const theUrl = url;
    if (
      (theUrl.indexOf("youtube") >= 0 || theUrl.indexOf("youtu.be") >= 0) &&
      !theUrl.includes("</iframe>")
    ) {
      const _url = new URL(theUrl);
      const videoId = _url.searchParams.get("v");
      const startId = _url.searchParams.get("t");
      if (videoId) {
        console.info({ videoId });
        insertNodes(
          editor,
          [
            {
              type: ELEMENT_MEDIA_EMBED,
              url: startId
                ? `https://www.youtube.com/embed/${videoId}?start=${startId}`
                : `https://www.youtube.com/embed/${videoId}`,
              children: [{ text: "" }],
              script: false,
            },
            {
              type: ELEMENT_DEFAULT,
              children: [
                {
                  text: "",
                },
              ],
            },
          ],
          {
            at: editorLocation ? editorLocation.anchor : [0, 0],
          }
        );
      } else {
        console.info(
          "Embed",
          `https://www.youtube.com/embed/${
            theUrl.split("/")[theUrl.split("/").length - 1].split("?")[0]
          }`
        );
        insertNodes(
          editor,
          [
            {
              type: ELEMENT_MEDIA_EMBED,
              url: startId
                ? `https://www.youtube.com/embed/${
                    theUrl
                      .split("/")
                      [theUrl.split("/").length - 1].split("?")[0]
                  }?start=${startId}`
                : `https://www.youtube.com/embed/${
                    theUrl
                      .split("/")
                      [theUrl.split("/").length - 1].split("?")[0]
                  }`,
              children: [{ text: "" }],
              script: false,
            },
            {
              type: ELEMENT_DEFAULT,
              children: [
                {
                  text: "",
                },
              ],
            },
          ],
          {
            at: editorLocation ? editorLocation.anchor : [0, 0],
          }
        );
        console.info(editor);
      }
    } else if (theUrl.indexOf("vimeo") >= 0) {
      insertNodes(
        editor,
        [
          {
            type: ELEMENT_MEDIA_EMBED,
            url: `https://player.vimeo.com/video/${
              theUrl.split("/")[theUrl.split("/").length - 1]
            }`,
            children: [{ text: "" }],
            script: false,
          },
          {
            type: ELEMENT_DEFAULT,
            children: [
              {
                text: "",
              },
            ],
          },
        ],
        {
          at: editorLocation ? editorLocation.anchor : [0, 0],
        }
      );
    } else if (
      theUrl.includes("https://platform.twitter.com/widgets.js") ||
      theUrl.includes("https://www.linkedin.com/embed") ||
      theUrl.includes("https://www.youtube.com/embed")
    ) {
      let embedType = "other";
      if (theUrl.includes("twitter-tweet")) {
        embedType = "tweet";
      }
      if (theUrl.includes("https://www.linkedin.com/embed")) {
        embedType = "linkedin";
      }
      const emptyScripts = new RegExp('<[A-Za-z1-9=". /:-]*></script>', "g");
      const scripts = new RegExp("</script>", "g");

      if (
        (!!theUrl.match(emptyScripts) &&
          !!theUrl.match(scripts) &&
          theUrl.match(emptyScripts).length === theUrl.match(scripts).length) ||
        theUrl.match(emptyScripts) === theUrl.match(scripts)
      ) {
        insertNodes(
          editor,
          [
            {
              type: ELEMENT_MEDIA_EMBED,
              url: "",
              children: [{ text: "" }],
              script: true,
              htmlToEmbed: `<style>
								div {
									margin: auto;
								}
							</style>
							${theUrl}`,
              height: "0px",
              width: "0px",
              embedType,
            },
            {
              type: ELEMENT_DEFAULT,
              children: [
                {
                  text: "",
                },
              ],
            },
          ],
          {
            at: editorLocation ? editorLocation.anchor : [0, 0],
          }
        );
      } else {
        // openInfoToast({
        //   title: "Information",
        //   subtitle: "Make sure the script tags are empty",
        // });
      }
    } else if (theUrl.includes("https://gist.github.com")) {
      const embedType = "other";
      if (theUrl.includes("<script") && theUrl.includes("</script>")) {
        const emptyScripts = new RegExp('<[A-Za-z1-9=". /:-]*></script>', "g");
        const scripts = new RegExp("</script>", "g");
        if (
          (!!theUrl.match(emptyScripts) &&
            !!theUrl.match(scripts) &&
            theUrl.match(emptyScripts).length ===
              theUrl.match(scripts).length) ||
          theUrl.match(emptyScripts) === theUrl.match(scripts)
        ) {
          insertNodes(
            editor,
            [
              {
                type: ELEMENT_MEDIA_EMBED,
                url: "",
                children: [{ text: "" }],
                script: true,
                htmlToEmbed: `<style>
									div {
										margin: auto;
									}
								</style>
								${theUrl}`,
                height: "0px",
                width: "0px",
                embedType,
              },
              {
                type: ELEMENT_DEFAULT,
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            {
              at: editorLocation ? editorLocation.anchor : [0, 0],
            }
          );
        } else {
          //   openInfoToast({
          //     title: "Information",
          //     subtitle: "Make sure the script tags are empty",
          //   });
        }
      } else {
        const htmlToEmbed = `<style>
					div {
						margin: auto;
					}
				</style><script src="${theUrl}.js" ></script>`;
        insertNodes(
          editor,
          [
            {
              type: ELEMENT_MEDIA_EMBED,
              url: "",
              children: [{ text: "" }],
              script: true,
              htmlToEmbed,
              height: "0px",
              width: "0px",
              embedType,
            },
            {
              type: ELEMENT_DEFAULT,
              children: [
                {
                  text: "",
                },
              ],
            },
          ],
          {
            at: editorLocation ? editorLocation.anchor : [0, 0],
          }
        );
      }
    } else {
      //   openInfoToast({
      //     title: "Information",
      //     subtitle:
      //       "We don't support embed from this site, do let us know about it.",
      //   });
    }
    setNode(null);
    setVisible(false);
  }

  function handleCancel() {
    setVisible(false);
  }

  return (
    <>
      <button
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "80px",
        }}
        onMouseDown={() => setVisible(true)}
      >
        <span>Embed</span>
        <span>
          <p>Embed</p>
        </span>
      </button>
      <Modal
        title="Embed"
        onOk={handleSubmit}
        visible={visible}
        onCancel={handleCancel}
        className="embed-modal-editor"
        width={640}
        style={{ top: 20 }}
        bodyStyle={{
          background: "var(--background-secondary)",
          borderColor: "var(--border-primary)",
          display: "flex",
          flexDirection: "column",
          paddingTop: 36,
          paddingBottom: 24,
        }}
        okButtonProps={{
          style: {
            background: "var(--brandColor)",
            borderRadius: "4px",
            textAlign: "center",
          },
        }}
        cancelButtonProps={{
          style: {
            background: "var(--background-secondary)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border-secondary)",
            borderRadius: "4px",
            textAlign: "center",
          },
        }}
      >
        <Input
          className="bg-backgroundColor-skin-secondary text-textColor-skin-primary border-borderColor-skin-secondary rounded-[4px]"
          onChange={(e) => setUrl(e.target.value)}
          placeholder="add a url or embed script here"
        />
      </Modal>
    </>
  );
};

export default EmbedButton;
