import static spark.Spark.*;

public class RestServer {
    public static void main(String[] args){
         // react has a proxy from 3000 -> 1234
        port(1234);

        // put this before get handlers
        webSocket("/ws", WebSocketHandler.class);

        // Your Handlers go here
        get("/", (req, res) -> {
            String message = req.queryMap().get().value();
            System.out.println("Helloooooo");
            return "Hi.";
        });
    }
}
