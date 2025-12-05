declare module "multer-storage-cloudinary" {
  import { StorageEngine } from "multer";

  type Params = Record<string, unknown>;

  type File = Express.Multer.File;

  export interface CloudinaryStorageOptions {
    cloudinary: any; // keep loose typing to match runtime package
    params?: Params | ((req: Express.Request, file: File) => Params | Promise<Params>);
    filename?: (req: Express.Request, file: File, cb: (error: Error | null, filename: string) => void) => void;
  }

  export class CloudinaryStorage implements StorageEngine {
    constructor(options: CloudinaryStorageOptions);
    _handleFile(req: Express.Request, file: File, cb: (error?: Error | null, info?: Partial<File> & Params) => void): void;
    _removeFile(req: Express.Request, file: File, cb: (error: Error | null) => void): void;
  }
}

