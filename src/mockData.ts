export const mockUsers = {
  alice: {
    friends: ["bob", "charlie"],
    groups: ["group1", "group2"],
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
    groups: ["group1"],
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
    groups: ["group2"],
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
    groups: [],
    messages: {},
  },
  eve: {
    friends: ["frank"],
    groups: ["group3"],
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
    groups: ["group3"],
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

export const mockGroups = {
  group1: {
    groupId: "group1",
    groupName: "Alice & Bob's Chat",
    createdBy: "alice",
    members: ["alice", "bob"],
    messages: [
      {
        from: "alice",
        text: "Welcome to the group chat!",
        timestamp: "2023-08-04T10:00:00Z",
      },
      {
        from: "bob",
        text: "Glad to be here!",
        timestamp: "2023-08-04T10:05:00Z",
      },
    ],
  },
  group2: {
    groupId: "group2",
    groupName: "Alpha Team",
    createdBy: "alice",
    members: ["alice", "charlie"],
    messages: [
      {
        from: "charlie",
        text: "We ready for the mission?",
        timestamp: "2023-08-05T12:00:00Z",
      },
      {
        from: "alice",
        text: "Locked and loaded 😎",
        timestamp: "2023-08-05T12:03:00Z",
      },
    ],
  },
  group3: {
    groupId: "group3",
    groupName: "Eve & Frank's Corner",
    createdBy: "eve",
    members: ["eve", "frank"],
    messages: [
      {
        from: "eve",
        text: "Testing group chat here!",
        timestamp: "2023-08-06T09:00:00Z",
      },
      {
        from: "frank",
        text: "Received loud and clear 👌",
        timestamp: "2023-08-06T09:05:00Z",
      },
    ],
  },
};
