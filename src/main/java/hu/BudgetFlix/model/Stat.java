package hu.BudgetFlix.model;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


public class Stat {
        private String name;
        private MediaType type;
        private UUID id;
        private Map<Integer, String> videos = new HashMap<>();


        public Stat () {}


        public Stat (String name, MediaType type) {
            this.id = UUID.randomUUID();
            this.name= name;
            this.type = type;
        }

    public void addVideo(Integer part, String filename) {
        videos.put(part, filename);
    }


        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public MediaType getType() {
            return type;
        }

        public void setType(MediaType type) {
            this.type = type;
        }

        public Map<Integer, String> getVideos() {
            return videos;
        }


    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}




