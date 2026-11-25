function Navbar() {
    return (
        <header className="navbar">

            <h1 className="logo">
                IPL 2026 Ticket Booking
            </h1>

            <nav className="nav-links">
                <a href="#home">Home</a>
                <a href="#matches">Matches</a>
                <a href="#booking">Book Ticket</a>
                <a href="#mybookings">My Bookings</a>
                <a href="#guidelines">Guidelines</a>
            </nav>

        </header>
    );
}

export default Navbar;