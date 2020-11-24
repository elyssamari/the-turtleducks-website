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
    //setting up mongo db. change to fit your database
    MongoClient mongoClient = new MongoClient("localhost", 27017);
    MongoDatabase db = mongoClient.getDatabase("MyDatabase");
    MongoCollection<Document> collection = db.getCollection("csc413fall2020");
    MongoData(){

    }
    //will add to the mongo db by creating a doc and inserting it
    public void addObj(String info) {
        String [] objData = info.split(",");
        Document doc = new Document("Type", objData[1])
                .append("Price", objData[2])
                .append("Title", objData[3]);
        collection.insertOne(doc);
    }
    //will edit by updating the mongo db. kinda updated all fields even though not all fields may be changed
    //might be a better way of doing this
    public void editObj(String info){
        String [] newData = info.split(",");
        collection.updateMany(Filters.eq("_id", new ObjectId(newData[1])),
        Updates.combine(Updates.set("Type", newData[2]),
        Updates.set("Price", newData[3]), Updates.set("Title", newData[4])));
    }
    //deletes a doc based on the mongo id given
    public void deleteObj(String info) {
        String toDelete = (info.split(","))[1];
        collection.deleteOne(new Document("_id", new ObjectId(toDelete)));
    }
    //process of getting data back to FE. Since we wanted to keep the mongodb id, I just kind of modified the doc and "cleaned it"
    //to object format. So like removing and inserting stuff to get the. Please change names if u think they weird.
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
