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

@RestController
@RequestMapping("/file")
public class FileController {
    //     获取日志记录器
    private static final Logger LOGGER = Logger.getLogger(ChatWSServer.class.getName());

    @PostMapping("/upload")
    public HashMap upload(@RequestParam CommonsMultipartFile[] files, HttpServletRequest request) throws UnsupportedEncodingException {
        HashMap result = new HashMap<>();

        String filePath = request.getServletContext().getRealPath("/uploadFile");
//        如果路径不存在，创建一个
        File fileFolder = new File(filePath);
        if (!fileFolder.exists()){
            fileFolder.mkdirs();
        }

        for(int i=0;i<files.length;i++){
            String fileName = new String(files[i].getOriginalFilename().getBytes("ISO-8859-1"), "UTF-8");
            File dest = new File(filePath +'/'+ new Date().getTime() + "-" + fileName);
            try {
                files[i].transferTo(dest);
            } catch (Exception e) {
                LOGGER.severe(e.getMessage());
                result.put("code",2);
                result.put("result","程序错误，请重新上传");
                return result;
            }
        }
        result.put("code",1);
        result.put("result","文件上传成功");
        return result;
    }
}
