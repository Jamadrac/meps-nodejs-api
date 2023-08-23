module.exports = {
  HOST: "ep-divine-fog-07767063-pooler.us-east-1.postgres.vercel-storage.com",
  USER: "default",
  PASSWORD: "bhGYIyDtT28X",
  DB: "verceldb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};