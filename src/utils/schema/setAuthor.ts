import type { Author } from 'src/types';

export function setAuthor(author?: string | string[] | Author | Author[]) {
  console.error({author})
  if (Array.isArray(author)) {
    return author.map(a => {
      let obj = { '@type': 'Person', name: typeof a === 'string' ? a : a.name };
      if (typeof a !== 'string' && a.sameAs) {
        obj = Object.assign({}, obj, { sameAs: a.sameAs });
      }
      return obj;
    });
  } else if (author) {
    let obj = {
      '@type': 'Person',
      name: typeof author === 'string' ? author : author.name,
    };

    if (typeof author !== 'string' && author.sameAs) {
      obj = Object.assign({}, obj, { sameAs: author.sameAs });
    }
    return obj;
  }

  return undefined;
}
