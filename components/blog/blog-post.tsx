import { format } from "date-fns"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, MessageSquare } from "lucide-react"

interface BlogPostProps {
  post: {
    id: string
    title: string
    excerpt: string
    content: string
    coverImage: string
    publishedAt: string
    readingTime: number
    author: {
      name: string
      avatar: string
    }
    category: string
    tags: string[]
  }
}

export function BlogPost({ post }: BlogPostProps) {
  const formattedDate = format(new Date(post.publishedAt), "MMMM d, yyyy")

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <Badge variant="outline" className="mb-4">
          {post.category}
        </Badge>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime} min read</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <Avatar>
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{post.author.name}</div>
            <div className="text-sm text-muted-foreground">Author</div>
          </div>
        </div>

        {post.coverImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.coverImage || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-auto object-cover aspect-[21/9]"
            />
          </div>
        )}
      </div>

      <div
        className="prose prose-lg dark:prose-invert max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex justify-between items-center border-t pt-6">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Bookmark className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          Comments
        </Button>
      </div>
    </article>
  )
}
