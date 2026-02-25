package hu.BudgetFlix.factory;

import hu.BudgetFlix.builder.MovieStatBuilder;
import hu.BudgetFlix.builder.StatBuilder;
import hu.BudgetFlix.view.Terminal;

public class StatBuilderFactory {


    public static StatBuilder creat() {
        return new MovieStatBuilder(new Terminal());
    }
}
