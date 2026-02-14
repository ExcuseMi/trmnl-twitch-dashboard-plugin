function transform(input) {
  const data = {};

  // IDX_0 = /users
  if (input.IDX_0 && input.IDX_0.data && input.IDX_0.data[0]) {
    data.user = input.IDX_0.data[0];
  }

  // IDX_1 = /streams
  if (input.IDX_1 && input.IDX_1.data && input.IDX_1.data[0]) {
    data.stream = input.IDX_1.data[0];
  } else {
    data.stream = { type: "offline" };
  }

  // IDX_2 = /channels/followers
  if (input.IDX_2) {
    data.followers = {
      total: input.IDX_2.total || 0,
      recent: input.IDX_2.data || []
    };
  }

  // IDX_3 = /chat/chatters
  if (input.IDX_3) {
    data.chatters = {
      total: input.IDX_3.total || 0,
      chatters: input.IDX_3.data || []
    };
  }

  // IDX_4 = /subscriptions
  if (input.IDX_4) {
    data.subscribers = {
      total: input.IDX_4.total || 0,
      recent: input.IDX_4.data || []
    };
  }

  return {
    data: data
  };
}