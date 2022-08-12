import { Link, useResolvedPath, useMatch } from 'react-router-dom'

export default function Navbar() {
    return <nav className="nav">
        <Link to="/" className="title">Editor</Link>
        <div className="links">
            <CustomLink to={"/me"}>Me</CustomLink>
            <CustomLink to={"/about"}>About</CustomLink>
            <CustomLink to={"/report"}>Report</CustomLink>
        </div>
    </nav>
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
    return (
        <Link className={isActive ? "link active" : "link"} to={to} {...props}>{children}</Link>
    )
}