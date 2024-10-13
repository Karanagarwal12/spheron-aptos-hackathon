module MyAddr::Event_Manager {
    use std::signer;
    use std::debug;
    use std::vector;

    // Error codes
    const EVENT_ALREADY_EXISTS: u64 = 100;
    const EVENT_NOT_EXISTS: u64 = 101;
    const NOT_ENOUGH_SEATS: u64 = 102;

    // Struct for an Event
    struct Event has key, drop {
        name: vector<u8>,
        description: vector<u8>,
        seats: u8,         // Available seats (tickets)
        price: u64,        // Price per ticket (stored but not enforced in this contract)
    }

    // Function to create and mint a new Event with a specified number of tickets
    public entry fun create_and_mint_event(
        to: &signer,
        name: vector<u8>,
        description: vector<u8>,
        seats: u8,     // Number of available seats (tickets)
        price: u64,    // Price per ticket
    ) {
        let acc_addr = signer::address_of(to);
        assert!(!event_exists(acc_addr), EVENT_ALREADY_EXISTS);

        let event = Event {
            name,
            description,
            seats,
            price
        };

        move_to<Event>(to, event);
    }

    // Function to buy tickets for an event (without handling actual payments)
    public fun buy_ticket(buyer: &signer, tickets: u8) acquires Event {
        let acc_addr = signer::address_of(buyer);
        assert!(event_exists(acc_addr), EVENT_NOT_EXISTS);
        let event = borrow_global_mut<Event>(acc_addr);

        // Check if enough seats are available
        assert!(event.seats >= tickets, NOT_ENOUGH_SEATS);

        // Reduce the number of available seats
        event.seats = event.seats - tickets;
    }

    // Function to get event details
    public fun get_event(owner: &signer): (vector<u8>, vector<u8>, u8, u64) acquires Event {
        let acc_addr = signer::address_of(owner);
        let event = borrow_global<Event>(acc_addr);
        (event.name, event.description, event.seats, event.price)
    }

    // Function to check if an event exists
    public fun event_exists(acc: address): bool {
        exists<Event>(acc)
    }

    // Function to set the price of an event
    public fun set_price(owner: &signer, price: u64) acquires Event {
        let acc_addr = signer::address_of(owner);
        assert!(event_exists(acc_addr), EVENT_NOT_EXISTS);
        let event = borrow_global_mut<Event>(acc_addr);
        event.price = price;
    }

    // Function to set the number of seats for an event
    public fun set_seats(owner: &signer, seats: u8) acquires Event {
        let acc_addr = signer::address_of(owner);
        assert!(event_exists(acc_addr), EVENT_NOT_EXISTS);
        let event = borrow_global_mut<Event>(acc_addr);
        event.seats = seats;
    }

    // Test function to verify the ticket logic
    #[test(owner = @0x123, buyer = @0x456)]
    fun test_ticket_system(owner: signer, buyer: signer) acquires Event {
        // Create and mint a new event with 100 tickets priced at 200
        create_and_mint_event(&owner, b"Concert Event", b"Live Concert", 100, 200);
        
        // Retrieve and print event details
        let (name, description, seats, price) = get_event(&owner);
        debug::print(&name);
        debug::print(&description);
        debug::print(&seats);
        debug::print(&price);
        
        // User buys 10 tickets
        buy_ticket(&buyer, 10);
        
        // Retrieve and print updated event details
        let (updated_name, updated_description, updated_seats, updated_price) = get_event(&owner);
        debug::print(&updated_name);
        debug::print(&updated_description);
        debug::print(&updated_seats);
        debug::print(&updated_price);
    }
}