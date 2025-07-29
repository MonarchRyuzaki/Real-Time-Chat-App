
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Friendship
 * 
 */
export type Friendship = $Result.DefaultSelection<Prisma.$FriendshipPayload>
/**
 * Model Group
 * 
 */
export type Group = $Result.DefaultSelection<Prisma.$GroupPayload>
/**
 * Model GroupMembership
 * 
 */
export type GroupMembership = $Result.DefaultSelection<Prisma.$GroupMembershipPayload>
/**
 * Model OfflineMessages
 * 
 */
export type OfflineMessages = $Result.DefaultSelection<Prisma.$OfflineMessagesPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const MessageType: {
  ONE_TO_ONE: 'ONE_TO_ONE',
  GROUP: 'GROUP'
};

export type MessageType = (typeof MessageType)[keyof typeof MessageType]

}

export type MessageType = $Enums.MessageType

export const MessageType: typeof $Enums.MessageType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friendship`: Exposes CRUD operations for the **Friendship** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Friendships
    * const friendships = await prisma.friendship.findMany()
    * ```
    */
  get friendship(): Prisma.FriendshipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.group`: Exposes CRUD operations for the **Group** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Groups
    * const groups = await prisma.group.findMany()
    * ```
    */
  get group(): Prisma.GroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.groupMembership`: Exposes CRUD operations for the **GroupMembership** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GroupMemberships
    * const groupMemberships = await prisma.groupMembership.findMany()
    * ```
    */
  get groupMembership(): Prisma.GroupMembershipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.offlineMessages`: Exposes CRUD operations for the **OfflineMessages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OfflineMessages
    * const offlineMessages = await prisma.offlineMessages.findMany()
    * ```
    */
  get offlineMessages(): Prisma.OfflineMessagesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Friendship: 'Friendship',
    Group: 'Group',
    GroupMembership: 'GroupMembership',
    OfflineMessages: 'OfflineMessages'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "friendship" | "group" | "groupMembership" | "offlineMessages"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Friendship: {
        payload: Prisma.$FriendshipPayload<ExtArgs>
        fields: Prisma.FriendshipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FriendshipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FriendshipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          findFirst: {
            args: Prisma.FriendshipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FriendshipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          findMany: {
            args: Prisma.FriendshipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>[]
          }
          create: {
            args: Prisma.FriendshipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          createMany: {
            args: Prisma.FriendshipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FriendshipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>[]
          }
          delete: {
            args: Prisma.FriendshipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          update: {
            args: Prisma.FriendshipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          deleteMany: {
            args: Prisma.FriendshipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FriendshipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FriendshipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>[]
          }
          upsert: {
            args: Prisma.FriendshipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendshipPayload>
          }
          aggregate: {
            args: Prisma.FriendshipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriendship>
          }
          groupBy: {
            args: Prisma.FriendshipGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendshipGroupByOutputType>[]
          }
          count: {
            args: Prisma.FriendshipCountArgs<ExtArgs>
            result: $Utils.Optional<FriendshipCountAggregateOutputType> | number
          }
        }
      }
      Group: {
        payload: Prisma.$GroupPayload<ExtArgs>
        fields: Prisma.GroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findFirst: {
            args: Prisma.GroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          findMany: {
            args: Prisma.GroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          create: {
            args: Prisma.GroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          createMany: {
            args: Prisma.GroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          delete: {
            args: Prisma.GroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          update: {
            args: Prisma.GroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          deleteMany: {
            args: Prisma.GroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>[]
          }
          upsert: {
            args: Prisma.GroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupPayload>
          }
          aggregate: {
            args: Prisma.GroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroup>
          }
          groupBy: {
            args: Prisma.GroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupCountArgs<ExtArgs>
            result: $Utils.Optional<GroupCountAggregateOutputType> | number
          }
        }
      }
      GroupMembership: {
        payload: Prisma.$GroupMembershipPayload<ExtArgs>
        fields: Prisma.GroupMembershipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GroupMembershipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMembershipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GroupMembershipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMembershipPayload>
          }
          findFirst: {
            args: Prisma.GroupMembershipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMembershipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GroupMembershipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMembershipPayload>
          }
          findMany: {
            args: Prisma.GroupMembershipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMembershipPayload>[]
          }
          create: {
            args: Prisma.GroupMembershipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMembershipPayload>
          }
          createMany: {
            args: Prisma.GroupMembershipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GroupMembershipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMembershipPayload>[]
          }
          delete: {
            args: Prisma.GroupMembershipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMembershipPayload>
          }
          update: {
            args: Prisma.GroupMembershipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMembershipPayload>
          }
          deleteMany: {
            args: Prisma.GroupMembershipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GroupMembershipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GroupMembershipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMembershipPayload>[]
          }
          upsert: {
            args: Prisma.GroupMembershipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GroupMembershipPayload>
          }
          aggregate: {
            args: Prisma.GroupMembershipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGroupMembership>
          }
          groupBy: {
            args: Prisma.GroupMembershipGroupByArgs<ExtArgs>
            result: $Utils.Optional<GroupMembershipGroupByOutputType>[]
          }
          count: {
            args: Prisma.GroupMembershipCountArgs<ExtArgs>
            result: $Utils.Optional<GroupMembershipCountAggregateOutputType> | number
          }
        }
      }
      OfflineMessages: {
        payload: Prisma.$OfflineMessagesPayload<ExtArgs>
        fields: Prisma.OfflineMessagesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OfflineMessagesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineMessagesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OfflineMessagesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineMessagesPayload>
          }
          findFirst: {
            args: Prisma.OfflineMessagesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineMessagesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OfflineMessagesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineMessagesPayload>
          }
          findMany: {
            args: Prisma.OfflineMessagesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineMessagesPayload>[]
          }
          create: {
            args: Prisma.OfflineMessagesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineMessagesPayload>
          }
          createMany: {
            args: Prisma.OfflineMessagesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OfflineMessagesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineMessagesPayload>[]
          }
          delete: {
            args: Prisma.OfflineMessagesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineMessagesPayload>
          }
          update: {
            args: Prisma.OfflineMessagesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineMessagesPayload>
          }
          deleteMany: {
            args: Prisma.OfflineMessagesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OfflineMessagesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OfflineMessagesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineMessagesPayload>[]
          }
          upsert: {
            args: Prisma.OfflineMessagesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OfflineMessagesPayload>
          }
          aggregate: {
            args: Prisma.OfflineMessagesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOfflineMessages>
          }
          groupBy: {
            args: Prisma.OfflineMessagesGroupByArgs<ExtArgs>
            result: $Utils.Optional<OfflineMessagesGroupByOutputType>[]
          }
          count: {
            args: Prisma.OfflineMessagesCountArgs<ExtArgs>
            result: $Utils.Optional<OfflineMessagesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    friendship?: FriendshipOmit
    group?: GroupOmit
    groupMembership?: GroupMembershipOmit
    offlineMessages?: OfflineMessagesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    friendships1: number
    friendships2: number
    groupMembership: number
    createdGroups: number
    OfflineMessages: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friendships1?: boolean | UserCountOutputTypeCountFriendships1Args
    friendships2?: boolean | UserCountOutputTypeCountFriendships2Args
    groupMembership?: boolean | UserCountOutputTypeCountGroupMembershipArgs
    createdGroups?: boolean | UserCountOutputTypeCountCreatedGroupsArgs
    OfflineMessages?: boolean | UserCountOutputTypeCountOfflineMessagesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendships1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendshipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendships2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendshipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGroupMembershipArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMembershipWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreatedGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOfflineMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfflineMessagesWhereInput
  }


  /**
   * Count Type GroupCountOutputType
   */

  export type GroupCountOutputType = {
    members: number
  }

  export type GroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | GroupCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes
  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupCountOutputType
     */
    select?: GroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GroupCountOutputType without action
   */
  export type GroupCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMembershipWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    username: string | null
    password: string | null
  }

  export type UserMaxAggregateOutputType = {
    username: string | null
    password: string | null
  }

  export type UserCountAggregateOutputType = {
    username: number
    password: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    username?: true
    password?: true
  }

  export type UserMaxAggregateInputType = {
    username?: true
    password?: true
  }

  export type UserCountAggregateInputType = {
    username?: true
    password?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    username: string
    password: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    username?: boolean
    password?: boolean
    friendships1?: boolean | User$friendships1Args<ExtArgs>
    friendships2?: boolean | User$friendships2Args<ExtArgs>
    groupMembership?: boolean | User$groupMembershipArgs<ExtArgs>
    createdGroups?: boolean | User$createdGroupsArgs<ExtArgs>
    OfflineMessages?: boolean | User$OfflineMessagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    username?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    username?: boolean
    password?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    username?: boolean
    password?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"username" | "password", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    friendships1?: boolean | User$friendships1Args<ExtArgs>
    friendships2?: boolean | User$friendships2Args<ExtArgs>
    groupMembership?: boolean | User$groupMembershipArgs<ExtArgs>
    createdGroups?: boolean | User$createdGroupsArgs<ExtArgs>
    OfflineMessages?: boolean | User$OfflineMessagesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      friendships1: Prisma.$FriendshipPayload<ExtArgs>[]
      friendships2: Prisma.$FriendshipPayload<ExtArgs>[]
      groupMembership: Prisma.$GroupMembershipPayload<ExtArgs>[]
      createdGroups: Prisma.$GroupPayload<ExtArgs>[]
      OfflineMessages: Prisma.$OfflineMessagesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      username: string
      password: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `username`
     * const userWithUsernameOnly = await prisma.user.findMany({ select: { username: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `username`
     * const userWithUsernameOnly = await prisma.user.createManyAndReturn({
     *   select: { username: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `username`
     * const userWithUsernameOnly = await prisma.user.updateManyAndReturn({
     *   select: { username: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    friendships1<T extends User$friendships1Args<ExtArgs> = {}>(args?: Subset<T, User$friendships1Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friendships2<T extends User$friendships2Args<ExtArgs> = {}>(args?: Subset<T, User$friendships2Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groupMembership<T extends User$groupMembershipArgs<ExtArgs> = {}>(args?: Subset<T, User$groupMembershipArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    createdGroups<T extends User$createdGroupsArgs<ExtArgs> = {}>(args?: Subset<T, User$createdGroupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    OfflineMessages<T extends User$OfflineMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$OfflineMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfflineMessagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.friendships1
   */
  export type User$friendships1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    where?: FriendshipWhereInput
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    cursor?: FriendshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[]
  }

  /**
   * User.friendships2
   */
  export type User$friendships2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    where?: FriendshipWhereInput
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    cursor?: FriendshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[]
  }

  /**
   * User.groupMembership
   */
  export type User$groupMembershipArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMembership
     */
    select?: GroupMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMembership
     */
    omit?: GroupMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMembershipInclude<ExtArgs> | null
    where?: GroupMembershipWhereInput
    orderBy?: GroupMembershipOrderByWithRelationInput | GroupMembershipOrderByWithRelationInput[]
    cursor?: GroupMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupMembershipScalarFieldEnum | GroupMembershipScalarFieldEnum[]
  }

  /**
   * User.createdGroups
   */
  export type User$createdGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    cursor?: GroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * User.OfflineMessages
   */
  export type User$OfflineMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineMessages
     */
    select?: OfflineMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineMessages
     */
    omit?: OfflineMessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfflineMessagesInclude<ExtArgs> | null
    where?: OfflineMessagesWhereInput
    orderBy?: OfflineMessagesOrderByWithRelationInput | OfflineMessagesOrderByWithRelationInput[]
    cursor?: OfflineMessagesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OfflineMessagesScalarFieldEnum | OfflineMessagesScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Friendship
   */

  export type AggregateFriendship = {
    _count: FriendshipCountAggregateOutputType | null
    _min: FriendshipMinAggregateOutputType | null
    _max: FriendshipMaxAggregateOutputType | null
  }

  export type FriendshipMinAggregateOutputType = {
    chatId: string | null
    user1: string | null
    user2: string | null
  }

  export type FriendshipMaxAggregateOutputType = {
    chatId: string | null
    user1: string | null
    user2: string | null
  }

  export type FriendshipCountAggregateOutputType = {
    chatId: number
    user1: number
    user2: number
    _all: number
  }


  export type FriendshipMinAggregateInputType = {
    chatId?: true
    user1?: true
    user2?: true
  }

  export type FriendshipMaxAggregateInputType = {
    chatId?: true
    user1?: true
    user2?: true
  }

  export type FriendshipCountAggregateInputType = {
    chatId?: true
    user1?: true
    user2?: true
    _all?: true
  }

  export type FriendshipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Friendship to aggregate.
     */
    where?: FriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friendships to fetch.
     */
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friendships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Friendships
    **/
    _count?: true | FriendshipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendshipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendshipMaxAggregateInputType
  }

  export type GetFriendshipAggregateType<T extends FriendshipAggregateArgs> = {
        [P in keyof T & keyof AggregateFriendship]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriendship[P]>
      : GetScalarType<T[P], AggregateFriendship[P]>
  }




  export type FriendshipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendshipWhereInput
    orderBy?: FriendshipOrderByWithAggregationInput | FriendshipOrderByWithAggregationInput[]
    by: FriendshipScalarFieldEnum[] | FriendshipScalarFieldEnum
    having?: FriendshipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendshipCountAggregateInputType | true
    _min?: FriendshipMinAggregateInputType
    _max?: FriendshipMaxAggregateInputType
  }

  export type FriendshipGroupByOutputType = {
    chatId: string
    user1: string
    user2: string
    _count: FriendshipCountAggregateOutputType | null
    _min: FriendshipMinAggregateOutputType | null
    _max: FriendshipMaxAggregateOutputType | null
  }

  type GetFriendshipGroupByPayload<T extends FriendshipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendshipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendshipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendshipGroupByOutputType[P]>
            : GetScalarType<T[P], FriendshipGroupByOutputType[P]>
        }
      >
    >


  export type FriendshipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    user1?: boolean
    user2?: boolean
    user1Rel?: boolean | UserDefaultArgs<ExtArgs>
    user2Rel?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendship"]>

  export type FriendshipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    user1?: boolean
    user2?: boolean
    user1Rel?: boolean | UserDefaultArgs<ExtArgs>
    user2Rel?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendship"]>

  export type FriendshipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    chatId?: boolean
    user1?: boolean
    user2?: boolean
    user1Rel?: boolean | UserDefaultArgs<ExtArgs>
    user2Rel?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendship"]>

  export type FriendshipSelectScalar = {
    chatId?: boolean
    user1?: boolean
    user2?: boolean
  }

  export type FriendshipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"chatId" | "user1" | "user2", ExtArgs["result"]["friendship"]>
  export type FriendshipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user1Rel?: boolean | UserDefaultArgs<ExtArgs>
    user2Rel?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FriendshipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user1Rel?: boolean | UserDefaultArgs<ExtArgs>
    user2Rel?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FriendshipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user1Rel?: boolean | UserDefaultArgs<ExtArgs>
    user2Rel?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FriendshipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Friendship"
    objects: {
      user1Rel: Prisma.$UserPayload<ExtArgs>
      user2Rel: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      chatId: string
      user1: string
      user2: string
    }, ExtArgs["result"]["friendship"]>
    composites: {}
  }

  type FriendshipGetPayload<S extends boolean | null | undefined | FriendshipDefaultArgs> = $Result.GetResult<Prisma.$FriendshipPayload, S>

  type FriendshipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FriendshipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FriendshipCountAggregateInputType | true
    }

  export interface FriendshipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Friendship'], meta: { name: 'Friendship' } }
    /**
     * Find zero or one Friendship that matches the filter.
     * @param {FriendshipFindUniqueArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendshipFindUniqueArgs>(args: SelectSubset<T, FriendshipFindUniqueArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Friendship that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FriendshipFindUniqueOrThrowArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendshipFindUniqueOrThrowArgs>(args: SelectSubset<T, FriendshipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Friendship that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipFindFirstArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendshipFindFirstArgs>(args?: SelectSubset<T, FriendshipFindFirstArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Friendship that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipFindFirstOrThrowArgs} args - Arguments to find a Friendship
     * @example
     * // Get one Friendship
     * const friendship = await prisma.friendship.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendshipFindFirstOrThrowArgs>(args?: SelectSubset<T, FriendshipFindFirstOrThrowArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Friendships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Friendships
     * const friendships = await prisma.friendship.findMany()
     * 
     * // Get first 10 Friendships
     * const friendships = await prisma.friendship.findMany({ take: 10 })
     * 
     * // Only select the `chatId`
     * const friendshipWithChatIdOnly = await prisma.friendship.findMany({ select: { chatId: true } })
     * 
     */
    findMany<T extends FriendshipFindManyArgs>(args?: SelectSubset<T, FriendshipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Friendship.
     * @param {FriendshipCreateArgs} args - Arguments to create a Friendship.
     * @example
     * // Create one Friendship
     * const Friendship = await prisma.friendship.create({
     *   data: {
     *     // ... data to create a Friendship
     *   }
     * })
     * 
     */
    create<T extends FriendshipCreateArgs>(args: SelectSubset<T, FriendshipCreateArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Friendships.
     * @param {FriendshipCreateManyArgs} args - Arguments to create many Friendships.
     * @example
     * // Create many Friendships
     * const friendship = await prisma.friendship.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FriendshipCreateManyArgs>(args?: SelectSubset<T, FriendshipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Friendships and returns the data saved in the database.
     * @param {FriendshipCreateManyAndReturnArgs} args - Arguments to create many Friendships.
     * @example
     * // Create many Friendships
     * const friendship = await prisma.friendship.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Friendships and only return the `chatId`
     * const friendshipWithChatIdOnly = await prisma.friendship.createManyAndReturn({
     *   select: { chatId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FriendshipCreateManyAndReturnArgs>(args?: SelectSubset<T, FriendshipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Friendship.
     * @param {FriendshipDeleteArgs} args - Arguments to delete one Friendship.
     * @example
     * // Delete one Friendship
     * const Friendship = await prisma.friendship.delete({
     *   where: {
     *     // ... filter to delete one Friendship
     *   }
     * })
     * 
     */
    delete<T extends FriendshipDeleteArgs>(args: SelectSubset<T, FriendshipDeleteArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Friendship.
     * @param {FriendshipUpdateArgs} args - Arguments to update one Friendship.
     * @example
     * // Update one Friendship
     * const friendship = await prisma.friendship.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FriendshipUpdateArgs>(args: SelectSubset<T, FriendshipUpdateArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Friendships.
     * @param {FriendshipDeleteManyArgs} args - Arguments to filter Friendships to delete.
     * @example
     * // Delete a few Friendships
     * const { count } = await prisma.friendship.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FriendshipDeleteManyArgs>(args?: SelectSubset<T, FriendshipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friendships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Friendships
     * const friendship = await prisma.friendship.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FriendshipUpdateManyArgs>(args: SelectSubset<T, FriendshipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friendships and returns the data updated in the database.
     * @param {FriendshipUpdateManyAndReturnArgs} args - Arguments to update many Friendships.
     * @example
     * // Update many Friendships
     * const friendship = await prisma.friendship.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Friendships and only return the `chatId`
     * const friendshipWithChatIdOnly = await prisma.friendship.updateManyAndReturn({
     *   select: { chatId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FriendshipUpdateManyAndReturnArgs>(args: SelectSubset<T, FriendshipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Friendship.
     * @param {FriendshipUpsertArgs} args - Arguments to update or create a Friendship.
     * @example
     * // Update or create a Friendship
     * const friendship = await prisma.friendship.upsert({
     *   create: {
     *     // ... data to create a Friendship
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Friendship we want to update
     *   }
     * })
     */
    upsert<T extends FriendshipUpsertArgs>(args: SelectSubset<T, FriendshipUpsertArgs<ExtArgs>>): Prisma__FriendshipClient<$Result.GetResult<Prisma.$FriendshipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Friendships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipCountArgs} args - Arguments to filter Friendships to count.
     * @example
     * // Count the number of Friendships
     * const count = await prisma.friendship.count({
     *   where: {
     *     // ... the filter for the Friendships we want to count
     *   }
     * })
    **/
    count<T extends FriendshipCountArgs>(
      args?: Subset<T, FriendshipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendshipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Friendship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FriendshipAggregateArgs>(args: Subset<T, FriendshipAggregateArgs>): Prisma.PrismaPromise<GetFriendshipAggregateType<T>>

    /**
     * Group by Friendship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendshipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FriendshipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FriendshipGroupByArgs['orderBy'] }
        : { orderBy?: FriendshipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FriendshipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendshipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Friendship model
   */
  readonly fields: FriendshipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Friendship.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendshipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user1Rel<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user2Rel<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Friendship model
   */
  interface FriendshipFieldRefs {
    readonly chatId: FieldRef<"Friendship", 'String'>
    readonly user1: FieldRef<"Friendship", 'String'>
    readonly user2: FieldRef<"Friendship", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Friendship findUnique
   */
  export type FriendshipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter, which Friendship to fetch.
     */
    where: FriendshipWhereUniqueInput
  }

  /**
   * Friendship findUniqueOrThrow
   */
  export type FriendshipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter, which Friendship to fetch.
     */
    where: FriendshipWhereUniqueInput
  }

  /**
   * Friendship findFirst
   */
  export type FriendshipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter, which Friendship to fetch.
     */
    where?: FriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friendships to fetch.
     */
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Friendships.
     */
    cursor?: FriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friendships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Friendships.
     */
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[]
  }

  /**
   * Friendship findFirstOrThrow
   */
  export type FriendshipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter, which Friendship to fetch.
     */
    where?: FriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friendships to fetch.
     */
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Friendships.
     */
    cursor?: FriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friendships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Friendships.
     */
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[]
  }

  /**
   * Friendship findMany
   */
  export type FriendshipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter, which Friendships to fetch.
     */
    where?: FriendshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friendships to fetch.
     */
    orderBy?: FriendshipOrderByWithRelationInput | FriendshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Friendships.
     */
    cursor?: FriendshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friendships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friendships.
     */
    skip?: number
    distinct?: FriendshipScalarFieldEnum | FriendshipScalarFieldEnum[]
  }

  /**
   * Friendship create
   */
  export type FriendshipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * The data needed to create a Friendship.
     */
    data: XOR<FriendshipCreateInput, FriendshipUncheckedCreateInput>
  }

  /**
   * Friendship createMany
   */
  export type FriendshipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Friendships.
     */
    data: FriendshipCreateManyInput | FriendshipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Friendship createManyAndReturn
   */
  export type FriendshipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * The data used to create many Friendships.
     */
    data: FriendshipCreateManyInput | FriendshipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Friendship update
   */
  export type FriendshipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * The data needed to update a Friendship.
     */
    data: XOR<FriendshipUpdateInput, FriendshipUncheckedUpdateInput>
    /**
     * Choose, which Friendship to update.
     */
    where: FriendshipWhereUniqueInput
  }

  /**
   * Friendship updateMany
   */
  export type FriendshipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Friendships.
     */
    data: XOR<FriendshipUpdateManyMutationInput, FriendshipUncheckedUpdateManyInput>
    /**
     * Filter which Friendships to update
     */
    where?: FriendshipWhereInput
    /**
     * Limit how many Friendships to update.
     */
    limit?: number
  }

  /**
   * Friendship updateManyAndReturn
   */
  export type FriendshipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * The data used to update Friendships.
     */
    data: XOR<FriendshipUpdateManyMutationInput, FriendshipUncheckedUpdateManyInput>
    /**
     * Filter which Friendships to update
     */
    where?: FriendshipWhereInput
    /**
     * Limit how many Friendships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Friendship upsert
   */
  export type FriendshipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * The filter to search for the Friendship to update in case it exists.
     */
    where: FriendshipWhereUniqueInput
    /**
     * In case the Friendship found by the `where` argument doesn't exist, create a new Friendship with this data.
     */
    create: XOR<FriendshipCreateInput, FriendshipUncheckedCreateInput>
    /**
     * In case the Friendship was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendshipUpdateInput, FriendshipUncheckedUpdateInput>
  }

  /**
   * Friendship delete
   */
  export type FriendshipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
    /**
     * Filter which Friendship to delete.
     */
    where: FriendshipWhereUniqueInput
  }

  /**
   * Friendship deleteMany
   */
  export type FriendshipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Friendships to delete
     */
    where?: FriendshipWhereInput
    /**
     * Limit how many Friendships to delete.
     */
    limit?: number
  }

  /**
   * Friendship without action
   */
  export type FriendshipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friendship
     */
    select?: FriendshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friendship
     */
    omit?: FriendshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendshipInclude<ExtArgs> | null
  }


  /**
   * Model Group
   */

  export type AggregateGroup = {
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  export type GroupMinAggregateOutputType = {
    groupId: string | null
    groupName: string | null
    createdBy: string | null
  }

  export type GroupMaxAggregateOutputType = {
    groupId: string | null
    groupName: string | null
    createdBy: string | null
  }

  export type GroupCountAggregateOutputType = {
    groupId: number
    groupName: number
    createdBy: number
    _all: number
  }


  export type GroupMinAggregateInputType = {
    groupId?: true
    groupName?: true
    createdBy?: true
  }

  export type GroupMaxAggregateInputType = {
    groupId?: true
    groupName?: true
    createdBy?: true
  }

  export type GroupCountAggregateInputType = {
    groupId?: true
    groupName?: true
    createdBy?: true
    _all?: true
  }

  export type GroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Group to aggregate.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Groups
    **/
    _count?: true | GroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMaxAggregateInputType
  }

  export type GetGroupAggregateType<T extends GroupAggregateArgs> = {
        [P in keyof T & keyof AggregateGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroup[P]>
      : GetScalarType<T[P], AggregateGroup[P]>
  }




  export type GroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupWhereInput
    orderBy?: GroupOrderByWithAggregationInput | GroupOrderByWithAggregationInput[]
    by: GroupScalarFieldEnum[] | GroupScalarFieldEnum
    having?: GroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupCountAggregateInputType | true
    _min?: GroupMinAggregateInputType
    _max?: GroupMaxAggregateInputType
  }

  export type GroupGroupByOutputType = {
    groupId: string
    groupName: string
    createdBy: string
    _count: GroupCountAggregateOutputType | null
    _min: GroupMinAggregateOutputType | null
    _max: GroupMaxAggregateOutputType | null
  }

  type GetGroupGroupByPayload<T extends GroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupGroupByOutputType[P]>
            : GetScalarType<T[P], GroupGroupByOutputType[P]>
        }
      >
    >


  export type GroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    groupId?: boolean
    groupName?: boolean
    createdBy?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Group$membersArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    groupId?: boolean
    groupName?: boolean
    createdBy?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    groupId?: boolean
    groupName?: boolean
    createdBy?: boolean
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["group"]>

  export type GroupSelectScalar = {
    groupId?: boolean
    groupName?: boolean
    createdBy?: boolean
  }

  export type GroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"groupId" | "groupName" | "createdBy", ExtArgs["result"]["group"]>
  export type GroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | Group$membersArgs<ExtArgs>
    _count?: boolean | GroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creator?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Group"
    objects: {
      creator: Prisma.$UserPayload<ExtArgs>
      members: Prisma.$GroupMembershipPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      groupId: string
      groupName: string
      createdBy: string
    }, ExtArgs["result"]["group"]>
    composites: {}
  }

  type GroupGetPayload<S extends boolean | null | undefined | GroupDefaultArgs> = $Result.GetResult<Prisma.$GroupPayload, S>

  type GroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupCountAggregateInputType | true
    }

  export interface GroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Group'], meta: { name: 'Group' } }
    /**
     * Find zero or one Group that matches the filter.
     * @param {GroupFindUniqueArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupFindUniqueArgs>(args: SelectSubset<T, GroupFindUniqueArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Group that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupFindUniqueOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupFindFirstArgs>(args?: SelectSubset<T, GroupFindFirstArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Group that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindFirstOrThrowArgs} args - Arguments to find a Group
     * @example
     * // Get one Group
     * const group = await prisma.group.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Groups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Groups
     * const groups = await prisma.group.findMany()
     * 
     * // Get first 10 Groups
     * const groups = await prisma.group.findMany({ take: 10 })
     * 
     * // Only select the `groupId`
     * const groupWithGroupIdOnly = await prisma.group.findMany({ select: { groupId: true } })
     * 
     */
    findMany<T extends GroupFindManyArgs>(args?: SelectSubset<T, GroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Group.
     * @param {GroupCreateArgs} args - Arguments to create a Group.
     * @example
     * // Create one Group
     * const Group = await prisma.group.create({
     *   data: {
     *     // ... data to create a Group
     *   }
     * })
     * 
     */
    create<T extends GroupCreateArgs>(args: SelectSubset<T, GroupCreateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Groups.
     * @param {GroupCreateManyArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupCreateManyArgs>(args?: SelectSubset<T, GroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Groups and returns the data saved in the database.
     * @param {GroupCreateManyAndReturnArgs} args - Arguments to create many Groups.
     * @example
     * // Create many Groups
     * const group = await prisma.group.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Groups and only return the `groupId`
     * const groupWithGroupIdOnly = await prisma.group.createManyAndReturn({
     *   select: { groupId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Group.
     * @param {GroupDeleteArgs} args - Arguments to delete one Group.
     * @example
     * // Delete one Group
     * const Group = await prisma.group.delete({
     *   where: {
     *     // ... filter to delete one Group
     *   }
     * })
     * 
     */
    delete<T extends GroupDeleteArgs>(args: SelectSubset<T, GroupDeleteArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Group.
     * @param {GroupUpdateArgs} args - Arguments to update one Group.
     * @example
     * // Update one Group
     * const group = await prisma.group.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupUpdateArgs>(args: SelectSubset<T, GroupUpdateArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Groups.
     * @param {GroupDeleteManyArgs} args - Arguments to filter Groups to delete.
     * @example
     * // Delete a few Groups
     * const { count } = await prisma.group.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupDeleteManyArgs>(args?: SelectSubset<T, GroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupUpdateManyArgs>(args: SelectSubset<T, GroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Groups and returns the data updated in the database.
     * @param {GroupUpdateManyAndReturnArgs} args - Arguments to update many Groups.
     * @example
     * // Update many Groups
     * const group = await prisma.group.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Groups and only return the `groupId`
     * const groupWithGroupIdOnly = await prisma.group.updateManyAndReturn({
     *   select: { groupId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GroupUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Group.
     * @param {GroupUpsertArgs} args - Arguments to update or create a Group.
     * @example
     * // Update or create a Group
     * const group = await prisma.group.upsert({
     *   create: {
     *     // ... data to create a Group
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Group we want to update
     *   }
     * })
     */
    upsert<T extends GroupUpsertArgs>(args: SelectSubset<T, GroupUpsertArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Groups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupCountArgs} args - Arguments to filter Groups to count.
     * @example
     * // Count the number of Groups
     * const count = await prisma.group.count({
     *   where: {
     *     // ... the filter for the Groups we want to count
     *   }
     * })
    **/
    count<T extends GroupCountArgs>(
      args?: Subset<T, GroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupAggregateArgs>(args: Subset<T, GroupAggregateArgs>): Prisma.PrismaPromise<GetGroupAggregateType<T>>

    /**
     * Group by Group.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupGroupByArgs['orderBy'] }
        : { orderBy?: GroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Group model
   */
  readonly fields: GroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Group.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creator<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends Group$membersArgs<ExtArgs> = {}>(args?: Subset<T, Group$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Group model
   */
  interface GroupFieldRefs {
    readonly groupId: FieldRef<"Group", 'String'>
    readonly groupName: FieldRef<"Group", 'String'>
    readonly createdBy: FieldRef<"Group", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Group findUnique
   */
  export type GroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findUniqueOrThrow
   */
  export type GroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group findFirst
   */
  export type GroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findFirstOrThrow
   */
  export type GroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Group to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Groups.
     */
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group findMany
   */
  export type GroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter, which Groups to fetch.
     */
    where?: GroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Groups to fetch.
     */
    orderBy?: GroupOrderByWithRelationInput | GroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Groups.
     */
    cursor?: GroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Groups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Groups.
     */
    skip?: number
    distinct?: GroupScalarFieldEnum | GroupScalarFieldEnum[]
  }

  /**
   * Group create
   */
  export type GroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to create a Group.
     */
    data: XOR<GroupCreateInput, GroupUncheckedCreateInput>
  }

  /**
   * Group createMany
   */
  export type GroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Group createManyAndReturn
   */
  export type GroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * The data used to create many Groups.
     */
    data: GroupCreateManyInput | GroupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Group update
   */
  export type GroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The data needed to update a Group.
     */
    data: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
    /**
     * Choose, which Group to update.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group updateMany
   */
  export type GroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
  }

  /**
   * Group updateManyAndReturn
   */
  export type GroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * The data used to update Groups.
     */
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyInput>
    /**
     * Filter which Groups to update
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Group upsert
   */
  export type GroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * The filter to search for the Group to update in case it exists.
     */
    where: GroupWhereUniqueInput
    /**
     * In case the Group found by the `where` argument doesn't exist, create a new Group with this data.
     */
    create: XOR<GroupCreateInput, GroupUncheckedCreateInput>
    /**
     * In case the Group was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupUpdateInput, GroupUncheckedUpdateInput>
  }

  /**
   * Group delete
   */
  export type GroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
    /**
     * Filter which Group to delete.
     */
    where: GroupWhereUniqueInput
  }

  /**
   * Group deleteMany
   */
  export type GroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Groups to delete
     */
    where?: GroupWhereInput
    /**
     * Limit how many Groups to delete.
     */
    limit?: number
  }

  /**
   * Group.members
   */
  export type Group$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMembership
     */
    select?: GroupMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMembership
     */
    omit?: GroupMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMembershipInclude<ExtArgs> | null
    where?: GroupMembershipWhereInput
    orderBy?: GroupMembershipOrderByWithRelationInput | GroupMembershipOrderByWithRelationInput[]
    cursor?: GroupMembershipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GroupMembershipScalarFieldEnum | GroupMembershipScalarFieldEnum[]
  }

  /**
   * Group without action
   */
  export type GroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Group
     */
    select?: GroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Group
     */
    omit?: GroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupInclude<ExtArgs> | null
  }


  /**
   * Model GroupMembership
   */

  export type AggregateGroupMembership = {
    _count: GroupMembershipCountAggregateOutputType | null
    _avg: GroupMembershipAvgAggregateOutputType | null
    _sum: GroupMembershipSumAggregateOutputType | null
    _min: GroupMembershipMinAggregateOutputType | null
    _max: GroupMembershipMaxAggregateOutputType | null
  }

  export type GroupMembershipAvgAggregateOutputType = {
    id: number | null
  }

  export type GroupMembershipSumAggregateOutputType = {
    id: number | null
  }

  export type GroupMembershipMinAggregateOutputType = {
    id: number | null
    user: string | null
    group: string | null
  }

  export type GroupMembershipMaxAggregateOutputType = {
    id: number | null
    user: string | null
    group: string | null
  }

  export type GroupMembershipCountAggregateOutputType = {
    id: number
    user: number
    group: number
    _all: number
  }


  export type GroupMembershipAvgAggregateInputType = {
    id?: true
  }

  export type GroupMembershipSumAggregateInputType = {
    id?: true
  }

  export type GroupMembershipMinAggregateInputType = {
    id?: true
    user?: true
    group?: true
  }

  export type GroupMembershipMaxAggregateInputType = {
    id?: true
    user?: true
    group?: true
  }

  export type GroupMembershipCountAggregateInputType = {
    id?: true
    user?: true
    group?: true
    _all?: true
  }

  export type GroupMembershipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupMembership to aggregate.
     */
    where?: GroupMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMemberships to fetch.
     */
    orderBy?: GroupMembershipOrderByWithRelationInput | GroupMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GroupMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GroupMemberships
    **/
    _count?: true | GroupMembershipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GroupMembershipAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GroupMembershipSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GroupMembershipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GroupMembershipMaxAggregateInputType
  }

  export type GetGroupMembershipAggregateType<T extends GroupMembershipAggregateArgs> = {
        [P in keyof T & keyof AggregateGroupMembership]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGroupMembership[P]>
      : GetScalarType<T[P], AggregateGroupMembership[P]>
  }




  export type GroupMembershipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GroupMembershipWhereInput
    orderBy?: GroupMembershipOrderByWithAggregationInput | GroupMembershipOrderByWithAggregationInput[]
    by: GroupMembershipScalarFieldEnum[] | GroupMembershipScalarFieldEnum
    having?: GroupMembershipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GroupMembershipCountAggregateInputType | true
    _avg?: GroupMembershipAvgAggregateInputType
    _sum?: GroupMembershipSumAggregateInputType
    _min?: GroupMembershipMinAggregateInputType
    _max?: GroupMembershipMaxAggregateInputType
  }

  export type GroupMembershipGroupByOutputType = {
    id: number
    user: string
    group: string
    _count: GroupMembershipCountAggregateOutputType | null
    _avg: GroupMembershipAvgAggregateOutputType | null
    _sum: GroupMembershipSumAggregateOutputType | null
    _min: GroupMembershipMinAggregateOutputType | null
    _max: GroupMembershipMaxAggregateOutputType | null
  }

  type GetGroupMembershipGroupByPayload<T extends GroupMembershipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GroupMembershipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GroupMembershipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GroupMembershipGroupByOutputType[P]>
            : GetScalarType<T[P], GroupMembershipGroupByOutputType[P]>
        }
      >
    >


  export type GroupMembershipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user?: boolean
    group?: boolean
    userRel?: boolean | UserDefaultArgs<ExtArgs>
    groupRel?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupMembership"]>

  export type GroupMembershipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user?: boolean
    group?: boolean
    userRel?: boolean | UserDefaultArgs<ExtArgs>
    groupRel?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupMembership"]>

  export type GroupMembershipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user?: boolean
    group?: boolean
    userRel?: boolean | UserDefaultArgs<ExtArgs>
    groupRel?: boolean | GroupDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["groupMembership"]>

  export type GroupMembershipSelectScalar = {
    id?: boolean
    user?: boolean
    group?: boolean
  }

  export type GroupMembershipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user" | "group", ExtArgs["result"]["groupMembership"]>
  export type GroupMembershipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userRel?: boolean | UserDefaultArgs<ExtArgs>
    groupRel?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type GroupMembershipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userRel?: boolean | UserDefaultArgs<ExtArgs>
    groupRel?: boolean | GroupDefaultArgs<ExtArgs>
  }
  export type GroupMembershipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    userRel?: boolean | UserDefaultArgs<ExtArgs>
    groupRel?: boolean | GroupDefaultArgs<ExtArgs>
  }

  export type $GroupMembershipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GroupMembership"
    objects: {
      userRel: Prisma.$UserPayload<ExtArgs>
      groupRel: Prisma.$GroupPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      user: string
      group: string
    }, ExtArgs["result"]["groupMembership"]>
    composites: {}
  }

  type GroupMembershipGetPayload<S extends boolean | null | undefined | GroupMembershipDefaultArgs> = $Result.GetResult<Prisma.$GroupMembershipPayload, S>

  type GroupMembershipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GroupMembershipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GroupMembershipCountAggregateInputType | true
    }

  export interface GroupMembershipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GroupMembership'], meta: { name: 'GroupMembership' } }
    /**
     * Find zero or one GroupMembership that matches the filter.
     * @param {GroupMembershipFindUniqueArgs} args - Arguments to find a GroupMembership
     * @example
     * // Get one GroupMembership
     * const groupMembership = await prisma.groupMembership.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GroupMembershipFindUniqueArgs>(args: SelectSubset<T, GroupMembershipFindUniqueArgs<ExtArgs>>): Prisma__GroupMembershipClient<$Result.GetResult<Prisma.$GroupMembershipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GroupMembership that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GroupMembershipFindUniqueOrThrowArgs} args - Arguments to find a GroupMembership
     * @example
     * // Get one GroupMembership
     * const groupMembership = await prisma.groupMembership.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GroupMembershipFindUniqueOrThrowArgs>(args: SelectSubset<T, GroupMembershipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GroupMembershipClient<$Result.GetResult<Prisma.$GroupMembershipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupMembership that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMembershipFindFirstArgs} args - Arguments to find a GroupMembership
     * @example
     * // Get one GroupMembership
     * const groupMembership = await prisma.groupMembership.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GroupMembershipFindFirstArgs>(args?: SelectSubset<T, GroupMembershipFindFirstArgs<ExtArgs>>): Prisma__GroupMembershipClient<$Result.GetResult<Prisma.$GroupMembershipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GroupMembership that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMembershipFindFirstOrThrowArgs} args - Arguments to find a GroupMembership
     * @example
     * // Get one GroupMembership
     * const groupMembership = await prisma.groupMembership.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GroupMembershipFindFirstOrThrowArgs>(args?: SelectSubset<T, GroupMembershipFindFirstOrThrowArgs<ExtArgs>>): Prisma__GroupMembershipClient<$Result.GetResult<Prisma.$GroupMembershipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GroupMemberships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMembershipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GroupMemberships
     * const groupMemberships = await prisma.groupMembership.findMany()
     * 
     * // Get first 10 GroupMemberships
     * const groupMemberships = await prisma.groupMembership.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const groupMembershipWithIdOnly = await prisma.groupMembership.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GroupMembershipFindManyArgs>(args?: SelectSubset<T, GroupMembershipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMembershipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GroupMembership.
     * @param {GroupMembershipCreateArgs} args - Arguments to create a GroupMembership.
     * @example
     * // Create one GroupMembership
     * const GroupMembership = await prisma.groupMembership.create({
     *   data: {
     *     // ... data to create a GroupMembership
     *   }
     * })
     * 
     */
    create<T extends GroupMembershipCreateArgs>(args: SelectSubset<T, GroupMembershipCreateArgs<ExtArgs>>): Prisma__GroupMembershipClient<$Result.GetResult<Prisma.$GroupMembershipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GroupMemberships.
     * @param {GroupMembershipCreateManyArgs} args - Arguments to create many GroupMemberships.
     * @example
     * // Create many GroupMemberships
     * const groupMembership = await prisma.groupMembership.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GroupMembershipCreateManyArgs>(args?: SelectSubset<T, GroupMembershipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GroupMemberships and returns the data saved in the database.
     * @param {GroupMembershipCreateManyAndReturnArgs} args - Arguments to create many GroupMemberships.
     * @example
     * // Create many GroupMemberships
     * const groupMembership = await prisma.groupMembership.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GroupMemberships and only return the `id`
     * const groupMembershipWithIdOnly = await prisma.groupMembership.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GroupMembershipCreateManyAndReturnArgs>(args?: SelectSubset<T, GroupMembershipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMembershipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GroupMembership.
     * @param {GroupMembershipDeleteArgs} args - Arguments to delete one GroupMembership.
     * @example
     * // Delete one GroupMembership
     * const GroupMembership = await prisma.groupMembership.delete({
     *   where: {
     *     // ... filter to delete one GroupMembership
     *   }
     * })
     * 
     */
    delete<T extends GroupMembershipDeleteArgs>(args: SelectSubset<T, GroupMembershipDeleteArgs<ExtArgs>>): Prisma__GroupMembershipClient<$Result.GetResult<Prisma.$GroupMembershipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GroupMembership.
     * @param {GroupMembershipUpdateArgs} args - Arguments to update one GroupMembership.
     * @example
     * // Update one GroupMembership
     * const groupMembership = await prisma.groupMembership.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GroupMembershipUpdateArgs>(args: SelectSubset<T, GroupMembershipUpdateArgs<ExtArgs>>): Prisma__GroupMembershipClient<$Result.GetResult<Prisma.$GroupMembershipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GroupMemberships.
     * @param {GroupMembershipDeleteManyArgs} args - Arguments to filter GroupMemberships to delete.
     * @example
     * // Delete a few GroupMemberships
     * const { count } = await prisma.groupMembership.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GroupMembershipDeleteManyArgs>(args?: SelectSubset<T, GroupMembershipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMembershipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GroupMemberships
     * const groupMembership = await prisma.groupMembership.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GroupMembershipUpdateManyArgs>(args: SelectSubset<T, GroupMembershipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GroupMemberships and returns the data updated in the database.
     * @param {GroupMembershipUpdateManyAndReturnArgs} args - Arguments to update many GroupMemberships.
     * @example
     * // Update many GroupMemberships
     * const groupMembership = await prisma.groupMembership.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GroupMemberships and only return the `id`
     * const groupMembershipWithIdOnly = await prisma.groupMembership.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GroupMembershipUpdateManyAndReturnArgs>(args: SelectSubset<T, GroupMembershipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GroupMembershipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GroupMembership.
     * @param {GroupMembershipUpsertArgs} args - Arguments to update or create a GroupMembership.
     * @example
     * // Update or create a GroupMembership
     * const groupMembership = await prisma.groupMembership.upsert({
     *   create: {
     *     // ... data to create a GroupMembership
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GroupMembership we want to update
     *   }
     * })
     */
    upsert<T extends GroupMembershipUpsertArgs>(args: SelectSubset<T, GroupMembershipUpsertArgs<ExtArgs>>): Prisma__GroupMembershipClient<$Result.GetResult<Prisma.$GroupMembershipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GroupMemberships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMembershipCountArgs} args - Arguments to filter GroupMemberships to count.
     * @example
     * // Count the number of GroupMemberships
     * const count = await prisma.groupMembership.count({
     *   where: {
     *     // ... the filter for the GroupMemberships we want to count
     *   }
     * })
    **/
    count<T extends GroupMembershipCountArgs>(
      args?: Subset<T, GroupMembershipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GroupMembershipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GroupMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMembershipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GroupMembershipAggregateArgs>(args: Subset<T, GroupMembershipAggregateArgs>): Prisma.PrismaPromise<GetGroupMembershipAggregateType<T>>

    /**
     * Group by GroupMembership.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GroupMembershipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GroupMembershipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GroupMembershipGroupByArgs['orderBy'] }
        : { orderBy?: GroupMembershipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GroupMembershipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGroupMembershipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GroupMembership model
   */
  readonly fields: GroupMembershipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GroupMembership.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GroupMembershipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    userRel<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    groupRel<T extends GroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GroupDefaultArgs<ExtArgs>>): Prisma__GroupClient<$Result.GetResult<Prisma.$GroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GroupMembership model
   */
  interface GroupMembershipFieldRefs {
    readonly id: FieldRef<"GroupMembership", 'Int'>
    readonly user: FieldRef<"GroupMembership", 'String'>
    readonly group: FieldRef<"GroupMembership", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GroupMembership findUnique
   */
  export type GroupMembershipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMembership
     */
    select?: GroupMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMembership
     */
    omit?: GroupMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMembershipInclude<ExtArgs> | null
    /**
     * Filter, which GroupMembership to fetch.
     */
    where: GroupMembershipWhereUniqueInput
  }

  /**
   * GroupMembership findUniqueOrThrow
   */
  export type GroupMembershipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMembership
     */
    select?: GroupMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMembership
     */
    omit?: GroupMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMembershipInclude<ExtArgs> | null
    /**
     * Filter, which GroupMembership to fetch.
     */
    where: GroupMembershipWhereUniqueInput
  }

  /**
   * GroupMembership findFirst
   */
  export type GroupMembershipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMembership
     */
    select?: GroupMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMembership
     */
    omit?: GroupMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMembershipInclude<ExtArgs> | null
    /**
     * Filter, which GroupMembership to fetch.
     */
    where?: GroupMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMemberships to fetch.
     */
    orderBy?: GroupMembershipOrderByWithRelationInput | GroupMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupMemberships.
     */
    cursor?: GroupMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupMemberships.
     */
    distinct?: GroupMembershipScalarFieldEnum | GroupMembershipScalarFieldEnum[]
  }

  /**
   * GroupMembership findFirstOrThrow
   */
  export type GroupMembershipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMembership
     */
    select?: GroupMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMembership
     */
    omit?: GroupMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMembershipInclude<ExtArgs> | null
    /**
     * Filter, which GroupMembership to fetch.
     */
    where?: GroupMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMemberships to fetch.
     */
    orderBy?: GroupMembershipOrderByWithRelationInput | GroupMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GroupMemberships.
     */
    cursor?: GroupMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMemberships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GroupMemberships.
     */
    distinct?: GroupMembershipScalarFieldEnum | GroupMembershipScalarFieldEnum[]
  }

  /**
   * GroupMembership findMany
   */
  export type GroupMembershipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMembership
     */
    select?: GroupMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMembership
     */
    omit?: GroupMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMembershipInclude<ExtArgs> | null
    /**
     * Filter, which GroupMemberships to fetch.
     */
    where?: GroupMembershipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GroupMemberships to fetch.
     */
    orderBy?: GroupMembershipOrderByWithRelationInput | GroupMembershipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GroupMemberships.
     */
    cursor?: GroupMembershipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GroupMemberships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GroupMemberships.
     */
    skip?: number
    distinct?: GroupMembershipScalarFieldEnum | GroupMembershipScalarFieldEnum[]
  }

  /**
   * GroupMembership create
   */
  export type GroupMembershipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMembership
     */
    select?: GroupMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMembership
     */
    omit?: GroupMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMembershipInclude<ExtArgs> | null
    /**
     * The data needed to create a GroupMembership.
     */
    data: XOR<GroupMembershipCreateInput, GroupMembershipUncheckedCreateInput>
  }

  /**
   * GroupMembership createMany
   */
  export type GroupMembershipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GroupMemberships.
     */
    data: GroupMembershipCreateManyInput | GroupMembershipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GroupMembership createManyAndReturn
   */
  export type GroupMembershipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMembership
     */
    select?: GroupMembershipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMembership
     */
    omit?: GroupMembershipOmit<ExtArgs> | null
    /**
     * The data used to create many GroupMemberships.
     */
    data: GroupMembershipCreateManyInput | GroupMembershipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMembershipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupMembership update
   */
  export type GroupMembershipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMembership
     */
    select?: GroupMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMembership
     */
    omit?: GroupMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMembershipInclude<ExtArgs> | null
    /**
     * The data needed to update a GroupMembership.
     */
    data: XOR<GroupMembershipUpdateInput, GroupMembershipUncheckedUpdateInput>
    /**
     * Choose, which GroupMembership to update.
     */
    where: GroupMembershipWhereUniqueInput
  }

  /**
   * GroupMembership updateMany
   */
  export type GroupMembershipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GroupMemberships.
     */
    data: XOR<GroupMembershipUpdateManyMutationInput, GroupMembershipUncheckedUpdateManyInput>
    /**
     * Filter which GroupMemberships to update
     */
    where?: GroupMembershipWhereInput
    /**
     * Limit how many GroupMemberships to update.
     */
    limit?: number
  }

  /**
   * GroupMembership updateManyAndReturn
   */
  export type GroupMembershipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMembership
     */
    select?: GroupMembershipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMembership
     */
    omit?: GroupMembershipOmit<ExtArgs> | null
    /**
     * The data used to update GroupMemberships.
     */
    data: XOR<GroupMembershipUpdateManyMutationInput, GroupMembershipUncheckedUpdateManyInput>
    /**
     * Filter which GroupMemberships to update
     */
    where?: GroupMembershipWhereInput
    /**
     * Limit how many GroupMemberships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMembershipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GroupMembership upsert
   */
  export type GroupMembershipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMembership
     */
    select?: GroupMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMembership
     */
    omit?: GroupMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMembershipInclude<ExtArgs> | null
    /**
     * The filter to search for the GroupMembership to update in case it exists.
     */
    where: GroupMembershipWhereUniqueInput
    /**
     * In case the GroupMembership found by the `where` argument doesn't exist, create a new GroupMembership with this data.
     */
    create: XOR<GroupMembershipCreateInput, GroupMembershipUncheckedCreateInput>
    /**
     * In case the GroupMembership was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GroupMembershipUpdateInput, GroupMembershipUncheckedUpdateInput>
  }

  /**
   * GroupMembership delete
   */
  export type GroupMembershipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMembership
     */
    select?: GroupMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMembership
     */
    omit?: GroupMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMembershipInclude<ExtArgs> | null
    /**
     * Filter which GroupMembership to delete.
     */
    where: GroupMembershipWhereUniqueInput
  }

  /**
   * GroupMembership deleteMany
   */
  export type GroupMembershipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GroupMemberships to delete
     */
    where?: GroupMembershipWhereInput
    /**
     * Limit how many GroupMemberships to delete.
     */
    limit?: number
  }

  /**
   * GroupMembership without action
   */
  export type GroupMembershipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GroupMembership
     */
    select?: GroupMembershipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GroupMembership
     */
    omit?: GroupMembershipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GroupMembershipInclude<ExtArgs> | null
  }


  /**
   * Model OfflineMessages
   */

  export type AggregateOfflineMessages = {
    _count: OfflineMessagesCountAggregateOutputType | null
    _min: OfflineMessagesMinAggregateOutputType | null
    _max: OfflineMessagesMaxAggregateOutputType | null
  }

  export type OfflineMessagesMinAggregateOutputType = {
    username: string | null
    messageId: string | null
    partitionKey: string | null
    messageType: $Enums.MessageType | null
  }

  export type OfflineMessagesMaxAggregateOutputType = {
    username: string | null
    messageId: string | null
    partitionKey: string | null
    messageType: $Enums.MessageType | null
  }

  export type OfflineMessagesCountAggregateOutputType = {
    username: number
    messageId: number
    partitionKey: number
    messageType: number
    _all: number
  }


  export type OfflineMessagesMinAggregateInputType = {
    username?: true
    messageId?: true
    partitionKey?: true
    messageType?: true
  }

  export type OfflineMessagesMaxAggregateInputType = {
    username?: true
    messageId?: true
    partitionKey?: true
    messageType?: true
  }

  export type OfflineMessagesCountAggregateInputType = {
    username?: true
    messageId?: true
    partitionKey?: true
    messageType?: true
    _all?: true
  }

  export type OfflineMessagesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OfflineMessages to aggregate.
     */
    where?: OfflineMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfflineMessages to fetch.
     */
    orderBy?: OfflineMessagesOrderByWithRelationInput | OfflineMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OfflineMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfflineMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfflineMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OfflineMessages
    **/
    _count?: true | OfflineMessagesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfflineMessagesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfflineMessagesMaxAggregateInputType
  }

  export type GetOfflineMessagesAggregateType<T extends OfflineMessagesAggregateArgs> = {
        [P in keyof T & keyof AggregateOfflineMessages]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOfflineMessages[P]>
      : GetScalarType<T[P], AggregateOfflineMessages[P]>
  }




  export type OfflineMessagesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OfflineMessagesWhereInput
    orderBy?: OfflineMessagesOrderByWithAggregationInput | OfflineMessagesOrderByWithAggregationInput[]
    by: OfflineMessagesScalarFieldEnum[] | OfflineMessagesScalarFieldEnum
    having?: OfflineMessagesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfflineMessagesCountAggregateInputType | true
    _min?: OfflineMessagesMinAggregateInputType
    _max?: OfflineMessagesMaxAggregateInputType
  }

  export type OfflineMessagesGroupByOutputType = {
    username: string
    messageId: string
    partitionKey: string
    messageType: $Enums.MessageType
    _count: OfflineMessagesCountAggregateOutputType | null
    _min: OfflineMessagesMinAggregateOutputType | null
    _max: OfflineMessagesMaxAggregateOutputType | null
  }

  type GetOfflineMessagesGroupByPayload<T extends OfflineMessagesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OfflineMessagesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfflineMessagesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfflineMessagesGroupByOutputType[P]>
            : GetScalarType<T[P], OfflineMessagesGroupByOutputType[P]>
        }
      >
    >


  export type OfflineMessagesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    username?: boolean
    messageId?: boolean
    partitionKey?: boolean
    messageType?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["offlineMessages"]>

  export type OfflineMessagesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    username?: boolean
    messageId?: boolean
    partitionKey?: boolean
    messageType?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["offlineMessages"]>

  export type OfflineMessagesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    username?: boolean
    messageId?: boolean
    partitionKey?: boolean
    messageType?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["offlineMessages"]>

  export type OfflineMessagesSelectScalar = {
    username?: boolean
    messageId?: boolean
    partitionKey?: boolean
    messageType?: boolean
  }

  export type OfflineMessagesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"username" | "messageId" | "partitionKey" | "messageType", ExtArgs["result"]["offlineMessages"]>
  export type OfflineMessagesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OfflineMessagesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OfflineMessagesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OfflineMessagesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OfflineMessages"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      username: string
      messageId: string
      partitionKey: string
      messageType: $Enums.MessageType
    }, ExtArgs["result"]["offlineMessages"]>
    composites: {}
  }

  type OfflineMessagesGetPayload<S extends boolean | null | undefined | OfflineMessagesDefaultArgs> = $Result.GetResult<Prisma.$OfflineMessagesPayload, S>

  type OfflineMessagesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OfflineMessagesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OfflineMessagesCountAggregateInputType | true
    }

  export interface OfflineMessagesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OfflineMessages'], meta: { name: 'OfflineMessages' } }
    /**
     * Find zero or one OfflineMessages that matches the filter.
     * @param {OfflineMessagesFindUniqueArgs} args - Arguments to find a OfflineMessages
     * @example
     * // Get one OfflineMessages
     * const offlineMessages = await prisma.offlineMessages.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OfflineMessagesFindUniqueArgs>(args: SelectSubset<T, OfflineMessagesFindUniqueArgs<ExtArgs>>): Prisma__OfflineMessagesClient<$Result.GetResult<Prisma.$OfflineMessagesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OfflineMessages that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OfflineMessagesFindUniqueOrThrowArgs} args - Arguments to find a OfflineMessages
     * @example
     * // Get one OfflineMessages
     * const offlineMessages = await prisma.offlineMessages.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OfflineMessagesFindUniqueOrThrowArgs>(args: SelectSubset<T, OfflineMessagesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OfflineMessagesClient<$Result.GetResult<Prisma.$OfflineMessagesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OfflineMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfflineMessagesFindFirstArgs} args - Arguments to find a OfflineMessages
     * @example
     * // Get one OfflineMessages
     * const offlineMessages = await prisma.offlineMessages.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OfflineMessagesFindFirstArgs>(args?: SelectSubset<T, OfflineMessagesFindFirstArgs<ExtArgs>>): Prisma__OfflineMessagesClient<$Result.GetResult<Prisma.$OfflineMessagesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OfflineMessages that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfflineMessagesFindFirstOrThrowArgs} args - Arguments to find a OfflineMessages
     * @example
     * // Get one OfflineMessages
     * const offlineMessages = await prisma.offlineMessages.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OfflineMessagesFindFirstOrThrowArgs>(args?: SelectSubset<T, OfflineMessagesFindFirstOrThrowArgs<ExtArgs>>): Prisma__OfflineMessagesClient<$Result.GetResult<Prisma.$OfflineMessagesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OfflineMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfflineMessagesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OfflineMessages
     * const offlineMessages = await prisma.offlineMessages.findMany()
     * 
     * // Get first 10 OfflineMessages
     * const offlineMessages = await prisma.offlineMessages.findMany({ take: 10 })
     * 
     * // Only select the `username`
     * const offlineMessagesWithUsernameOnly = await prisma.offlineMessages.findMany({ select: { username: true } })
     * 
     */
    findMany<T extends OfflineMessagesFindManyArgs>(args?: SelectSubset<T, OfflineMessagesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfflineMessagesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OfflineMessages.
     * @param {OfflineMessagesCreateArgs} args - Arguments to create a OfflineMessages.
     * @example
     * // Create one OfflineMessages
     * const OfflineMessages = await prisma.offlineMessages.create({
     *   data: {
     *     // ... data to create a OfflineMessages
     *   }
     * })
     * 
     */
    create<T extends OfflineMessagesCreateArgs>(args: SelectSubset<T, OfflineMessagesCreateArgs<ExtArgs>>): Prisma__OfflineMessagesClient<$Result.GetResult<Prisma.$OfflineMessagesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OfflineMessages.
     * @param {OfflineMessagesCreateManyArgs} args - Arguments to create many OfflineMessages.
     * @example
     * // Create many OfflineMessages
     * const offlineMessages = await prisma.offlineMessages.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OfflineMessagesCreateManyArgs>(args?: SelectSubset<T, OfflineMessagesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OfflineMessages and returns the data saved in the database.
     * @param {OfflineMessagesCreateManyAndReturnArgs} args - Arguments to create many OfflineMessages.
     * @example
     * // Create many OfflineMessages
     * const offlineMessages = await prisma.offlineMessages.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OfflineMessages and only return the `username`
     * const offlineMessagesWithUsernameOnly = await prisma.offlineMessages.createManyAndReturn({
     *   select: { username: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OfflineMessagesCreateManyAndReturnArgs>(args?: SelectSubset<T, OfflineMessagesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfflineMessagesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OfflineMessages.
     * @param {OfflineMessagesDeleteArgs} args - Arguments to delete one OfflineMessages.
     * @example
     * // Delete one OfflineMessages
     * const OfflineMessages = await prisma.offlineMessages.delete({
     *   where: {
     *     // ... filter to delete one OfflineMessages
     *   }
     * })
     * 
     */
    delete<T extends OfflineMessagesDeleteArgs>(args: SelectSubset<T, OfflineMessagesDeleteArgs<ExtArgs>>): Prisma__OfflineMessagesClient<$Result.GetResult<Prisma.$OfflineMessagesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OfflineMessages.
     * @param {OfflineMessagesUpdateArgs} args - Arguments to update one OfflineMessages.
     * @example
     * // Update one OfflineMessages
     * const offlineMessages = await prisma.offlineMessages.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OfflineMessagesUpdateArgs>(args: SelectSubset<T, OfflineMessagesUpdateArgs<ExtArgs>>): Prisma__OfflineMessagesClient<$Result.GetResult<Prisma.$OfflineMessagesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OfflineMessages.
     * @param {OfflineMessagesDeleteManyArgs} args - Arguments to filter OfflineMessages to delete.
     * @example
     * // Delete a few OfflineMessages
     * const { count } = await prisma.offlineMessages.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OfflineMessagesDeleteManyArgs>(args?: SelectSubset<T, OfflineMessagesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OfflineMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfflineMessagesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OfflineMessages
     * const offlineMessages = await prisma.offlineMessages.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OfflineMessagesUpdateManyArgs>(args: SelectSubset<T, OfflineMessagesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OfflineMessages and returns the data updated in the database.
     * @param {OfflineMessagesUpdateManyAndReturnArgs} args - Arguments to update many OfflineMessages.
     * @example
     * // Update many OfflineMessages
     * const offlineMessages = await prisma.offlineMessages.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OfflineMessages and only return the `username`
     * const offlineMessagesWithUsernameOnly = await prisma.offlineMessages.updateManyAndReturn({
     *   select: { username: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OfflineMessagesUpdateManyAndReturnArgs>(args: SelectSubset<T, OfflineMessagesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OfflineMessagesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OfflineMessages.
     * @param {OfflineMessagesUpsertArgs} args - Arguments to update or create a OfflineMessages.
     * @example
     * // Update or create a OfflineMessages
     * const offlineMessages = await prisma.offlineMessages.upsert({
     *   create: {
     *     // ... data to create a OfflineMessages
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OfflineMessages we want to update
     *   }
     * })
     */
    upsert<T extends OfflineMessagesUpsertArgs>(args: SelectSubset<T, OfflineMessagesUpsertArgs<ExtArgs>>): Prisma__OfflineMessagesClient<$Result.GetResult<Prisma.$OfflineMessagesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OfflineMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfflineMessagesCountArgs} args - Arguments to filter OfflineMessages to count.
     * @example
     * // Count the number of OfflineMessages
     * const count = await prisma.offlineMessages.count({
     *   where: {
     *     // ... the filter for the OfflineMessages we want to count
     *   }
     * })
    **/
    count<T extends OfflineMessagesCountArgs>(
      args?: Subset<T, OfflineMessagesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfflineMessagesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OfflineMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfflineMessagesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OfflineMessagesAggregateArgs>(args: Subset<T, OfflineMessagesAggregateArgs>): Prisma.PrismaPromise<GetOfflineMessagesAggregateType<T>>

    /**
     * Group by OfflineMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfflineMessagesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OfflineMessagesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfflineMessagesGroupByArgs['orderBy'] }
        : { orderBy?: OfflineMessagesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OfflineMessagesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfflineMessagesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OfflineMessages model
   */
  readonly fields: OfflineMessagesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OfflineMessages.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OfflineMessagesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OfflineMessages model
   */
  interface OfflineMessagesFieldRefs {
    readonly username: FieldRef<"OfflineMessages", 'String'>
    readonly messageId: FieldRef<"OfflineMessages", 'String'>
    readonly partitionKey: FieldRef<"OfflineMessages", 'String'>
    readonly messageType: FieldRef<"OfflineMessages", 'MessageType'>
  }
    

  // Custom InputTypes
  /**
   * OfflineMessages findUnique
   */
  export type OfflineMessagesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineMessages
     */
    select?: OfflineMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineMessages
     */
    omit?: OfflineMessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfflineMessagesInclude<ExtArgs> | null
    /**
     * Filter, which OfflineMessages to fetch.
     */
    where: OfflineMessagesWhereUniqueInput
  }

  /**
   * OfflineMessages findUniqueOrThrow
   */
  export type OfflineMessagesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineMessages
     */
    select?: OfflineMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineMessages
     */
    omit?: OfflineMessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfflineMessagesInclude<ExtArgs> | null
    /**
     * Filter, which OfflineMessages to fetch.
     */
    where: OfflineMessagesWhereUniqueInput
  }

  /**
   * OfflineMessages findFirst
   */
  export type OfflineMessagesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineMessages
     */
    select?: OfflineMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineMessages
     */
    omit?: OfflineMessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfflineMessagesInclude<ExtArgs> | null
    /**
     * Filter, which OfflineMessages to fetch.
     */
    where?: OfflineMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfflineMessages to fetch.
     */
    orderBy?: OfflineMessagesOrderByWithRelationInput | OfflineMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfflineMessages.
     */
    cursor?: OfflineMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfflineMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfflineMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfflineMessages.
     */
    distinct?: OfflineMessagesScalarFieldEnum | OfflineMessagesScalarFieldEnum[]
  }

  /**
   * OfflineMessages findFirstOrThrow
   */
  export type OfflineMessagesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineMessages
     */
    select?: OfflineMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineMessages
     */
    omit?: OfflineMessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfflineMessagesInclude<ExtArgs> | null
    /**
     * Filter, which OfflineMessages to fetch.
     */
    where?: OfflineMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfflineMessages to fetch.
     */
    orderBy?: OfflineMessagesOrderByWithRelationInput | OfflineMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfflineMessages.
     */
    cursor?: OfflineMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfflineMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfflineMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfflineMessages.
     */
    distinct?: OfflineMessagesScalarFieldEnum | OfflineMessagesScalarFieldEnum[]
  }

  /**
   * OfflineMessages findMany
   */
  export type OfflineMessagesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineMessages
     */
    select?: OfflineMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineMessages
     */
    omit?: OfflineMessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfflineMessagesInclude<ExtArgs> | null
    /**
     * Filter, which OfflineMessages to fetch.
     */
    where?: OfflineMessagesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfflineMessages to fetch.
     */
    orderBy?: OfflineMessagesOrderByWithRelationInput | OfflineMessagesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OfflineMessages.
     */
    cursor?: OfflineMessagesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfflineMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfflineMessages.
     */
    skip?: number
    distinct?: OfflineMessagesScalarFieldEnum | OfflineMessagesScalarFieldEnum[]
  }

  /**
   * OfflineMessages create
   */
  export type OfflineMessagesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineMessages
     */
    select?: OfflineMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineMessages
     */
    omit?: OfflineMessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfflineMessagesInclude<ExtArgs> | null
    /**
     * The data needed to create a OfflineMessages.
     */
    data: XOR<OfflineMessagesCreateInput, OfflineMessagesUncheckedCreateInput>
  }

  /**
   * OfflineMessages createMany
   */
  export type OfflineMessagesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OfflineMessages.
     */
    data: OfflineMessagesCreateManyInput | OfflineMessagesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OfflineMessages createManyAndReturn
   */
  export type OfflineMessagesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineMessages
     */
    select?: OfflineMessagesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineMessages
     */
    omit?: OfflineMessagesOmit<ExtArgs> | null
    /**
     * The data used to create many OfflineMessages.
     */
    data: OfflineMessagesCreateManyInput | OfflineMessagesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfflineMessagesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OfflineMessages update
   */
  export type OfflineMessagesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineMessages
     */
    select?: OfflineMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineMessages
     */
    omit?: OfflineMessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfflineMessagesInclude<ExtArgs> | null
    /**
     * The data needed to update a OfflineMessages.
     */
    data: XOR<OfflineMessagesUpdateInput, OfflineMessagesUncheckedUpdateInput>
    /**
     * Choose, which OfflineMessages to update.
     */
    where: OfflineMessagesWhereUniqueInput
  }

  /**
   * OfflineMessages updateMany
   */
  export type OfflineMessagesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OfflineMessages.
     */
    data: XOR<OfflineMessagesUpdateManyMutationInput, OfflineMessagesUncheckedUpdateManyInput>
    /**
     * Filter which OfflineMessages to update
     */
    where?: OfflineMessagesWhereInput
    /**
     * Limit how many OfflineMessages to update.
     */
    limit?: number
  }

  /**
   * OfflineMessages updateManyAndReturn
   */
  export type OfflineMessagesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineMessages
     */
    select?: OfflineMessagesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineMessages
     */
    omit?: OfflineMessagesOmit<ExtArgs> | null
    /**
     * The data used to update OfflineMessages.
     */
    data: XOR<OfflineMessagesUpdateManyMutationInput, OfflineMessagesUncheckedUpdateManyInput>
    /**
     * Filter which OfflineMessages to update
     */
    where?: OfflineMessagesWhereInput
    /**
     * Limit how many OfflineMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfflineMessagesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OfflineMessages upsert
   */
  export type OfflineMessagesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineMessages
     */
    select?: OfflineMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineMessages
     */
    omit?: OfflineMessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfflineMessagesInclude<ExtArgs> | null
    /**
     * The filter to search for the OfflineMessages to update in case it exists.
     */
    where: OfflineMessagesWhereUniqueInput
    /**
     * In case the OfflineMessages found by the `where` argument doesn't exist, create a new OfflineMessages with this data.
     */
    create: XOR<OfflineMessagesCreateInput, OfflineMessagesUncheckedCreateInput>
    /**
     * In case the OfflineMessages was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OfflineMessagesUpdateInput, OfflineMessagesUncheckedUpdateInput>
  }

  /**
   * OfflineMessages delete
   */
  export type OfflineMessagesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineMessages
     */
    select?: OfflineMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineMessages
     */
    omit?: OfflineMessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfflineMessagesInclude<ExtArgs> | null
    /**
     * Filter which OfflineMessages to delete.
     */
    where: OfflineMessagesWhereUniqueInput
  }

  /**
   * OfflineMessages deleteMany
   */
  export type OfflineMessagesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OfflineMessages to delete
     */
    where?: OfflineMessagesWhereInput
    /**
     * Limit how many OfflineMessages to delete.
     */
    limit?: number
  }

  /**
   * OfflineMessages without action
   */
  export type OfflineMessagesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OfflineMessages
     */
    select?: OfflineMessagesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OfflineMessages
     */
    omit?: OfflineMessagesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OfflineMessagesInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    username: 'username',
    password: 'password'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FriendshipScalarFieldEnum: {
    chatId: 'chatId',
    user1: 'user1',
    user2: 'user2'
  };

  export type FriendshipScalarFieldEnum = (typeof FriendshipScalarFieldEnum)[keyof typeof FriendshipScalarFieldEnum]


  export const GroupScalarFieldEnum: {
    groupId: 'groupId',
    groupName: 'groupName',
    createdBy: 'createdBy'
  };

  export type GroupScalarFieldEnum = (typeof GroupScalarFieldEnum)[keyof typeof GroupScalarFieldEnum]


  export const GroupMembershipScalarFieldEnum: {
    id: 'id',
    user: 'user',
    group: 'group'
  };

  export type GroupMembershipScalarFieldEnum = (typeof GroupMembershipScalarFieldEnum)[keyof typeof GroupMembershipScalarFieldEnum]


  export const OfflineMessagesScalarFieldEnum: {
    username: 'username',
    messageId: 'messageId',
    partitionKey: 'partitionKey',
    messageType: 'messageType'
  };

  export type OfflineMessagesScalarFieldEnum = (typeof OfflineMessagesScalarFieldEnum)[keyof typeof OfflineMessagesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'MessageType'
   */
  export type EnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageType'>
    


  /**
   * Reference to a field of type 'MessageType[]'
   */
  export type ListEnumMessageTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MessageType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    friendships1?: FriendshipListRelationFilter
    friendships2?: FriendshipListRelationFilter
    groupMembership?: GroupMembershipListRelationFilter
    createdGroups?: GroupListRelationFilter
    OfflineMessages?: OfflineMessagesListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    username?: SortOrder
    password?: SortOrder
    friendships1?: FriendshipOrderByRelationAggregateInput
    friendships2?: FriendshipOrderByRelationAggregateInput
    groupMembership?: GroupMembershipOrderByRelationAggregateInput
    createdGroups?: GroupOrderByRelationAggregateInput
    OfflineMessages?: OfflineMessagesOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    friendships1?: FriendshipListRelationFilter
    friendships2?: FriendshipListRelationFilter
    groupMembership?: GroupMembershipListRelationFilter
    createdGroups?: GroupListRelationFilter
    OfflineMessages?: OfflineMessagesListRelationFilter
  }, "username">

  export type UserOrderByWithAggregationInput = {
    username?: SortOrder
    password?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
  }

  export type FriendshipWhereInput = {
    AND?: FriendshipWhereInput | FriendshipWhereInput[]
    OR?: FriendshipWhereInput[]
    NOT?: FriendshipWhereInput | FriendshipWhereInput[]
    chatId?: StringFilter<"Friendship"> | string
    user1?: StringFilter<"Friendship"> | string
    user2?: StringFilter<"Friendship"> | string
    user1Rel?: XOR<UserScalarRelationFilter, UserWhereInput>
    user2Rel?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FriendshipOrderByWithRelationInput = {
    chatId?: SortOrder
    user1?: SortOrder
    user2?: SortOrder
    user1Rel?: UserOrderByWithRelationInput
    user2Rel?: UserOrderByWithRelationInput
  }

  export type FriendshipWhereUniqueInput = Prisma.AtLeast<{
    chatId?: string
    user1_user2?: FriendshipUser1User2CompoundUniqueInput
    AND?: FriendshipWhereInput | FriendshipWhereInput[]
    OR?: FriendshipWhereInput[]
    NOT?: FriendshipWhereInput | FriendshipWhereInput[]
    user1?: StringFilter<"Friendship"> | string
    user2?: StringFilter<"Friendship"> | string
    user1Rel?: XOR<UserScalarRelationFilter, UserWhereInput>
    user2Rel?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "chatId" | "user1_user2">

  export type FriendshipOrderByWithAggregationInput = {
    chatId?: SortOrder
    user1?: SortOrder
    user2?: SortOrder
    _count?: FriendshipCountOrderByAggregateInput
    _max?: FriendshipMaxOrderByAggregateInput
    _min?: FriendshipMinOrderByAggregateInput
  }

  export type FriendshipScalarWhereWithAggregatesInput = {
    AND?: FriendshipScalarWhereWithAggregatesInput | FriendshipScalarWhereWithAggregatesInput[]
    OR?: FriendshipScalarWhereWithAggregatesInput[]
    NOT?: FriendshipScalarWhereWithAggregatesInput | FriendshipScalarWhereWithAggregatesInput[]
    chatId?: StringWithAggregatesFilter<"Friendship"> | string
    user1?: StringWithAggregatesFilter<"Friendship"> | string
    user2?: StringWithAggregatesFilter<"Friendship"> | string
  }

  export type GroupWhereInput = {
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    groupId?: StringFilter<"Group"> | string
    groupName?: StringFilter<"Group"> | string
    createdBy?: StringFilter<"Group"> | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: GroupMembershipListRelationFilter
  }

  export type GroupOrderByWithRelationInput = {
    groupId?: SortOrder
    groupName?: SortOrder
    createdBy?: SortOrder
    creator?: UserOrderByWithRelationInput
    members?: GroupMembershipOrderByRelationAggregateInput
  }

  export type GroupWhereUniqueInput = Prisma.AtLeast<{
    groupId?: string
    AND?: GroupWhereInput | GroupWhereInput[]
    OR?: GroupWhereInput[]
    NOT?: GroupWhereInput | GroupWhereInput[]
    groupName?: StringFilter<"Group"> | string
    createdBy?: StringFilter<"Group"> | string
    creator?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: GroupMembershipListRelationFilter
  }, "groupId">

  export type GroupOrderByWithAggregationInput = {
    groupId?: SortOrder
    groupName?: SortOrder
    createdBy?: SortOrder
    _count?: GroupCountOrderByAggregateInput
    _max?: GroupMaxOrderByAggregateInput
    _min?: GroupMinOrderByAggregateInput
  }

  export type GroupScalarWhereWithAggregatesInput = {
    AND?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    OR?: GroupScalarWhereWithAggregatesInput[]
    NOT?: GroupScalarWhereWithAggregatesInput | GroupScalarWhereWithAggregatesInput[]
    groupId?: StringWithAggregatesFilter<"Group"> | string
    groupName?: StringWithAggregatesFilter<"Group"> | string
    createdBy?: StringWithAggregatesFilter<"Group"> | string
  }

  export type GroupMembershipWhereInput = {
    AND?: GroupMembershipWhereInput | GroupMembershipWhereInput[]
    OR?: GroupMembershipWhereInput[]
    NOT?: GroupMembershipWhereInput | GroupMembershipWhereInput[]
    id?: IntFilter<"GroupMembership"> | number
    user?: StringFilter<"GroupMembership"> | string
    group?: StringFilter<"GroupMembership"> | string
    userRel?: XOR<UserScalarRelationFilter, UserWhereInput>
    groupRel?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }

  export type GroupMembershipOrderByWithRelationInput = {
    id?: SortOrder
    user?: SortOrder
    group?: SortOrder
    userRel?: UserOrderByWithRelationInput
    groupRel?: GroupOrderByWithRelationInput
  }

  export type GroupMembershipWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    user_group?: GroupMembershipUserGroupCompoundUniqueInput
    AND?: GroupMembershipWhereInput | GroupMembershipWhereInput[]
    OR?: GroupMembershipWhereInput[]
    NOT?: GroupMembershipWhereInput | GroupMembershipWhereInput[]
    user?: StringFilter<"GroupMembership"> | string
    group?: StringFilter<"GroupMembership"> | string
    userRel?: XOR<UserScalarRelationFilter, UserWhereInput>
    groupRel?: XOR<GroupScalarRelationFilter, GroupWhereInput>
  }, "id" | "user_group">

  export type GroupMembershipOrderByWithAggregationInput = {
    id?: SortOrder
    user?: SortOrder
    group?: SortOrder
    _count?: GroupMembershipCountOrderByAggregateInput
    _avg?: GroupMembershipAvgOrderByAggregateInput
    _max?: GroupMembershipMaxOrderByAggregateInput
    _min?: GroupMembershipMinOrderByAggregateInput
    _sum?: GroupMembershipSumOrderByAggregateInput
  }

  export type GroupMembershipScalarWhereWithAggregatesInput = {
    AND?: GroupMembershipScalarWhereWithAggregatesInput | GroupMembershipScalarWhereWithAggregatesInput[]
    OR?: GroupMembershipScalarWhereWithAggregatesInput[]
    NOT?: GroupMembershipScalarWhereWithAggregatesInput | GroupMembershipScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GroupMembership"> | number
    user?: StringWithAggregatesFilter<"GroupMembership"> | string
    group?: StringWithAggregatesFilter<"GroupMembership"> | string
  }

  export type OfflineMessagesWhereInput = {
    AND?: OfflineMessagesWhereInput | OfflineMessagesWhereInput[]
    OR?: OfflineMessagesWhereInput[]
    NOT?: OfflineMessagesWhereInput | OfflineMessagesWhereInput[]
    username?: StringFilter<"OfflineMessages"> | string
    messageId?: StringFilter<"OfflineMessages"> | string
    partitionKey?: StringFilter<"OfflineMessages"> | string
    messageType?: EnumMessageTypeFilter<"OfflineMessages"> | $Enums.MessageType
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OfflineMessagesOrderByWithRelationInput = {
    username?: SortOrder
    messageId?: SortOrder
    partitionKey?: SortOrder
    messageType?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type OfflineMessagesWhereUniqueInput = Prisma.AtLeast<{
    username_messageId?: OfflineMessagesUsernameMessageIdCompoundUniqueInput
    AND?: OfflineMessagesWhereInput | OfflineMessagesWhereInput[]
    OR?: OfflineMessagesWhereInput[]
    NOT?: OfflineMessagesWhereInput | OfflineMessagesWhereInput[]
    username?: StringFilter<"OfflineMessages"> | string
    messageId?: StringFilter<"OfflineMessages"> | string
    partitionKey?: StringFilter<"OfflineMessages"> | string
    messageType?: EnumMessageTypeFilter<"OfflineMessages"> | $Enums.MessageType
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "username_messageId">

  export type OfflineMessagesOrderByWithAggregationInput = {
    username?: SortOrder
    messageId?: SortOrder
    partitionKey?: SortOrder
    messageType?: SortOrder
    _count?: OfflineMessagesCountOrderByAggregateInput
    _max?: OfflineMessagesMaxOrderByAggregateInput
    _min?: OfflineMessagesMinOrderByAggregateInput
  }

  export type OfflineMessagesScalarWhereWithAggregatesInput = {
    AND?: OfflineMessagesScalarWhereWithAggregatesInput | OfflineMessagesScalarWhereWithAggregatesInput[]
    OR?: OfflineMessagesScalarWhereWithAggregatesInput[]
    NOT?: OfflineMessagesScalarWhereWithAggregatesInput | OfflineMessagesScalarWhereWithAggregatesInput[]
    username?: StringWithAggregatesFilter<"OfflineMessages"> | string
    messageId?: StringWithAggregatesFilter<"OfflineMessages"> | string
    partitionKey?: StringWithAggregatesFilter<"OfflineMessages"> | string
    messageType?: EnumMessageTypeWithAggregatesFilter<"OfflineMessages"> | $Enums.MessageType
  }

  export type UserCreateInput = {
    username: string
    password: string
    friendships1?: FriendshipCreateNestedManyWithoutUser1RelInput
    friendships2?: FriendshipCreateNestedManyWithoutUser2RelInput
    groupMembership?: GroupMembershipCreateNestedManyWithoutUserRelInput
    createdGroups?: GroupCreateNestedManyWithoutCreatorInput
    OfflineMessages?: OfflineMessagesCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    username: string
    password: string
    friendships1?: FriendshipUncheckedCreateNestedManyWithoutUser1RelInput
    friendships2?: FriendshipUncheckedCreateNestedManyWithoutUser2RelInput
    groupMembership?: GroupMembershipUncheckedCreateNestedManyWithoutUserRelInput
    createdGroups?: GroupUncheckedCreateNestedManyWithoutCreatorInput
    OfflineMessages?: OfflineMessagesUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    friendships1?: FriendshipUpdateManyWithoutUser1RelNestedInput
    friendships2?: FriendshipUpdateManyWithoutUser2RelNestedInput
    groupMembership?: GroupMembershipUpdateManyWithoutUserRelNestedInput
    createdGroups?: GroupUpdateManyWithoutCreatorNestedInput
    OfflineMessages?: OfflineMessagesUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    friendships1?: FriendshipUncheckedUpdateManyWithoutUser1RelNestedInput
    friendships2?: FriendshipUncheckedUpdateManyWithoutUser2RelNestedInput
    groupMembership?: GroupMembershipUncheckedUpdateManyWithoutUserRelNestedInput
    createdGroups?: GroupUncheckedUpdateManyWithoutCreatorNestedInput
    OfflineMessages?: OfflineMessagesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    username: string
    password: string
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type FriendshipCreateInput = {
    chatId: string
    user1Rel: UserCreateNestedOneWithoutFriendships1Input
    user2Rel: UserCreateNestedOneWithoutFriendships2Input
  }

  export type FriendshipUncheckedCreateInput = {
    chatId: string
    user1: string
    user2: string
  }

  export type FriendshipUpdateInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    user1Rel?: UserUpdateOneRequiredWithoutFriendships1NestedInput
    user2Rel?: UserUpdateOneRequiredWithoutFriendships2NestedInput
  }

  export type FriendshipUncheckedUpdateInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    user1?: StringFieldUpdateOperationsInput | string
    user2?: StringFieldUpdateOperationsInput | string
  }

  export type FriendshipCreateManyInput = {
    chatId: string
    user1: string
    user2: string
  }

  export type FriendshipUpdateManyMutationInput = {
    chatId?: StringFieldUpdateOperationsInput | string
  }

  export type FriendshipUncheckedUpdateManyInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    user1?: StringFieldUpdateOperationsInput | string
    user2?: StringFieldUpdateOperationsInput | string
  }

  export type GroupCreateInput = {
    groupId: string
    groupName: string
    creator: UserCreateNestedOneWithoutCreatedGroupsInput
    members?: GroupMembershipCreateNestedManyWithoutGroupRelInput
  }

  export type GroupUncheckedCreateInput = {
    groupId: string
    groupName: string
    createdBy: string
    members?: GroupMembershipUncheckedCreateNestedManyWithoutGroupRelInput
  }

  export type GroupUpdateInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    creator?: UserUpdateOneRequiredWithoutCreatedGroupsNestedInput
    members?: GroupMembershipUpdateManyWithoutGroupRelNestedInput
  }

  export type GroupUncheckedUpdateInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
    members?: GroupMembershipUncheckedUpdateManyWithoutGroupRelNestedInput
  }

  export type GroupCreateManyInput = {
    groupId: string
    groupName: string
    createdBy: string
  }

  export type GroupUpdateManyMutationInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
  }

  export type GroupUncheckedUpdateManyInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type GroupMembershipCreateInput = {
    userRel: UserCreateNestedOneWithoutGroupMembershipInput
    groupRel: GroupCreateNestedOneWithoutMembersInput
  }

  export type GroupMembershipUncheckedCreateInput = {
    id?: number
    user: string
    group: string
  }

  export type GroupMembershipUpdateInput = {
    userRel?: UserUpdateOneRequiredWithoutGroupMembershipNestedInput
    groupRel?: GroupUpdateOneRequiredWithoutMembersNestedInput
  }

  export type GroupMembershipUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    group?: StringFieldUpdateOperationsInput | string
  }

  export type GroupMembershipCreateManyInput = {
    id?: number
    user: string
    group: string
  }

  export type GroupMembershipUpdateManyMutationInput = {

  }

  export type GroupMembershipUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
    group?: StringFieldUpdateOperationsInput | string
  }

  export type OfflineMessagesCreateInput = {
    messageId: string
    partitionKey: string
    messageType: $Enums.MessageType
    user: UserCreateNestedOneWithoutOfflineMessagesInput
  }

  export type OfflineMessagesUncheckedCreateInput = {
    username: string
    messageId: string
    partitionKey: string
    messageType: $Enums.MessageType
  }

  export type OfflineMessagesUpdateInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    partitionKey?: StringFieldUpdateOperationsInput | string
    messageType?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
    user?: UserUpdateOneRequiredWithoutOfflineMessagesNestedInput
  }

  export type OfflineMessagesUncheckedUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    partitionKey?: StringFieldUpdateOperationsInput | string
    messageType?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
  }

  export type OfflineMessagesCreateManyInput = {
    username: string
    messageId: string
    partitionKey: string
    messageType: $Enums.MessageType
  }

  export type OfflineMessagesUpdateManyMutationInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    partitionKey?: StringFieldUpdateOperationsInput | string
    messageType?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
  }

  export type OfflineMessagesUncheckedUpdateManyInput = {
    username?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    partitionKey?: StringFieldUpdateOperationsInput | string
    messageType?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FriendshipListRelationFilter = {
    every?: FriendshipWhereInput
    some?: FriendshipWhereInput
    none?: FriendshipWhereInput
  }

  export type GroupMembershipListRelationFilter = {
    every?: GroupMembershipWhereInput
    some?: GroupMembershipWhereInput
    none?: GroupMembershipWhereInput
  }

  export type GroupListRelationFilter = {
    every?: GroupWhereInput
    some?: GroupWhereInput
    none?: GroupWhereInput
  }

  export type OfflineMessagesListRelationFilter = {
    every?: OfflineMessagesWhereInput
    some?: OfflineMessagesWhereInput
    none?: OfflineMessagesWhereInput
  }

  export type FriendshipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupMembershipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OfflineMessagesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    username?: SortOrder
    password?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    username?: SortOrder
    password?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    username?: SortOrder
    password?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type FriendshipUser1User2CompoundUniqueInput = {
    user1: string
    user2: string
  }

  export type FriendshipCountOrderByAggregateInput = {
    chatId?: SortOrder
    user1?: SortOrder
    user2?: SortOrder
  }

  export type FriendshipMaxOrderByAggregateInput = {
    chatId?: SortOrder
    user1?: SortOrder
    user2?: SortOrder
  }

  export type FriendshipMinOrderByAggregateInput = {
    chatId?: SortOrder
    user1?: SortOrder
    user2?: SortOrder
  }

  export type GroupCountOrderByAggregateInput = {
    groupId?: SortOrder
    groupName?: SortOrder
    createdBy?: SortOrder
  }

  export type GroupMaxOrderByAggregateInput = {
    groupId?: SortOrder
    groupName?: SortOrder
    createdBy?: SortOrder
  }

  export type GroupMinOrderByAggregateInput = {
    groupId?: SortOrder
    groupName?: SortOrder
    createdBy?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type GroupScalarRelationFilter = {
    is?: GroupWhereInput
    isNot?: GroupWhereInput
  }

  export type GroupMembershipUserGroupCompoundUniqueInput = {
    user: string
    group: string
  }

  export type GroupMembershipCountOrderByAggregateInput = {
    id?: SortOrder
    user?: SortOrder
    group?: SortOrder
  }

  export type GroupMembershipAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GroupMembershipMaxOrderByAggregateInput = {
    id?: SortOrder
    user?: SortOrder
    group?: SortOrder
  }

  export type GroupMembershipMinOrderByAggregateInput = {
    id?: SortOrder
    user?: SortOrder
    group?: SortOrder
  }

  export type GroupMembershipSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType
  }

  export type OfflineMessagesUsernameMessageIdCompoundUniqueInput = {
    username: string
    messageId: string
  }

  export type OfflineMessagesCountOrderByAggregateInput = {
    username?: SortOrder
    messageId?: SortOrder
    partitionKey?: SortOrder
    messageType?: SortOrder
  }

  export type OfflineMessagesMaxOrderByAggregateInput = {
    username?: SortOrder
    messageId?: SortOrder
    partitionKey?: SortOrder
    messageType?: SortOrder
  }

  export type OfflineMessagesMinOrderByAggregateInput = {
    username?: SortOrder
    messageId?: SortOrder
    partitionKey?: SortOrder
    messageType?: SortOrder
  }

  export type EnumMessageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel> | $Enums.MessageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageTypeFilter<$PrismaModel>
    _max?: NestedEnumMessageTypeFilter<$PrismaModel>
  }

  export type FriendshipCreateNestedManyWithoutUser1RelInput = {
    create?: XOR<FriendshipCreateWithoutUser1RelInput, FriendshipUncheckedCreateWithoutUser1RelInput> | FriendshipCreateWithoutUser1RelInput[] | FriendshipUncheckedCreateWithoutUser1RelInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser1RelInput | FriendshipCreateOrConnectWithoutUser1RelInput[]
    createMany?: FriendshipCreateManyUser1RelInputEnvelope
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
  }

  export type FriendshipCreateNestedManyWithoutUser2RelInput = {
    create?: XOR<FriendshipCreateWithoutUser2RelInput, FriendshipUncheckedCreateWithoutUser2RelInput> | FriendshipCreateWithoutUser2RelInput[] | FriendshipUncheckedCreateWithoutUser2RelInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser2RelInput | FriendshipCreateOrConnectWithoutUser2RelInput[]
    createMany?: FriendshipCreateManyUser2RelInputEnvelope
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
  }

  export type GroupMembershipCreateNestedManyWithoutUserRelInput = {
    create?: XOR<GroupMembershipCreateWithoutUserRelInput, GroupMembershipUncheckedCreateWithoutUserRelInput> | GroupMembershipCreateWithoutUserRelInput[] | GroupMembershipUncheckedCreateWithoutUserRelInput[]
    connectOrCreate?: GroupMembershipCreateOrConnectWithoutUserRelInput | GroupMembershipCreateOrConnectWithoutUserRelInput[]
    createMany?: GroupMembershipCreateManyUserRelInputEnvelope
    connect?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
  }

  export type GroupCreateNestedManyWithoutCreatorInput = {
    create?: XOR<GroupCreateWithoutCreatorInput, GroupUncheckedCreateWithoutCreatorInput> | GroupCreateWithoutCreatorInput[] | GroupUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutCreatorInput | GroupCreateOrConnectWithoutCreatorInput[]
    createMany?: GroupCreateManyCreatorInputEnvelope
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
  }

  export type OfflineMessagesCreateNestedManyWithoutUserInput = {
    create?: XOR<OfflineMessagesCreateWithoutUserInput, OfflineMessagesUncheckedCreateWithoutUserInput> | OfflineMessagesCreateWithoutUserInput[] | OfflineMessagesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OfflineMessagesCreateOrConnectWithoutUserInput | OfflineMessagesCreateOrConnectWithoutUserInput[]
    createMany?: OfflineMessagesCreateManyUserInputEnvelope
    connect?: OfflineMessagesWhereUniqueInput | OfflineMessagesWhereUniqueInput[]
  }

  export type FriendshipUncheckedCreateNestedManyWithoutUser1RelInput = {
    create?: XOR<FriendshipCreateWithoutUser1RelInput, FriendshipUncheckedCreateWithoutUser1RelInput> | FriendshipCreateWithoutUser1RelInput[] | FriendshipUncheckedCreateWithoutUser1RelInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser1RelInput | FriendshipCreateOrConnectWithoutUser1RelInput[]
    createMany?: FriendshipCreateManyUser1RelInputEnvelope
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
  }

  export type FriendshipUncheckedCreateNestedManyWithoutUser2RelInput = {
    create?: XOR<FriendshipCreateWithoutUser2RelInput, FriendshipUncheckedCreateWithoutUser2RelInput> | FriendshipCreateWithoutUser2RelInput[] | FriendshipUncheckedCreateWithoutUser2RelInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser2RelInput | FriendshipCreateOrConnectWithoutUser2RelInput[]
    createMany?: FriendshipCreateManyUser2RelInputEnvelope
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
  }

  export type GroupMembershipUncheckedCreateNestedManyWithoutUserRelInput = {
    create?: XOR<GroupMembershipCreateWithoutUserRelInput, GroupMembershipUncheckedCreateWithoutUserRelInput> | GroupMembershipCreateWithoutUserRelInput[] | GroupMembershipUncheckedCreateWithoutUserRelInput[]
    connectOrCreate?: GroupMembershipCreateOrConnectWithoutUserRelInput | GroupMembershipCreateOrConnectWithoutUserRelInput[]
    createMany?: GroupMembershipCreateManyUserRelInputEnvelope
    connect?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
  }

  export type GroupUncheckedCreateNestedManyWithoutCreatorInput = {
    create?: XOR<GroupCreateWithoutCreatorInput, GroupUncheckedCreateWithoutCreatorInput> | GroupCreateWithoutCreatorInput[] | GroupUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutCreatorInput | GroupCreateOrConnectWithoutCreatorInput[]
    createMany?: GroupCreateManyCreatorInputEnvelope
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
  }

  export type OfflineMessagesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OfflineMessagesCreateWithoutUserInput, OfflineMessagesUncheckedCreateWithoutUserInput> | OfflineMessagesCreateWithoutUserInput[] | OfflineMessagesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OfflineMessagesCreateOrConnectWithoutUserInput | OfflineMessagesCreateOrConnectWithoutUserInput[]
    createMany?: OfflineMessagesCreateManyUserInputEnvelope
    connect?: OfflineMessagesWhereUniqueInput | OfflineMessagesWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FriendshipUpdateManyWithoutUser1RelNestedInput = {
    create?: XOR<FriendshipCreateWithoutUser1RelInput, FriendshipUncheckedCreateWithoutUser1RelInput> | FriendshipCreateWithoutUser1RelInput[] | FriendshipUncheckedCreateWithoutUser1RelInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser1RelInput | FriendshipCreateOrConnectWithoutUser1RelInput[]
    upsert?: FriendshipUpsertWithWhereUniqueWithoutUser1RelInput | FriendshipUpsertWithWhereUniqueWithoutUser1RelInput[]
    createMany?: FriendshipCreateManyUser1RelInputEnvelope
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    update?: FriendshipUpdateWithWhereUniqueWithoutUser1RelInput | FriendshipUpdateWithWhereUniqueWithoutUser1RelInput[]
    updateMany?: FriendshipUpdateManyWithWhereWithoutUser1RelInput | FriendshipUpdateManyWithWhereWithoutUser1RelInput[]
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
  }

  export type FriendshipUpdateManyWithoutUser2RelNestedInput = {
    create?: XOR<FriendshipCreateWithoutUser2RelInput, FriendshipUncheckedCreateWithoutUser2RelInput> | FriendshipCreateWithoutUser2RelInput[] | FriendshipUncheckedCreateWithoutUser2RelInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser2RelInput | FriendshipCreateOrConnectWithoutUser2RelInput[]
    upsert?: FriendshipUpsertWithWhereUniqueWithoutUser2RelInput | FriendshipUpsertWithWhereUniqueWithoutUser2RelInput[]
    createMany?: FriendshipCreateManyUser2RelInputEnvelope
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    update?: FriendshipUpdateWithWhereUniqueWithoutUser2RelInput | FriendshipUpdateWithWhereUniqueWithoutUser2RelInput[]
    updateMany?: FriendshipUpdateManyWithWhereWithoutUser2RelInput | FriendshipUpdateManyWithWhereWithoutUser2RelInput[]
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
  }

  export type GroupMembershipUpdateManyWithoutUserRelNestedInput = {
    create?: XOR<GroupMembershipCreateWithoutUserRelInput, GroupMembershipUncheckedCreateWithoutUserRelInput> | GroupMembershipCreateWithoutUserRelInput[] | GroupMembershipUncheckedCreateWithoutUserRelInput[]
    connectOrCreate?: GroupMembershipCreateOrConnectWithoutUserRelInput | GroupMembershipCreateOrConnectWithoutUserRelInput[]
    upsert?: GroupMembershipUpsertWithWhereUniqueWithoutUserRelInput | GroupMembershipUpsertWithWhereUniqueWithoutUserRelInput[]
    createMany?: GroupMembershipCreateManyUserRelInputEnvelope
    set?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    disconnect?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    delete?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    connect?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    update?: GroupMembershipUpdateWithWhereUniqueWithoutUserRelInput | GroupMembershipUpdateWithWhereUniqueWithoutUserRelInput[]
    updateMany?: GroupMembershipUpdateManyWithWhereWithoutUserRelInput | GroupMembershipUpdateManyWithWhereWithoutUserRelInput[]
    deleteMany?: GroupMembershipScalarWhereInput | GroupMembershipScalarWhereInput[]
  }

  export type GroupUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<GroupCreateWithoutCreatorInput, GroupUncheckedCreateWithoutCreatorInput> | GroupCreateWithoutCreatorInput[] | GroupUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutCreatorInput | GroupCreateOrConnectWithoutCreatorInput[]
    upsert?: GroupUpsertWithWhereUniqueWithoutCreatorInput | GroupUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: GroupCreateManyCreatorInputEnvelope
    set?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    disconnect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    delete?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    update?: GroupUpdateWithWhereUniqueWithoutCreatorInput | GroupUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: GroupUpdateManyWithWhereWithoutCreatorInput | GroupUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: GroupScalarWhereInput | GroupScalarWhereInput[]
  }

  export type OfflineMessagesUpdateManyWithoutUserNestedInput = {
    create?: XOR<OfflineMessagesCreateWithoutUserInput, OfflineMessagesUncheckedCreateWithoutUserInput> | OfflineMessagesCreateWithoutUserInput[] | OfflineMessagesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OfflineMessagesCreateOrConnectWithoutUserInput | OfflineMessagesCreateOrConnectWithoutUserInput[]
    upsert?: OfflineMessagesUpsertWithWhereUniqueWithoutUserInput | OfflineMessagesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OfflineMessagesCreateManyUserInputEnvelope
    set?: OfflineMessagesWhereUniqueInput | OfflineMessagesWhereUniqueInput[]
    disconnect?: OfflineMessagesWhereUniqueInput | OfflineMessagesWhereUniqueInput[]
    delete?: OfflineMessagesWhereUniqueInput | OfflineMessagesWhereUniqueInput[]
    connect?: OfflineMessagesWhereUniqueInput | OfflineMessagesWhereUniqueInput[]
    update?: OfflineMessagesUpdateWithWhereUniqueWithoutUserInput | OfflineMessagesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OfflineMessagesUpdateManyWithWhereWithoutUserInput | OfflineMessagesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OfflineMessagesScalarWhereInput | OfflineMessagesScalarWhereInput[]
  }

  export type FriendshipUncheckedUpdateManyWithoutUser1RelNestedInput = {
    create?: XOR<FriendshipCreateWithoutUser1RelInput, FriendshipUncheckedCreateWithoutUser1RelInput> | FriendshipCreateWithoutUser1RelInput[] | FriendshipUncheckedCreateWithoutUser1RelInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser1RelInput | FriendshipCreateOrConnectWithoutUser1RelInput[]
    upsert?: FriendshipUpsertWithWhereUniqueWithoutUser1RelInput | FriendshipUpsertWithWhereUniqueWithoutUser1RelInput[]
    createMany?: FriendshipCreateManyUser1RelInputEnvelope
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    update?: FriendshipUpdateWithWhereUniqueWithoutUser1RelInput | FriendshipUpdateWithWhereUniqueWithoutUser1RelInput[]
    updateMany?: FriendshipUpdateManyWithWhereWithoutUser1RelInput | FriendshipUpdateManyWithWhereWithoutUser1RelInput[]
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
  }

  export type FriendshipUncheckedUpdateManyWithoutUser2RelNestedInput = {
    create?: XOR<FriendshipCreateWithoutUser2RelInput, FriendshipUncheckedCreateWithoutUser2RelInput> | FriendshipCreateWithoutUser2RelInput[] | FriendshipUncheckedCreateWithoutUser2RelInput[]
    connectOrCreate?: FriendshipCreateOrConnectWithoutUser2RelInput | FriendshipCreateOrConnectWithoutUser2RelInput[]
    upsert?: FriendshipUpsertWithWhereUniqueWithoutUser2RelInput | FriendshipUpsertWithWhereUniqueWithoutUser2RelInput[]
    createMany?: FriendshipCreateManyUser2RelInputEnvelope
    set?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    disconnect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    delete?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    connect?: FriendshipWhereUniqueInput | FriendshipWhereUniqueInput[]
    update?: FriendshipUpdateWithWhereUniqueWithoutUser2RelInput | FriendshipUpdateWithWhereUniqueWithoutUser2RelInput[]
    updateMany?: FriendshipUpdateManyWithWhereWithoutUser2RelInput | FriendshipUpdateManyWithWhereWithoutUser2RelInput[]
    deleteMany?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
  }

  export type GroupMembershipUncheckedUpdateManyWithoutUserRelNestedInput = {
    create?: XOR<GroupMembershipCreateWithoutUserRelInput, GroupMembershipUncheckedCreateWithoutUserRelInput> | GroupMembershipCreateWithoutUserRelInput[] | GroupMembershipUncheckedCreateWithoutUserRelInput[]
    connectOrCreate?: GroupMembershipCreateOrConnectWithoutUserRelInput | GroupMembershipCreateOrConnectWithoutUserRelInput[]
    upsert?: GroupMembershipUpsertWithWhereUniqueWithoutUserRelInput | GroupMembershipUpsertWithWhereUniqueWithoutUserRelInput[]
    createMany?: GroupMembershipCreateManyUserRelInputEnvelope
    set?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    disconnect?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    delete?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    connect?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    update?: GroupMembershipUpdateWithWhereUniqueWithoutUserRelInput | GroupMembershipUpdateWithWhereUniqueWithoutUserRelInput[]
    updateMany?: GroupMembershipUpdateManyWithWhereWithoutUserRelInput | GroupMembershipUpdateManyWithWhereWithoutUserRelInput[]
    deleteMany?: GroupMembershipScalarWhereInput | GroupMembershipScalarWhereInput[]
  }

  export type GroupUncheckedUpdateManyWithoutCreatorNestedInput = {
    create?: XOR<GroupCreateWithoutCreatorInput, GroupUncheckedCreateWithoutCreatorInput> | GroupCreateWithoutCreatorInput[] | GroupUncheckedCreateWithoutCreatorInput[]
    connectOrCreate?: GroupCreateOrConnectWithoutCreatorInput | GroupCreateOrConnectWithoutCreatorInput[]
    upsert?: GroupUpsertWithWhereUniqueWithoutCreatorInput | GroupUpsertWithWhereUniqueWithoutCreatorInput[]
    createMany?: GroupCreateManyCreatorInputEnvelope
    set?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    disconnect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    delete?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    connect?: GroupWhereUniqueInput | GroupWhereUniqueInput[]
    update?: GroupUpdateWithWhereUniqueWithoutCreatorInput | GroupUpdateWithWhereUniqueWithoutCreatorInput[]
    updateMany?: GroupUpdateManyWithWhereWithoutCreatorInput | GroupUpdateManyWithWhereWithoutCreatorInput[]
    deleteMany?: GroupScalarWhereInput | GroupScalarWhereInput[]
  }

  export type OfflineMessagesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OfflineMessagesCreateWithoutUserInput, OfflineMessagesUncheckedCreateWithoutUserInput> | OfflineMessagesCreateWithoutUserInput[] | OfflineMessagesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OfflineMessagesCreateOrConnectWithoutUserInput | OfflineMessagesCreateOrConnectWithoutUserInput[]
    upsert?: OfflineMessagesUpsertWithWhereUniqueWithoutUserInput | OfflineMessagesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OfflineMessagesCreateManyUserInputEnvelope
    set?: OfflineMessagesWhereUniqueInput | OfflineMessagesWhereUniqueInput[]
    disconnect?: OfflineMessagesWhereUniqueInput | OfflineMessagesWhereUniqueInput[]
    delete?: OfflineMessagesWhereUniqueInput | OfflineMessagesWhereUniqueInput[]
    connect?: OfflineMessagesWhereUniqueInput | OfflineMessagesWhereUniqueInput[]
    update?: OfflineMessagesUpdateWithWhereUniqueWithoutUserInput | OfflineMessagesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OfflineMessagesUpdateManyWithWhereWithoutUserInput | OfflineMessagesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OfflineMessagesScalarWhereInput | OfflineMessagesScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutFriendships1Input = {
    create?: XOR<UserCreateWithoutFriendships1Input, UserUncheckedCreateWithoutFriendships1Input>
    connectOrCreate?: UserCreateOrConnectWithoutFriendships1Input
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutFriendships2Input = {
    create?: XOR<UserCreateWithoutFriendships2Input, UserUncheckedCreateWithoutFriendships2Input>
    connectOrCreate?: UserCreateOrConnectWithoutFriendships2Input
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFriendships1NestedInput = {
    create?: XOR<UserCreateWithoutFriendships1Input, UserUncheckedCreateWithoutFriendships1Input>
    connectOrCreate?: UserCreateOrConnectWithoutFriendships1Input
    upsert?: UserUpsertWithoutFriendships1Input
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriendships1Input, UserUpdateWithoutFriendships1Input>, UserUncheckedUpdateWithoutFriendships1Input>
  }

  export type UserUpdateOneRequiredWithoutFriendships2NestedInput = {
    create?: XOR<UserCreateWithoutFriendships2Input, UserUncheckedCreateWithoutFriendships2Input>
    connectOrCreate?: UserCreateOrConnectWithoutFriendships2Input
    upsert?: UserUpsertWithoutFriendships2Input
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriendships2Input, UserUpdateWithoutFriendships2Input>, UserUncheckedUpdateWithoutFriendships2Input>
  }

  export type UserCreateNestedOneWithoutCreatedGroupsInput = {
    create?: XOR<UserCreateWithoutCreatedGroupsInput, UserUncheckedCreateWithoutCreatedGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedGroupsInput
    connect?: UserWhereUniqueInput
  }

  export type GroupMembershipCreateNestedManyWithoutGroupRelInput = {
    create?: XOR<GroupMembershipCreateWithoutGroupRelInput, GroupMembershipUncheckedCreateWithoutGroupRelInput> | GroupMembershipCreateWithoutGroupRelInput[] | GroupMembershipUncheckedCreateWithoutGroupRelInput[]
    connectOrCreate?: GroupMembershipCreateOrConnectWithoutGroupRelInput | GroupMembershipCreateOrConnectWithoutGroupRelInput[]
    createMany?: GroupMembershipCreateManyGroupRelInputEnvelope
    connect?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
  }

  export type GroupMembershipUncheckedCreateNestedManyWithoutGroupRelInput = {
    create?: XOR<GroupMembershipCreateWithoutGroupRelInput, GroupMembershipUncheckedCreateWithoutGroupRelInput> | GroupMembershipCreateWithoutGroupRelInput[] | GroupMembershipUncheckedCreateWithoutGroupRelInput[]
    connectOrCreate?: GroupMembershipCreateOrConnectWithoutGroupRelInput | GroupMembershipCreateOrConnectWithoutGroupRelInput[]
    createMany?: GroupMembershipCreateManyGroupRelInputEnvelope
    connect?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutCreatedGroupsNestedInput = {
    create?: XOR<UserCreateWithoutCreatedGroupsInput, UserUncheckedCreateWithoutCreatedGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreatedGroupsInput
    upsert?: UserUpsertWithoutCreatedGroupsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreatedGroupsInput, UserUpdateWithoutCreatedGroupsInput>, UserUncheckedUpdateWithoutCreatedGroupsInput>
  }

  export type GroupMembershipUpdateManyWithoutGroupRelNestedInput = {
    create?: XOR<GroupMembershipCreateWithoutGroupRelInput, GroupMembershipUncheckedCreateWithoutGroupRelInput> | GroupMembershipCreateWithoutGroupRelInput[] | GroupMembershipUncheckedCreateWithoutGroupRelInput[]
    connectOrCreate?: GroupMembershipCreateOrConnectWithoutGroupRelInput | GroupMembershipCreateOrConnectWithoutGroupRelInput[]
    upsert?: GroupMembershipUpsertWithWhereUniqueWithoutGroupRelInput | GroupMembershipUpsertWithWhereUniqueWithoutGroupRelInput[]
    createMany?: GroupMembershipCreateManyGroupRelInputEnvelope
    set?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    disconnect?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    delete?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    connect?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    update?: GroupMembershipUpdateWithWhereUniqueWithoutGroupRelInput | GroupMembershipUpdateWithWhereUniqueWithoutGroupRelInput[]
    updateMany?: GroupMembershipUpdateManyWithWhereWithoutGroupRelInput | GroupMembershipUpdateManyWithWhereWithoutGroupRelInput[]
    deleteMany?: GroupMembershipScalarWhereInput | GroupMembershipScalarWhereInput[]
  }

  export type GroupMembershipUncheckedUpdateManyWithoutGroupRelNestedInput = {
    create?: XOR<GroupMembershipCreateWithoutGroupRelInput, GroupMembershipUncheckedCreateWithoutGroupRelInput> | GroupMembershipCreateWithoutGroupRelInput[] | GroupMembershipUncheckedCreateWithoutGroupRelInput[]
    connectOrCreate?: GroupMembershipCreateOrConnectWithoutGroupRelInput | GroupMembershipCreateOrConnectWithoutGroupRelInput[]
    upsert?: GroupMembershipUpsertWithWhereUniqueWithoutGroupRelInput | GroupMembershipUpsertWithWhereUniqueWithoutGroupRelInput[]
    createMany?: GroupMembershipCreateManyGroupRelInputEnvelope
    set?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    disconnect?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    delete?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    connect?: GroupMembershipWhereUniqueInput | GroupMembershipWhereUniqueInput[]
    update?: GroupMembershipUpdateWithWhereUniqueWithoutGroupRelInput | GroupMembershipUpdateWithWhereUniqueWithoutGroupRelInput[]
    updateMany?: GroupMembershipUpdateManyWithWhereWithoutGroupRelInput | GroupMembershipUpdateManyWithWhereWithoutGroupRelInput[]
    deleteMany?: GroupMembershipScalarWhereInput | GroupMembershipScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGroupMembershipInput = {
    create?: XOR<UserCreateWithoutGroupMembershipInput, UserUncheckedCreateWithoutGroupMembershipInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupMembershipInput
    connect?: UserWhereUniqueInput
  }

  export type GroupCreateNestedOneWithoutMembersInput = {
    create?: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput>
    connectOrCreate?: GroupCreateOrConnectWithoutMembersInput
    connect?: GroupWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutGroupMembershipNestedInput = {
    create?: XOR<UserCreateWithoutGroupMembershipInput, UserUncheckedCreateWithoutGroupMembershipInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupMembershipInput
    upsert?: UserUpsertWithoutGroupMembershipInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGroupMembershipInput, UserUpdateWithoutGroupMembershipInput>, UserUncheckedUpdateWithoutGroupMembershipInput>
  }

  export type GroupUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput>
    connectOrCreate?: GroupCreateOrConnectWithoutMembersInput
    upsert?: GroupUpsertWithoutMembersInput
    connect?: GroupWhereUniqueInput
    update?: XOR<XOR<GroupUpdateToOneWithWhereWithoutMembersInput, GroupUpdateWithoutMembersInput>, GroupUncheckedUpdateWithoutMembersInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutOfflineMessagesInput = {
    create?: XOR<UserCreateWithoutOfflineMessagesInput, UserUncheckedCreateWithoutOfflineMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOfflineMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumMessageTypeFieldUpdateOperationsInput = {
    set?: $Enums.MessageType
  }

  export type UserUpdateOneRequiredWithoutOfflineMessagesNestedInput = {
    create?: XOR<UserCreateWithoutOfflineMessagesInput, UserUncheckedCreateWithoutOfflineMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutOfflineMessagesInput
    upsert?: UserUpsertWithoutOfflineMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOfflineMessagesInput, UserUpdateWithoutOfflineMessagesInput>, UserUncheckedUpdateWithoutOfflineMessagesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumMessageTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeFilter<$PrismaModel> | $Enums.MessageType
  }

  export type NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MessageType | EnumMessageTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MessageType[] | ListEnumMessageTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMessageTypeWithAggregatesFilter<$PrismaModel> | $Enums.MessageType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMessageTypeFilter<$PrismaModel>
    _max?: NestedEnumMessageTypeFilter<$PrismaModel>
  }

  export type FriendshipCreateWithoutUser1RelInput = {
    chatId: string
    user2Rel: UserCreateNestedOneWithoutFriendships2Input
  }

  export type FriendshipUncheckedCreateWithoutUser1RelInput = {
    chatId: string
    user2: string
  }

  export type FriendshipCreateOrConnectWithoutUser1RelInput = {
    where: FriendshipWhereUniqueInput
    create: XOR<FriendshipCreateWithoutUser1RelInput, FriendshipUncheckedCreateWithoutUser1RelInput>
  }

  export type FriendshipCreateManyUser1RelInputEnvelope = {
    data: FriendshipCreateManyUser1RelInput | FriendshipCreateManyUser1RelInput[]
    skipDuplicates?: boolean
  }

  export type FriendshipCreateWithoutUser2RelInput = {
    chatId: string
    user1Rel: UserCreateNestedOneWithoutFriendships1Input
  }

  export type FriendshipUncheckedCreateWithoutUser2RelInput = {
    chatId: string
    user1: string
  }

  export type FriendshipCreateOrConnectWithoutUser2RelInput = {
    where: FriendshipWhereUniqueInput
    create: XOR<FriendshipCreateWithoutUser2RelInput, FriendshipUncheckedCreateWithoutUser2RelInput>
  }

  export type FriendshipCreateManyUser2RelInputEnvelope = {
    data: FriendshipCreateManyUser2RelInput | FriendshipCreateManyUser2RelInput[]
    skipDuplicates?: boolean
  }

  export type GroupMembershipCreateWithoutUserRelInput = {
    groupRel: GroupCreateNestedOneWithoutMembersInput
  }

  export type GroupMembershipUncheckedCreateWithoutUserRelInput = {
    id?: number
    group: string
  }

  export type GroupMembershipCreateOrConnectWithoutUserRelInput = {
    where: GroupMembershipWhereUniqueInput
    create: XOR<GroupMembershipCreateWithoutUserRelInput, GroupMembershipUncheckedCreateWithoutUserRelInput>
  }

  export type GroupMembershipCreateManyUserRelInputEnvelope = {
    data: GroupMembershipCreateManyUserRelInput | GroupMembershipCreateManyUserRelInput[]
    skipDuplicates?: boolean
  }

  export type GroupCreateWithoutCreatorInput = {
    groupId: string
    groupName: string
    members?: GroupMembershipCreateNestedManyWithoutGroupRelInput
  }

  export type GroupUncheckedCreateWithoutCreatorInput = {
    groupId: string
    groupName: string
    members?: GroupMembershipUncheckedCreateNestedManyWithoutGroupRelInput
  }

  export type GroupCreateOrConnectWithoutCreatorInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutCreatorInput, GroupUncheckedCreateWithoutCreatorInput>
  }

  export type GroupCreateManyCreatorInputEnvelope = {
    data: GroupCreateManyCreatorInput | GroupCreateManyCreatorInput[]
    skipDuplicates?: boolean
  }

  export type OfflineMessagesCreateWithoutUserInput = {
    messageId: string
    partitionKey: string
    messageType: $Enums.MessageType
  }

  export type OfflineMessagesUncheckedCreateWithoutUserInput = {
    messageId: string
    partitionKey: string
    messageType: $Enums.MessageType
  }

  export type OfflineMessagesCreateOrConnectWithoutUserInput = {
    where: OfflineMessagesWhereUniqueInput
    create: XOR<OfflineMessagesCreateWithoutUserInput, OfflineMessagesUncheckedCreateWithoutUserInput>
  }

  export type OfflineMessagesCreateManyUserInputEnvelope = {
    data: OfflineMessagesCreateManyUserInput | OfflineMessagesCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FriendshipUpsertWithWhereUniqueWithoutUser1RelInput = {
    where: FriendshipWhereUniqueInput
    update: XOR<FriendshipUpdateWithoutUser1RelInput, FriendshipUncheckedUpdateWithoutUser1RelInput>
    create: XOR<FriendshipCreateWithoutUser1RelInput, FriendshipUncheckedCreateWithoutUser1RelInput>
  }

  export type FriendshipUpdateWithWhereUniqueWithoutUser1RelInput = {
    where: FriendshipWhereUniqueInput
    data: XOR<FriendshipUpdateWithoutUser1RelInput, FriendshipUncheckedUpdateWithoutUser1RelInput>
  }

  export type FriendshipUpdateManyWithWhereWithoutUser1RelInput = {
    where: FriendshipScalarWhereInput
    data: XOR<FriendshipUpdateManyMutationInput, FriendshipUncheckedUpdateManyWithoutUser1RelInput>
  }

  export type FriendshipScalarWhereInput = {
    AND?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
    OR?: FriendshipScalarWhereInput[]
    NOT?: FriendshipScalarWhereInput | FriendshipScalarWhereInput[]
    chatId?: StringFilter<"Friendship"> | string
    user1?: StringFilter<"Friendship"> | string
    user2?: StringFilter<"Friendship"> | string
  }

  export type FriendshipUpsertWithWhereUniqueWithoutUser2RelInput = {
    where: FriendshipWhereUniqueInput
    update: XOR<FriendshipUpdateWithoutUser2RelInput, FriendshipUncheckedUpdateWithoutUser2RelInput>
    create: XOR<FriendshipCreateWithoutUser2RelInput, FriendshipUncheckedCreateWithoutUser2RelInput>
  }

  export type FriendshipUpdateWithWhereUniqueWithoutUser2RelInput = {
    where: FriendshipWhereUniqueInput
    data: XOR<FriendshipUpdateWithoutUser2RelInput, FriendshipUncheckedUpdateWithoutUser2RelInput>
  }

  export type FriendshipUpdateManyWithWhereWithoutUser2RelInput = {
    where: FriendshipScalarWhereInput
    data: XOR<FriendshipUpdateManyMutationInput, FriendshipUncheckedUpdateManyWithoutUser2RelInput>
  }

  export type GroupMembershipUpsertWithWhereUniqueWithoutUserRelInput = {
    where: GroupMembershipWhereUniqueInput
    update: XOR<GroupMembershipUpdateWithoutUserRelInput, GroupMembershipUncheckedUpdateWithoutUserRelInput>
    create: XOR<GroupMembershipCreateWithoutUserRelInput, GroupMembershipUncheckedCreateWithoutUserRelInput>
  }

  export type GroupMembershipUpdateWithWhereUniqueWithoutUserRelInput = {
    where: GroupMembershipWhereUniqueInput
    data: XOR<GroupMembershipUpdateWithoutUserRelInput, GroupMembershipUncheckedUpdateWithoutUserRelInput>
  }

  export type GroupMembershipUpdateManyWithWhereWithoutUserRelInput = {
    where: GroupMembershipScalarWhereInput
    data: XOR<GroupMembershipUpdateManyMutationInput, GroupMembershipUncheckedUpdateManyWithoutUserRelInput>
  }

  export type GroupMembershipScalarWhereInput = {
    AND?: GroupMembershipScalarWhereInput | GroupMembershipScalarWhereInput[]
    OR?: GroupMembershipScalarWhereInput[]
    NOT?: GroupMembershipScalarWhereInput | GroupMembershipScalarWhereInput[]
    id?: IntFilter<"GroupMembership"> | number
    user?: StringFilter<"GroupMembership"> | string
    group?: StringFilter<"GroupMembership"> | string
  }

  export type GroupUpsertWithWhereUniqueWithoutCreatorInput = {
    where: GroupWhereUniqueInput
    update: XOR<GroupUpdateWithoutCreatorInput, GroupUncheckedUpdateWithoutCreatorInput>
    create: XOR<GroupCreateWithoutCreatorInput, GroupUncheckedCreateWithoutCreatorInput>
  }

  export type GroupUpdateWithWhereUniqueWithoutCreatorInput = {
    where: GroupWhereUniqueInput
    data: XOR<GroupUpdateWithoutCreatorInput, GroupUncheckedUpdateWithoutCreatorInput>
  }

  export type GroupUpdateManyWithWhereWithoutCreatorInput = {
    where: GroupScalarWhereInput
    data: XOR<GroupUpdateManyMutationInput, GroupUncheckedUpdateManyWithoutCreatorInput>
  }

  export type GroupScalarWhereInput = {
    AND?: GroupScalarWhereInput | GroupScalarWhereInput[]
    OR?: GroupScalarWhereInput[]
    NOT?: GroupScalarWhereInput | GroupScalarWhereInput[]
    groupId?: StringFilter<"Group"> | string
    groupName?: StringFilter<"Group"> | string
    createdBy?: StringFilter<"Group"> | string
  }

  export type OfflineMessagesUpsertWithWhereUniqueWithoutUserInput = {
    where: OfflineMessagesWhereUniqueInput
    update: XOR<OfflineMessagesUpdateWithoutUserInput, OfflineMessagesUncheckedUpdateWithoutUserInput>
    create: XOR<OfflineMessagesCreateWithoutUserInput, OfflineMessagesUncheckedCreateWithoutUserInput>
  }

  export type OfflineMessagesUpdateWithWhereUniqueWithoutUserInput = {
    where: OfflineMessagesWhereUniqueInput
    data: XOR<OfflineMessagesUpdateWithoutUserInput, OfflineMessagesUncheckedUpdateWithoutUserInput>
  }

  export type OfflineMessagesUpdateManyWithWhereWithoutUserInput = {
    where: OfflineMessagesScalarWhereInput
    data: XOR<OfflineMessagesUpdateManyMutationInput, OfflineMessagesUncheckedUpdateManyWithoutUserInput>
  }

  export type OfflineMessagesScalarWhereInput = {
    AND?: OfflineMessagesScalarWhereInput | OfflineMessagesScalarWhereInput[]
    OR?: OfflineMessagesScalarWhereInput[]
    NOT?: OfflineMessagesScalarWhereInput | OfflineMessagesScalarWhereInput[]
    username?: StringFilter<"OfflineMessages"> | string
    messageId?: StringFilter<"OfflineMessages"> | string
    partitionKey?: StringFilter<"OfflineMessages"> | string
    messageType?: EnumMessageTypeFilter<"OfflineMessages"> | $Enums.MessageType
  }

  export type UserCreateWithoutFriendships1Input = {
    username: string
    password: string
    friendships2?: FriendshipCreateNestedManyWithoutUser2RelInput
    groupMembership?: GroupMembershipCreateNestedManyWithoutUserRelInput
    createdGroups?: GroupCreateNestedManyWithoutCreatorInput
    OfflineMessages?: OfflineMessagesCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFriendships1Input = {
    username: string
    password: string
    friendships2?: FriendshipUncheckedCreateNestedManyWithoutUser2RelInput
    groupMembership?: GroupMembershipUncheckedCreateNestedManyWithoutUserRelInput
    createdGroups?: GroupUncheckedCreateNestedManyWithoutCreatorInput
    OfflineMessages?: OfflineMessagesUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFriendships1Input = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendships1Input, UserUncheckedCreateWithoutFriendships1Input>
  }

  export type UserCreateWithoutFriendships2Input = {
    username: string
    password: string
    friendships1?: FriendshipCreateNestedManyWithoutUser1RelInput
    groupMembership?: GroupMembershipCreateNestedManyWithoutUserRelInput
    createdGroups?: GroupCreateNestedManyWithoutCreatorInput
    OfflineMessages?: OfflineMessagesCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFriendships2Input = {
    username: string
    password: string
    friendships1?: FriendshipUncheckedCreateNestedManyWithoutUser1RelInput
    groupMembership?: GroupMembershipUncheckedCreateNestedManyWithoutUserRelInput
    createdGroups?: GroupUncheckedCreateNestedManyWithoutCreatorInput
    OfflineMessages?: OfflineMessagesUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFriendships2Input = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendships2Input, UserUncheckedCreateWithoutFriendships2Input>
  }

  export type UserUpsertWithoutFriendships1Input = {
    update: XOR<UserUpdateWithoutFriendships1Input, UserUncheckedUpdateWithoutFriendships1Input>
    create: XOR<UserCreateWithoutFriendships1Input, UserUncheckedCreateWithoutFriendships1Input>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriendships1Input = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriendships1Input, UserUncheckedUpdateWithoutFriendships1Input>
  }

  export type UserUpdateWithoutFriendships1Input = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    friendships2?: FriendshipUpdateManyWithoutUser2RelNestedInput
    groupMembership?: GroupMembershipUpdateManyWithoutUserRelNestedInput
    createdGroups?: GroupUpdateManyWithoutCreatorNestedInput
    OfflineMessages?: OfflineMessagesUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendships1Input = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    friendships2?: FriendshipUncheckedUpdateManyWithoutUser2RelNestedInput
    groupMembership?: GroupMembershipUncheckedUpdateManyWithoutUserRelNestedInput
    createdGroups?: GroupUncheckedUpdateManyWithoutCreatorNestedInput
    OfflineMessages?: OfflineMessagesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutFriendships2Input = {
    update: XOR<UserUpdateWithoutFriendships2Input, UserUncheckedUpdateWithoutFriendships2Input>
    create: XOR<UserCreateWithoutFriendships2Input, UserUncheckedCreateWithoutFriendships2Input>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriendships2Input = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriendships2Input, UserUncheckedUpdateWithoutFriendships2Input>
  }

  export type UserUpdateWithoutFriendships2Input = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    friendships1?: FriendshipUpdateManyWithoutUser1RelNestedInput
    groupMembership?: GroupMembershipUpdateManyWithoutUserRelNestedInput
    createdGroups?: GroupUpdateManyWithoutCreatorNestedInput
    OfflineMessages?: OfflineMessagesUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendships2Input = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    friendships1?: FriendshipUncheckedUpdateManyWithoutUser1RelNestedInput
    groupMembership?: GroupMembershipUncheckedUpdateManyWithoutUserRelNestedInput
    createdGroups?: GroupUncheckedUpdateManyWithoutCreatorNestedInput
    OfflineMessages?: OfflineMessagesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutCreatedGroupsInput = {
    username: string
    password: string
    friendships1?: FriendshipCreateNestedManyWithoutUser1RelInput
    friendships2?: FriendshipCreateNestedManyWithoutUser2RelInput
    groupMembership?: GroupMembershipCreateNestedManyWithoutUserRelInput
    OfflineMessages?: OfflineMessagesCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreatedGroupsInput = {
    username: string
    password: string
    friendships1?: FriendshipUncheckedCreateNestedManyWithoutUser1RelInput
    friendships2?: FriendshipUncheckedCreateNestedManyWithoutUser2RelInput
    groupMembership?: GroupMembershipUncheckedCreateNestedManyWithoutUserRelInput
    OfflineMessages?: OfflineMessagesUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreatedGroupsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreatedGroupsInput, UserUncheckedCreateWithoutCreatedGroupsInput>
  }

  export type GroupMembershipCreateWithoutGroupRelInput = {
    userRel: UserCreateNestedOneWithoutGroupMembershipInput
  }

  export type GroupMembershipUncheckedCreateWithoutGroupRelInput = {
    id?: number
    user: string
  }

  export type GroupMembershipCreateOrConnectWithoutGroupRelInput = {
    where: GroupMembershipWhereUniqueInput
    create: XOR<GroupMembershipCreateWithoutGroupRelInput, GroupMembershipUncheckedCreateWithoutGroupRelInput>
  }

  export type GroupMembershipCreateManyGroupRelInputEnvelope = {
    data: GroupMembershipCreateManyGroupRelInput | GroupMembershipCreateManyGroupRelInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCreatedGroupsInput = {
    update: XOR<UserUpdateWithoutCreatedGroupsInput, UserUncheckedUpdateWithoutCreatedGroupsInput>
    create: XOR<UserCreateWithoutCreatedGroupsInput, UserUncheckedCreateWithoutCreatedGroupsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreatedGroupsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreatedGroupsInput, UserUncheckedUpdateWithoutCreatedGroupsInput>
  }

  export type UserUpdateWithoutCreatedGroupsInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    friendships1?: FriendshipUpdateManyWithoutUser1RelNestedInput
    friendships2?: FriendshipUpdateManyWithoutUser2RelNestedInput
    groupMembership?: GroupMembershipUpdateManyWithoutUserRelNestedInput
    OfflineMessages?: OfflineMessagesUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreatedGroupsInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    friendships1?: FriendshipUncheckedUpdateManyWithoutUser1RelNestedInput
    friendships2?: FriendshipUncheckedUpdateManyWithoutUser2RelNestedInput
    groupMembership?: GroupMembershipUncheckedUpdateManyWithoutUserRelNestedInput
    OfflineMessages?: OfflineMessagesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GroupMembershipUpsertWithWhereUniqueWithoutGroupRelInput = {
    where: GroupMembershipWhereUniqueInput
    update: XOR<GroupMembershipUpdateWithoutGroupRelInput, GroupMembershipUncheckedUpdateWithoutGroupRelInput>
    create: XOR<GroupMembershipCreateWithoutGroupRelInput, GroupMembershipUncheckedCreateWithoutGroupRelInput>
  }

  export type GroupMembershipUpdateWithWhereUniqueWithoutGroupRelInput = {
    where: GroupMembershipWhereUniqueInput
    data: XOR<GroupMembershipUpdateWithoutGroupRelInput, GroupMembershipUncheckedUpdateWithoutGroupRelInput>
  }

  export type GroupMembershipUpdateManyWithWhereWithoutGroupRelInput = {
    where: GroupMembershipScalarWhereInput
    data: XOR<GroupMembershipUpdateManyMutationInput, GroupMembershipUncheckedUpdateManyWithoutGroupRelInput>
  }

  export type UserCreateWithoutGroupMembershipInput = {
    username: string
    password: string
    friendships1?: FriendshipCreateNestedManyWithoutUser1RelInput
    friendships2?: FriendshipCreateNestedManyWithoutUser2RelInput
    createdGroups?: GroupCreateNestedManyWithoutCreatorInput
    OfflineMessages?: OfflineMessagesCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGroupMembershipInput = {
    username: string
    password: string
    friendships1?: FriendshipUncheckedCreateNestedManyWithoutUser1RelInput
    friendships2?: FriendshipUncheckedCreateNestedManyWithoutUser2RelInput
    createdGroups?: GroupUncheckedCreateNestedManyWithoutCreatorInput
    OfflineMessages?: OfflineMessagesUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGroupMembershipInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGroupMembershipInput, UserUncheckedCreateWithoutGroupMembershipInput>
  }

  export type GroupCreateWithoutMembersInput = {
    groupId: string
    groupName: string
    creator: UserCreateNestedOneWithoutCreatedGroupsInput
  }

  export type GroupUncheckedCreateWithoutMembersInput = {
    groupId: string
    groupName: string
    createdBy: string
  }

  export type GroupCreateOrConnectWithoutMembersInput = {
    where: GroupWhereUniqueInput
    create: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput>
  }

  export type UserUpsertWithoutGroupMembershipInput = {
    update: XOR<UserUpdateWithoutGroupMembershipInput, UserUncheckedUpdateWithoutGroupMembershipInput>
    create: XOR<UserCreateWithoutGroupMembershipInput, UserUncheckedCreateWithoutGroupMembershipInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGroupMembershipInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGroupMembershipInput, UserUncheckedUpdateWithoutGroupMembershipInput>
  }

  export type UserUpdateWithoutGroupMembershipInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    friendships1?: FriendshipUpdateManyWithoutUser1RelNestedInput
    friendships2?: FriendshipUpdateManyWithoutUser2RelNestedInput
    createdGroups?: GroupUpdateManyWithoutCreatorNestedInput
    OfflineMessages?: OfflineMessagesUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGroupMembershipInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    friendships1?: FriendshipUncheckedUpdateManyWithoutUser1RelNestedInput
    friendships2?: FriendshipUncheckedUpdateManyWithoutUser2RelNestedInput
    createdGroups?: GroupUncheckedUpdateManyWithoutCreatorNestedInput
    OfflineMessages?: OfflineMessagesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GroupUpsertWithoutMembersInput = {
    update: XOR<GroupUpdateWithoutMembersInput, GroupUncheckedUpdateWithoutMembersInput>
    create: XOR<GroupCreateWithoutMembersInput, GroupUncheckedCreateWithoutMembersInput>
    where?: GroupWhereInput
  }

  export type GroupUpdateToOneWithWhereWithoutMembersInput = {
    where?: GroupWhereInput
    data: XOR<GroupUpdateWithoutMembersInput, GroupUncheckedUpdateWithoutMembersInput>
  }

  export type GroupUpdateWithoutMembersInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    creator?: UserUpdateOneRequiredWithoutCreatedGroupsNestedInput
  }

  export type GroupUncheckedUpdateWithoutMembersInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutOfflineMessagesInput = {
    username: string
    password: string
    friendships1?: FriendshipCreateNestedManyWithoutUser1RelInput
    friendships2?: FriendshipCreateNestedManyWithoutUser2RelInput
    groupMembership?: GroupMembershipCreateNestedManyWithoutUserRelInput
    createdGroups?: GroupCreateNestedManyWithoutCreatorInput
  }

  export type UserUncheckedCreateWithoutOfflineMessagesInput = {
    username: string
    password: string
    friendships1?: FriendshipUncheckedCreateNestedManyWithoutUser1RelInput
    friendships2?: FriendshipUncheckedCreateNestedManyWithoutUser2RelInput
    groupMembership?: GroupMembershipUncheckedCreateNestedManyWithoutUserRelInput
    createdGroups?: GroupUncheckedCreateNestedManyWithoutCreatorInput
  }

  export type UserCreateOrConnectWithoutOfflineMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOfflineMessagesInput, UserUncheckedCreateWithoutOfflineMessagesInput>
  }

  export type UserUpsertWithoutOfflineMessagesInput = {
    update: XOR<UserUpdateWithoutOfflineMessagesInput, UserUncheckedUpdateWithoutOfflineMessagesInput>
    create: XOR<UserCreateWithoutOfflineMessagesInput, UserUncheckedCreateWithoutOfflineMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOfflineMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOfflineMessagesInput, UserUncheckedUpdateWithoutOfflineMessagesInput>
  }

  export type UserUpdateWithoutOfflineMessagesInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    friendships1?: FriendshipUpdateManyWithoutUser1RelNestedInput
    friendships2?: FriendshipUpdateManyWithoutUser2RelNestedInput
    groupMembership?: GroupMembershipUpdateManyWithoutUserRelNestedInput
    createdGroups?: GroupUpdateManyWithoutCreatorNestedInput
  }

  export type UserUncheckedUpdateWithoutOfflineMessagesInput = {
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    friendships1?: FriendshipUncheckedUpdateManyWithoutUser1RelNestedInput
    friendships2?: FriendshipUncheckedUpdateManyWithoutUser2RelNestedInput
    groupMembership?: GroupMembershipUncheckedUpdateManyWithoutUserRelNestedInput
    createdGroups?: GroupUncheckedUpdateManyWithoutCreatorNestedInput
  }

  export type FriendshipCreateManyUser1RelInput = {
    chatId: string
    user2: string
  }

  export type FriendshipCreateManyUser2RelInput = {
    chatId: string
    user1: string
  }

  export type GroupMembershipCreateManyUserRelInput = {
    id?: number
    group: string
  }

  export type GroupCreateManyCreatorInput = {
    groupId: string
    groupName: string
  }

  export type OfflineMessagesCreateManyUserInput = {
    messageId: string
    partitionKey: string
    messageType: $Enums.MessageType
  }

  export type FriendshipUpdateWithoutUser1RelInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    user2Rel?: UserUpdateOneRequiredWithoutFriendships2NestedInput
  }

  export type FriendshipUncheckedUpdateWithoutUser1RelInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    user2?: StringFieldUpdateOperationsInput | string
  }

  export type FriendshipUncheckedUpdateManyWithoutUser1RelInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    user2?: StringFieldUpdateOperationsInput | string
  }

  export type FriendshipUpdateWithoutUser2RelInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    user1Rel?: UserUpdateOneRequiredWithoutFriendships1NestedInput
  }

  export type FriendshipUncheckedUpdateWithoutUser2RelInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    user1?: StringFieldUpdateOperationsInput | string
  }

  export type FriendshipUncheckedUpdateManyWithoutUser2RelInput = {
    chatId?: StringFieldUpdateOperationsInput | string
    user1?: StringFieldUpdateOperationsInput | string
  }

  export type GroupMembershipUpdateWithoutUserRelInput = {
    groupRel?: GroupUpdateOneRequiredWithoutMembersNestedInput
  }

  export type GroupMembershipUncheckedUpdateWithoutUserRelInput = {
    id?: IntFieldUpdateOperationsInput | number
    group?: StringFieldUpdateOperationsInput | string
  }

  export type GroupMembershipUncheckedUpdateManyWithoutUserRelInput = {
    id?: IntFieldUpdateOperationsInput | number
    group?: StringFieldUpdateOperationsInput | string
  }

  export type GroupUpdateWithoutCreatorInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    members?: GroupMembershipUpdateManyWithoutGroupRelNestedInput
  }

  export type GroupUncheckedUpdateWithoutCreatorInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
    members?: GroupMembershipUncheckedUpdateManyWithoutGroupRelNestedInput
  }

  export type GroupUncheckedUpdateManyWithoutCreatorInput = {
    groupId?: StringFieldUpdateOperationsInput | string
    groupName?: StringFieldUpdateOperationsInput | string
  }

  export type OfflineMessagesUpdateWithoutUserInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    partitionKey?: StringFieldUpdateOperationsInput | string
    messageType?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
  }

  export type OfflineMessagesUncheckedUpdateWithoutUserInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    partitionKey?: StringFieldUpdateOperationsInput | string
    messageType?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
  }

  export type OfflineMessagesUncheckedUpdateManyWithoutUserInput = {
    messageId?: StringFieldUpdateOperationsInput | string
    partitionKey?: StringFieldUpdateOperationsInput | string
    messageType?: EnumMessageTypeFieldUpdateOperationsInput | $Enums.MessageType
  }

  export type GroupMembershipCreateManyGroupRelInput = {
    id?: number
    user: string
  }

  export type GroupMembershipUpdateWithoutGroupRelInput = {
    userRel?: UserUpdateOneRequiredWithoutGroupMembershipNestedInput
  }

  export type GroupMembershipUncheckedUpdateWithoutGroupRelInput = {
    id?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
  }

  export type GroupMembershipUncheckedUpdateManyWithoutGroupRelInput = {
    id?: IntFieldUpdateOperationsInput | number
    user?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}