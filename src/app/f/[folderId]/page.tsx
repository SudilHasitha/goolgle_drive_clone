import { files as filesSchema, folders as foldersSchema } from "~/server/db/schema";
import { db } from "~/server/db";
import DriveContents from "../../drive-contents";
import { z } from "zod";
import { eq } from "drizzle-orm";

export default async function GoogleDriveClone(props: { params: Promise<{ folderId: string }> }) {

    const params = await props.params;

    const parsedFolderId = parseInt(params.folderId);
    if (Number.isNaN(parsedFolderId)) {
        return <div>Invalid folder ID</div>;
    }

    console.log("Folder ID: ", params.folderId);

    const files = await db
            .select()
            .from(filesSchema)
            .where(eq(filesSchema.parent, parsedFolderId));
    const folders = await db
            .select()
            .from(foldersSchema)
            .where(eq(foldersSchema.parent, parsedFolderId));

    return <DriveContents files={files} folders={folders} />;

}