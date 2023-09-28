# Local-Bingo
Have you ever wanted to host your own Bingo league at the office?
Do certain things seem to happen in every single meeting (i.e. your boss brings in donuts, or Terry from accounting wears a nice shirt)?

If so, this is the project for you! This project uses roles-based authentication and features a leaderboard, secure authentication with JWT, persistent login, and an admin console.
Set up Admin privileges by simply listing a default admin password in a .env file (details in code) and making an account of the form "Admin **" with that password.
Other users can then be assigned roles of "User", "Prompt Manager", and "Admin" from the admin console, which is solely accessible to Admin accounts.
You can also have people play as a guest if they want to!

Users can customize their profiles with a fun fact. Their profile also keeps track of all their relevant Bingo information.
