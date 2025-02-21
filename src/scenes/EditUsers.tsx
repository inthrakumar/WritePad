'use client';

import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { UserMinus } from 'lucide-react';
import { roomDetails } from '@/types/types';
import { removeUserAccess } from '@/utils/RoomUtils';
import { UserAccesses } from '@/types/types';

export default function UserAccessList({ roomData }: roomDetails) {
  const [userToRemove, setUserToRemove] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserAccesses | []>([]);

  // ✅ FIX: Set users only when `roomData` changes
  useEffect(() => {
    setUsers(roomData?.usersAccesses ? Object.entries(roomData.usersAccesses) : []);
  }, [roomData]); // Runs only when `roomData` changes

  const removeAccess = async () => {
    if (!userToRemove || !users) return;
    try {
      setLoading(true);
      const response = await removeUserAccess({
        roomId: roomData.id,
        email: userToRemove!,
      });
      if (response.status) {
        // ✅ Remove only the user with `userToRemove` email
        setUsers((prev) => prev.filter((user) => user[0] !== userToRemove!));
        setUserToRemove(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeVariant = (accessLevel: string[]) => {
    if (accessLevel.includes('room:write')) return 'destructive';
    if (accessLevel.includes('room:presence:write')) return 'secondary';
    return 'default';
  };

  return (
    <div className="max-w-4xl w-4xl max-h-[80vh] overflow-auto mx-auto space-y-4 p-8 bg-background shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">
        User Access Management
      </h2>

      {users.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          No users with access
        </div>
      )}

      {users.map((user, index) => (
        <Card
          key={index}
          className="p-4 border border-border rounded-xl shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={'https://api.dicebear.com/9.x/adventurer/svg'}
                  alt={user[0] as string}
                />
                <AvatarFallback className="bg-muted text-primary font-bold">
                  {user[0].slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user[0]}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                variant={getBadgeVariant(user[1])}
                className="px-3 py-1 text-sm"
              >
                {Array.isArray(user[1]) && user[1].includes('room:write')
                  ? 'Editor'
                  : 'Viewer'}
              </Badge>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setUserToRemove(user[0])}
                className="text-destructive hover:text-white hover:bg-destructive p-2 transition-all duration-300 rounded-full"
              >
                <UserMinus className="h-5 w-5" />
                <span className="sr-only">Remove access for {user[0]}</span>
              </Button>
            </div>
          </div>
        </Card>
      ))}

      <AlertDialog
        open={!!userToRemove}
        onOpenChange={() => setUserToRemove(null)}
      >
        <AlertDialogContent className="rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold">
              Remove User Access
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              Are you sure you want to remove access for{' '}
              <span className="font-semibold">{userToRemove}</span>? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
            <Button
              disabled={isLoading}
              onClick={() => userToRemove && removeAccess()}
              className="bg-destructive hover:bg-destructive/90 rounded-lg"
            >
              Remove Access
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

