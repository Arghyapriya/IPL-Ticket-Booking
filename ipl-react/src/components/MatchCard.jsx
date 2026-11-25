function MatchCard({ match }) {
    return (
        <article className="match-card">

            <span className="match-number">
                Match {match.id}
            </span>

            <h3>{match.team1} vs {match.team2}</h3>

            <p><strong>Date:</strong> {match.date}</p>

            <p><strong>Time:</strong> {match.time}</p>

            <p><strong>Venue:</strong> {match.venue}</p>

            <div className="ticket-prices">

                <p>General: ₹{match.general}</p>

                <p>Premium: ₹{match.premium}</p>

                <p>VIP: ₹{match.vip}</p>

            </div>

            <button className="book-btn">
                Book Ticket
            </button>

        </article>
    );
}

export default MatchCard;