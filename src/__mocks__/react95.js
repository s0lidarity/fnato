const createMockComponent = (name) => {
    const component = (props) => {
        if (typeof props?.children === 'function') {
        return props.children();
        }
        return props?.children || null;
    };
    component.displayName = name;
    return component;
    };

module.exports = {
    AppBar: createMockComponent('AppBar'),
    Toolbar: createMockComponent('Toolbar'),
    Button: createMockComponent('Button'),
    List: createMockComponent('List'),
    ListItem: createMockComponent('ListItem'),
    Window: createMockComponent('Window'),
    WindowHeader: createMockComponent('WindowHeader'),
    WindowContent: createMockComponent('WindowContent'),
    MenuList: createMockComponent('MenuList'),
    MenuListItem: createMockComponent('MenuListItem'),
    Separator: createMockComponent('Separator'),
    ThemeProvider: ({ children }) => children,
    createTheme: () => ({}),
  // Add any other components you're using from react95
}; 