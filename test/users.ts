type UserCredentials = {
  auth: {
    username: string;
    password: string;
  };
};

export const dummyUser: UserCredentials = {
  auth: {
    username: "dummy",
    password: "dummy",
  },
};
