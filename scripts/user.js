// Disable password saving
user_pref("signon.rememberSignons", false)
user_pref("signon.autofillForms", false)
user_pref("signon.formlessCapture.enabled", false)

// Disable form autocomplete
user_pref("browser.formfill.enable", false)

// Disable popup notifications
user_pref("browser.popup.disable_from_plugins", 2)
user_pref("dom.disable_beforeunload", true)

// Disable other prompts
user_pref("browser.toolbars.bookmarks.visibility", "never")
user_pref("browser.aboutConfig.showWarning", false)

// Additional kiosk-friendly settings
user_pref("browser.startup.homepage", "about:blank")
user_pref("browser.shell.checkDefaultBrowser", false)
