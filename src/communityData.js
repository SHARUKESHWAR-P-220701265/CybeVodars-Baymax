// mock data + simple “persistence”
export const CHANNELS = [
  { id: "general", name: "General Support", description: "Talk about anything" },
  { id: "anxiety", name: "Anxiety", description: "Coping tips, peer help" },
  { id: "sleep", name: "Sleep & Recovery", description: "Sleep hygiene, routines" },
  { id: "study", name: "Study Stress", description: "Deadlines, focus, burnout" },
];

export function loadMessages(channelId) {
  const key = `cm_msgs_${channelId}`;
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [
    { id: 1, user: "BayMax", text: `Welcome to #${channelId}!`, ts: Date.now() }
  ];
}

export function saveMessage(channelId, msg) {
  const key = `cm_msgs_${channelId}`;
  const list = loadMessages(channelId);
  list.push(msg);
  localStorage.setItem(key, JSON.stringify(list));
}
