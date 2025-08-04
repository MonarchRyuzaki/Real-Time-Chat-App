export class CacheLayer<T> {
  constructor(
    private prefix: string,
    private bloomCheckFn: (key: string) => Promise<boolean>,
    private redisGetFn: (key: string) => Promise<T | null>,
    private dbGetFn: (id: string) => Promise<T | null>,
    private bloomAddFn: (key: string) => Promise<boolean>,
    private redisSetFn: (key: string, value: T) => Promise<string | null>
  ) {}

  private getKey(id: string) {
    return `${this.prefix}:${id}`;
  }

  async get(id: string): Promise<T | null> {
    const key = this.getKey(id);

    if (!(await this.bloomCheckFn(key))) return null;

    const cachedValue = await this.redisGetFn(key);
    if (cachedValue !== null) return cachedValue;

    const fromDb = await this.dbGetFn(id);
    if (fromDb !== null) {
      await this.bloomAddFn(key);
      await this.redisSetFn(key, fromDb);
    }

    return fromDb;
  }

  async set(id: string): Promise<boolean> {
    const key = this.getKey(id);

    await this.bloomAddFn(key);
    return true;
  }
}
