package arki.chat.service;

import arki.chat.dao.MessageRepository;
import arki.chat.pojo.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.Date;
import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public void saveMessage(Message message){
        messageRepository.save(message);
    }


    public Message getLastMessageByGroupId(String groupId){
        Query query = Query.query(Criteria.where("chatRoomId").is(groupId));
        List<Message> messages = mongoTemplate.find(query, Message.class);
        if (messages == null || messages.size() == 0){
            return null;
        }
        // 排序消息列表
        // 按时间戳字段降序排序
        messages.sort((m1, m2) -> {
            try {
                Date date1 = parseTimestamp(m1.getCreateTime());
                Date date2 = parseTimestamp(m2.getCreateTime());
                return date2.compareTo(date1);
            } catch (ParseException e) {
                e.printStackTrace();
                return 0;
            }
        });
        return messages.get(0);
    }

    private Date parseTimestamp(String timestamp) throws ParseException {
        long timestampLong = Long.parseLong(timestamp);
        return new Date(timestampLong);
    }

    public List<Message> AllMessagesByGroupId(String groupId){
        Query query = Query.query(Criteria.where("chatRoomId").is(groupId));
        List<Message> messages = mongoTemplate.find(query, Message.class);
        // 排序消息列表
        // 按时间戳字段降序排序
        messages.sort((m1, m2) -> {
            try {
                Date date1 = parseTimestamp(m1.getCreateTime());
                Date date2 = parseTimestamp(m2.getCreateTime());
                return date1.compareTo(date2);
            } catch (ParseException e) {
                e.printStackTrace();
                return 0;
            }
        });
        return messages;
    }
}
