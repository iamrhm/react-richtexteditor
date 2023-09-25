"use client";
import React from "react";
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import { IParsedRichData } from "@packages/types";

import InputBox from "../inputbox";
import PostOverview from "./overview";

import data from '../../data/data.json';

function Content() {
  const [posts, updatePosts] = React.useState<IParsedRichData[]>(data.reverse());

  const addNewPost = (postData: IParsedRichData) => {
    updatePosts([postData, ...posts]);
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
            transition: opacity 500ms ease-in;
          }
          :global(.item-exit) {
            opacity: 1;
          }
          :global(.item-exit-active) {
            opacity: 0;
            transition: opacity 500ms ease-in;
          }
        `}
      </style>
      <div className="flex flex-col rounded shadow-lg border-solid border border-gray-200 h-full bg-white">
        <div className="w-full max-h-60 mb-8">
          <div className="relative">
            <div className="h-36 w-full rounded animate-pulse bg-slate-300">
            </div>
            <div className="w-32 h-32 left-4 -bottom-20 rounded absolute animate-pulse bg-slate-300 border-solid border-2 border-gray-200" />
          </div>
          <div className="w-full flex flex-col items-start justify-between pt-6 pl-40">
            <div className="min-w-[184px] h-5 rounded animate-pulse bg-slate-300 mb-3"></div>
            <div className="min-w-[100px] h-5 rounded animate-pulse bg-slate-300"></div>
          </div>
        </div>
        <div className="px-4">
          <div className="h-14 w-full py-3 px-4 rounded border-solid border border-gray-200 flex items-center justify-start">
            <div className="h-9 w-9 rounded-full animate-pulse bg-slate-300"></div>
            <div className="text-black px-3 h-full flex items-center justify-start" style={{width: 'calc(100% - 32px)'}}>
              <InputBox
                addNewPost={addNewPost}
              />
            </div>
          </div>
        </div>
        <div className="min-w-[120px] text-gray-300 text-base w-full overflow-auto flex flex-col items-center">
          <TransitionGroup className="min-w-[120px] text-gray-300 text-base w-full mt-6 overflow-auto flex flex-col items-center">
            {
              posts.map((post, index) => (
                <CSSTransition
                  key={post.id}
                  timeout={600}
                  classNames="item"
                >
                  <PostOverview
                    key={post.id}
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