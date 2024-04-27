import PubSub from "pubsub-js";

let websocket = undefined;

const base_url = "localhost:8080"

const basic_url = `ws://${base_url}/websocket/`

let url = ""

function connect(groupId){
    const token = localStorage.getItem("token")
    const userId = localStorage.getItem("userId")
    if (websocket !== undefined  && (websocket.readyState !== 3 || websocket.readyState !== 2) && basic_url+groupId+"/"+userId+"/"+token === url){
        return;
    }
    url = basic_url+groupId+"/"+userId+"/"+token
    StartWebSocket(url)
}

function disconnect() {
    if (websocket !== undefined){
        websocket.close();
    }
}

function StartWebSocket(wsUri) {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) {
        onOpen(evt)
    };
    websocket.onclose = function(evt) {
        onClose(evt)
    };
    websocket.onmessage = function(evt) {
        onMessage(evt)
    };
    websocket.onerror = function(evt) {
        onError(evt)
    };
}

function onOpen(){

}

function onMessage(evt) {
    PubSub.publish("addOneMessage", evt.data)
}

function onClose(evt) {

}

function onError(evt) {
    
}

function send(msg){
    if (typeof websocket === "undefined") {
        alert("websocket has not been connected or fail to connect, please inspect");
        return false;
    }
    if (websocket.readyState === 3) {
        alert("websocket disconnected, you need to connect again");
        return false;
    }
    if (msg.trim() !== '') {
        //message = message + "//" + $(".group-name div").text();	//这样就可以在信息下面放入发送者名字了
        websocket.send(msg);
    }
}

const data = {connect, disconnect, send}

export default data;