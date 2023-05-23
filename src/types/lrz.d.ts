

declare module 'lrz' {
  interface LrzOptions {
    width?: number;
    height?: number;
    quality?: number;
    fieldName?: string;
  }

  interface LrzOutputInfo {
    base64Len: number;
    base64: string;
    blobLen: number;
    blob: Blob;
    origin: {
      width: number;
      height: number;
      type: string;
      size: number;
      base64: string;
    };
  }

  interface LrzInstance {
    file(inputFile: File): Promise<LrzOutputInfo>;
    file(inputFile: File, options: LrzOptions): Promise<LrzOutputInfo>;
    file(inputFile: File, options: LrzOptions, callback: (output: LrzOutputInfo) => void): void;
  }

  const lrz: LrzInstance;
  export default lrz;
}
