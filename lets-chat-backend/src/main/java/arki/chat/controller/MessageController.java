package arki.chat.controller;

import arki.chat.annotation.TokenRequired;
import arki.chat.pojo.Message;
import arki.chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/message")
@TokenRequired
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/getLastMessageByGroupId/{groupId}")
    public Message getLastMessageByGroupId(@PathVariable String groupId){
        return messageService.getLastMessageByGroupId(groupId);
    }

    @GetMapping("/allMessagesByGroupId/{groupId}")
    public List<Message> AllMessagesByGroupId(@PathVariable String groupId){
        return messageService.AllMessagesByGroupId(groupId);
    }
}
