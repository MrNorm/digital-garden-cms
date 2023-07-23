-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Cutting" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL DEFAULT '',
    "image_filesize" INTEGER,
    "image_extension" TEXT,
    "image_width" INTEGER,
    "image_height" INTEGER,
    "image_id" TEXT
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "_Project_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_Project_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Project" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Project_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Cutting_images" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_Cutting_images_A_fkey" FOREIGN KEY ("A") REFERENCES "Cutting" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Cutting_images_B_fkey" FOREIGN KEY ("B") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Cutting_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_Cutting_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Cutting" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Cutting_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_Image_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_Image_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Image" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Image_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_Project_tags_AB_unique" ON "_Project_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Project_tags_B_index" ON "_Project_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Cutting_images_AB_unique" ON "_Cutting_images"("A", "B");

-- CreateIndex
CREATE INDEX "_Cutting_images_B_index" ON "_Cutting_images"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Cutting_tags_AB_unique" ON "_Cutting_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Cutting_tags_B_index" ON "_Cutting_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Image_tags_AB_unique" ON "_Image_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Image_tags_B_index" ON "_Image_tags"("B");
