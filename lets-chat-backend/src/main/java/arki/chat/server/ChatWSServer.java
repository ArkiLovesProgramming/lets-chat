package arki.chat.server;

import arki.chat.config.WebSocketConfig;
import arki.chat.pojo.Message;
import arki.chat.service.JWTService;
import arki.chat.service.MessageService;
import cn.hutool.core.util.StrUtil;
import cn.hutool.json.JSONUtil;
import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import javax.websocket.server.ServerEndpointConfig;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;
import java.util.stream.Collectors;


/**
 * UserId will be sent by headers
 */
@ServerEndpoint(value = "/websocket/{chatroomId}/{userId}/{token}", configurator = WebSocketConfig.class)
@Component
public class ChatWSServer {

//     获取日志记录器
    private static final Logger LOGGER = Logger.getLogger(ChatWSServer.class.getName());
//     一个组名对应一堆 session
    private static ConcurrentHashMap<String, ArrayList<Session>> webSocketMap = new ConcurrentHashMap<>();
    // 一个用户对应一个 session
    private static ConcurrentHashMap<String, Session> webSocketMapUser = new ConcurrentHashMap<>();

    private static JWTService jwtService;

    @Autowired
    public void setJwtService(JWTService jwtService) {
        this.jwtService = jwtService;
    }

    private static MessageService messageService;

    @Autowired
    public void setMessageService(MessageService messageService) {
        this.messageService = messageService;
    }

    //Example Create a session. This session is the websocket session
    private Session session;

    //妈的，写了这个一直创建失败。。。。
    //ChatWSServer(){
    //}

    public static ConcurrentHashMap<String, ArrayList<Session>> getWebSocketMap() {
        return webSocketMap;
    }

    public static void setWebSocketMap(ConcurrentHashMap<String, ArrayList<Session>> webSocketMap) {
        ChatWSServer.webSocketMap = webSocketMap;
    }

    @OnOpen
    public void onOpen(Session session, @PathParam("chatroomId") String chatroomId, @PathParam("token") String token, @PathParam("userId") String userId) {
        monitor();
        System.out.println("链接了 websocket");
        if (!jwtService.verifyJWT(token)){  //如果 token 是空的话，getheader 就抛出了，所以这里不用抛出
            // 如果token无效，拒绝连接并发送错误消息给客户端
            try {
                session.close(new CloseReason(CloseReason.CloseCodes.PROTOCOL_ERROR, "Invalid token"));
            } catch (IOException e) {
                e.printStackTrace();
            }
            return;
        }
        if (ChatWSServer.webSocketMap.containsKey(chatroomId)){
            ArrayList<Session> sessionList = ChatWSServer.webSocketMap.get(chatroomId);
            sessionList.add(session);
            ChatWSServer.webSocketMap.put(chatroomId, sessionList);
        } else {
            ArrayList list = new ArrayList<>();
            list.add(session);
            ChatWSServer.webSocketMap.put(chatroomId, list);
        }
        ChatWSServer.webSocketMapUser.put(userId, session);
    }

    @OnClose
    public void onClose(Session session, @PathParam("chatroomId") String chatroomId) {
        if (ChatWSServer.webSocketMap.containsKey(chatroomId)){
            ArrayList<Session> sessionList = ChatWSServer.webSocketMap.get(chatroomId);
            sessionList.forEach(item->{
                getUserIdBySession(item);
            });
            sessionList = sessionList.stream()
                    .filter(item -> !item.equals(session))
                    .collect(Collectors.toCollection(ArrayList::new));
            ChatWSServer.webSocketMap.put(chatroomId, sessionList);
        } else {
            LOGGER.severe("webSocketMap 本应该有该 session 的，但是居然没有，运行有问题");
        }
    }

    @OnMessage
    public void onMessage(String message, Session session, @PathParam("chatroomId") String chatroomId, @PathParam("userId") String userId) throws IOException {
        ArrayList<Session> sessions = ChatWSServer.webSocketMap.get(chatroomId);
        Message msgObj = assembleMessage(message, chatroomId, userId, 0);
        messageService.saveMessage(msgObj);
        session.getBasicRemote().sendText(JSONUtil.toJsonStr(msgObj));
        for (Session item : sessions){
            if (item == session){
                continue;
            } else {
                try {
                    sendMessage(item, msgObj);
                } catch (Exception e) {
                    System.out.println(e);
                }
            }
        }
    }

    /**
     *
     * @param session
     * @param msgObj
     * @throws IOException
     * 会保存信息到 mongodb 中
     */
    private void sendMessage(Session session, Message msgObj) throws IOException {
        session.getBasicRemote().sendText(JSONUtil.toJsonStr(msgObj));
    }

    private Message assembleMessage(String message, String chatroomId, String userId, int type){
        String id = "msg-" + NanoIdUtils.randomNanoId();
        String senderId = userId;
        String chatRoomId = chatroomId;
        String time = String.valueOf(new Date().getTime());
        Message msgObj = new Message(id, message, senderId, chatRoomId, time, type);
        return msgObj;
    }

    public static String getHeader(Session session, String headerName) {
        final String header = (String) session.getUserProperties().get(headerName);
        if (StrUtil.isBlank(header)) {
            LOGGER.severe("获取header失败，不安全的链接，即将关闭");
            try {
                session.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return header;
    }

    /**
     *
     */
    public static String getUserIdBySession(Session session){
        for (Object key : ChatWSServer.webSocketMapUser.keySet()){
            if (ChatWSServer.webSocketMapUser.get(key) == session){
                System.out.println("session对应的 userId 是 " + (String) key);
                return (String) key;
            }
        }
        System.out.println("找不到 session 对应的 userId");
        return "";
    }

    public static void monitor(){
        System.out.println(ChatWSServer.webSocketMap.toString());
        System.out.println(ChatWSServer.webSocketMapUser.toString());
    }
}
