---
layout: post
title: "Blogging with Jekyll and Linode Part 1: Jekyll"
date: 2014-04-20 22:19:57 -0700
comments: true
categories: tutorial blogging
tags:
- jekyll
- linode
- nginx
- git
---

# Part 1: Jekyll
This is the first post in a multi-part series on creating a new blog from scratch in Jekyll and hosting it yourself with Linode and nginx. In this series I will walk the reader through the creation of this blog from first typing `jekyll new` to it's currrent state.

Jekyll was described by its creator Tom Preston-Werner, co-founder of Github, as "blogging like a hacker". I received my degree is Computer Science and am currently working as a full-time developer, but I certainly don't believe you need to have a theoretical CS background to use Jekyll. I will try my best to go through each step in my process with the most miniminal assumptions possible. 

Along the way we will touch on the tools of the trade such as git, ruby, nginx, the terminal, text editors and networking. If I miss a key area along the way and you'd like me to write about it, please leave a comment.

## What is Jekyll (and when not to use it)

![Jekyll Logo]({% asset_path posts/blogging_with_jekyll/jekyll/logo.png %})

Jekyll is a static site generator written in ruby that serves as a file-based CMS[^1] for websites (usually blogs, but not necessarily). This description has two main keywords: **static** and **generator**

### static

Being static means that when a browswer requests your site, the server does not need to do any processing before serving the requested page. Contrast this to [cnn.com](cnn.com) for instance. If a broswer requests the home page for CNN, the server must query a database for all the stories that are currently top news, it must get local news based on your location, if you are logged in it must know what your preferences are, etc. With a static site a user will get the same page every time they go to a URL, with no runtime processing. 

This makes jekyll sites amazingly fast, especially when put together with the nginx server. It also has lower overhead for the server so a single machine can server a lot more pages to multiple people when your site gets overwhelmed by becoming a top hit on reddit.

There are drawbacks however. If you are creating a site where you need users to log in, or you want to set up a storefront and take payments, Jekyll is not for you. Make sure you know what kind of site you need before stepping in.

### generator

Secondly, Jekyll pages are generated. This separates the *content* of your site from the *presentation*. Once your have styled your site, and are happy with the navigation from page to page, you can focus solely on the content of your posts. I write my posts in [markdown](https://daringfireball.net/projects/markdown/) which is a syntax that allows me to write in plain text, without any html embedded. I can write quickly, it is easily readable in a text editor, and formatting is both easy and aesthetic. 

Jekyll then takes your Markdown posts and converts them into html to generate each page of your site. If you take a look at the [markdown I used][1] to generate this post, and compare it the the html output by using "show source" in your browser, you can see that the difference is enormous. Who would ever want to write a post in html when they could use a tool like markdown. 

I should mention that you can also use [Textile](http://textile.sitemonks.com) markup if you prefer it to Mardown, but I have never done so.

## Using Jekyll

### Including site partials

Jekyll is a site generator, and that becomes most obvious by how modular it allows you to be when designing your site. On my site I want a header and footer on every page, so I wrote the those module in their own *partial* files `_includes/header.html` and `_includes/footer.html` and am able to include them anywhere I want just by calling  {% raw %}  `{% include header.html %} ` {% endraw %}

### Directory structure

Jekyll relies on a well-defined directory structure in order to generate your site. It has to know where your posts live, how to combine a markdown post with the html of your site layout, where partial files are stored, and what variables define your site url, link formatting, and generation preferences. 

The basic structure is that any directory or file beginning with an underscore is used for the generation phase of the site, while any file without a leading underscore will be used thought of as a final page/post after generating the site.

Posts will either go in the *_posts* or *_drafts* folder, depending on whether you want them published yet. HTML style and navigation will be put in the *_layouts* or *_includes* directories. The *_config.yml* file will contain the preferences variables defining your site url and author, etc. Finally, the generated site will be creating in the *_site* directory.

    .
    ├── _config.yml
    ├── _drafts
    |   ├── begin-with-the-crazy-ideas.textile
    |   └── on-simplicity-in-technology.markdown
    ├── _includes
    |   ├── footer.html
    |   └── header.html
    ├── _layouts
    |   ├── default.html
    |   └── post.html
    ├── _posts
    |   ├── 2007-10-29-why-every-programmer-should-play-nethack.textile
    |   └── 2009-04-26-barcamp-boston-4-roundup.textile
    ├── _data
    |   └── members.yml
    ├── _site
    └── index.html

## Jekyll command line tools

Jekyll comes with two important tools for the creation of your site.

    $ jekyll build

*jekyll build* generates your site and places the generated HTML into the *_site* directory. When you are ready to deploy your site remotely this is the directory you should copy onto your remote server.

    $ jekyll serve --watch

*jekyll serve* builds your site and initates a local server on your development machine to preview what you are writing. By default the server starts on port 4000, so all you need to do is open a browswer and go to `http://localhost:4000`

*jekyll serve --watch* does the same thing as *serve*, but every time you change a file, the server will be restarted to reflect the new change. This can come in handy when you are actively working on a post, and want to see in real time how your markdown is being converted into HTML and how the final page will look. 

## Need more help

This isn't always true in the world of open source tools, but the Jekyll website is fantastic and explains each concept in depth with examples. I used the website's documentation extensively in creating the blog and highly recommend it. The documentation is at [jekyllrb.com](http://www.jekyllrb.com)

#### Notes

[^1]: CMS: content management system

[1]: https://raw.githubusercontent.com/adamwalz/adamwalz.net/master/_posts/2014-04-20-blogging-with-jekyll-and-linode-part-1-jekyll.md
