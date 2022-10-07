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
          // {
          //   title: 'Splash Page',
          //   icon: 'home',
          //   slug: null,
          //   groups: [],
          // },
          // {
          //   title: 'Profile Page',
          //   icon: 'dashboard',
          //   slug: 'profile_page',
          //   groups: [],
          // },
        ]
      },
      {
        section: 'default_demo',
        items: [
          {
            title: 'Store Overview',
            icon: 'store',
            slug: 'full_page_embed',
            retool_app: 'https://demos.retool.dev/apps/Embed%20Demo%20-%20Merchant%20Portal/1%20Bronze%20-%20Store%20Overview?_embed=true',
            groups: ['bronze', 'silver', 'gold'],
          },
          {
            title: 'Orders',
            icon: 'fastfood',
            slug: 'hybrid_page',
            retool_app: 'https://demos.retool.dev/apps/Embed%20Demo%20-%20Merchant%20Portal/2%20Bronze%20-%20See%20and%20Refund%20Orders?_embed=true',
            groups: ['bronze','silver', 'gold'],
          },
          {
            title: 'Store Availability',
            icon: 'access_time',
            slug: 'panel_page',
            retool_app: 'https://demos.retool.dev/apps/Embed%20Demo%20-%20Merchant%20Portal/3%20Bronze%20(Hybrid%20Page)%20-%20Store%20Availability?_embed=true',
            groups: ['bronze','silver','gold'],
          },
          {
            title: 'Coupon Generator',
            icon: 'attach_money',
            slug: 'panel_page2',
            retool_app: 'https://demos.retool.dev/apps/Embed%20Demo%20-%20Merchant%20Portal/4%20Silver%20-%20Coupon%20Generator?_embed=tru',
            groups: ['silver','gold'],
          },
        ]
      },
      {
        section: 'protected',
        items: [
          {
            title: 'Customer Engagement',
            icon: 'person',
            slug: 'custom_demo_3',
            retool_app: 'https://demos.retool.dev/apps/Embed%20Demo%20-%20Merchant%20Portal/5%20Gold%20-%20Customer%20Engagement?_embed=true',
            groups: ['gold'],
          },
          {
            title: 'Custom Views',
            icon: 'search',
            slug: 'custom_demo_4',
            retool_app: 'https://demos.retool.dev/apps/Embed%20Demo%20-%20Merchant%20Portal/5%20Gold%20-%20Custom%20View%20Generator#name=&view=0?_embed=true',
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
        main: "#000000",
        light: "#E06363",
        dark: "#972A2A",
        contrastText: "#fff"
      },
    },
    typography: {
      fontFamily: "Nunito"
    },
    components: {

    }
  }