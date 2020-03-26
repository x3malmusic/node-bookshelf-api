1) install postgreSQL
2) in file "knexfile.js" set fields:

    user: "your_user or postgres",
    password: "your_password",
    database: "your_database_name or postgres"

3) Run migrations with: npm run migrate

4) Project run: npm run dev