// Snowflake ID structure:
// 1 bit (unused) + 41 bits (timestamp) + 5 bits (machine ID) + 17 bits (sequence)
export const EPOCH = 1753570766000n; // Date and time (GMT): Saturday, 26 July 2025 22:59:26
const TIMESTAMP_BITS = 41n;
const MACHINE_ID_BITS = 5n;
const SEQUENCE_BITS = 17n;

const MAX_MACHINE_ID = (1n << MACHINE_ID_BITS) - 1n; // 31
const MAX_SEQUENCE = (1n << SEQUENCE_BITS) - 1n; // 131071

const MACHINE_ID_SHIFT = SEQUENCE_BITS;
export const TIMESTAMP_SHIFT = SEQUENCE_BITS + MACHINE_ID_BITS;

class SnowflakeGenerator {
    private machineId: bigint;
    private sequence: bigint = 0n;
    private lastTimestamp: bigint = 0n;

    constructor(machineId?: number) {
        const envMachineId = process.env.MACHINE_ID ? parseInt(process.env.MACHINE_ID) : undefined;
        const finalMachineId = machineId ?? envMachineId ?? 0;
        if (finalMachineId < 0 || finalMachineId > Number(MAX_MACHINE_ID)) {
            throw new Error(`Machine ID must be between 0 and ${MAX_MACHINE_ID}`);
        }
        this.machineId = BigInt(finalMachineId);
        console.log(`SnowflakeGenerator initialized with machine ID: ${this.machineId}`);
    }

    private getCurrentTimestamp(): bigint {
        return BigInt(Date.now()) - EPOCH;
    }

    private waitForNextTimestamp(lastTimestamp: bigint): bigint {
        let timestamp = this.getCurrentTimestamp();
        while (timestamp <= lastTimestamp) {
            timestamp = this.getCurrentTimestamp();
        }
        return timestamp;
    }

    generate(): string {
        let timestamp = this.getCurrentTimestamp();

        if (timestamp < this.lastTimestamp) {
            throw new Error('Clock moved backwards. Refusing to generate ID');
        }

        if (timestamp === this.lastTimestamp) {
            this.sequence = (this.sequence + 1n) & MAX_SEQUENCE; 
            if (this.sequence === 0n) { // Overflow, wait for next millisecond
                timestamp = this.waitForNextTimestamp(this.lastTimestamp);
            }
        } else {
            this.sequence = 0n;
        }

        this.lastTimestamp = timestamp;

        const id = (timestamp << TIMESTAMP_SHIFT) |
                   (this.machineId << MACHINE_ID_SHIFT) |
                   this.sequence;

        return id.toString();
    }
}

// Create a default generator instance
const defaultGenerator = new SnowflakeGenerator();

export function snowflakeIdGenerator(): string {
    return defaultGenerator.generate();
}

// Export the class for creating multiple generators with different machine IDs
export { SnowflakeGenerator };