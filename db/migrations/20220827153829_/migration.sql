-- CreateTable
CREATE TABLE "GalleryRating" (
    "userId" INTEGER NOT NULL,
    "galleryId" INTEGER NOT NULL,
    "value" REAL NOT NULL,
    CONSTRAINT "GalleryRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GalleryRating_galleryId_fkey" FOREIGN KEY ("galleryId") REFERENCES "Gallery" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "GalleryRating_userId_galleryId_key" ON "GalleryRating"("userId", "galleryId");
