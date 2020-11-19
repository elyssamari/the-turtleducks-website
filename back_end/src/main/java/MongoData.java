import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.List;

public class MongoData {
    MongoClient mongoClient = new MongoClient("localhost", 27017);
    MongoDatabase db = mongoClient.getDatabase("MyDatabase");
    MongoCollection<Document> collection = db.getCollection("csc413fall2020");
    MongoData(){

    }

    public void addObj(String info) {
        String [] objData = info.split(",");
        Document doc = new Document("Type", objData[1])
                .append("Price", objData[2])
                .append("Title", objData[3]);
        collection.insertOne(doc);
    }

    public void editObj(String info){
        String [] newData = info.split(",");
        collection.updateMany(Filters.eq("_id", new ObjectId(newData[1])),
        Updates.combine(Updates.set("Type", newData[2]),
        Updates.set("Price", newData[3]), Updates.set("Title", newData[4])));
    }

    public void deleteObj(String info) {
        String toDelete = (info.split(","))[1];
        collection.deleteOne(new Document("_id", new ObjectId(toDelete)));
    }

    public List<String> data2FE() {
        System.out.println("in the data get in md");
        List<String> dataInfo = new ArrayList<>();
        FindIterable <Document> iterable = collection.find();
        MongoCursor<Document> cursor = iterable.iterator();
        try {
            while(cursor.hasNext()){
                String cleaned = cursor.next().toString();
                String evenCleaner = cleaned.substring(9, cleaned.length() - 1).replaceAll("=", "\":\"")
                        .replaceAll(",", "\",\"").replaceAll(" ", "");
                StringBuilder sb = new StringBuilder(evenCleaner);
                sb.insert(evenCleaner.length() - 1, "\"");
                sb.insert(1, "\"");
                System.out.println(sb.toString());
                dataInfo.add(sb.toString());
            }
        } finally {
            cursor.close();
        }
        return dataInfo;
    }

}
