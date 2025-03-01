import { files as filesSchema, folders as foldersSchema } from "~/server/db/schema";
import { db } from "~/server/db";
import DriveContents from "../../drive-contents";
import { eq } from "drizzle-orm";

async function getAllParent(folderId: number) {
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

        parents.unshift(folder[0]);
        currentId = folder[0]?.parent;
    }
    return parents;
}

export default async function GoogleDriveClone(props: { params: Promise<{ folderId: string }> }) {

    const params = await props.params;

    const parsedFolderId = parseInt(params.folderId);
    if (Number.isNaN(parsedFolderId)) {
        return <div>Invalid folder ID</div>;
    }

    console.log("Folder ID: ", params.folderId);

    const filesPromise = db
            .select()
            .from(filesSchema)
            .where(eq(filesSchema.parent, parsedFolderId));
    const foldersPromise = db
            .select()
            .from(foldersSchema)
            .where(eq(foldersSchema.parent, parsedFolderId));
    
    const parentsPromise = getAllParent(parsedFolderId);

    /**
     * Hi Monkey think about error hangling when a folder structure get altered
     * such as intermediate folder is deleted
     * parentsPromise will throw an error
     * 
     * So think about how to handle this error
     */
    const [folders, files, parents] = await Promise.all([foldersPromise, filesPromise, parentsPromise]);
    return <DriveContents files={files} folders={folders} parents={parents} />;

}