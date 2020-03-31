export const Notifications = {
  methods: {
    $_notify_success(title, text) {
      this.$vs.notify({
        position: "top-right",
        color: "success",
        title: title,
        text: text,
      });
    },

    $_notify_error(title, text) {
      this.$vs.notify({
        position: "top-right",
        color: "danger",
        title: title,
        text: text,
      });
    },
  },
};
