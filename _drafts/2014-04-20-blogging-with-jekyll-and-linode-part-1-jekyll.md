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
This is the first post in a multi-part series on creating a new blog from scratch in Jekyll and hosting it yourself with Linode and nginx. In this series I will walk the reader through the creation of *this* blog from first typing `jekyll new` to its currrent state.

Jekyll was described by it's creator Tom Preston-Werner, co-founder of Github, as "blogging like a hacker". I received my degree is Computer Science and am currently working as a full-time developer, but I certainly don't believe you need to have a theoretical CS background to use Jekyll. I will try my best to go through each step in my process with the most miniminal assumptions possible. 

Along the way we will touch on the tools of the trade such as git, ruby, nginx, the terminal, text editors and networking. If I miss a key area along the way and you'd like me to write about it, please leave a comment.

## What is Jekyll (and when not to use it)

![Jekyll Logo]({% asset_path posts/blogging_with_jekyll/jekyll/logo.png %})

Jekyll is a static site generator that serves as a file-based content managment system for websites (usually blogs, but not necessarily). This description has two main keywords: **static** and **generator**

### static

Being static means that when a browswer requests your site, the server does not need to do any processing before serving the requested page. Contrast this to [cnn.com](cnn.com) for instance. If a broswer requests the home page for CNN, the server must look up in a database all the stories that are currently top news, it must get local news based on your location, if you are logged in it must know what your preferences are, etc. With a static site a user will get the same page every time they type the same web address[^1], with no runtime processing. 

This makes jekyll sites amazingly fast, especially when put together with the nginx server. It also has lower overhead for the server so a single machine can serve a lot more pages to multiple people when your site gets overwhelmed by becoming a top hit on reddit.

There are drawbacks however. If you are creating a site where you need users to log in, or you want to setup a storefront and take payments, Jekyll is not for you[^2]. These examples are called *dynamic* sites: sites that change based on the user's actions. Make sure you know what kind of site you need before stepping in.

### generator

Secondly, Jekyll pages are generated. This separates the *content* of your site from the *presentation*. Once you have styled your site, and are happy with the navigation from page to page, you can focus solely on the content of your posts. I write my posts in [Markdown](https://daringfireball.net/projects/markdown/) which is a small, easy syntax that allows me to write in plain text, without any html embedded. I can write quickly, it is easily readable in a text editor, and formatting is both intuitive and aesthetic. For example, want to creat a header, just underline it.

    Part 1: Jekyll
    ==============

Jekyll then takes your Markdown posts and converts them into html to generate each page of your site. If you take a look at the [Markdown I used][1] to generate this post, and compare it the the html output by using "show source" in your browser, you can see that the difference is enormous. After comparing those two options, which would you rather write in when getting your thoughts accross on screen?

I should mention that you can also use [Textile](http://textile.sitemonks.com) markup if you prefer it to Mardown, but I have never done so.

## Using Jekyll

### Separating your site logic

Jekyll is a site generator, and this has a major benefit when creating your site layout. I want a header and footer on each page of my site, but I certainly don't want to re-write them every time I create a new post. With jekyll I can write them once and put the header and footer in their own files. It is then just a matter of telling jekyll where I want to use each of those files, and when my site is built jekyll will take care of finding all the sources it needs and compiling them into a single html file for each page.

When creating your own site, keep in mind that these *includes* files can be as long or as short as you want them to be. My rule of thumb is that if I am going to copy and paste one bit of code into two pages, use an include. For example, this is my entire *header.html* include file.

{% highlight html %}
<div class="container">
  Hi. I'm {% raw %}{{ site.author }}{% endraw %}.
  <h3 class="tagline">Here are some thoughts of mine.</h3>
</div>
{% endhighlight %}

### Directory structure

Jekyll relies on a well-defined directory structure in order to generate your site. It has to know where your posts live, how to combine a markdown post with the html of your site layout, where includes files are stored, and which configurations you've set such as your site url.

The basic requirement is that any directory or file beginning with an underscore is used for the generation phase of the site, while any file without a leading underscore will be used thought of as a final page/post after generating the site.

Posts will either go in the *_posts* or *_drafts* folder, depending on whether you want them published yet. HTML style and navigation will be put in the *_layouts* or *_includes* directories. The *_config.yml* file will sitewide configurations defining the site's url, author, link formatting, etc. When jekyll generates the site, the output will be created in the *_site* directory.

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

{% highlight bash %}
$ jekyll build
{% endhighlight %}

*jekyll build* generates your site and places the generated HTML into the *_site* directory. When you are ready to deploy your site to the web, this is the directory you should copy onto your remote server[^3].

{% highlight bash %}
$ jekyll serve --watch
{% endhighlight %}

*jekyll serve* builds your site and allows you to preview what you are writing on your own computer, before it goes live to the web. After typing *jekyll serve*, simply open up a web browser and go to `http://localhost:4000`

*jekyll serve --watch* does the same thing as *serve*, but every time you change a file, the preview will be automatically regenerated to reflect this change. This can come in handy when you are actively working on a post, and want to see in real time how your markdown is being converted into HTML and how the final page will look. 

## Need more help

This isn't always true in the world of open source tools, but the Jekyll website is fantastic and explains each concept in depth with examples. I used the website's documentation extensively in creating this blog and highly recommend it. The documentation is at [jekyllrb.com](http://www.jekyllrb.com)

#### Notes

[^1]: As long as you haven't updated your site in the meantime by re-building with jekyll.
[^2]: If you're in the market to create your own dynamic site, I recommend using Ruby on Rails. A great tutorial on setting up a Rails site with a database and user accounts can be found in Michael Hartl's (Ruby on Rails Tutorial)[http://ruby.railstutorial.org]
[^3]: We'll talk about deployment in much more detail in an upcoming post.

[1]: https://raw.githubusercontent.com/adamwalz/adamwalz.net/master/_posts/2014-04-20-blogging-with-jekyll-and-linode-part-1-jekyll.md
