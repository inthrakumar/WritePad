import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { DeleteModalProps } from '@/types/types';

export function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    content,
}: DeleteModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    const handleConfirm = async () => {
        setIsDeleting(true);
        try {
            await onConfirm();
        } finally {
            setIsDeleting(false);
            onClose();
        }
    };

    if (!content || !isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-white rounded-lg shadow-lg w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b m-4 border-gray-200 flex justify-between items-center">
                            <h2 className="text-xl font-semibold">
                                Delete {content.type === 'file' ? 'File' : 'Folder'}
                            </h2>
                            <Button variant="ghost" onClick={onClose} className="p-1">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="p-4 m-2">
                            {isDeleting ? (
                                <div className="flex flex-col items-center justify-center">
                                    <motion.div
                                        animate={{
                                            rotate: 360,
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: 'linear',
                                        }}
                                    >
                                        <Loader2 className="h-8 w-8 text-primary" />
                                    </motion.div>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Deleting {content.type === 'file' ? 'file' : 'folder'}...
                                    </p>
                                </div>
                            ) : (
                                <p className="p-2 text-sm text-gray-600">
                                    Are you sure you want to delete the {content.type} "
                                    {content.roomTitle}"? This action cannot be undone.
                                </p>
                            )}
                        </div>
                        <div className="p-4 border-t border-gray-200 flex justify-end space-x-2">
                            <Button variant="outline" onClick={onClose} disabled={isDeleting}>
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleConfirm}
                                disabled={isDeleting}
                            >
                                Delete
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
