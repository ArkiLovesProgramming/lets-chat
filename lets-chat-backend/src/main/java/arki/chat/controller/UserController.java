package arki.chat.controller;

import arki.chat.annotation.TokenRequired;
import arki.chat.pojo.User;
import arki.chat.service.JWTService;
import arki.chat.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private JWTService jwtService;

    @Resource
    private UserService userService;

    /**
     * @param username
     * @param password
     * @return token (String)
     */
    @PostMapping("/login")
    public HashMap login(@RequestBody Map<String, String> data){
        User user = userService.verify(data.get("username"), data.get("password"));
        HashMap map = new HashMap<>();
        if (user != null){
            map.put("status", 1);   // 1 sccuess, 0, fail
            map.put("token", jwtService.getJWT(user));
            map.put("userId", user.getId());
        } else {
            map.put("status", 0);
        }
        return map;
    }

    @PostMapping("/adduser")
    public HashMap addUser(@RequestBody HashMap<String, String> requestBody){
        String username = requestBody.get("username");
        String password = requestBody.get("password");
        User user = new User(username, password);
        HashMap map = new HashMap<>();
        try {
            userService.saveUser(user);
            map.put("status", 1);
        } catch (Exception e){
            map.put("status", 0);
            map.put("msg", e.getMessage());
        }
        return map;
    }

    @TokenRequired
    @GetMapping("/getUserById/{userId}")
    public User getUserById(@PathVariable String userId){
        return userService.findById(userId);
    }

    @TokenRequired
    @PostMapping("/getUsersByIds")
    public List<User> getUserById(@RequestBody HashMap data){
        ArrayList<String> ids = (ArrayList<String>) data.get("userIds");
        return userService.UsersByIds(ids.toArray(new String[0]));
    }

    @TokenRequired
    @GetMapping("/getUsersByUsername/{username}")
    public List<User> getUsersByUsername(@PathVariable String username){
        return userService.searchByUsernameSimiliarity(username);
    }
}
