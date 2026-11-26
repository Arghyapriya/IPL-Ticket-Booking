import { useState, useEffect } from "react";
import { supabase } from "../supabase";

function MatchCard({ match }) {
    const [booking, setBooking] = useState(false);
    const [availableSeats, setAvailableSeats] = useState(
        match.available_seats
    );

    // Synchronize seats with Supabase Realtime
    useEffect(() => {
        setAvailableSeats(match.available_seats);
    }, [match.available_seats]);

    async function bookTicket() {
        const name = prompt("Enter your name:");

        if (!name || !name.trim()) {
            return;
        }

        const quantity = prompt("Enter number of tickets:");
        const tickets = Number(quantity);

        if (
            !Number.isInteger(tickets) ||
            tickets < 1 ||
            tickets > 10 ||
            tickets > availableSeats
        ) {
            alert("Invalid number of tickets!");
            return;
        }

        const totalPrice = tickets * match.price;

        setBooking(true);

        // Insert booking into Supabase
        const { error: bookingError } = await supabase
            .from("bookings")
            .insert({
                match_id: match.id,
                user_name: name.trim(),
                match_title: `${match.team1} vs ${match.team2}`,
                tickets: tickets,
                total_price: totalPrice
            });

        if (bookingError) {
            alert("Booking failed: " + bookingError.message);
            setBooking(false);
            return;
        }

        // Update available seats
        const newSeats = availableSeats - tickets;

        const { data, error: updateError } = await supabase
            .from("matches")
            .update({
                available_seats: newSeats
            })
            .eq("id", match.id)
            .eq("available_seats", availableSeats)
            .select("id");

        if (updateError || !data?.length) {
            alert(
                "Booking record created, but seat update failed. " +
                "Check Supabase before retrying."
            );
            setBooking(false);
            return;
        }

        setAvailableSeats(newSeats);
        setBooking(false);

        alert(
            "Booking Successful!\n" +
            "Match: " + match.team1 + " vs " + match.team2 +
            "\nTickets: " + tickets +
            "\nTotal Price: ₹" + totalPrice
        );
    }

    return (
        <article className="match-card">

            <span className="match-number">
                Match {match.id}
            </span>

            <h3>
                {match.team1} vs {match.team2}
            </h3>

            <p>
                <strong>Date:</strong> {match.date}
            </p>

            <p>
                <strong>Venue:</strong> {match.venue}
            </p>

            <div className="ticket-prices">

                <p>
                    <strong>Ticket Price:</strong> ₹{match.price}
                </p>

                <p>
                    <strong>Available Seats:</strong> {availableSeats}
                </p>

            </div>

            <button
                className="book-btn"
                onClick={bookTicket}
                disabled={availableSeats <= 0 || booking}
            >
                {booking
                    ? "Booking..."
                    : availableSeats > 0
                        ? "Book Ticket"
                        : "Sold Out"}
            </button>

        </article>
    );
}

export default MatchCard;