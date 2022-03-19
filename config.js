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
          title: 'Page X',
          icon: 'BarChartIcon',
          url: '/page/D'
        },
      ]
    },
  ]
}