import React from 'react';
import { setAuthor } from 'src/utils/schema/setAuthor';
import { setPublisher } from 'src/utils/schema/setPublisher';
import type { Author } from 'src/types';

import { JsonLd, JsonLdProps } from './jsonld';

export interface NewsArticleJsonLdProps extends JsonLdProps {
  url: string;
  title: string;
  images: ReadonlyArray<string>;
  section: string;
  keywords: string;
  dateCreated: string;
  datePublished: string;
  dateModified?: string;
  authorName: string | string[];
  author: Author | Author[],
  description: string;
  body: string;
  publisherName: string;
  publisherLogo: string;
}

function NewsArticleJsonLd({
  type = 'NewsArticle',
  keyOverride,
  url,
  title,
  images,
  section,
  dateCreated,
  datePublished,
  dateModified,
  authorName,
  author,
  publisherName,
  publisherLogo,
  body,
  ...rest
}: NewsArticleJsonLdProps) {

  console.error({author, authorName})
  const data = {
    ...rest,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: images,
    articleSection: section,
    dateCreated: dateCreated || datePublished,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: setAuthor(author || authorName),
    publisher: setPublisher(publisherName, publisherLogo),
    articleBody: body,
  };

  console.warn({data})
  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="NewsArticle"
    />
  );
}

export default NewsArticleJsonLd;
