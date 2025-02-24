import { FileIcon, PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Props = {
  message: string;
  sidemessage: string;
};
export default function EmptyState({ message, sidemessage }: Props) {
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <FileIcon className="h-6 w-6" />
        </div>
        <CardTitle>{message}</CardTitle>
        <CardDescription>{sidemessage}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
     
      </CardContent>
    </Card>
  );
}
