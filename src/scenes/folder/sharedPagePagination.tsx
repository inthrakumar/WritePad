import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { PaginationProps } from '@/types/types';
const SharedPagination = ({ totalpages, setPage, page }: PaginationProps) => {
    return (
        <Pagination>
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => setPage(Math.max(page - 1, 1))}
                    />
                </PaginationItem>

                {/* Page Numbers */}
                {[...Array(totalpages)].map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink href="#" onClick={() => setPage(index + 1)}>
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {/* Next Button */}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() => setPage(Math.min(page + 1, totalpages))}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};

export default SharedPagination;
