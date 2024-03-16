// vuetify.options.js
export default function ({ app }) {
    app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale) => {}
  }