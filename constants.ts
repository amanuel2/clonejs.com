export const MESSAGES_BATCH = 10;
export const DATE_FORMAT = "d MMM yyyy, HH:mm";

// socket.io keys
export const getQueryKey = (chatId: string) => `chat:${chatId}`;
export const getAddKey = (chatId: string) => `chat:${chatId}:messages`;
export const getUpdateKey = (chatId: string) =>
  `chat:${chatId}:messages:update`;
