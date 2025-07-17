export const mockUsers = {
  alice: {
    friends: ["bob", "charlie"],
    messages: {
      bob: [
        {
          from: "alice",
          to: "bob",
          text: "Hey Bob!",
          timestamp: "2023-08-01T10:00:00Z",
        },
        {
          from: "bob",
          to: "alice",
          text: "Hi Alice!",
          timestamp: "2023-08-01T10:01:00Z",
        },
      ],
      charlie: [
        {
          from: "alice",
          to: "charlie",
          text: "Yo Charlie!",
          timestamp: "2023-08-02T12:00:00Z",
        },
      ],
    },
  },
  bob: {
    friends: ["alice"],
    messages: {
      alice: [
        {
          from: "alice",
          to: "bob",
          text: "Hey Bob!",
          timestamp: "2023-08-01T10:00:00Z",
        },
        {
          from: "bob",
          to: "alice",
          text: "Hi Alice!",
          timestamp: "2023-08-01T10:01:00Z",
        },
      ],
    },
  },
  charlie: {
    friends: ["alice"],
    messages: {
      alice: [
        {
          from: "alice",
          to: "charlie",
          text: "Yo Charlie!",
          timestamp: "2023-08-02T12:00:00Z",
        },
      ],
    },
  },
  dave: {
    friends: [],
    messages: {},
  },
  eve: {
    friends: ["frank"],
    messages: {
      frank: [
        {
          from: "eve",
          to: "frank",
          text: "How's it going, Frank?",
          timestamp: "2023-08-03T09:30:00Z",
        },
      ],
    },
  },
  frank: {
    friends: ["eve"],
    messages: {
      eve: [
        {
          from: "eve",
          to: "frank",
          text: "How's it going, Frank?",
          timestamp: "2023-08-03T09:30:00Z",
        },
      ],
    },
  },
};
