import {db} from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import { files, folders } from "~/server/db/schema";

export default function SandboxPage(){
    return (
        <div className="felx flex-col items-center justify-center">
            Seed Function
            <form
                action={async () => {
                    "use server";
                    console.log("Seeding......");

                    // insert mockdata to db
                    const folderInsert = await db.insert(folders).values(
                        mockFolders.map((folder, index) => ({
                            id: index + 1,
                            name: folder.name,
                            parent: index === 0 ? null : 1,
                        })),
                    );

                    const fileInsert = await db.insert(files).values(
                        mockFiles.map((file, index) => ({
                            id: index + 1,
                            name: file.name,
                            url: file.url,
                            size: 500,
                            parent: (index % 3) + 1,
                        })),
                    );
                    console.log("Output of mock data addition to DB ......");

                    console.log(folderInsert);
                    console.log(fileInsert);

                }}    
            >
                <button type="submit" className="btn btn-primary">Seed</button>
            </form>
        </div>
    )
}