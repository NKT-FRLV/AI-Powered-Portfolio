'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

export type ResponseProps = ComponentProps<'div'> & {
  children: string
  parseIncompleteMarkdown?: boolean
  allowedImagePrefixes?: string[]
  allowedLinkPrefixes?: string[]
}

export const Response = ({
  children,
  className,
  parseIncompleteMarkdown = true,
  allowedImagePrefixes = ['*'],
  allowedLinkPrefixes = ['*'],
  ...props
}: ResponseProps) => {
  // Auto-complete incomplete markdown during streaming
  const processStreamingMarkdown = (content: string) => {
    if (!parseIncompleteMarkdown) return content

    let processed = content

    // Auto-close incomplete bold
    const boldMatches = processed.match(/\*\*/g)
    if (boldMatches && boldMatches.length % 2 === 1) {
      processed += '**'
    }

    // Auto-close incomplete italic
    const italicMatches = processed.match(/(?<!\*)\*(?!\*)/g)
    if (italicMatches && italicMatches.length % 2 === 1) {
      processed += '*'
    }

    // Auto-close incomplete code
    const codeMatches = processed.match(/`/g)
    if (codeMatches && codeMatches.length % 2 === 1) {
      processed += '`'
    }

    // Auto-close incomplete strikethrough
    const strikeMatches = processed.match(/~~/g)
    if (strikeMatches && strikeMatches.length % 2 === 1) {
      processed += '~~'
    }

    return processed
  }

  const processedContent = processStreamingMarkdown(children)

  return (
    <div className={cn('prose prose-sm max-w-none dark:prose-invert', className)} {...props}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : ''
            
            // Check if it's inline code by looking at props
            const isInline = !className?.includes('language-')
            
            if (isInline) {
              return (
                <code className="rounded bg-muted px-1 py-0.5 text-sm font-mono" {...props}>
                  {children}
                </code>
              )
            }

            return (
              <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
                <code className={`language-${language} text-sm`} {...props}>
                  {children}
                </code>
              </pre>
            )
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-border pl-4 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
          a: ({ href, children, ...props }) => {
            // Check if link is allowed
            const isAllowed = allowedLinkPrefixes.includes('*') || 
              allowedLinkPrefixes.some(prefix => href?.startsWith(prefix))
            
            if (!isAllowed) return <span>{children}</span>

            return (
              <a 
                href={href} 
                className="text-primary underline underline-offset-4 hover:text-primary/80"
                target="_blank" 
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            )
          },
          img: ({ src, alt }) => {
            // Check if image is allowed
            const isAllowed = allowedImagePrefixes.includes('*') || 
              allowedImagePrefixes.some(prefix => src?.startsWith(prefix))
            
            if (!isAllowed) return <span>[Image: {alt}]</span>

            return (
              <div 
                className="rounded-lg max-w-full h-auto bg-muted p-4 text-center text-sm"
              >
                [Image: {alt}]
              </div>
            )
          },
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-border">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-border bg-muted px-3 py-2 text-left font-medium">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-border px-3 py-2">
              {children}
            </td>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  )
}
