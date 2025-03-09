import * as React from "react"
import NextLink from "next/link"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const linkVariants = cva(
  "transition-colors hover:text-foreground/80",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground hover:text-foreground",
      },
      size: {
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkVariants> {
  href: string
  asNextLink?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, size, href, asNextLink = true, ...props }, ref) => {
    if (asNextLink && !href.startsWith("http") && !href.startsWith("#")) {
      return (
        <NextLink
          href={href}
          className={cn(linkVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      )
    }

    return (
      <a
        href={href}
        className={cn(linkVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Link.displayName = "Link"

export { Link, linkVariants } 