function transform(input) {
  // Initialize the data object
  const data = {};
  
  // Map each response to a proper name
  // input.IDX_0 = /users
  if (input.IDX_0 && input.IDX_0.data && input.IDX_0.data[0]) {
    data.user = input.IDX_0.data[0];
  }
  
  // input.IDX_1 = /streams
  if (input.IDX_1 && input.IDX_1.data && input.IDX_1.data[0]) {
    data.stream = input.IDX_1.data[0];
  } else {
    data.stream = { type: "offline" };
  }
  
  // input.IDX_2 = /channels/followers
  if (input.IDX_2) {
    data.followers = {
      total: input.IDX_2.total || 0,
      recent: input.IDX_2.data || []
    };
  }
  
  // input.IDX_3 = /channels
  if (input.IDX_3 && input.IDX_3.data && input.IDX_3.data[0]) {
    data.channel = input.IDX_3.data[0];
  }
  
  // input.IDX_4 = /goals
  if (input.IDX_4 && input.IDX_4.data) {
    data.goals = input.IDX_4.data;
  }
  
  // input.IDX_5 = /chat/chatters
  if (input.IDX_5) {
    data.chatters = {
      total: input.IDX_5.total || 0,
      chatters: input.IDX_5.data || []
    };
  }
  
  // input.IDX_6 = /polls
  if (input.IDX_6 && input.IDX_6.data) {
    data.polls = input.IDX_6.data.filter(poll => poll.status === "ACTIVE");
  }
  
  // input.IDX_7 = /hypetrain/events
  if (input.IDX_7 && input.IDX_7.data && input.IDX_7.data[0]) {
    data.hypetrain = input.IDX_7.data[0];
  }
  
  // input.IDX_8 = /subscriptions
  if (input.IDX_8) {
    data.subscribers = {
      total: input.IDX_8.total || 0,
      recent: input.IDX_8.data || []
    };
  }
  
  // input.IDX_9 = /bits/leaderboard
  if (input.IDX_9 && input.IDX_9.data) {
    data.bits = input.IDX_9.data;
  }
  
  // Return everything under a data object
  return {
    data: data
  };
}