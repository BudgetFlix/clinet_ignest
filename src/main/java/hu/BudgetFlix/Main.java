package hu.BudgetFlix;

import hu.BudgetFlix.controller.UploadController;
import hu.BudgetFlix.service.SftpService;
import hu.BudgetFlix.view.Terminal;
import hu.BudgetFlix.view.View;

public class Main {
    public static void main(String[] args) {

        View view = new Terminal();

        SftpService sftpService = new SftpService();

        UploadController controller = new UploadController(sftpService,view);
        controller.start();

    }
}