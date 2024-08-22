import { ChevronLeftIcon, ChevronRightIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { isNil } from 'lodash';
import Link from 'next/link';
import * as React from 'react';

import { ButtonProps, buttonVariants } from '@/app/_components/shadcn/button';
import { cn } from '@/libs/utils';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn('tw-mx-auto tw-flex tw-w-full tw-justify-center', className)}
        {...props}
    />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
    ({ className, ...props }, ref) => (
        <ul
            ref={ref}
            className={cn('tw-flex tw-flex-row tw-items-center tw-gap-1', className)}
            {...props}
        />
    ),
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
    ({ className, ...props }, ref) => <li ref={ref} className={cn('tw-', className)} {...props} />,
);
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
    isActive?: boolean;
    disabled?: boolean;
    'aria-label'?: string;
    text?: string;
} & Pick<ButtonProps, 'size'> &
    React.ComponentProps<'a'>;

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => (
    <Link
        aria-current={isActive ? 'page' : undefined}
        className={cn(
            buttonVariants({
                variant: isActive ? 'outline' : 'ghost',
                size,
            }),
            clsx({ 'tw-pointer-events-none tw-opacity-50': props.disabled }),
            className,
        )}
        {...props}
        aria-disabled={props.disabled}
        href={isNil(props.href) ? ':' : props.href}
    />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
    className,
    text,
    'aria-label': ariaLabel,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label={ariaLabel ?? 'Go to previous page'}
        size="default"
        className={cn('tw-gap-1 tw-pl-2.5', className)}
        {...props}
    >
        <ChevronLeftIcon className="tw-h-4 tw-w-4" />
        <span>{text ?? 'Previous'}</span>
    </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
    className,
    text,
    'aria-label': ariaLabel,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label={ariaLabel ?? 'Go to next page'}
        size="default"
        className={cn('tw-gap-1 tw-pr-2.5', className)}
        {...props}
    >
        <span>{text ?? 'Next'}</span>
        <ChevronRightIcon className="tw-h-4 tw-w-4" />
    </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
    className,
    text,
    'aria-label': ariaLabel,
    ...props
}: React.ComponentProps<'span'> & { text?: string }) => (
    <span
        aria-hidden
        className={cn('tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center', className)}
        {...props}
    >
        <DotsHorizontalIcon className="tw-h-4 tw-w-4" />
        <span className="tw-sr-only">{text ?? 'More pages'}</span>
    </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
};
