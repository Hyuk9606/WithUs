module.exports = {
  devServer: {
    port: process.env.VUE_APP_FRONTEND_PORT || 3000,
    clientLogLevel: "info",
    overlay: false,
  },
};
