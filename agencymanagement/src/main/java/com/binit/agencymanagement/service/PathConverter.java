package com.binit.agencymanagement.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

public class PathConverter {
    // Make this method public
    public static File createFileFromPath(Path sourcePath, String newFileName) throws IOException {
        // Define the target path for the new file
        Path targetPath = sourcePath.resolveSibling(newFileName);

        // Copy the source file to the target path
        Files.copy(sourcePath, targetPath, StandardCopyOption.REPLACE_EXISTING);

        // Return the File object
        return targetPath.toFile();
    }
}