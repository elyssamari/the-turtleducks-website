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


    @OnWebSocketConnect
    public void connected(Session session) throws IOException {
        MongoData mongoData = new MongoData();
        sessionMap.put(session, session);
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
            mongoData.deleteObj(message);
        }
    }

    @OnWebSocketError
    public void error(Session session, Throwable error){
    }
}
