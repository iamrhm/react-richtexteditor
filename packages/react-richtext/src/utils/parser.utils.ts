import { convertToRaw } from 'draft-js';
import linkifyIt from 'linkify-it';
import tlds from 'tlds';

import type { IEntityMap, IParsedRichData, IEntity, IContentType, IEditorState } from '@packages/types';

const linkify = linkifyIt().tlds(tlds);

export const entityTypeRegex = /(\[\[\[#entityType[a-zA-Z0-9-]+\]\]\])/;

export function parseEditorData(
  editorData: IEditorState,
  richAssetData?: IEntityMap,
  previewList?: Map<string, IEntity>,
): IParsedRichData {
  const objOfLinks: { [key: string]: IEntity } = {};
  const objOfAssets: { [key: string]: IEntity } = {};
  const currentContent = convertToRaw(editorData.getCurrentContent());

  let linkCount = 0;
  let count = 0;
  let assetCount = 0;

  if (previewList.size) {
    /* restructuring link obj with key name of link input text of each link */
    [...Array.from(previewList || new Map())].forEach(([, value]) => {
      const linkKey = value.info?.viewText ? `${value.info.viewText}${linkCount}` : `${value.info.url}${linkCount}`;
      if (!objOfLinks[linkKey]) {
        objOfLinks[linkKey] = { ...value };
      }
      linkCount += 1;
    });
  }

  const body = currentContent.blocks.map((block) => {
    let blockText = block.text;
    const matchArr = linkify.match(block.text) || [];

    /* parsing asset tags inside text and replace with regex */
    if (block.entityRanges.length) {
      block.entityRanges.forEach((entityRange) => {
        const { offset, length } = entityRange;
        const taggedTextKey = Array.from(block.text)
          .slice(offset, offset + length)
          .join('')
          .trim();

        if (richAssetData && richAssetData[taggedTextKey]) {
          /* only storing those assets which inside body text */
          objOfAssets[`${taggedTextKey}${assetCount}`] = { ...richAssetData[taggedTextKey] };
          objOfAssets[`${taggedTextKey}${assetCount}`].id = `${
            objOfAssets[`${taggedTextKey}${assetCount}`].id
          }${assetCount}`;
          blockText = blockText.replace(
            taggedTextKey,
            `[[[#entityType${objOfAssets[`${taggedTextKey}${assetCount}`].id}]]]`,
          );
          assetCount += 1;
        }
      });
    }

    /* parsing link tags inside text and replace with regex */
    if (matchArr) {
      matchArr.forEach((match) => {
        const linkText = block.text.substr(match.index, match.lastIndex - match.index);
        if (linkText !== null && linkText !== '' && objOfLinks[`${linkText}${count}`]) {
          blockText = blockText.replace(linkText, `[[[#entityType${objOfLinks[`${linkText}${count}`].id}]]]`);
          count += 1;
        }
      });
    }

    return blockText;
  });

  /* rich content contains, asset infos  */
  const entityMap: { [key: string]: IEntity } = {};
  Object.keys(objOfAssets).forEach((key) => {
    entityMap[objOfAssets[key].id] = objOfAssets[key];
  });

  /* rich content contains, link infos  */
  const linkMap: { [key: string]: IEntity } = {};
  Object.keys(objOfLinks).forEach((key) => {
    linkMap[objOfLinks[key].id] = objOfLinks[key];
  });
  return {
    body: body || [],
    entities: { ...entityMap, ...linkMap },
  };
}

export function parseRichDataToUI(richData: IParsedRichData): IContentType[] {
  try {
    const { body, entities } = richData;
    const entityMap: IEntityMap = {};
    const textContent = typeof body === 'string' ? [body] : body;
    const elm: IContentType[] = [];
    Object.keys(entities || {}).forEach((key) => {
      entityMap[`[[[#entityType${key}]]]`] = entities[key];
    });

    if (!textContent.filter((t) => t !== '').length) {
      return null;
    }
    for (let j = 0; j < textContent.length; j++) {
      const text = textContent[j];
      const newLineArr = [...(text || '').split(entityTypeRegex)];
      const JSXline: IContentType[] = [];
      for (let i = 0; i < newLineArr.length; i++) {
        const segment = newLineArr[i];
        if (!segment || segment === '') {
          continue;
        }
        if (entityMap[segment]) {
          const { info, type } = entityMap[segment];
          const elmProps: {
            entityId: string;
            decorativeText: string;
            type: string;
            link?: string;
          } = {
            entityId: segment,
            decorativeText: info.viewText,
            type,
          };
          if (elmProps.type === 'url') {
            elmProps['link'] = info.url as string;
            JSXline.push({
              textContent: {
                text: elmProps.decorativeText,
                tag: 'a',
                style: 'link',
                elmProps: {
                  href: elmProps.link,
                  target: '_blank',
                  'data-content': elmProps.entityId,
                },
              },
            });
          } else {
            JSXline.push({
              textContent: {
                text: elmProps.decorativeText,
                tag: 'span',
                style: 'link',
                elmProps: {
                  'data-content': elmProps.entityId,
                },
              },
            });
          }
        } else {
          JSXline.push({
            textContent: {
              text: segment,
              tag: 'span',
              style: 'block',
              elmProps: {},
            },
          });
        }
      }
      const endOfLineElm: IContentType = {
        textContent: {
          text: null,
          tag: 'br',
          style: null,
          elmProps: null,
        },
      };
      elm.push(...JSXline, endOfLineElm);
    }
    return elm;
  } catch (e) {
    console.error(e);
    return [];
  }
}
