function transform(input) {
  const data = {};

  function formatCompact(num) {
    if (!num || num < 1000) return String(num || 0);
    if (num < 1000000) return (Math.round(num / 100) / 10) + "K";
    return (Math.round(num / 100000) / 10) + "M";
  }

  function first(idx) {
    return idx && idx.data && idx.data[0];
  }
  data.fetched_at = new Date().toISOString();

  // IDX_0 = /users
  data.user = first(input.IDX_0);

  // IDX_1 = /streams
  data.stream = first(input.IDX_1) || { type: "offline" };
  if (data.stream.viewer_count != null) {
    data.stream.viewer_display = formatCompact(data.stream.viewer_count);
  }

  // IDX_2 = /channels/followers
  if (input.IDX_2) {
    data.followers = { total: input.IDX_2.total || 0 };
    data.followers.display = formatCompact(data.followers.total);
  }

  // IDX_3 = /subscriptions
  if (input.IDX_3) {
    data.subscribers = { total: input.IDX_3.total || 0 };
    data.subscribers.display = formatCompact(data.subscribers.total);
  }

  // IDX_4 = /channels
  data.channel = first(input.IDX_4);

  // Enrich offline stream with channel data
  if (data.stream.type === "offline" && data.channel) {
    data.stream.game_name = data.channel.game_name || data.stream.game_name;
    data.stream.title = data.channel.title || data.stream.title;
    data.stream.tags = data.channel.tags || data.stream.tags;
  }

  // Mock data for testing (TRMNL user 6458)
  if (input.trmnl && input.trmnl.user && input.trmnl.user.id == 6458) {
    data.subscribers = { total: 1247, display: formatCompact(1247) };
    if (data.followers) {
      data.followers.total = 48562;
      data.followers.display = formatCompact(48562);
    }
    data.goal = {
      type: "follower",
      description: "Road to 50K followers",
      current_amount: 48562,
      current_display: formatCompact(48562),
      target_amount: 50000,
      target_display: formatCompact(50000)
    };
  }

  return { data: data };
}
