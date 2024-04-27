package arki.chat.service;

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

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public void addGroup(String name, String[] userIds, int type){
        String groupId = "group-" + NanoIdUtils.randomNanoId();
        String time = String.valueOf(new Date().getTime());
        Group group = new Group(groupId, name, userIds, time, 1, type);
        groupRepository.save(group);
    }

    public void addUsersToGroup(String groupId, String[] userIds){
        Query query = Query.query(Criteria.where("id").is(groupId));
        Update update = new Update();
        update.addToSet("userIds").each(userIds);
        mongoTemplate.updateFirst(query, update, Group.class);
    }

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

    public Group getGroupById(String groupId){
        Group group = groupRepository.findById(groupId).get();
        return group != null && group.getActivated() == 1 ? group : null;
    }

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
