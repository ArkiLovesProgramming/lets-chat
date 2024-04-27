package arki.chat;

import arki.chat.pojo.Group;
import arki.chat.pojo.Message;
import arki.chat.pojo.User;
import arki.chat.service.GroupService;
import arki.chat.service.MessageService;
import arki.chat.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ChatApplicationTests {

    @Autowired
    private UserService userService;

    @Autowired
    private MessageService messageService;

    @Autowired
    private GroupService groupService;

    @Test
    void contextLoads() {
        User user = userService.verify("arkiarki", "1234567");
        System.out.println(user);
    }

    @Test
    void saveMessage(){
        Message message = new Message("001", "hello, i am content", "662523ed9200fcda2ff00535", "group1234567", "123", 0);
        messageService.saveMessage(message);
    }

    @Test
    void addGroup(){
//        groupService.addGroup("arki&alsiha", new String[0]);
    }

    @Test
    void UserFindById(){
        System.out.println(userService.findById("6625ac089200fcda2ff00536"));
    }

    @Test
    void addUsersToGroup(){
        String[] userIds = {"662523ed9200fcda2ff00535", "6625ac089200fcda2ff00536"};
        groupService.addUsersToGroup("group1234567", userIds);
    }

    @Test
    void getGroupsByUserIdAndType(){
        List<Group> groups = groupService.getGroupsByUserIdAndType("662523ed9200fcda2ff00535", 0);
        System.out.println(groups.toString());
    }

    @Test
    void getLastMessageByGroupId(){
        System.out.println(messageService.getLastMessageByGroupId("group1234567"));
    }

    @Test
    void AllMessagesByGroupId(){
        System.out.println(messageService.AllMessagesByGroupId("group1234567"));
    }

    @Test
    void searchByUsernameSimiliarity(){
        System.out.println(userService.searchByUsernameSimiliarity("test"));
    }

    @Test
    void quitGroup(){
//        groupService.addGroup("test", new String[]{"123", "456"}, 0);
        groupService.quitGroup("group-0v8rlcmaqs9CGnBFhb6wz", "456");
    }

    @Test
    void addChatGroup(){
        groupService.addGroup("gaming group", new String[]{"662523ed9200fcda2ff00535", "6625ac089200fcda2ff00536", "O80Ab46UcTKIcOroMemIk"}, 1);
    }

    @Test
    void getUsersByIds(){
        System.out.println(userService.UsersByIds(new String[]{"662523ed9200fcda2ff00535", "6625ac089200fcda2ff00536", "user-O80Ab46UcTKIcOroMemIk"}));
    }

}
