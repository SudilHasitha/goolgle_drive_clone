import "server-only";

import { files_table as filesSchema, folders_table as foldersSchema } from "~/server/db/schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";

export async function getAllParentsForFolder(folderId: number) {
    const parents = []
    let currentId: number | null = folderId;
    while (currentId !== null) {
        const folder = await db
            .selectDistinct()
            .from(foldersSchema)
            .where(eq(foldersSchema.id, currentId));

        if (!folder[0]) {
            throw new Error("Folder not found");
        }
        /**
         * use unshift 
         * parents.unshift({id: 0, name: "Root", parent: null});
         * not parents.push({id: 0, name: "Root", parent: null});
         * or don't reverse the parents array
         * which affects original array
         * or don't use reversed array
         * which copy the array every time
        */
        parents.unshift(folder[0]);
        currentId = folder[0]?.parent;
    }
    return parents;
}

export function getFiles(folderId: number){
    return db
            .select()
            .from(filesSchema)
            .where(eq(filesSchema.parent, folderId));
}

export function getFolders(folderId: number){ 
    return db
            .select()
            .from(foldersSchema)
            .where(eq(foldersSchema.parent, folderId));
}

export async function createFile(input:{
    file: {name: string, url: string, size: number, parent: number},
    userId: string}) {
    return await db.insert(filesSchema).values({...input.file, parent: 1});
}