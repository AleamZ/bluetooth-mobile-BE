import { ITagRepository } from "../../domain/repositories/tag.repository";
import Tag, { ITag } from "../model/tag.model";

export class TagRepositoryImpl implements ITagRepository {
  async createTag(nameTag: string): Promise<ITag> {
    const nameLower = nameTag.toLowerCase();
    const existingTag = await Tag.findOne({
      name: { $regex: new RegExp(`^${nameLower}$`, "i") },
    });
    if (existingTag) {
      existingTag.numberUsed = (existingTag.numberUsed || 0) + 1;
      await existingTag.save();
      return existingTag;
    }
    return await Tag.create({ name: nameLower, numberUsed: 1 });
  }
  async proposeTag(text: string): Promise<ITag[]> {
    const regex = new RegExp(`^${text}`, "i");
    return await Tag.find({ name: { $regex: regex } })
      .sort({ numberUsed: -1 })
      .limit(10);
  }
}
