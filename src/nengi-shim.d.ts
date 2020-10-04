declare module "nengi" {
    export interface WebConfig {
        port?: number
        transferPassword?: string
        httpServer?: any
        wsServer?: any
        mock?: any
    }

    export class Client {
        constructor(config: any, interDelay: number)

        on(event: string, callback: (client: any) => void): void

        connect(address: string): void

        readNetworkAndEmit(): void

        addCommand(command: any): void

        update(): void

    }

    export class Instance {
        constructor(config: any, webConfig: WebConfig)

        on(event: string, callback: (connPayload: any) => void)

        addEntity(entity: any): void

        removeEntity(entity: any): void

        /**
         * Sends a message to one or more clients.
         * 
         * @param message Message
         * @param clientOrClients A client or an array of clients
         */
        message(message: any, clientOrClients: any): any

        /**
         * Sends a message to all clients.
         * @param message
         */
        messageAll(message: any): void

        emitCommands(): void

        update(): void
    }

    export const Boolean: number

    /**
     * Holds any integer in the range 0 to3
     */
    export const UInt2: number

    /**
     * Holds any integer in the range 0 to 7
     */
    export const UInt3: number

    /**
     * Holds any integer in the range -8 to 7
     */
    export const Int4: number

    /**
     * Holds any integer in the range 0 to 15
     */
    export const UInt4: number

    /**
     * Holds any integer in the range -32 to 31
     */
    export const Int6: number

    /**
     * Holds any integer in the range 0 to 65535
     */
    export const UInt6: number

    /**
     * Holds any integer in the range -128 to 127
     */
    export const Int8: number

    /**
     * Holds any integer in the range -512 to 511
     */
    export const UInt8: number

    /**
     * Holds any integer in the range -512 to 511
     */
    export const Int10: number

    /**
     * Holds any integer in the range 0 to 1023
     */
    export const UInt10: number

    /**
     * Holds any integer in the range 0 to 4095
     */
    export const UInt12: number

    /**
     * Holds any integer in the range -32768 to 32767
     */
    export const Int16: number

    /**
     * Holds any integer in the range 0 to 65535
     */
    export const UInt16: number

    /**
     * Holds any integer in the range -2147483648 to 2147483647
     */
    export const Int32: number

    /**
     * Holds any integer in the range 0 to 4294967295
     */
    export const UInt32: number

    /**
     * Holds a JavaScript Number (64 bit), same as Float64
     */
    export const Number: number

    /**
     * Holds a 32 bit floating point, half the resolution of Float64 aka Number
     */
    export const Float32: number

    /**
     * Holds a 64 bit floating point, same as Number
     */
    export const Float64: number

    /**
     * Holds a 32 bit floating point that will be interpolated around
     */
    export const RotationFloat32: number

    /**
     * Holds a string with a max length of 255 where each character is networked as byte (not utf8 safe!).
     */
    export const ASCIIString: number

    /**
     * Alias to UTF8String
     */
    export const String: number

    /**
     * Holds a string of UTF8 characters, maximum 4294967295 bytes
     */
    export const UTF8String: number
}