package arki.chat.service;

import arki.chat.annotation.TokenRequired;
import arki.chat.dao.GroupRepository;
import arki.chat.pojo.Group;
import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;

/**
 * Group service layer
 */
@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private MongoTemplate mongoTemplate;


    /**
     * add a new group basing on type param to decide if it is multi group or two people group
     *
     * @param name
     * @param userIds
     * @param type
     * @return
     */
    public Group addGroup(String name, String[] userIds, int type){
        String groupId = "group-" + NanoIdUtils.randomNanoId();
        String time = String.valueOf(new Date().getTime());
        Group group = new Group(groupId, name, userIds, time, 1, type);
        groupRepository.save(group);
        return group;
    }

    /**
     * Add a group of people into a group
     * @param groupId
     * @param userIds
     */
    public void addUsersToGroup(String groupId, String[] userIds){
        Query query = Query.query(Criteria.where("id").is(groupId));
        Update update = new Update();
        update.addToSet("userIds").each(userIds);
        mongoTemplate.updateFirst(query, update, Group.class);
    }

    /**
     * fetch groups
     * @param userId
     * @param type
     * @return
     */
    public List<Group> getGroupsByUserIdAndType(String userId, int type){   // type 0 是双人
        Criteria criteria = new Criteria();
        criteria.andOperator(
                Criteria.where("userIds").elemMatch(Criteria.where("$eq").is(userId)),
                Criteria.where("type").is(type),
                Criteria.where("activated").ne(0)
        );
        Query query = Query.query(criteria);
        return mongoTemplate.find(query, Group.class);
    }

    /**
     * fetch a group by groupId
     * @param groupId
     * @return
     */
    public Group getGroupById(String groupId){
        Group group = groupRepository.findById(groupId).get();
        return group != null && group.getActivated() == 1 ? group : null;
    }

    /**
     * quit from a group by user id
     * @param groupId
     * @param userId
     */
    public void quitGroup(String groupId, String userId){
        Query query = new Query(Criteria.where("id").is(groupId));
        Update update = new Update();
        update.pull("userIds", userId);
        mongoTemplate.updateFirst(query, update, Group.class);
        Group group = mongoTemplate.findOne(query, Group.class);
        if (group.getUserIds().length == 0){
            mongoTemplate.updateFirst(query, Update.update("activated", 0), Group.class);
        }
    }
}
