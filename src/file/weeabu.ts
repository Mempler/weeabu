import { Buff, FileTypes } from "../helpers/buffer";
import { Image } from "../helpers/image";

enum FileVersions {
    v1 = 0xB4DC0D3, // V1 = Bad Code.
}

export class Weeabu {
    private images: Image[] = [];
    private Links: string[] = [];

    public GetImages = () => this.images;
    public GetLinks = () => this.Links;

    public AddLink = (value: string) => this.Links.push(value);
    public AddImage = (value: Image) => this.images.push(value);

    public RandomLink = () => this.Links[Math.floor(Math.random() * this.Links.length)];
    public RandomImage = () => this.images[Math.floor(Math.random() * this.images.length)];

    public Write2Buffer = () => {
        const b = new Buff();
        b.WriteUInt(FileVersions.v1, 6);
        b.WriteUInt(this.images.length, 4);
        b.WriteUInt(this.Links.length, 4);
        for (const img of this.images) {
            b.WriteUInt(img.FileType, 1);
            b.WriteUInt(img.FileBuffer.length, 4);
            b.concat(img.FileBuffer);
        }
        for (const str of this.Links) {
            b.WriteUInt(FileTypes.string, 1);
            b.WriteString(str);
        }
        return b.Buff;
    }
    public ReadFromBuffer = (buff: Buffer|Buff) => {
        const b = new Buff(buff);
        let arrIMGLength = 0;
        let arrLNKSLength = 0;
        switch (b.ReadUInt(6)) {
            case FileVersions.v1:
                arrIMGLength += b.ReadUInt(4);
                arrLNKSLength += b.ReadUInt(4);
                for (let i = 0; i < arrIMGLength; i++) {
                    const x = { } as Image;
                    x.FileType = b.ReadUInt(1);
                    x.FileBuffer = Buffer.from(b.Read(b.ReadUInt(4)));
                    this.AddImage(x);
                }
                for (let i = 0; i < arrLNKSLength; i++) {
                    const T = b.ReadUInt(1);
                    if (T !== FileTypes.string) {
                        continue;
                    }
                    this.AddLink(b.ReadString());
                }
                break;
            default:
                throw new Error("Unknown file version!");
        }
        return this;
    }
}
