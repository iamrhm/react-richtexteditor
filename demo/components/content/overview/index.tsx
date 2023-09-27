/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";

import { parseRichDataToUI, IContentType, IParsedRichData } from "@mittirorg/react-richtext";

import { getURLMeta } from "../../../services";
import CloseIcon from "../../icons/close-icon";

function PostOverview({
    data,
    deletePost
  } : {
  data: IParsedRichData
  deletePost: () => void
}) {
  const post = parseRichDataToUI(data);
  const urlMeta = getURLMeta(data.entities);

  return (
    <>
      <div className="w-full flex flex-col lg:w-11/12 border-solid border-0 lg:border border-gray-200 rounded p-4 mb-5 shadow-sm relative">
        <div
          className="py-2 px-3 hover:bg-slate-100 text-white h-9 flex items-center justify-center rounded cursor-pointer absolute right-3 top-3"
          onClick={deletePost}
        >
          <CloseIcon />
        </div>
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full animate-pulse bg-slate-300"></div>
          <div className="flex flex-col items-start justify-start ml-3">
            <div className="min-w-[124px] h-4 rounded animate-pulse bg-slate-300"></div>
            <div className="min-w-[80px] mt-2 h-4 rounded animate-pulse bg-slate-300"></div>
          </div>
        </div>
        <p className="text-gray-600 text-sm py-4">
          {post.map((line: IContentType, idx: number) => {
            const {tag, text, elmProps} = line.textContent;
            const Tag = tag;
            if (Tag === 'br') return <br />;
            return (
              <Tag
                key={idx}
                className={elmProps['data-content'] ? 'text-blue-600 cursor-pointer' : ''}
                {...elmProps}
              >
                {text}
              </Tag>
            );
            })
          }
        </p>
        {
          urlMeta?.info?.image && (
            <a className="flex flex-col rounded-lg shadow mb-4" href={urlMeta.info?.url} target="_blank">
              <div className="w-full border-solid rounded-lg bg-slate-300">
                <img
                  src={urlMeta.info?.image}
                  className="object-cover w-full rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="rounded pt-3 w-full flex flex-col justify-between px-3 pb-4">
                <div className="mb-2 text-base font-medium text-gray-700">
                  {urlMeta.info?.title}
                </div>
                <div className="text-sm text-gray-500">
                  {urlMeta.info?.description}
                </div>
              </div>
            </a>
          )
        }
      </div>
    </>
  );
}

export default PostOverview;