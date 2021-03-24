// Ideally you should take these vars from process.env.REACT_APP_*
// and define them in e.g. .env.local (if you're using Create React App)

// Authorization screen base URL
// e.g. https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#1-request-a-users-github-identity
export const authorizationUrl =
  'https://authx-demo.modulus.intertrust.com/openid/authorize'

// To get a client ID, create an app, e.g.
// GitHub (authorization code grant only): https://github.com/settings/developers
// Spotify (implicit grant & auth code): https://developer.spotify.com/dashboard/applications
export const clientId = '7026ee10-2aa0-4132-8a1b-5fb6e0b4667d'
export const clientSecret =
  'b4qSyBIT3X5aDg0o17qf7ihDK1ltDilxiz2U07MGjE_KjEb6mKVj1EqPRqusrHjaYqWmh1OzzwtWuUHiBKgP525PahX0vMuMptZkWjx_MaEvwho7NPx3plu5DzT-omBW0UJUrKVfDlfJh2423fn5KnKM2PaLL5kvZHF0_RZltFk'

// You get to configure this in your OAuth settings
// If you use React Router, the relative path (empty here) can match
// that of a route which displays nothing
export const redirectUri = 'http://localhost:3000'

// Authorization code flow only: base URL for your server
// The one provided below is that of the sample Express server provided
export const serverUrl = 'https://authx-demo.modulus.intertrust.com/openid'

export const baseUrl = 'https://tips-fbyd7ynncq-uc.a.run.app'
