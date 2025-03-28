// index.js

document.addEventListener("DOMContentLoaded", () => {
    const genreSelector = document.getElementById("genre-selector");
    const ratingSelector = document.getElementById("rating-selector");
    const table = document.querySelector("table");
    const alertMessage = document.querySelector(".alert");

    async function fetchMovies(genre = null, rating = null) {
        try {
            const params = new URLSearchParams();
            if (genre) params.append('genre', genre);
            if (rating) params.append('rating', rating);

            const url = new URL('/api/movies', window.location.origin);
            url.search = params.toString();

            const response = await fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const movies = await response.json();
            return movies;
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw error; // Rethrow the error for handling in the calling function
        }
    }

    function insertMoviesIntoTable(table, movies) {
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Empty the table first

        movies.forEach(movie => {
            const row = document.createElement("tr");

            // Create cells for each attribute
            const nameCell = document.createElement("td");
            nameCell.textContent = movie.name;
            row.appendChild(nameCell);

            const genreCell = document.createElement("td");
            genreCell.textContent = movie.genre;
            row.appendChild(genreCell);

            const releaseDateCell = document.createElement("td");
            const date = new Date(movie.releaseDate * 1000); // Convert from seconds to milliseconds
            releaseDateCell.textContent = date.toLocaleDateString();
            row.appendChild(releaseDateCell);

            const directorCell = document.createElement("td");
            directorCell.textContent = movie.director;
            row.appendChild(directorCell);

            const ratingCell = document.createElement("td");
            ratingCell.textContent = movie.rating;
            row.appendChild(ratingCell);

            // Apply color coding based on rating
            if (movie.rating <= 2) {
                row.style.backgroundColor = "red";
            } else if (movie.rating > 2 && movie.rating <= 5) {
                row.style.backgroundColor = "orange";
            } else if (movie.rating > 5 && movie.rating <= 8) {
                row.style.backgroundColor = "blue";
            } else if (movie.rating > 8) {
                row.style.backgroundColor = "green";
            }

            tbody.appendChild(row); // Add the row to the table body
        });
    }

    async function updateMovies() {
        const genre = genreSelector.value;
        const rating = parseInt(ratingSelector.value) || null;

        try {
            const movies = await fetchMovies(genre, rating);
            insertMoviesIntoTable(table, movies);
            alertMessage.classList.add("d-none"); // Hide alert if movies are found
            table.classList.remove("d-none"); // Show table
        } catch (error) {
            alertMessage.classList.remove("d-none");
            alertMessage.textContent = "Failed to load movies.";
            table.classList.add("d-none"); // Hide table if an error occurred
        }
    }

    genreSelector.addEventListener("change", updateMovies);
    ratingSelector.addEventListener("change", updateMovies);

    // Initial fetch with default values
    updateMovies();
});