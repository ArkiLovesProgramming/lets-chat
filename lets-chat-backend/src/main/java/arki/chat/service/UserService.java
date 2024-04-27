package arki.chat.service;

import arki.chat.dao.UserRepository;
import arki.chat.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    private UserRepository userRepository;

    public void saveUser(User user) {
        userRepository.save(user);
    }

    public List<User> findAllUsers() {
        List<User> users = userRepository.findAll();
        return users;
    }
    public User findById(String id){
        Optional user = userRepository.findById(id);
        if (user.isPresent()){
            return (User) user.get();
        }
        return null;
    }

    public User verify(String username, String password){
        Criteria criteria = new Criteria();
        criteria.andOperator(
                Criteria.where("username").is(username),
                Criteria.where("password").is(password)
        );
        Query query = new Query(criteria);
        User user = mongoTemplate.findOne(query, User.class);
        return user;
    }

    public List<User> UsersByIds(String[] ids){
        Query query = new Query(Criteria.where("id").in(ids));
        List<User> users = mongoTemplate.find(query, User.class);
        return users;
    }

    public List<User> searchByUsernameSimiliarity(String searchText) {
        String regex = ".*"+ searchText +".*"; // 这里的正则表达式表示包含"ark"的任意位置
        Criteria criteria = Criteria.where("username").regex(regex, "i"); // "i"表示不区分大小写
        Query query = new Query(criteria);
        List<User> users = mongoTemplate.find(query, User.class);
        return users;
    }

    public List<User> getOnlineUsers() {
        return null;
    }
}
