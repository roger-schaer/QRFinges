let extraConfig = {
  firebaseAuthDomain: "fingesforest.firebaseapp.com",
  firebaseProjectID: "fingesforest",
  firebaseStorageBucket: "fingesforest.appspot.com",
};

if (process.env.APP_ENV === "production") {
  // Production-level overrides
} else if (process.env.APP_ENV === "preview") {
  // Preview-level overrides
}

export default ({ config }) => {
  // ...
  return {
    ...config,
    extra: {
      ...extraConfig,
    },
  };
};
