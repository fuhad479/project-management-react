import Navigation from '../common/Navigation'

const Layout = ({ children }) => {
    return (
        <div className="w-full h-screen text-gray-700 bg-[hsl(210,29%,97%)]">
            <Navigation />
            {children}
        </div>
    )
}

export default Layout
