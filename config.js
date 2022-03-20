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
  hybridPage: 'https://example.retool.com/embedded/public/d5fbb6d8-6b13-493f-9de9-1dce016969ad',
  panelEmbed: 'https://example.retool.com/embedded/public/f808a1bf-8cb7-4de6-8f3e-19a5eea01059',
}
// Collection Maintencne
// 'https://example.retool.com/embedded/public/d67b65ab-3afa-4a58-9ba1-b3bcff63e7c5',

// Hello, Retool
// 'https://retoolin.tryretool.com/embedded/public/f7607e1f-670a-4ebf-9a09-be54cf17181e', 

// To Retool
// 'https://example.retool.com/embedded/public/f20866dc-4287-4e32-9199-23e80370ea90',

// From Retool
// 'https://example.retool.com/embedded/public/f808a1bf-8cb7-4de6-8f3e-19a5eea01059', 

// Geo Series Part 1 
// 'https://example.retool.com/embedded/public/d5fbb6d8-6b13-493f-9de9-1dce016969ad', 


/* FRONTEND CONFIG - hot reloading of all changes */

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
          groups: ['bronze', 'silver', 'gold'],
        },
        {
          title: 'Splash Page',
          icon: 'InboxIcon',
          url: '/splash_page',
          groups: ['bronze', 'silver', 'gold'],
        },
        {
          title: 'Full Page',
          icon: 'MailIcon',
          url: '/full_page_embed',
          groups: ['bronze', 'silver', 'gold'],
        },
      ]
    },
    {
      title: 'Second Section',
      items: [
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