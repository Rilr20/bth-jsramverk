import { Link, useResolvedPath, useMatch } from 'react-router-dom'

export default function Navbar() {
    return <nav className="nav">
        <CustomLink to={"/"}>Editor</CustomLink>
        <div className="links">
            <CustomLink to={"/me"}>Me</CustomLink>
            <CustomLink to={"/about"}>About</CustomLink>
            <CustomLink to={"/report"}>Report</CustomLink>
            <CustomLink to={"/account"}>Account</CustomLink>
        </div>
    </nav>
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    let classNames = ["link active", "link"]
    if(to === "/") {
        classNames[0] = classNames[0] + " title";
        classNames[1] = classNames[1] + " title";
    }
    return (
        <Link className={isActive ? classNames[0] : classNames[1]} to={to} {...props}>{children}</Link>
    )
}