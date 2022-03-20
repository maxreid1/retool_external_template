# How MUI components have been used

## Getting Started resources
https://mui.com/getting-started/templates/
https://mui.com/getting-started/learn/
- (React Material-UI Cookbook)[https://www.amazon.com/gp/product/1789615224/]

## Layout

- Overall layout
- AppBar
- Drawer
- Page content

### Overall layout
Box with display: flex

#### Grid
Grid is default layout component for main page content
<Grid container spacing={4} justify="center">
  <Grid item xs={12} sm={6} md={3}>

### Offset
- AppBar has a fixed position, which means it would overlay the drawer and page content unless they have some kind of offset
- https://mui.com/components/app-bar/#fixed-placement
- We're using the most explicit method, creating a dedicated component for the offset
`const AppBarOffset = styled('div')(({ theme }) => theme.mixins.toolbar)`

### AppBar

### Drawer

### Page content

## Theming

https://mui.com/customization/theming/
https://bareynol.github.io/mui-theme-creator/
https://material.io/inline-tools/color/


## References
https://stackoverflow.com/questions/52653103/what-is-appbar-vs-toolbar
