// ./src/api/endpoints.js

export const endpoints = {
  auth: {
    signup: "auth/signup",
    signin: "auth/signin",
    adminsignin: "auth/admin/signin",
  },
  asset: {
    add: "asset/add",
    history: "asset/history",
  },
  wallet: {
    history: "wallet",
    update: "wallet/update",
  },
  address: "address",
  getCountry: "country",
  plans: {
    add: "user/plans/add",
    history: "user/plans/",
  },
  upload: "uploads",
  verification: {
    start: "verification/start",
    get: "verification",
  },
  user: {
    get: "user",
  },
  message: {
    send: "chat/sendMessage",
    // get: "chat/getUpdates",
    getMessages: "chat/messages",
    getHistory: "chat",
    // save: "chat/save",
    close: "chat/close",
  },
  admin: {
    getUsers: "admin/users/getusers",
    getUserTransactions: "admin/user/transactions",
    updateTransaction: "admin/user/transaction/update",
    updateVerification: "admin/user/verification/update",
    getPlans: "admin/user/plans",
    getChatId: "admin/chat/getChatId",
    addChatId: "admin/chat/addChatId",
    // getwallets: "admin/wallet/getwallets",
    getAddresses: "admin/address",
    updateAddresses: "admin/address/update",
  },
};
