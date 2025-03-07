// Create a more comprehensive styled mock
const styledFunction = () => () => ({});

// Create a proxy to handle any element type
const styled = new Proxy(styledFunction, {
    get: (target, prop) => {
        // For any property access like styled.div, styled.header, etc., return a function
        if (typeof prop === 'string') {
            return () => () => ({});
        }
        return target[prop as keyof typeof target];
    }
});

const createGlobalStyle = () => ({});
const css = () => ({});
const ThemeProvider = ({ children }: { children: any }) => children;
const keyframes = () => '';

export { createGlobalStyle, css, ThemeProvider, keyframes };
export default styled;