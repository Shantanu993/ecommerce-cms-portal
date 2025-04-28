// Factory Pattern for creating different content types
export interface ContentProps {
  id: string
  title: string
  description: string
  content: string
  author: string
  createdAt: Date
  updatedAt: Date
  status: "draft" | "published" | "archived"
}

export abstract class Content {
  id: string
  title: string
  description: string
  content: string
  author: string
  createdAt: Date
  updatedAt: Date
  status: "draft" | "published" | "archived"

  constructor(props: ContentProps) {
    this.id = props.id
    this.title = props.title
    this.description = props.description
    this.content = props.content
    this.author = props.author
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
    this.status = props.status
  }

  abstract getType(): string
}

export class BlogPost extends Content {
  getType(): string {
    return "blog"
  }
}

export class Page extends Content {
  getType(): string {
    return "page"
  }
}

export class Banner extends Content {
  getType(): string {
    return "banner"
  }
}

export class ContentFactory {
  static createContent(type: string, props: ContentProps): Content {
    switch (type) {
      case "blog":
        return new BlogPost(props)
      case "page":
        return new Page(props)
      case "banner":
        return new Banner(props)
      default:
        throw new Error(`Content type ${type} not supported`)
    }
  }
}
