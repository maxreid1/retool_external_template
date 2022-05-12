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
        title: 'Landing Pages',
        type: 'landing_pages',
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
        title: 'Public Full Page Apps',
        type: 'public_embeds',
        items: [
          {
            title: 'Public Page 1',
            icon: 'MailIcon',
            url: '/public_embed_1',
            retool_app: 'https://example.retool.com/embedded/public/86784719-70dd-419a-b28f-d4d1e7788729',
            groups: [],
          },
          {
            title: 'Public Page 2',
            icon: 'AddToDriveIcon',
            url: '/public_embed_2',
            retool_app: 'https://example.retool.com/embedded/public/86784719-70dd-419a-b28f-d4d1e7788729',
            groups: [],
          },
        ]
      },
      {
        title: 'Default Demo Apps',
        type: 'default_demo_apps',
        items: [
          {
            title: 'Full Page',
            icon: 'MailIcon',
            url: '/full_page_embed',
            retool_app: 'https://demos.retool.com/apps/3f0173e6-cc7d-11ec-945a-d74c1b48b4d0/Jon/Account%20Dashboard%20copy',
            groups: ['bronze', 'silver', 'gold'],
          },
          {
            title: 'Hybrid',
            icon: 'AddToDriveIcon',
            url: '/hybrid_page',
            retool_app: 'https://example.retool.com/embedded/public/86784719-70dd-419a-b28f-d4d1e7788729',
            groups: ['silver', 'gold'],
          },
          {
            title: 'Panel',
            icon: 'BarChartIcon',
            url: '/panel_embed',
            retool_app: 'https://example.retool.com/embedded/public/f808a1bf-8cb7-4de6-8f3e-19a5eea01059',
            groups: ['gold'],
          },
        ]
      },
      {
        title: 'Protected Full Page Apps',
        type: 'protected_embeds',
        items: [
          {
            title: 'Protected App 1',
            icon: 'MailIcon',
            url: '/protected_embed_1',
            retool_app: 'https://demos.retool.com/apps/3f0173e6-cc7d-11ec-945a-d74c1b48b4d0/Jon/Account%20Dashboard%20copy',
            groups: ['gold'],
          },
          {
            title: 'Protected App 2',
            icon: 'AddToDriveIcon',
            url: '/protected_embed_2',
            retool_app: 'https://demos.retool.com/apps/3f0173e6-cc7d-11ec-945a-d74c1b48b4d0/Jon/Account%20Dashboard%20copy',
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