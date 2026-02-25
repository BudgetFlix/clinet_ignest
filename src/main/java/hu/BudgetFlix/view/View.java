package hu.BudgetFlix.view;

public interface View {
    public String getPassword();
    public String getString(String msg);
    public int getInt(String msg);
    public void logError(String errorMsg);
    public void out (String msg);

}
