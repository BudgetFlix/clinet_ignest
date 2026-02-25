package hu.BudgetFlix.model;

public enum MediaType {
    MOVIE,
    SERIES;

    public static MediaType fromString(String value) {
        if (value == null) {
            throw new IllegalArgumentException("MediaType cannot be null");
        }

        try {
            return MediaType.valueOf(value.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid MediaType: " + value);
        }
    }

}
