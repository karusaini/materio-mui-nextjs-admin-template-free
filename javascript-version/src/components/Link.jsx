'use client'

// React Imports
import { forwardRef } from 'react'

// Next Imports
import NextLink from 'next/link'

const Link = (props, ref) => {
  // Destructure props and provide a fallback for href
  const { href, onClick, ...rest } = props
  const validHref = href || '/' // Always ensure href is at least '/'

  return (
    <NextLink
      ref={ref}
      href={validHref}
      // Pass all other props
      {...rest}
      onClick={onClick ? e => onClick(e) : !href ? e => e.preventDefault() : undefined}
    />
  )
}

export default forwardRef(Link)
