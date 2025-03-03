import "server-only";

import { files_table as filesSchema, folders_table as foldersSchema } from "~/server/db/schema";
import { db } from "~/server/db";
import { eq, and, isNull } from "drizzle-orm";

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
            .where(eq(filesSchema.parent, folderId))
            .orderBy(filesSchema.id);
}

export function getFolders(folderId: number){ 
    return db
            .select()
            .from(foldersSchema)
            .where(eq(foldersSchema.parent, folderId))
            .orderBy(foldersSchema.id);
}

export async function getFolderById(folderId: number){
    const folder = await db
        .select()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, folderId));
    if (!folder[0]) {
        throw new Error("Folder not found");
    }
    return folder[0];
}

export async function getRootFolder(userId: string){
    const folder = await db
        .select()
        .from(foldersSchema)
        .where(
            and(
                eq(foldersSchema.owner_id, userId),
                isNull(foldersSchema.parent)
            )
        );
    return folder[0];
}

export async function createFile(input:{
    file: {name: string, url: string, size: number, parent: number},
    userId: string}) {
    return await db.insert(filesSchema).values({...input.file, owner_id: input.userId});
}

export async function onBoardUser(userId: string) {
    const rootFolder = await db.insert(foldersSchema).values({
        name: "root",
        owner_id: userId,
        parent: null,
    }).$returningId();


    // Insert basic folders
    await db.insert(foldersSchema).values([{
        name: "Documents",
        owner_id: userId,
        parent: rootFolder[0]!.id,
    },{ 
        name: "Images",
        owner_id: userId,
        parent: rootFolder[0]!.id,
    },{
        name: "Videos",
        owner_id: userId,
        parent: rootFolder[0]!.id,
    },{
        name: "Music",
        owner_id: userId,
        parent: rootFolder[0]!.id,
    }]);

    return rootFolder[0]

}