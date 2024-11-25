import { NextResponse, NextRequest } from 'next/server';
import { getFolderContents } from '@/utils/DocumentsUtils';

async function handler(req: NextRequest) {
  const url = new URL(req.url);
  const folderName = url.searchParams.get('folderName');
  const folderContents = await getFolderContents(folderName!);

  if (folderContents.success) {
    return NextResponse.json(folderContents.data);
  } else {
    return NextResponse.json({ error: folderContents.error });
  }
}

export const GET = handler;
