declare module "multer-storage-cloudinary" {
  import { StorageEngine } from "multer";

  type Params = Record<string, unknown>;
  type File = Express.Multer.File;

  export interface CloudinaryStorageOptions {
    cloudinary: any;
    params?: Params | ((req: Express.Request, file: File) => Params | Promise<Params>);
    filename?: (req: Express.Request, file: File, cb: (error: Error | null, filename: string) => void) => void;
  }

  // The package exports a function that returns a configured StorageEngine
  function CloudinaryStorage(options: CloudinaryStorageOptions): StorageEngine;

  export = CloudinaryStorage;
}