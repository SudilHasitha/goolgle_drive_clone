"use server";
import { files_table } from "./db/schema";
import { db } from "./db";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const utAPI = new UTApi();

export async function deleteFiles(fileId: number) {
    const userData = await auth();
    if (!userData.userId) {
        throw new Error("User not found");
    }
    const [file] = await db.select().from(files_table).where(
        and(
            eq(files_table.id, fileId), 
            eq(files_table.owner_id, userData.userId)
        )
    );
    if (!file) {
        throw new Error("File not found");
    }

    const utAPIResults = await utAPI.deleteFiles([file?.url.replace("https://utfs.io/f/","")]);
    // console.log(utAPIResults);

    const dbDeleteResults = await db.delete(files_table).where(eq(files_table.id, fileId));
    // console.log(dbDeleteResults);

    const c = await cookies();
    c.set("force-refresh", JSON.stringify({forceRefresh: true}));

    return {success: true};
}