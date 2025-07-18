import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';

export default function Markdown({ url }) {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(url)
      .then((r) => r.text())
      .then(setContent);
  }, [url]);

  return (
    <article className="markdown-body" style={{ margin: '0 auto' }}>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
      />
    </article>
  );
}
