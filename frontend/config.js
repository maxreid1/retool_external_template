exports.deployOnLocalhost = false

exports.auth = {
    tokenDuration: '1800s',
    REACT_APP_AUTH0_DOMAIN: 'dev-lekm7di5.us.auth0.com',
    REACT_APP_AUTH0_CLIENT_ID: 'XTvdIg69eapUmPCYItBeiLfmzLnChB5Q',
    REACT_APP_AUTH0_SCOPE: 'read:current_user update:current_user_metadata',
  }
  
  exports.retoolDomain = 'https://example.retool.com'
    
  /* 
    Icons reference: https://fonts.google.com/icons?selected=Material+Icons
    NOTE: icon names are case-sensitive, and should be of the form 'all lower caps'
  */
  
  exports.homepage = {
    sidebar: [
      {
        section: '',
        items: [
          {
            title: 'Splash Page',
            icon: 'home',
            slug: null,
            groups: [],
          },
          {
            title: 'Profile Page',
            icon: 'dashboard',
            slug: 'profile_page',
            groups: [],
          },
        ]
      },
      {
        section: 'default_demo',
        items: [
          {
            title: 'Store Overview',
            icon: 'verified user',
            slug: 'full_page_embed',
            retool_app: 'https://demos.retool.dev/apps/Embed%20Demo%20-%20Merchant%20Portal/1%20Bronze%20-%20Store%20Overview?_embed=true',
            groups: ['bronze', 'silver', 'gold'],
          },
          {
            title: 'Hybrid',
            icon: 'map',
            slug: 'hybrid_page',
            retool_app: 'https://example.retool.com/embedded/public/86784719-70dd-419a-b28f-d4d1e7788729',
            groups: ['silver', 'gold'],
          },
          {
            title: 'Panel',
            icon: 'face',
            slug: 'panel_page',
            retool_app: 'https://example.retool.com/embedded/public/f808a1bf-8cb7-4de6-8f3e-19a5eea01059',
            groups: ['gold'],
          },
        ]
      },
      {
        section: 'protected',
        items: [
          {
            title: 'Protected App 1',
            icon: 'camera',
            slug: 'custom_demo_3',
            retool_app: 'https://demos.retool.com/apps/3f0173e6-cc7d-11ec-945a-d74c1b48b4d0/Jon/Account%20Dashboard%20copy',
            groups: ['gold'],
          },
          {
            title: 'Protected App 2',
            icon: 'balance',
            slug: 'custom_demo_4',
            retool_app: 'https://demos.retool.com/apps/3f0173e6-cc7d-11ec-945a-d74c1b48b4d0/Jon/Account%20Dashboard%20copy',
            groups: ['gold'],
          },
        ]
      },
      // {
      //   section: 'public',
      //   items: [
      //     {
      //       title: 'Public Page 1',
      //       icon: 'anchor',
      //       slug: 'custom_demo_1',
      //       retool_app: 'https://example.retool.com/embedded/public/86784719-70dd-419a-b28f-d4d1e7788729',
      //       groups: [],
      //     },
      //     {
      //       title: 'Public Page 2',
      //       icon: 'help center',
      //       slug: 'custom_demo_2',
      //       retool_app: 'https://example.retool.com/embedded/public/f808a1bf-8cb7-4de6-8f3e-19a5eea01059',
      //       groups: [],
      //     },
      //   ]
      // },
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