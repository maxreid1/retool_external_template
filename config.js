/* single config.js for monorepo - could be replaced by package level config files */

/* BACKEND CONFIG – requires restart of Express (yarn dev) */
exports.default_user = {
  username: 'john.doe@example.com',
  roles: ['gold', 'silver', 'bronze']
}

exports.auth = {
  tokenDuration: '1800s',
}

/* FRONTEND CONFIG - hot reloading of all changes */

exports.publicApps = {
  fullPage: 'https://example.retool.com/embedded/public/d67b65ab-3afa-4a58-9ba1-b3bcff63e7c5',
  // hybridPage: 'https://example.retool.com/embedded/public/d5fbb6d8-6b13-493f-9de9-1dce016969ad',
  // hybridPage: 'https://example.retool.com/embedded/public/f20866dc-4287-4e32-9199-23e80370ea90',
  hybridPage: 'https://example.retool.com/embedded/public/86784719-70dd-419a-b28f-d4d1e7788729',
  // hybridPage: 'https://example.retool.com/embedded/public/a635a843-bf5f-46e6-8140-2d0882673e8b',
  panelEmbed: 'https://example.retool.com/embedded/public/f808a1bf-8cb7-4de6-8f3e-19a5eea01059',
}

/* 
  Available icons:
    HomeIcon
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
          title: 'Home Page',
          icon: 'HomeIcon',
          url: '/',
          groups: [],
        },
        {
          title: 'Splash Page',
          icon: 'InboxIcon',
          url: '/splash_page',
          groups: [],
        },
      ]
    },
    {
      title: 'Second Section',
      items: [
        {
          title: 'Full Page',
          icon: 'MailIcon',
          url: '/full_page_embed',
          groups: ['bronze', 'silver', 'gold'],
        },
        {
          title: 'Hybrid',
          icon: 'AddToDriveIcon',
          url: '/hybrid_page',
          groups: ['silver', 'gold'],
        },
        {
          title: 'Panel',
          icon: 'BarChartIcon',
          url: '/panel_embed',
          groups: ['gold'],
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