'use client';

import React from 'react';

import { cn } from '@/lib/utils';

export interface Avatar {
    imageUrl: string;
}
interface AvatarCirclesProps {
    className?: string;
    numPeople?: number;
    avatarUrls: Avatar[];
}

const AvatarCircles = ({
    numPeople,
    className,
    avatarUrls,
}: AvatarCirclesProps) => {
    const isNumbers = typeof numPeople === 'number' && numPeople > 0; // Ensure numPeople is a valid number
    return (
        <div className={cn('z-10 flex -space-x-4 rtl:space-x-reverse', className)}>
            {avatarUrls.map((url, index) => (
                <img
                    key={index}
                    className="h-10 w-10 rounded-full hover:cursor-pointer border-2 border-white dark:border-gray-800"
                    src={url.imageUrl}
                    width={40}
                    height={40}
                    alt={`Avatar ${index + 1}`}
                />
            ))}
            {isNumbers && (
                <a
                    className="flex hover:cursor-pointer h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
                    href="#"
                >
                    +{numPeople}
                </a>
            )}
        </div>
    );
};

export default AvatarCircles;
