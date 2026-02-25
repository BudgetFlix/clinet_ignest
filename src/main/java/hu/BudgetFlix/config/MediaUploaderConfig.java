package hu.BudgetFlix.config;

public class MediaUploaderConfig {

    public static String USERNAME () {
        return "deploy";
    }

    public static String HOST () {
        return "server1";
    }

    public static int PORT () {
        return 22;
    }

    public static String REMOTE_TARGET() {
        return "/srv/media/inbox/new";
    }

    public static String STANDARD_JOB_DIRECTORY() {
        return "job_";
    }



}
