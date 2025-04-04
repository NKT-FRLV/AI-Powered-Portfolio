import { cn } from "@/app/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-skeleton rounded-md bg-muted/50 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export { Skeleton } 