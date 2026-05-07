import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/util";

interface AboutCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  category: string;
}

const AboutCard = React.forwardRef<HTMLDivElement, AboutCardProps>(
  ({ className, imageUrl, title, category, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative block overflow-hidden bg-card text-card-foreground transition-all duration-300 ",
          className,
        )}
        {...props}
      >
        <a aria-label={title}>
          {/* Image container with aspect ratio */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              unoptimized
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="h-full w-full border-black object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>
          {/* Card content */}
          <div className="p0 py-6">
            <h3 className="font-semibold text-xl truncate">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{category}</p>
          </div>
        </a>

        {/* Save button - appears on hover */}
        {/* <Button
          variant="accent"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
          onClick={handleSaveClick}
          aria-label="Save thing"
        >
          <Bookmark className="h-4 w-4" />
        </Button> */}
      </div>
    );
  },
);

AboutCard.displayName = "AboutCard";

export { AboutCard };
