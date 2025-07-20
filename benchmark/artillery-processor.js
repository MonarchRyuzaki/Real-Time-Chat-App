const { mockUsers, mockGroups } = require("../src/mockData");

// Extract all user names from mockUsers
const allUsers = Object.keys(mockUsers);
let userIdx = 0;
let targetFriendIdx = userIdx + 1;

// Extract all group IDs from mockGroups
const groups = Object.keys(mockGroups);
let groupIdx = 0;

module.exports = {
  connectHandler(params, context, next) {
    const username = allUsers[userIdx % allUsers.length];
    userIdx++;

    context.vars.username = username;

    // console.log(`Using user: ${username} and target friend: ${targetFriend}`);
    params.target = `${params.target}/?username=${context.vars.username}`;
    context.vars.connectStart = performance.now();
    next();
  },
  postConnectionHandler(context, events, next) {
    const endTime = performance.now();
    const duration = endTime - context.vars.connectStart;
    events.emit("histogram", "handshake_latency", duration);
    next();
  },
  handleOneToOne(context, events, next) {
    const targetFriend = allUsers[targetFriendIdx % allUsers.length];
    targetFriendIdx++;
    context.vars.targetFriend = targetFriend;
    // console.log(
    //   `${context.vars.username} is sending message to ${context.vars.targetFriend}`
    // );
    next();
  },
  handleGroups(context, events, next) {
    context.vars.groupId = groups[groupIdx % groups.length];
    // console.log(
    //   `${context.vars.username} is sending message to ${context.vars.groupId}`
    // );
    groupIdx++;
    next();
  },
  preMessageSend(context, events, next) {
    context.vars.startTime = performance.now();
    // console.log(`Preparing to send message from ${context.vars.username} to ${context.vars.targetFriend}`);
    next();
  },
  postMessageSend(context, events, next) {
    const endTime = performance.now();
    const duration = endTime - context.vars.startTime;
    // console.log(
    //   `Message sent from ${context.vars.username} to ${context.vars.targetFriend} in ${duration}ms`
    // );
    events.emit("histogram", "latency", duration);
    events.emit("counter", "messages_sent", 1);
    events.emit("rate", "messages_sent_rate");
    next();
  },
};
