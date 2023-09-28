"use client";
import React from "react";
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import { IParsedRichData } from "@mittirorg/react-richtext";

import InputBox from "../inputbox";
import PostOverview from "./overview";

import data from '../../data/data.json';

const DEFAULT_DATA = data.reverse();

function Content() {
  const [posts, updatePosts] = React.useState<IParsedRichData[]>(DEFAULT_DATA);

  const addNewPost = (postData: IParsedRichData) => {
    const newData = [postData, ...posts];
    updatePosts(newData);
  };

  const deletePost = (deleteID: string): void => {
    const filteredPost = posts.filter((p) => p.id !== deleteID);
    updatePosts(filteredPost);
  };

  return (
    <>
      <style jsx>
        {`
          :global(.item-enter) {
            opacity: 0;
          }
          :global(.item-enter-active) {
            opacity: 1;
            transition: all 500ms ease-in-out;
          }
          :global(.item-exit) {
            opacity: 1;
            transform: translateX(0%);
          }
          :global(.item-exit-active) {
            opacity: 0;
            transform: translateX(-50%);
            transition: all 500ms ease-in-out;
          }
        `}
      </style>
      <div className="flex flex-col rounded shadow-lg border-solid border border-gray-400 h-full bg-slate-900">
        <div className="w-full max-h-60 mb-8">
          <div className="relative">
            <div className="h-36 w-full rounded animate-pulse bg-slate-700">
            </div>
            <div className="w-32 h-32 left-4 -bottom-20 rounded absolute bg-slate-700 border-solid border border-gray-400" />
          </div>
          <div className="w-full flex flex-col items-start justify-between pt-6 pl-40">
            <div className="min-w-[184px] h-5 rounded animate-pulse bg-slate-700 mb-3"></div>
            <div className="min-w-[100px] h-5 rounded animate-pulse bg-slate-700"></div>
          </div>
        </div>
        <div className="px-4">
          <div className="h-14 w-full py-3 px-4 rounded border-solid border border-gray-400 flex items-center justify-start">
            <div className="h-9 w-9 rounded-full animate-pulse bg-slate-700"></div>
            <div className="text-white px-3 h-full flex items-center justify-start" style={{width: 'calc(100% - 32px)'}}>
              <InputBox
                addNewPost={addNewPost}
              />
            </div>
          </div>
        </div>
        <div className="min-w-[120px] text-base w-full overflow-auto flex flex-col items-center">
          <TransitionGroup className="min-w-[120px] text-base w-full mt-6 overflow-auto flex flex-col items-center">
            {
              posts.map((post, index) => (
                <CSSTransition
                  key={post.id}
                  timeout={500}
                  classNames="item"
                >
                  <PostOverview
                    data={post}
                    deletePost={() => deletePost(post.id)}
                  />
                </CSSTransition>
              ))
            }
          </TransitionGroup>
        </div>
      </div>
    </>
  );
}

export default Content;