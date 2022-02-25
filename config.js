/* single config.js for monorepo - could be replaced by package level config files */

/* BACKEND CONFIG – requires restart of Express (yarn dev) */
exports.api = {
  testResponse: 'Retool External Template'
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
          url: '/page/A'
        },
        {
          title: 'FullPageEmbed',
          icon: 'MailIcon',
          url: '/page/B'
        },
      ]
    },
    {
      title: 'Second Section',
      items: [
        {
          title: 'Hybrid Page',
          icon: 'AddToDriveIcon',
          url: '/page/C'
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