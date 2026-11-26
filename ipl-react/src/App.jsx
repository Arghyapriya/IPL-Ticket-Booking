import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import { supabase } from "./supabase";
import "./App.css";

function App() {
    const [selectedTeam, setSelectedTeam] = useState("all");
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch matches from Supabase
    useEffect(() => {
        async function fetchMatches() {
            const { data, error } = await supabase
                .from("matches")
                .select("*")
                .order("id", { ascending: true });

            if (error) {
                console.error("Error fetching matches:", error);
                setError(error.message);
            } else {
                setMatches(data);
                setError("");
            }

            setLoading(false);
        }

        fetchMatches();

        // Supabase Realtime subscription
        const channel = supabase
            .channel("matches-realtime")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "matches"
                },
                () => {
                    fetchMatches();
                }
            )
            .subscribe((status) => {
                console.log("Realtime status:", status);

                if (status === "SUBSCRIBED") {
                    fetchMatches();
                }
            });

        // Remove subscription when component unmounts
        return () => {
            supabase.removeChannel(channel);
        };

    }, []);

    // Get team names from database
    const teams = [
        ...new Set(
            matches.flatMap((match) => [
                match.team1,
                match.team2
            ])
        )
    ].sort();

    // Filter matches by selected team
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
                        onChange={(e) =>
                            setSelectedTeam(e.target.value)
                        }
                    >
                        <option value="all">All Teams</option>

                        {teams.map((team) => (
                            <option key={team} value={team}>
                                {team}
                            </option>
                        ))}

                    </select>

                </div>

                {loading && (
                    <p className="note">
                        Loading matches...
                    </p>
                )}

                {error && (
                    <p className="note">
                        Error loading matches: {error}
                    </p>
                )}

                {!loading && !error &&
                    filteredMatches.length === 0 && (
                        <p className="note">
                            No matches available.
                        </p>
                    )
                }

                <div className="match-grid">

                    {filteredMatches.map((match) => (
                        <MatchCard
                            key={match.id}
                            match={match}
                        />
                    ))}

                </div>

                <p className="note">
                    Note: Match details are fetched from
                    Supabase and are sample data for
                    educational purposes.
                </p>

            </section>
        </>
    );
}

export default App;