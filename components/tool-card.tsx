import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ToolCardProps {
    title: string
    description: string
    icon: LucideIcon
    href: string
    badge?: "Free" | "Premium"
    featured?: boolean
}

export function ToolCard({ title, description, icon: Icon, href, badge = "Free", featured = false }: ToolCardProps) {
    return (
        <Card className={cn(
            "group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-primary/5",
            featured && "border-primary/30 bg-primary/[0.02]"
        )}>
            {featured && (
                <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 bg-primary/10 blur-2xl" />
            )}
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                    <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                        featured ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                    )}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <Badge variant={badge === "Free" ? "secondary" : "default"} className="text-xs">
                        {badge}
                    </Badge>
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription className="leading-relaxed">{description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
                <Button variant={featured ? "default" : "outline"} className="w-full" asChild>
                    <Link href={href}>Use Now</Link>
                </Button>
            </CardContent>
        </Card>
    )
}
