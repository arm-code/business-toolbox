"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, Briefcase, X, Box } from "lucide-react"

const navItems = [
    { href: "/tools", label: "Herramientas" },
    { href: "/pricing", label: "Precios" },
    { href: "/dashboard", label: "Panel" },
]

export function Header() {
    const [open, setOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                        <Box className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">Business Toolbox</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-6 md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <Button variant="ghost" asChild>
                        <Link href="/login">Log in</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/register">Get Started</Link>
                    </Button>
                </div>

                {/* Mobile Navigation */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <div className="flex flex-col gap-6 pt-6">
                            <div className="flex items-center justify-between">
                                <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                                        <Briefcase className="h-5 w-5 text-primary-foreground" />
                                    </div>
                                    <span className="text-xl font-semibold">ARM Solutions</span>
                                </Link>
                            </div>
                            <nav className="flex flex-col gap-4">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                                        onClick={() => setOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                            <div className="flex flex-col gap-3 pt-4">
                                <Button variant="outline" asChild className="w-full">
                                    <Link href="/login" onClick={() => setOpen(false)}>Log in</Link>
                                </Button>
                                <Button asChild className="w-full">
                                    <Link href="/register" onClick={() => setOpen(false)}>Get Started</Link>
                                </Button>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}
