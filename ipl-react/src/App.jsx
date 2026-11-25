import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import "./App.css";

function App() {
const [selectedTeam, setSelectedTeam] = useState("all");
    const matches = [
        {
            id: 1,
            team1: "CSK",
            team2: "MI",
            date: "28 March 2026",
            time: "7:30 PM",
            venue: "Chennai",
            general: 800,
            premium: 1500,
            vip: 3000
        },
        {
            id: 2,
            team1: "RCB",
            team2: "KKR",
            date: "29 March 2026",
            time: "7:30 PM",
            venue: "Bengaluru",
            general: 900,
            premium: 1800,
            vip: 3500
        },
        {
            id: 3,
            team1: "MI",
            team2: "RR",
            date: "30 March 2026",
            time: "7:30 PM",
            venue: "Mumbai",
            general: 700,
            premium: 1400,
            vip: 2800
        },
        {
            id: 4,
            team1: "KKR",
            team2: "SRH",
            date: "31 March 2026",
            time: "7:30 PM",
            venue: "Kolkata",
            general: 800,
            premium: 1600,
            vip: 3200
        }
    ];
    const filteredMatches = matches.filter((match) =>
    selectedTeam === "all" ||
    match.team1 === selectedTeam ||
    match.team2 === selectedTeam
);
    return (
        <>
            <Navbar />

            <Hero />

            <section id="matches" className="matches-section">

                <h2>Match Schedule</h2>
                <div className="filter-container">

    <label htmlFor="teamFilter">
        Filter by Team:
    </label>

    <select
        id="teamFilter"
        value={selectedTeam}
        onChange={(e) => setSelectedTeam(e.target.value)}
    >
        <option value="all">All Teams</option>
        <option value="CSK">CSK</option>
        <option value="MI">MI</option>
        <option value="RCB">RCB</option>
        <option value="KKR">KKR</option>
        <option value="RR">RR</option>
        <option value="SRH">SRH</option>
    </select>

</div>
                <div className="match-grid">

                    {filteredMatches.map((match) => (
                        <MatchCard
                            key={match.id}
                            match={match}
                        />
                    ))}

                </div>

                <p className="note">
                    Note: Match details are sample data
                    for educational purposes.
                </p>

            </section>
        </>
    );
}

export default App;