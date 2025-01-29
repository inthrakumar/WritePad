'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ContentType } from '@/types/types';
type DeleteFolderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  content: ContentType | null;
};

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  content,
}: DeleteFolderModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };
  if(!content) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Delete {content.type === 'file' ? 'File' : 'Folder'}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
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
                Deleting folder...
              </p>
            </div>
          ) : (
            <p>
              Are you sure you want to delete the folder "{content?.roomTitle}"?
              This action cannot be undone.
            </p>
          )}
        </div>
        <DialogFooter>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
