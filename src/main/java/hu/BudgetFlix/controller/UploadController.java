package hu.BudgetFlix.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import hu.BudgetFlix.config.MediaUploaderConfig;
import hu.BudgetFlix.factory.StatBuilderFactory;
import hu.BudgetFlix.builder.StatBuilder;
import hu.BudgetFlix.model.Stat;
import hu.BudgetFlix.service.SftpService;
import hu.BudgetFlix.view.View;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

public class UploadController {

    private final SftpService sftpService;
    private final View view;
    private Stat stat;
    private ObjectMapper mapper;

    public UploadController(SftpService sftpService, View view) {
        this.sftpService = sftpService;
        this.view = view;
        this.mapper = new ObjectMapper();
    }

    public void start() {
        try {
            do {
                String password = view.getPassword();
                sftpService.setupJsch(password);

                if (sftpService.isConnected()) {
                    view.out("SFTP is connected.");
                } else {
                    view.out("SFTP is not connected.");
                }
            } while (!sftpService.isConnected());

            StatBuilder statBuilder = StatBuilderFactory.creat();
            stat = statBuilder.build();

            String stringPath = view.getString("Enter the path to the file you want to send: ");

            Path videoPath = Path.of(stringPath);

            if (!Files.exists(videoPath) ||
                    !Files.isRegularFile(videoPath) ||
                    !Files.isReadable(videoPath)) {
                throw new IllegalArgumentException("Invalid upload file.");
            }
            stat.addVideo(1, videoPath.getFileName().toString());

            String remoteDirectoryNoPart = MediaUploaderConfig.REMOTE_TARGET() + "/" + (MediaUploaderConfig.STANDARD_JOB_DIRECTORY() + stat.getId().toString());

            String remoteDirectoryWithPart = remoteDirectoryNoPart + ".part";


            view.out(MediaUploaderConfig.REMOTE_TARGET());
            view.out(remoteDirectoryWithPart);

            //send methods
            sftpService.makeDirectory(remoteDirectoryWithPart);


            String json = mapper.writeValueAsString(stat);

            try (InputStream inputStream =
                         new ByteArrayInputStream(json.getBytes(StandardCharsets.UTF_8))) {
                sftpService.sendFile(inputStream, remoteDirectoryWithPart + "/meta.json");
            }

            sftpService.sendFile(videoPath.toString(), remoteDirectoryWithPart + "/" + videoPath.getFileName().toString());


            sftpService.rename(remoteDirectoryWithPart,remoteDirectoryNoPart);

            sftpService.shutdown();
        } catch (Exception e) {
            sftpService.shutdown();
            throw new RuntimeException("Upload failed", e);
        }

    }

}
