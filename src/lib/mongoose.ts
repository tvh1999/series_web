import mongoose from "mongoose";
import Series from "@/database/series.model";

// Quản lý trạng thái kết nối của mongoose với database (mongoDB).
let isConnected: boolean = false; // track the connection

export const connectToDatabase = async () => {
  // Thiết lập chế độ strict của mongoose. Ngăn ngừa lỗi phát sinh.
  mongoose.set("strictQuery", true);

  // Check xem liệu key của MongoDB đã được cung cấp hay chưa.
  if (!process.env.MONGODB_KEY) throw new Error("Missing MONGODB_KEY");

  // Kiểm tra xem mongoose đã được kết nối với database hay chưa. Nếu true nó sẽ báo là đã làm rồi.
  if (isConnected)
    return console.log("Connection to database is already established");

  try {
    // Khởi tạo kết nối mongoose tới database
    await mongoose.connect(process.env.MONGODB_KEY, {
      dbName: "web-series",
    });

    // Đổi trạng thái kết nối của mongoose thành true.
    isConnected = true;

    // Xuất ra thông báo.
    console.log("Connection to database established");
  } catch (err: unknown) {
    if (err instanceof Error) console.error(err.message);
  }
};

export const pushDataIntoDatabase = async (data: any[]) => {
  try {
    await connectToDatabase();

    const series = await Series.insertMany(data);

    return series;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
    throw error;
  }
};
