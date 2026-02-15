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

  // Mock data for testing (TRMNL user 6458)
  if (input.trmnl && input.trmnl.user && input.trmnl.user.id == 6458) {
    data.subscribers = {
      total: 1247,
      display: formatCompact(1247),
      recent: [
        { user_name: "NightOwlGamer", tier: "1000" },
        { user_name: "PixelDrift", tier: "2000" },
        { user_name: "CozyVibes42", tier: "1000" },
        { user_name: "StreamSniper99", tier: "3000" },
        { user_name: "ChillHopFan", tier: "1000" }
      ]
    };
    data.chatters = {
      total: 342,
      chatters: [
        { user_login: "NightOwlGamer" },
        { user_login: "PixelDrift" },
        { user_login: "CozyVibes42" },
        { user_login: "LurkerKing" },
        { user_login: "HypeTrainConductor" }
      ]
    };
    if (data.followers) {
      data.followers.total = 48562;
      data.followers.display = formatCompact(48562);
      data.followers.recent = [
        { user_name: "StardustPlayer", followed_at: "2025-02-14T10:30:00Z" },
        { user_name: "RetroArcade", followed_at: "2025-02-14T09:15:00Z" },
        { user_name: "CloudSurfer", followed_at: "2025-02-13T22:45:00Z" },
        { user_name: "MidnightCoder", followed_at: "2025-02-13T18:20:00Z" },
        { user_name: "EpicLootDrop", followed_at: "2025-02-13T14:00:00Z" }
      ];
    }
  }

  return {
    data: data
  };
}