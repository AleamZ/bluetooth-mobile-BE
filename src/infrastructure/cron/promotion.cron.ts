import cron from "node-cron";
import { Promotion } from "../model/promotion.model";

// Cron job chạy mỗi phút để cập nhật khuyến mãi hết hạn
export const startPromotionCron = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      const result = await Promotion.updateMany(
        { endDate: { $lt: now }, isShow: true },
        { $set: { isShow: false } }
      );

      if (result.modifiedCount > 0) {
        console.log(`✅ Đã ẩn ${result.modifiedCount} khuyến mãi hết hạn.`);
      }
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật khuyến mãi:", error);
    }
  });

  console.log("🔄 Cron job cập nhật khuyến mãi đã được kích hoạt.");
};
