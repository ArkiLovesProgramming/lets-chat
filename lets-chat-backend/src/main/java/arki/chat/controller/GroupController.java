package arki.chat.controller;

import arki.chat.annotation.TokenRequired;
import arki.chat.pojo.Group;
import arki.chat.pojo.User;
import arki.chat.service.GroupService;
import arki.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * Controller for handling group-related API endpoints.
 */
@RestController
@RequestMapping("/api/group")
@CrossOrigin
@TokenRequired // Requires token authentication
public class GroupController {

    @Autowired
    private GroupService groupService;

    @Autowired
    private UserService userService;

    /**
     * Get contacts of a user.
     *
     * @param userId The ID of the user
     * @return List of contacts
     */
    @GetMapping("/getContacts/{userId}")
    public List<Group> getContacts(@PathVariable String userId) {
        return groupService.getGroupsByUserIdAndType(userId, 0);
    }

    /**
     * Get chat groups of a user.
     *
     * @param userId The ID of the user
     * @return List of chat groups
     */
    @GetMapping("/getContactGroups/{userId}")
    public List<Group> getChatGroups(@PathVariable String userId) {
        return groupService.getGroupsByUserIdAndType(userId, 1);
    }

    /**
     * Add a contact to the user's contacts list.
     *
     * @param userId  The ID of the user
     * @param userId2 The ID of the contact to add
     * @return The newly added contact group
     */
    @GetMapping("/addContact/{userId}/{userId2}")
    public Group addContact(@PathVariable String userId, @PathVariable String userId2) {
        User user1 = userService.findById(userId);
        User user2 = userService.findById(userId2);
        return groupService.addGroup(user1.getUsername() + "&&&" + user2.getUsername(), new String[]{userId, userId2}, 0);
    }

    /**
     * Add a chat group.
     *
     * @param data The request body containing group information
     */
    @PostMapping("/addChatGroup")
    public void addChatGroup(@RequestBody Map data) {
        String name = (String) data.get("name");
        String[] userIds = (String[]) data.get("userIds");
        groupService.addGroup(name, userIds, 1);
    }

    /**
     * Get a group by its ID.
     *
     * @param groupId The ID of the group
     * @return The group object
     */
    @GetMapping("/getGroupById/{groupId}")
    public Group getGroupById(@PathVariable String groupId) {
        return groupService.getGroupById(groupId);
    }

    /**
     * Quit a group.
     *
     * @param groupId The ID of the group
     * @param userId  The ID of the user
     */
    @GetMapping("/quitGroup/{groupId}/{userId}")
    public void quitGroup(@PathVariable String groupId, @PathVariable String userId) {
        groupService.quitGroup(groupId, userId);
    }
}
