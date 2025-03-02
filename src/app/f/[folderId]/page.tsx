import DriveContents from "../../drive-contents";
import { getFolders, getFiles, getAllParentsForFolder } from "~/server/db/queries";


export default async function GoogleDriveClone(props: { params: Promise<{ folderId: string }> }) {

    const params = await props.params;

    const parsedFolderId = parseInt(params.folderId);
    if (Number.isNaN(parsedFolderId)) {
        return <div>Invalid folder ID</div>;
    }

    const filesPromise = getFiles(parsedFolderId);
    const foldersPromise = getFolders(parsedFolderId);
    const parentsPromise = getAllParentsForFolder(parsedFolderId);

    /**
     * Hi Monkey think about error hangling when a folder structure get altered
     * such as intermediate folder is deleted
     * parentsPromise will throw an error
     * 
     * So think about how to handle this error
     */
    const [folders, files, parents] = await Promise.all([foldersPromise, filesPromise, parentsPromise]);
    
    return <DriveContents files={files} folders={folders} parents={parents} currentFolderId={parsedFolderId}/>;

}