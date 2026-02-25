package hu.BudgetFlix.builder;

import hu.BudgetFlix.model.MediaType;
import hu.BudgetFlix.model.Stat;
import hu.BudgetFlix.view.View;

public class MovieStatBuilder implements StatBuilder {

    private final View view;

    public MovieStatBuilder (View view) {
        this.view = view;
    }

    @Override
    public Stat build() {
        MediaType type = MediaType.fromString( view.getString("Enter a type: "));
        String name =  view.getString("Enter name: ");
        return new Stat(name,type);
    }
}
