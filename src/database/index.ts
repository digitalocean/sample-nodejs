import mongoose, { Connection } from "mongoose";

let conn: Connection;

export default function initDB(dbUrl: string): void {
  console.log("TTTT");
  mongoose.connect(dbUrl, (err) => {
    if (err) {
      console.log("EEEEEEEEEEEEEEEEEEEEEEE");
      console.error(err);
      return;
    }
    conn = mongoose.connection;
    console.log("Database connected");
  });
}

export { conn };
