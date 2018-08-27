import { Buff, FileTypes } from "../helpers/buffer";

export interface Image {
    FileType: FileTypes;
    FileBuffer: Buffer;
}

export const NewImage = (FileType: FileTypes, FileBuffer: Buff|Buffer) => ({ FileType, FileBuffer } as Image);
