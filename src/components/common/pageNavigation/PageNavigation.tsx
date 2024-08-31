import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const PageNavigation: React.FC<PageNavigationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 0 && page < totalPages) {
      onPageChange?.(page);
    }
  };

  const pageRange = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const renderPaginationItems = () => {
    const items: React.ReactNode[] = [];

    // Handle Previous button
    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage - 1);
          }}
          aria-disabled={currentPage === 0}
        />
      </PaginationItem>
    );

    // Handle pages
    if (totalPages <= 7) {
      // Show all pages if there are 7 or fewer
      pageRange(0, totalPages - 1).forEach((page) => {
        items.push(
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page);
              }}
            >
              {page + 1}
            </PaginationLink>
          </PaginationItem>
        );
      });
    } else {
      // Handle pages with ellipsis
      if (currentPage < 3) {
        pageRange(0, 4).forEach((page) => {
          items.push(
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          );
        });
        items.push(<PaginationEllipsis key="ellipsis1" />);
        pageRange(totalPages - 2, totalPages - 1).forEach((page) => {
          items.push(
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          );
        });
      } else if (currentPage > totalPages - 4) {
        pageRange(0, 1).forEach((page) => {
          items.push(
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          );
        });
        items.push(<PaginationEllipsis key="ellipsis2" />);
        pageRange(totalPages - 4, totalPages - 1).forEach((page) => {
          items.push(
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          );
        });
      } else {
        pageRange(currentPage - 2, currentPage + 2).forEach((page) => {
          items.push(
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          );
        });
        items.push(<PaginationEllipsis key="ellipsis3" />);
        pageRange(totalPages - 2, totalPages - 1).forEach((page) => {
          items.push(
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          );
        });
      }
    }

    // Handle Next button
    items.push(
      <PaginationItem key="next">
        <PaginationNext
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage + 1);
          }}
          aria-disabled={currentPage === totalPages - 1}
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <Pagination>
      <PaginationContent>{renderPaginationItems()}</PaginationContent>
    </Pagination>
  );
};

export default PageNavigation;
