package com.payrollmanagement.easypay.enums;

public enum City {
	
	// TamilNadu
    Chennai(States.TamilNadu),
    Coimbatore(States.TamilNadu),
    Madurai(States.TamilNadu),

    // Karnataka
    Bangalore(States.Karnataka),
    Mysore(States.Karnataka),
    Hubli(States.Karnataka),

    // Kerala
    Kochi(States.Kerala),
    Trivandrum(States.Kerala),
    Kozhikode(States.Kerala),

    // Maharastra
    Pune(States.Maharastra),
    Mumbai(States.Maharastra),
    Nagpur(States.Maharastra);

    private final States state;

    City(States state) {
        this.state = state;
    }

    public States getState() {
        return state;
    }
}