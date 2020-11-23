import com.google.gson.Gson;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.concurrent.ConcurrentHashMap;

@WebSocket
public class WebSocketHandler {

    private static List<String> messages = new Vector<>();
    private static Map<Session, Session> sessionMap = new ConcurrentHashMap<>();

    public static void broadcast(String message){
        sessionMap.keySet().forEach(session -> {
            try {
                session.getRemote().sendString(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    @OnWebSocketConnect
    public void connected(Session session) throws IOException {
        MongoData mongoData = new MongoData();
        sessionMap.put(session, session);
        System.out.println("Inside the connect " + mongoData.data2FE().toString());
        session.getRemote().sendString(mongoData.data2FE().toString());
    }

    @OnWebSocketClose
    public void closed(Session session, int statusCode, String reason){
        sessionMap.remove(session);
    }

    @OnWebSocketMessage
    public void message(Session session, String message){
        MongoData mongoData = new MongoData();
        System.out.println("From front end " + message);
        if(message.startsWith("post")) {
            mongoData.addObj(message);
        } else if (message.startsWith("edit")){
            mongoData.editObj(message);
        }else if(message.startsWith("delete")){
            mongoData.deleteObj(message);
        }
        broadcast(mongoData.data2FE().toString());
    }

    @OnWebSocketError
    public void error(Session session, Throwable error){
    }
}
