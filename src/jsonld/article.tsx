import React from 'react';

import { JsonLd, JsonLdProps } from './jsonld';
import { setAuthor } from 'src/utils/schema/setAuthor';
import { setPublisher } from 'src/utils/schema/setPublisher';
import type { Author } from 'src/types';

export interface ArticleJsonLdProps extends JsonLdProps {
  type?: 'Article' | 'Blog' | 'NewsArticle';
  url: string;
  title: string;
  images: ReadonlyArray<string>;
  datePublished: string;
  dateModified?: string;
  authorName?: string | string[];
  author?: Author | Author[];
  description: string;
  publisherName?: string;
  publisherLogo?: string;
}

function ArticleJsonLd({
  type = 'Article',
  keyOverride,
  url,
  title,
  images,
  datePublished,
  dateModified,
  authorName,
  author,
  publisherName = undefined,
  publisherLogo = undefined,
  description,
}: ArticleJsonLdProps) {
  const data = {
    datePublished,
    description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: images,
    dateModified: dateModified || datePublished,
    author: setAuthor(author || authorName),
    publisher: setPublisher(publisherName, publisherLogo),
  };

  return (
    <JsonLd
      type={type}
      keyOverride={keyOverride}
      {...data}
      scriptKey="article"
    />
  );
}

export default ArticleJsonLd;
