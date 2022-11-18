import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import {
  createAlignPlugin,
  createDeserializeDocxPlugin,
  createFontBackgroundColorPlugin,
  createFontColorPlugin,
  createFontFamilyPlugin,
  createFontSizePlugin,
  createFontWeightPlugin,
  createHorizontalRulePlugin,
  createImagePlugin,
  createIndentListPlugin,
  createIndentPlugin,
  createLineHeightPlugin,
  createTablePlugin,
  createTextIndentPlugin,
  createDeserializeCsvPlugin,
  Plate,
  createSoftBreakPlugin,
  HeadingToolbar,
  TEditableProps,
  createParagraphPlugin,
  createSelectOnBackspacePlugin,
  ELEMENT_HR,
  createMediaEmbedPlugin,
  createLinkPlugin,
  createListPlugin,
  createTodoListPlugin,
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  createTrailingBlockPlugin,
  ELEMENT_MEDIA_EMBED,
  useEditorState,
  serializeHtml,
} from "@udecode/plate";
import { createJuicePlugin } from "@udecode/plate-juice";
import { createMyPlugins, MyValue } from "./types/PlateTypes";
import { lineHeightPlugin } from "./plugins/LineHeightPlugin";
import { alignPlugin } from "./plugins/AlignPlugin";
import { indentPlugin } from "./plugins/IndentPlugin";
import { plateUI } from "./common/plateUi";
import { basicNodesPlugins } from "./plugins/BasicNodesPlugin";
import { softBreakPlugin } from "./plugins/SoftBreakPlugin";
import { ToolbarButtons } from "./config/Toolbar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEditorContext } from "../../context/EditorContext";
import { linkPlugin } from "./plugins/LinkPlugin";
import SideToolBar from "./config/SideToolBar";
import { HighlightHTML } from "./elements/SerializeHtml/HighlightHTML";
import { convertHtmlToNode } from "../../utils/htmlDesrialize";

const NewEditor = () => {
  const [selectedNode, setSelectedNode] = useState<
    null | Element | DocumentFragment
  >(null);

  const containerRef = useRef(null);
  const { linkLocation } = useEditorContext();

  const innerHTML =
    '<p class="md-block-unstyled" data-node-type="p" data-editor-version="new"></p><figure class="w-full md-block-image" data-node-type="img"><img src="https://cdn.tealfeed.com/articles/content-images/6371e68cf9a5b0ea24a1818d/1668501254072.png" alt="Writing isn’t Only about Grammar. Key Habits That Will Help You Become a Better Writer"><figcaption class="text-center text-gray-400">Key Habits to Help You Become a Better Write</figcaption></figure><p class="md-block-unstyled" data-node-type="p"></p><blockquote class="md-block-blockquote" data-node-type="blockquote"><span class="italic" data-node-type="leaf">“It’s none of their business that you must learn how to write. Let them think you were born that way.” ~ Ernest Hemingway</span></blockquote><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">&nbsp;Many people believe that if they want to become a writer, they must have good knowledge of “grammar.” Well! That’s true! You can’t write grammatically incorrect content. But does that alone make you eligible to take up WRITING as a career or full-time option?&nbsp;</span></p><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">Even if you feel I am demotivating you, I won’t stop saying what’s true! Becoming a writer is about understanding the story, facts, “why’s, what’s, and hows,” and how to make a perfect culmination of all these elements.&nbsp;</span></p><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">&nbsp;So, if you love writing, you must be committed to developing your writing voice and improving your technical skills. But most importantly, understand that there will be days when you will want to pull out your hair.&nbsp;&nbsp;</span></p><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">&nbsp;In this blog, I will explain writing habits that kept me going and helped me garner attention and acquire new clients.&nbsp;</span></p><p class="md-block-unstyled" data-node-type="p"><span class="font-bold" data-node-type="leaf">Disclaimer:</span><span data-node-type="leaf"> Whether you are a blogger, copywriter, social media copywriter, or personal branding consultant, these habits will help you stay competitive.&nbsp;</span></p><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">&nbsp;So, here we go!&nbsp;</span></p><p class="md-block-unstyled" data-node-type="p"><span class="font-bold" data-node-type="leaf">This blog will discuss building a HEALTHY MINDSET to pursue writing as a full-time passion.&nbsp;</span></p><h2 class="md-block-header-three" data-node-type="h2"><span class="font-bold" data-node-type="leaf">Never ignore your small victories:</span><span data-node-type="leaf">&nbsp;</span></h2><figure class="w-full md-block-image" data-node-type="img"><img src="https://cdn.tealfeed.com/articles/content-images/6371e68cf9a5b0ea24a1818d/1668501478723.gif" alt="Never ignore your small victories"><figcaption class="text-center text-gray-400"></figcaption></figure><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">When starting as a writer, you often seek validation to STAY MOTIVATED. But if you only look for big wins, you will never be able to enjoy the process. So, if you have started writing today and achieved a goal you set for yourself, give a pat on your back.&nbsp;</span></p><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">&nbsp;As human nature, we tend to look at the big picture, like hitting that 6-figure income goal or getting that big client or vanity metrics. Of course, that’s important too. But what about the tiny daily actions you take to reach that point?</span></p><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">Remember, waking up every day and deciding, “I WANT TO DO THIS,” is a victory. Let your small victories shine too. So, the next time you hit publish, create a post for social media or start writing despite all odds, show gratitude to yourself.&nbsp;</span></p><h2 class="md-block-header-three" data-node-type="h2"><span class="font-bold" data-node-type="leaf">Perfectionism is a myth. Let it not hover over you:</span></h2><figure class="w-full md-block-image" data-node-type="img"><img src="https://cdn.tealfeed.com/articles/content-images/6371e68cf9a5b0ea24a1818d/1668501556296.gif" alt="Perfectionism is a myth. Let it not hover over you:\n\n\n\nPerfectionism is a myth. Let it not hover over you:\n\n\nPerfectionism is a myth. Let it not hover over you\n\n"><figcaption class="text-center text-gray-400"></figcaption></figure><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">Everyone thinks until they get their perfect muse, perfect writing, hitting the publish button would turn them into a mockery. What people will think becomes more than just a hindrance. Eventually, you will start making excuses, resulting in a lack of progress or failure.&nbsp;</span></p><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">But more than that, it will hold you back from doing anything. You will find a lot of things simply derailing from what you anticipated.&nbsp;</span></p><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">So, if you are using excuses like:</span></p><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">“I didn’t do it because it wasn’t the right time,” or “I didn’t do it because it was not good enough,” you will never hit the “Yes” button ever. You need to start somewhere. Learn how to make your first post and hit that publish button. You can run after perfectionism later.&nbsp;</span></p><h2 class="md-block-header-three" data-node-type="h2"><span class="font-bold" data-node-type="leaf">Fellow writers are your friends, not competition:</span></h2><figure class="w-full md-block-image" data-node-type="img"><img src="https://cdn.tealfeed.com/articles/content-images/6371e68cf9a5b0ea24a1818d/1668501723180.gif" alt="Fellow writers are your friends, not competition\n\n\n"><figcaption class="text-center text-gray-400"></figcaption></figure><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">&nbsp;When you start writing, this feeling somehow sinks in faster~There are many writers. Why will anyone want to hire me or see my work? Honestly, fellow writers or creators will be your friend and support. And even a great source of industry trends and sometimes even gossip.</span></p><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">&nbsp;The writers I know through social media have been some of the best sources of support and inspiration. I am still learning from them and getting fantastic advice, ABSOLUTELY FREE.&nbsp;</span></p><h2 class="md-block-header-three" data-node-type="h2"><span data-node-type="leaf">&nbsp;</span><span class="font-bold" data-node-type="leaf">Writing is a habit:</span></h2><figure class="w-full md-block-image" data-node-type="img"><img src="https://cdn.tealfeed.com/articles/content-images/6371e68cf9a5b0ea24a1818d/1668501978430.gif" alt="Writing is a habit"><figcaption class="text-center text-gray-400"></figcaption></figure><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">We often find ourselves asking whether we are good or bad writers. But honestly, writing is more than that. It is a habit like going out for a walk or lifting weights. Unless you make it a habit, your system won’t accept it.&nbsp;</span></p><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">Once you get the hang of it, it will become stronger. It will be like once you were struggling to finish even a single lap, and now you are efficiently doing 10. It will become automatic rather than a rare session. You can be a great writer. But you have to build a habit first.</span></p><h2 class="md-block-header-three" data-node-type="h2"><span class="font-bold" data-node-type="leaf">Overnight success is a myth:</span></h2><figure data-node-type="img"><img src="https://cdn.tealfeed.com/articles/content-images/6371e68cf9a5b0ea24a1818d/1668502223149.gif" alt="Overnight success is a myth"></figure><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">Everyone likes shortcuts. It is so tempting. Finding that perfect formula for a viral tweet, blog, or post can be an aspiration. But if you don’t work hard towards becoming a better version of yourself, your chances to transform from excellence to greatness will slow down. While we might be conditioned to focus on overnight success, stop ignoring the magic of hard work until success becomes a part of your radar.</span></p><h2 class="md-block-header-three" data-node-type="h2"><span data-node-type="leaf">&nbsp;</span><span class="font-bold" data-node-type="leaf">There will be days when it will be hard to focus:</span></h2><figure data-node-type="img"><img src="https://cdn.tealfeed.com/articles/content-images/6371e68cf9a5b0ea24a1818d/1668502250478.gif" alt="There will be days when it will be hard to focus"></figure><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">If you think you will be Ann Handley every single day, you are up for a lot of pain and stress. You will have days when you will be hit with a struggling bug. It will be hard to focus or do work; sometimes, you won’t get anything done.&nbsp;</span></p><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">&nbsp;But how can you afford such days when a deadline hangs on your head? That’s when you need to push through. Here’s something that worked for me.</span></p><ul class="md-block-unordered-list-item" data-node-type="ul"><li data-node-type="li"><span data-node-type="leaf">I worked on breathing exercises to avoid all the thoughts that blocked my creative side.&nbsp;</span></li><li data-node-type="li"><span data-node-type="leaf">I started putting something easy on my to-do list and checking off that something helped me go.</span></li><li data-node-type="li"><span data-node-type="leaf">I used the Pomodoro method to get back my focus.</span></li><li data-node-type="li"><span data-node-type="leaf">I talked to a friend or moved around to feel the energy rush so that it could help me use my writing muscles.&nbsp;</span></li></ul><h2 class="md-block-header-three" data-node-type="h2"><span class="font-bold" data-node-type="leaf">Consistency matters:</span></h2><figure data-node-type="img"><img src="https://cdn.tealfeed.com/articles/content-images/6371e68cf9a5b0ea24a1818d/1668502328940.gif" alt="Consistency matters"></figure><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">Everyone wants to get out of the rut and feel like they are doing well. But it can’t happen unless you have an action plan and consistently keep doing it. When they start, many writers often focus on the impossible far-end goals but forget about the little baby steps.&nbsp;</span></p><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">&nbsp;This is why you must break it down into:&nbsp;</span></p><ul class="md-block-unordered-list-item" data-node-type="ul"><li data-node-type="li"><span data-node-type="leaf">Quarterly goals.</span></li><li data-node-type="li"><span data-node-type="leaf">Monthly goals.&nbsp;</span></li><li data-node-type="li"><span data-node-type="leaf">Weekly goals.</span></li><li data-node-type="li"><span data-node-type="leaf">Daily goals.</span></li></ul><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">&nbsp;What next?&nbsp;</span></p><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">It’s time to implement these tips, and let me know what changes in the next two weeks.&nbsp;</span></p><blockquote class="md-block-blockquote" data-node-type="blockquote"><span data-node-type="leaf">Next steps: Writing Habits: Lifestyle coming soon…&nbsp;</span></blockquote><p class="md-block-unstyled" data-node-type="p"><span data-node-type="leaf">Stay tuned…</span></p><p class="md-block-unstyled" data-node-type="p"></p>';

  const editableProps: TEditableProps<MyValue> = {
    spellCheck: true,
    autoFocus: false,
    readOnly: false,
    placeholder: "Type…",
    onMouseUp: () => {
      const selection = window.getSelection();
      let container = selection?.focusNode;
      while (
        container &&
        container.parentElement &&
        !container?.parentElement?.classList?.contains("slate-ImageElement") &&
        container.parentElement.nodeName.toLowerCase() !== "p"
      ) {
        container = container.parentElement;
      }
      if (container?.parentElement?.nodeName.toLowerCase() !== "p") {
        container = null;
      } else {
        container = container.parentElement;
      }
      if (
        selection?.focusNode?.nodeValue?.trim() ||
        container?.nodeName.toLowerCase() !== "p"
      ) {
        setSelectedNode(null);
      } else {
        setSelectedNode(container as Element);
      }
    },
    onKeyDown: () => {
      setSelectedNode(null);
    },
    onKeyUp: () => {
      const selection = window.getSelection();
      // const visibility = checkVisible(selection?.anchorNode?.parentElement);
      // if (!visibility.visible) {
      //   const y =
      //     selection?.anchorNode?.parentElement.getBoundingClientRect().top +
      //     window.pageYOffset;
      //   if (visibility.bottom) {
      //     window.scrollTo({ top: y - 610, behavior: 'smooth' });
      //   } else {
      //     window.scrollTo({ top: y - 180, behavior: 'smooth' });
      //   }
      // }
      let container = selection?.focusNode;
      while (
        container &&
        container.parentNode &&
        !container?.parentElement?.classList?.contains("slate-ImageElement") &&
        container.parentNode.nodeName.toLowerCase() !== "p"
      ) {
        container = container.parentNode;
      }
      if (container?.parentElement?.nodeName.toLowerCase() !== "p") {
        container = null;
      } else {
        container = container.parentElement;
      }
      if (
        selection?.focusNode?.nodeValue?.trim() ||
        container?.nodeName.toLowerCase() !== "p"
      ) {
        setSelectedNode(null);
      } else {
        setSelectedNode(container as Element);
      }
    },
  };

  const plugins = createMyPlugins(
    [
      ...basicNodesPlugins,
      createImagePlugin(),
      createHorizontalRulePlugin(),
      createSelectOnBackspacePlugin({
        options: {
          query: { allow: [ELEMENT_HR, ELEMENT_IMAGE, ELEMENT_MEDIA_EMBED] },
        },
      }),
      createLineHeightPlugin(lineHeightPlugin),
      createParagraphPlugin(),
      createTablePlugin(),
      createAlignPlugin(alignPlugin),
      createFontBackgroundColorPlugin(),
      createFontFamilyPlugin(),
      createFontColorPlugin(),
      createFontSizePlugin(),
      createFontWeightPlugin(),
      createIndentListPlugin(),
      createIndentPlugin(indentPlugin),
      createTextIndentPlugin(),
      createDeserializeDocxPlugin(),
      createSoftBreakPlugin(softBreakPlugin),
      createDeserializeCsvPlugin(),
      createJuicePlugin(),
      createMediaEmbedPlugin(),
      createLinkPlugin(linkPlugin),
      createListPlugin(),
      createTodoListPlugin(),
      createTrailingBlockPlugin({
        type: ELEMENT_PARAGRAPH,
      }),
      createMediaEmbedPlugin(),
    ],
    {
      components: plateUI,
    }
  );

  const Serialized = () => {
    const editor = useEditorState();
    const html = serializeHtml(editor, {
      nodes: editor.children,
    });

    return <HighlightHTML code={html} />;
  };

  const temp = document.createElement("div");
  temp.innerHTML = innerHTML;

  const data = convertHtmlToNode(temp);
  console.log(data);

  return (
    <div className="max-w-3xl mx-auto">
      <DndProvider backend={HTML5Backend}>
        <div ref={containerRef} style={{ position: "relative" }}>
          <Plate
            editableProps={editableProps}
            plugins={plugins}
            initialValue={data}
          >
            {/* <Serialized /> */}
            <SideToolBar node={selectedNode} setNode={setSelectedNode} />
            <div className="z-10 fixed top-0 left-0 w-full bg-red-400 pt-2">
              <HeadingToolbar
                style={{
                  border: "none",
                }}
              >
                <div className="w-1/2 mx-auto z-10 rounded-lg flex items-center justify-around flex-wrap pt-12 xl:pt-0">
                  <ToolbarButtons />
                </div>
              </HeadingToolbar>
            </div>
          </Plate>
        </div>
      </DndProvider>
    </div>
  );
};

export default NewEditor;
