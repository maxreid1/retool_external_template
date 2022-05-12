exports.deployOnLocalhost = false

exports.auth = {
    tokenDuration: '1800s',
    REACT_APP_AUTH0_DOMAIN: 'dev-lekm7di5.us.auth0.com',
    REACT_APP_AUTH0_CLIENT_ID: 'XTvdIg69eapUmPCYItBeiLfmzLnChB5Q',
    REACT_APP_AUTH0_SCOPE: 'read:current_user update:current_user_metadata',
  }
  
  exports.retoolDomain = 'https://example.retool.com'
  
  exports.publicApps = {
    // Public
    // fullPage: 'https://example.retool.com/embedded/public/d67b65ab-3afa-4a58-9ba1-b3bcff63e7c5',
    
    // SSO (Auth0)
    // fullPage: 'https://example.retool.com/apps/cf774868-8fda-11ec-9928-db5c2897b3aa/Jon%20-%20Examples/CollectionMaintenance',
    
    // SSO (Auth0)
    // fullPage: 'https://demos.retool.dev/apps/Marketplace%20Demo/Live%20Monitoring#name=',
  
    // email+password
    fullPage: 'https://demos.retool.com/apps/3f0173e6-cc7d-11ec-945a-d74c1b48b4d0/Jon/Account%20Dashboard%20copy?_releaseVersion=latest',
  
  
    hybridPage: 'https://example.retool.com/embedded/public/86784719-70dd-419a-b28f-d4d1e7788729',
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
            title: 'Splash Page',
            icon: 'HomeIcon',
            url: '/',
            groups: [],
          },
          {
            title: 'Profile Page',
            icon: 'InboxIcon',
            url: '/profile_page',
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