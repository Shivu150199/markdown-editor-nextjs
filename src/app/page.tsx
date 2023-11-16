// import Image from 'next/image'
"use client"
import { useState } from 'react'
import Markdown from 'react-markdown'

import {CodeBlock,Pre} from '@/components/Code'
import remarkGfm from 'remark-gfm'
import rehypeSanitize from 'rehype-sanitize'
import rehypeExternalLinks from 'rehype-external-links'
import Header from '@/components/Header'

export default function Home() {
  const [source, setSource] = useState('')
  
  const feedElement = (syntax: string) => {
    return setSource(source + syntax)
  }
  
const options={code:CodeBlock,
pre:Pre
}
  return (
    <>
    <Header feedElement={feedElement}/>
    <div className="h-screen flex justify-between">
      <section className="w-full h-full pt-5 flex-1">
        <textarea
          value={source}
          name="markdown"
          placeholder="feed me some markdown"
          className="w-full h-full placeholder:opacity-75"
          onChange={(e) => setSource(e.target.value)}
          autoFocus
          />
      </section>
      <div className="border-dashed flex-1">
        <article className="w-full pt-5 pl-6">
          <Markdown
            className="prose prose-invert min-w-full"
            components={options}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeSanitize,
              [rehypeExternalLinks, { content: { type: 'text', value: '🔗' } }],
            ]}
            >
            {source}
          </Markdown>
        </article>
      </div>
    </div>
            </>
  )
}
