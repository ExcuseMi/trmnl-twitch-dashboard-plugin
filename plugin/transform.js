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

  // IDX_5 = /channels
  if (input.IDX_5 && input.IDX_5.data && input.IDX_5.data[0]) {
    data.channel = input.IDX_5.data[0];
  }

  // IDX_6 = /goals
  if (input.IDX_6 && input.IDX_6.data && input.IDX_6.data.length > 0) {
    data.goal = input.IDX_6.data[0];
  }

  // Enrich offline stream with channel data
  if (data.stream && data.stream.type === "offline" && data.channel) {
    if (data.channel.game_name) {
      data.stream.game_name = data.channel.game_name;
    }
    if (data.channel.title) {
      data.stream.title = data.channel.title;
    }
    if (data.channel.tags) {
      data.stream.tags = data.channel.tags;
    }
  }

  // Format large numbers as compact (e.g. 485656 → "486K")
  function formatCompact(num) {
    if (!num || num < 1000) return String(num || 0);
    if (num < 1000000) return (Math.round(num / 100) / 10) + "K";
    return (Math.round(num / 100000) / 10) + "M";
  }

  if (data.followers) {
    data.followers.display = formatCompact(data.followers.total);
  }
  if (data.subscribers) {
    data.subscribers.display = formatCompact(data.subscribers.total);
  }

  return {
    data: data
  };
}