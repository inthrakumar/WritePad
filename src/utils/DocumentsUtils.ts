import { convex_connection } from '@/config/serverconfig';
import { api } from '../../convex/_generated/api';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

const getFolderContents = async (foldername: string) => {
  try {
    auth().protect();
    const folderContents = await convex_connection.query(
      api.documents.getFolderContents,
      {
        folderName: foldername,
      }
    );
    revalidatePath(`/`);
    return JSON.parse(JSON.stringify(folderContents));
  } catch (error) {
    console.error(error);
  }
};

export { getFolderContents };
