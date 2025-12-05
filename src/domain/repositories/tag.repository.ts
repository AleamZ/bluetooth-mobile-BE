import { ITag } from "../../infrastructure/model/tag.model";

export interface ITagRepository {
  createTag(nameTag: string): Promise<ITag>;
  proposeTag(text: string): Promise<ITag[]>;
}
