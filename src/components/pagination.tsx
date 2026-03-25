"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Create page number range
  const range = (): (number | "...")[] => {
    const delta = 2;
    const pages: (number | "...")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1 || isPending}
        className="size-9"
      >
        <ChevronLeft className="size-4" />
      </Button>

      {range().map((item, i) =>
        item === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground text-sm">
            …
          </span>
        ) : (
          <Button
            key={item}
            variant={item === currentPage ? "default" : "ghost"}
            size="icon"
            onClick={() => goTo(item as number)}
            disabled={isPending}
            className="size-9 text-sm"
          >
            {item}
          </Button>
        )
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages || isPending}
        className="size-9"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}
