import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TournamentList = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/tournament/get-all/tournaments');
      setTournaments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>View Tournaments</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            {/* Add additional table headers if needed */}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(tournaments) && tournaments.map((tournament) => (
            <tr key={tournament.id}>
              <td>{tournament.name}</td>
              <td>{tournament.startDate}</td>
              <td>{tournament.endDate}</td>
              {/* Render additional table cells for other tournament properties */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TournamentList;