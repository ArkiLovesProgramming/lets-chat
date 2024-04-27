package arki.chat.controller;

import arki.chat.pojo.Group;
import arki.chat.pojo.User;
import arki.chat.service.GroupService;
import arki.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/group")
@CrossOrigin
public class GroupController {

    @Autowired
    private GroupService groupService;

    @Autowired
    private UserService userService;

    @GetMapping("/getContacts/{userId}")
    public List<Group> getContacts(@PathVariable String userId){
        return groupService.getGroupsByUserIdAndType(userId, 0);
    }

    @GetMapping("/getContactGroups/{userId}")
    public List<Group> getChatGroups(@PathVariable String userId){
        return groupService.getGroupsByUserIdAndType(userId, 1);
    }

    @GetMapping("/addContact/{userId}/{userId2}")
    public void addContact(@PathVariable String userId, @PathVariable String userId2){
        User user1 = userService.findById(userId);
        User user2 = userService.findById(userId2);
        groupService.addGroup(user1.getUsername()+"&&&"+user2.getUsername(), new String[]{userId, userId2}, 0);
    }

    @PostMapping("/addChatGroup")
    public void addChatGroup(@RequestBody Map data){
        String name = (String) data.get("name");
        String[] userIds = (String[]) data.get("userIds");
        groupService.addGroup(name, userIds, 1);
    }

    @GetMapping("/getGroupById/{groupId}")
    public Group getGroupById(@PathVariable String groupId){
        return groupService.getGroupById(groupId);
    }

    @GetMapping("/quitGroup/{groupId}/{userId}")
    public void quitGroup(@PathVariable String groupId, @PathVariable String userId){
        groupService.quitGroup(groupId, userId);
    }

}
