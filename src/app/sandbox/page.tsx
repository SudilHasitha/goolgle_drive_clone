import {db} from "~/server/db";
import { mockFolders, mockFiles } from "~/lib/mock-data";
import { files_table, folders_table } from "~/server/db/schema";
import { auth } from "@clerk/nextjs/server";

export default function SandboxPage(){
    return (
        <div className="felx flex-col items-center justify-center">
            Seed Function
            <form
                action={async () => {
                    "use server";
                    console.log("Seeding......");
                    const user = await auth();

                    if(!user.userId){
                        throw new Error("User not found");
                    }

                    const rootFolder = await db.insert(folders_table).values({
                        name: "root",
                        owner_id: user.userId,
                        parent: null,
                    }).$returningId();

                    // insert mockdata to db
                    const folderInsert = await db.insert(folders_table).values(
                        mockFolders.map((folder, index) => ({
                            id: index + 1,
                            owner_id: user.userId,
                            name: folder.name,
                            parent: rootFolder[0]!.id,
                        })),
                    );

                    // const fileInsert = await db.insert(files_table).values(
                    //     mockFiles.map((file, index) => ({
                    //         id: index + 1,
                    //         owner_id: file.owner_id,
                    //         name: file.name,
                    //         url: file.url,
                    //         size: 500,
                    //         parent: (index % 3) + 1,
                    //     })),
                    // );
                    console.log("Output of mock data addition to DB ......");

                    console.log(folderInsert);
                    // console.log(fileInsert);

                }}    
            >
                <button type="submit" className="btn btn-primary">Seed</button>
            </form>
        </div>
    )
}