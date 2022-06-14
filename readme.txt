//app.js
hoofdapplicatie

//routes
<= import de controllers
=> export routes (get, post, etc) naar app.js

//controllers
<= import db config en mysql
=> export results naar routes

//database
<= import sequelize en sequelize-cli
Sequelize wordt gebruikt voor de migrations in deze solution.
Via de Model folder kan men de controllers ook via Sequelize implementeren in plaats van met mysql2