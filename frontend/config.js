exports.deployOnLocalhost = true

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
            title: 'Home Page',
            icon: 'home',
            slug: '',
            // retool_app: 'https://demos.retool.dev/embedded/public/227f6799-7b3d-4fa2-9be7-ad215b933bf1',
            groups: ['bronze', 'silver', 'gold'],
          }
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
            title: 'Products',
            icon: 'fastfood',
            slug: 'products',
            retool_app: 'https://demos.retool.dev/embedded/public/7aa93c40-115f-4370-a2e0-15398d819d4f',
            groups: ['bronze', 'silver', 'gold'],
          },
          {
            title: 'Orders',
            icon: 'money',
            slug: 'full_page_embed',
            retool_app: 'https://demos.retool.dev/embedded/public/b1b812c9-e008-499d-9452-cbf546566a77',
            groups: ['bronze', 'silver', 'gold'],
          },
          // {
          //   title: 'Orders',
          //   icon: 'fastfood',
          //   slug: 'hybrid_page',
          //   retool_app: 'https://demos.retool.dev/apps/Embed%20Demo%20-%20Merchant%20Portal/2%20Bronze%20-%20See%20and%20Refund%20Orders?_embed=true',
          //   groups: ['bronze','silver', 'gold'],
          // },
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
            slug: 'coupon_generator',
            retool_app: 'https://demos.retool.dev/apps/Embed%20Demo%20-%20Merchant%20Portal/4%20Silver%20-%20Coupon%20Generator?_embed=true',
            groups: ['silver','gold'],
          },
        ]
      },
      {
        section: 'protected',
        items: [
          {
            title: 'Audiences',
            icon: 'person',
            slug: 'custom_demo_3',
            retool_app: 'https://demos.retool.dev/apps/Embed%20Demo%20-%20Merchant%20Portal/5%20Gold%20-%20Customer%20Engagement?_embed=true',
            groups: ['gold'],
          },
          {
            title: 'Custom Views',
            icon: 'search',
            slug: 'custom_demo_4',
            retool_app: 'https://demos.retool.dev/apps/Embed%20Demo%20-%20Merchant%20Portal/5%20Gold%20-%20Custom%20View%20Generator?_embed=true',
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