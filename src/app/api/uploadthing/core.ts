import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { createFile, getFolderById } from "~/server/db/queries";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  driveUploader: f({
    blob: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "1GB",
      maxFileCount: 100,
    },
  }).input(
    z.object({
      folderId: z.number(),
  }))
    // Set permissions and file types for this FileRoute
    .middleware(async ({input}) => {
      // This code runs on your server before upload
      const user = await auth();

      if (!user.userId) {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new UploadThingError({
          message: "Unauthorized - User must be logged in",
          code: "FORBIDDEN",
        });
      }

      const folderId = await getFolderById(input.folderId);

      if (!folderId) {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new UploadThingError({
          message: "Folder not found",
          code: "NOT_FOUND",
        });
      }

      if (folderId.owner_id !== user.userId) {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new UploadThingError({
          message: "Unauthorized - User must be the owner of the folder",
          code: "FORBIDDEN",
        });
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId, parentId: input.folderId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      // console.log("Upload complete for userId:", metadata.userId);

      // console.log("file url", file.url);

      await createFile({
        file: {
            name: file.name,
            url: file.url,
            size: file.size,
            parent: metadata.parentId,
         },
        userId: metadata.userId,
        });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
