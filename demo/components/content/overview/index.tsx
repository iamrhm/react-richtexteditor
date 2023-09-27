/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";

import { parseRichDataToUI, IContentType, IParsedRichData } from "@mittirorg/react-richtext";

import { getURLMeta } from "../../../services";

function PostOverview({
    data,
    deletePost
  } : {
  data: IParsedRichData
  deletePost: () => void
}) {
  const [post, setPost] = React.useState<IContentType[]>(null);
  const [urlMeta, setURLMeta] = React.useState(null);
  const delayRef = React.useRef(null);

  const startRender = React.useCallback(async (): Promise<void> => {
    try {
      const parsedUIData = await parseRichDataToUI(data);
      const parsedURLMeta = getURLMeta(data.entities);
      setPost(parsedUIData);
      setURLMeta(parsedURLMeta);
    } catch (err) {
      console.log(err);
      setPost(null);
      setURLMeta(null);
    }
  }, [data]);

  React.useEffect(() => {
    if (delayRef.current) {
      clearTimeout(delayRef.current);
    }
    delayRef.current = setTimeout(startRender, 200);
    return () => {
      clearTimeout(delayRef.current);
    };
  }, [startRender]);

  return (
    <>
      <div
        className={`${!Array.isArray(post) ? 'animate-pulse' : ''}w-full flex flex-col lg:w-11/12 border-solid border-0 lg:border
        border-gray-400 rounded p-4 mb-5 shadow-sm relative`}
      >
        <div
          className="py-2 px-3 bg-slate-900 hover:bg-slate-700 h-9 flex items-center justify-center rounded cursor-pointer absolute right-3 top-3"
          onClick={deletePost}
        >
          🗑️
        </div>
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-slate-700"></div>
          <div className="flex flex-col items-start justify-start ml-3">
            <div className="min-w-[124px] h-4 rounded bg-slate-700"></div>
            <div className="min-w-[80px] mt-2 h-4 rounded bg-slate-700"></div>
          </div>
        </div>
        {
          Array.isArray(post) ? (
            <p className="text-gray-100 text-sm py-4">
              {post.map((line: IContentType, idx: number) => {
                const {tag, text, elmProps} = line.textContent;
                const Tag = tag;
                if (Tag === 'br') return <br key={idx} />;
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
          ) : <p className="h-[280px] my-5 animate-pulse bg-slate-700 rounded" />
        }
        {
          urlMeta?.info?.image && (
            <a className="flex flex-col rounded-lg shadow shadow-slate-500/30 mb-4" href={urlMeta.info?.url} target="_blank">
              <div className="w-full border-solid rounded-lg bg-slate-700">
                <img
                  src={urlMeta.info?.image}
                  className="object-cover w-full rounded-lg"
                  loading="lazy"
                />
              </div>
              <div className="rounded pt-3 w-full flex flex-col justify-between px-3 pb-4">
                <div className="mb-2 text-base font-medium text-gray-300">
                  {urlMeta.info?.title}
                </div>
                <div className="text-sm text-gray-400">
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