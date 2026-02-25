package hu.BudgetFlix.view;


import java.time.LocalDateTime;
import java.util.Scanner;

public class Terminal implements View {
    private final Scanner scanner = new Scanner(System.in);


    @Override
    public String getPassword() {
        out("Write Password: ");
        String password = scanner.nextLine().trim();
        if(!password.isBlank()){
            return password;
        }
        return null;
    }

    @Override
    public String getString(String msg) {
        while (true) {
            out(msg + ": ");
            String out = scanner.nextLine().trim();

            if (!out.isBlank()) {
                return out;
            }

            out("Input cannot be empty.");
        }
    }

    @Override
    public int getInt(String msg) {
        while (true) {
            out(msg + ": ");
            String input = scanner.nextLine().trim();

            try {
                return Integer.parseInt(input);
            } catch (NumberFormatException e) {
                out("Invalid input. Please enter a valid integer.");
            }
        }
    }

    @Override
    public void logError(String errorMsg ) {
        // plus class
        System.err.println(LocalDateTime.now() + " [ERROR] " + errorMsg);
    }

    @Override
    public void out(String msg) {
        System.out.println(msg);
    }
}
