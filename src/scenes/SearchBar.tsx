'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, File, Folder, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ContentType } from '@/types/types';

interface SearchBarProps {
  data: ContentType[];
  onNavigate: (item: ContentType) => void;
}

export function SearchBar({ data, onNavigate }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [filteredItems, setFilteredItems] = useState<ContentType[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.roomTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, data]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (filteredItems.length > 0) {
      onNavigate(filteredItems[0]);
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-[30vw] justify-between text-sm text-muted-foreground"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center">
          <Search className="mr-2 h-2 w-2" />
          Search files and folders...
        </div>
        <kbd className="pointer-events-none select-none rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed left-[40%] top-[40%] z-50 w-full max-w-lg translate-x-[-50%] border bg-background shadow-lg sm:rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search files and folders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-6 text-lg w-full focus-visible:ring-0 focus-visible:ring-offset-0 rounded-t-lg rounded-b-none border-0"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-3 top-3 h-8 px-2 text-muted-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-xs mr-1">ESC</span>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </form>
              <ScrollArea className="max-h-[50vh]">
                <div className="p-4">
                  {filteredItems.map((item) => (
                    <Button
                      key={item._id}
                      variant="ghost"
                      className="w-full justify-start text-sm mb-1"
                      onClick={() => {
                        onNavigate(item);
                        setIsOpen(false);
                        setSearchQuery('');
                      }}
                    >
                      {item.type === 'folder' ? (
                        <Folder className="mr-2 h-4 w-4" />
                      ) : (
                        <File className="mr-2 h-4 w-4" />
                      )}
                      <span className="ml-2 flex-1">{item.roomTitle}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {new Date(item.lastEdited).toLocaleDateString()}
                      </span>
                    </Button>
                  ))}
                  {filteredItems.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center">
                      No results found
                    </p>
                  )}
                </div>
              </ScrollArea>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
