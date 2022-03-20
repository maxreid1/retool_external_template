/* single config.js for monorepo - could be replaced by package level config files */

/* BACKEND CONFIG – requires restart of Express (yarn dev) */
exports.auth = {
  tokenDuration: '1800s',
  fallbackToDefault: true, // WARNING: over-riding authentication purely for demo purposes only!
}

exports.default_user = {
  username: 'john.doe@example.com',
  roles: ['admin']
}

exports.api = {
  testResponse: 'Retool External Template',
}

exports.publicApps = {
  fullPage: 'https://example.retool.com/embedded/public/d67b65ab-3afa-4a58-9ba1-b3bcff63e7c5',
  hybridPage: 'https://example.retool.com/embedded/public/f20866dc-4287-4e32-9199-23e80370ea90',
  panelPage: '',
}

/* FRONTEND CONFIG - hot reloading of all changes */

/* 
  Available icons:
    InboxIcon
    MailIcon
    AddToDriveIcon
    BarChartIcon

  Additional icons must be imported in to: 
    /frontend/src/pages/HomePage/HomePage.js
*/

exports.homepage = {
  title: 'Title from Homepage.js',
  sidebar: [
    {
      title: 'First Section',
      items: [
        {
          title: 'Splash Page',
          icon: 'InboxIcon',
          url: '/splash_page'
        },
        {
          title: 'FullPageEmbed',
          icon: 'MailIcon',
          url: '/full_page_embed'
        },
      ]
    },
    {
      title: 'Second Section',
      items: [
        {
          title: 'Hybrid Page',
          icon: 'AddToDriveIcon',
          url: '/hybrid_page'
        },
        {
          title: 'Panel Embed (TBD)',
          icon: 'BarChartIcon',
          url: '/panel_embed'
        },
      ]
    },
  ]
}

// TODO: Build an example mapping to a white theme in Retool
exports.theme = {
  palette: {
    primary: {
      main: "#d93d3d",
      light: "#E06363",
      dark: "#972A2A",
      contrastText: "#fff"
    },
  }
}