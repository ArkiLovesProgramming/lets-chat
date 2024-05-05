package arki.chat.controller;

import arki.chat.server.ChatWSServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.logging.Logger;

/**
 * Controller for handling file upload requests.
 */
@RestController
@RequestMapping("/file")
public class FileController {
    // Get the logger
    private static final Logger LOGGER = Logger.getLogger(ChatWSServer.class.getName());

    /**
     * Handle file upload requests.
     *
     * @param files   The array of files to upload
     * @param request The HTTP request object
     * @return A HashMap containing the upload result
     * @throws UnsupportedEncodingException If the encoding is not supported
     */
    @PostMapping("/upload")
    public HashMap upload(@RequestParam CommonsMultipartFile[] files, HttpServletRequest request) throws UnsupportedEncodingException {
        HashMap result = new HashMap<>();

        // Get the storage path for uploaded files
        String filePath = request.getServletContext().getRealPath("/uploadFile");

        // If the path does not exist, create one
        File fileFolder = new File(filePath);
        if (!fileFolder.exists()) {
            fileFolder.mkdirs();
        }

        // Iterate through the array of uploaded files
        for (int i = 0; i < files.length; i++) {
            // Get the original filename and convert it to UTF-8 encoding
            String fileName = new String(files[i].getOriginalFilename().getBytes("ISO-8859-1"), "UTF-8");
            // Create the destination file object
            File dest = new File(filePath + '/' + new Date().getTime() + "-" + fileName);
            try {
                // Save the file to the destination file
                files[i].transferTo(dest);
            } catch (Exception e) {
                // If an exception occurs, log the error and return an error message
                LOGGER.severe(e.getMessage());
                result.put("code", 2);
                result.put("result", "Program error, please upload again");
                return result;
            }
        }
        // Return the upload success result
        result.put("code", 1);
        result.put("result", "File uploaded successfully");
        return result;
    }
}
