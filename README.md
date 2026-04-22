# BolunDai0216.github.io

Repo for my personal website where I save my notes and showcase my work.

Coded up from scratch. Used Jekyll, Bootstrap and MathJax to make my life easier.

## Setup

Install [mise](https://mise.jdx.dev/), then from the repo root:

```
mise install
bundle install
```

This installs Ruby, `just`, and `bundler` (via the mise postinstall hook), then the Jekyll gems.

## How add a blog post

Create a new markdown file in the folder `_posts` with the naming format `YYYY-MM-DD-blog_post_name.md`. Then add the front matter

```markdown
--- 
page-type: blog-post 
title: Blog Post Name
description: Optional
class: [convex-opt | random | control-theory | deep-learning]
link: # url_link if external
text: # What appears in the card.
--- 
```

And write the content (if there is any).

## Serving locally

Serve on the local network (accessible from phone):
```
just serve
```

Find your IP:
```
just find-local-ip
```
Then open `http://<your-ip>:4000` on the other device.