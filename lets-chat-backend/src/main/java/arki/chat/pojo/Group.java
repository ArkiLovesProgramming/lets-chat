package arki.chat.pojo;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;

/**
 * 聊天室的实体类
 */
@Document(collection = "group")
public class Group {
    private String id;
    private String name;
    private String[] userIds;   // 组内用户
    private String createTime; // 时间戳
    private int activated; // 逻辑删除，1 有效，0 删除
    private int type; // 0, 双人聊天，1,多人聊天

    public Group() {

    }

    public Group(String id, String name, String[] userIds, String createTime, int activated, int type) {
        this.id = id;
        this.name = name;
        this.userIds = userIds;
        this.createTime = createTime;
        this.activated = activated;
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String[] getUserIds() {
        return userIds;
    }

    public void setUserIds(String[] userIds) {
        this.userIds = userIds;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public int getActivated() {
        return activated;
    }

    public void setActivated(int activated) {
        this.activated = activated;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Group{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", userIds=" + Arrays.toString(userIds) +
                ", createTime='" + createTime + '\'' +
                ", activated=" + activated +
                ", type=" + type +
                '}';
    }
}
