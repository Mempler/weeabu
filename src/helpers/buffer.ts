export enum FileTypes {
    string = 0x0a,
    Image = 0x0b,
    IJPG = 0x0ba - Image,
    IPNG = 0x0bb - Image,
    IGIF = 0x0bc - Image,
}

export class Buff {
    public Buff: Buffer;
    public Offset: number;
    constructor(inBuff?: Buff|Buffer) {
        this.Offset = 0;
        if (inBuff) {
            if (Buffer.isBuffer(inBuff)) {
                this.Buff = inBuff;
            } else if (inBuff instanceof Buff) {
                this.Buff = inBuff.Buff;
            } else {
                throw new Error("Unknown file format.");
            }
            return;
        }
        this.Buff = Buffer.alloc(0);
    }
    public allocate = (size: number) => this.concat(Buffer.alloc(size));
    public WriteInt = (Value: number, Size: number) => {
        this.allocate(Size);
        this.Buff.writeIntLE(Value, this.Offset, Size);
        this.Offset += Size;
    }
    public WriteUInt = (Value: number, Size: number) => {
        this.allocate(Size);
        this.Buff.writeUIntLE(Value, this.Offset, Size);
        this.Offset += Size;
    }
    public WriteString = (Value: string) => {
        this.allocate(Value.length);
        this.WriteUInt(Value.length, 4);
        this.Buff.write(Value, this.Offset, Value.length);
        this.Offset += Value.length;
    }
    public Read = (Size: number) => {
        const o = [] as number[];
        for (let i = 0; i < Size; i++) {
            o.push(this.Buff.readUInt8(this.Offset++));
        }
        return o;
    }
    public ReadInt = (Size: number) => {
        const o = this.Buff.readIntLE(this.Offset, Size);
        this.Offset += Size;
        return o;
    }
    public ReadUInt = (Size: number) => {
        const o = this.Buff.readUIntLE(this.Offset, Size);
        this.Offset += Size;
        return o;
    }
    public ReadString = () => {
        const x = this.ReadUInt(4);
        return Buffer.from(this.Read(x)).toString();
    }
    public concat = (B: Buffer) => this.Buff = Buffer.concat([this.Buff, B]);
}
