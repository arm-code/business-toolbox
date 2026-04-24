import Link from "next/link"
import { Briefcase } from "lucide-react"

const footerLinks = {
    product: [
        { href: "/tools", label: "All Tools" },
        { href: "/tools/pos", label: "Point of Sale" },
        { href: "/tools/quotes", label: "Quote Generator" },
        { href: "/tools/expenses", label: "Expense Control" },
        { href: "/pricing", label: "Pricing" },
    ],
    resources: [
        { href: "#", label: "Help Center" },
        { href: "#", label: "Blog" },
        { href: "#", label: "Guides" },
        { href: "#", label: "API" },
    ],
    company: [
        { href: "#", label: "About" },
        { href: "#", label: "Contact" },
        { href: "#", label: "Privacy" },
        { href: "#", label: "Terms" },
    ],
}

export function Footer() {
    return (
        <footer className="border-t border-border bg-card">
            <div className="container mx-auto max-w-6xl px-4 py-12">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                                <Briefcase className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-xl font-semibold">ARM Solutions</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Simple, affordable business tools designed for small businesses, local shops, and entrepreneurs.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Product</h3>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Resources</h3>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Company</h3>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} ARM Solutions. All rights reserved.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Made with care for small businesses
                    </p>
                </div>
            </div>
        </footer>
    )
}
