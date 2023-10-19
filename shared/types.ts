export interface Settings {
    repo?: string
    token?: string
    eventType?: string
}

export interface Asset {
    blobType: string;
    content: Uint8Array;
    name: string;
}