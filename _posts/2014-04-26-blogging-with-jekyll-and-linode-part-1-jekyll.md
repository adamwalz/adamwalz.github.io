---
title: "Blogging with Jekyll and Linode Part 1: Jekyll"
date: '2014-04-26 20:21:57 -0700'
comments: true
description: Introduction to blogging with Jekyll by learning what Jekyll is, when it should be used, and how to get started with a tutorial on building your first site
keywords: jekyll blog tutorial
categories: tutorial blogging
tags:
- jekyll
- linode
- nginx
- git
---

# Part 1: Jekyll
This is the first post in a multi-part series on creating a new blog from scratch in Jekyll and hosting it yourself with Linode and nginx. In this series I will walk the reader through the creation of *this* blog from first typing `jekyll new` to its current state.

Jekyll was described by its creator Tom Preston-Werner, co-founder of Github, as "blogging like a hacker". I received my degree is Computer Science and am currently working as a full-time developer, but I certainly don't believe you need to have a theoretical CS background to use Jekyll. I will try my best to go through each step in my process with the most minimal assumptions possible. 

Along the way we will touch on the tools of the trade such as git, ruby, nginx, the terminal, text editors, and networking. If I miss a key area along the way and you'd like me to write about it, please leave a comment.

tl;dr? Jump ahead to the [tutorial](#create-your-own)

## What is Jekyll (and when not to use it)

{% picture posts/blogging_with_jekyll/jekyll/logo.png alt="Jekyll logo" %}

Jekyll is a static site generator that serves as a file-based content management system for websites (usually blogs, but not necessarily). This description has two main keywords: **static** and **generator**.



#### static

Being static means that when a browser requests your site, the server does not need to do any processing before serving the requested page. Contrast this to [cnn.com](http://www.cnn.com) for instance. If a browser requests the home page for CNN, the server must look up in a database all the stories that are currently top news, it must get local news based on your location, if you are logged in it must know what your preferences are, etc. With a static site a user will get the same page every time they type the same web address[^1], with no runtime processing. 

This makes jekyll sites amazingly fast, especially when put together with the nginx server. It also has lower overhead for the server so a single machine can serve a lot more pages to multiple people when your site gets overwhelmed by becoming a top hit on reddit for instance.

There are drawbacks however. If you are creating a site where you need users to log in, or you want to setup a storefront and take payments, Jekyll is not for you[^2]. These examples are called *dynamic* sites: sites that change based on the user's actions. Make sure you know what kind of site you need before stepping in.

#### generator

Secondly, Jekyll pages are generated. This separates the *content* of your site from the *presentation*. Once you have styled your site, and are happy with the navigation from page to page, you can focus solely on the content of your posts. I write my posts in [Markdown](https://daringfireball.net/projects/markdown/) which is a small, simple syntax that allows me to write in plain text, without any html embedded. I can write quickly, it is easily readable in a text editor, and formatting is both intuitive and aesthetic. For example, want to create a header, just underline it.

    Part 1: Jekyll
    ==============

Jekyll then takes your Markdown posts and converts them into html to generate each page of your site. If you take a look at the [Markdown I used][1] to generate this post, and compare it to the the html output by using "show source" in your browser, you can see that the difference is enormous. After comparing those two options, which would you rather write in when getting your thoughts across on screen?

I should mention that you can also use [Textile](http://textile.sitemonks.com) markup if you prefer it to Markdown, but I have never done so.

## Using Jekyll

#### Separating your site logic

Jekyll is a site generator, and this has a major benefit when creating your site layout. I want a header and footer on each page of my site, but I certainly don't want to re-write them every time I create a new post. With jekyll I can write them once and put the header and footer in their own files. It is then just a matter of telling jekyll where I want to use each of those files, and when my site is built jekyll will take care of finding all the sources it needs and compiling them into a single html file for each page.

When creating your own site, keep in mind that these files, know as *includes*, can be as long or as short as you want them to be. My rule of thumb is that if I am going to copy and paste one bit of code into two pages, use an include. For example, this is my entire *header.html* include file.

{% highlight html %}
<div class="container">
  Hi. I'm {% raw %}{{ site.author }}{% endraw %}.
  <h3 class="tagline">Here are some thoughts of mine.</h3>
</div>
{% endhighlight %}

#### File Structure

Jekyll relies on a well-defined directory/folder structure in order to generate your site. It has to know where your posts live, how to combine a markdown post with the html of your site layout, where includes files are stored, and which configurations you've set such as your site url.

The basic requirement is that any directory or file beginning with an underscore is used for the generation phase of the site, while any file without a leading underscore will be used as a final page/post after generating the site.

Posts will either go in the *_posts* or *_drafts* folder, depending on whether you want them published yet. HTML style and navigation will be put in the *_layouts* or *_includes* directories. The *_config.yml* file contains site-wide configurations defining the site's url, author, link formatting, etc. When jekyll generates the site, the output will be created in the *_site* directory.

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

*jekyll serve \-\-watch* does the same thing as *serve*, but every time you change a file, the preview will be automatically regenerated to reflect this change. This can come in handy when you are actively working on a post, and want to see in real time how your markdown is being converted into HTML and how the final page will look. 

## Create your own

Ok, tutorial time. Everything we'll be doing from this point on will be in a command line terminal and a simple text editor.

Since jekyll is written in the ruby programming language, we'll use ruby-gems to install jekyll on your computer. Both ruby and ruby-gems are probably already available, but other than their availability, you don't need to know much about them to get started. 

{% highlight bash %}
$ gem install jekyll
{% endhighlight %}

Jekyll provides the scaffolding of your new website by default, and gives an easy way to create the necessary directory structure previously mentioned. Typing *jekyll new directory* will create all the folders needed to start a new site.

{% highlight bash %}
$ jekyll new my-blog
New jekyll site installed in /Users/adamwalz/my-blog.
{% endhighlight %}

And thats it. You have just created an entire site. Go into that directory and preview it with *jekyll serve* to see how it looks. After running the *jekyll serve* command, open a browser and go to `http://localhost:4000`

{% highlight bash %}
$ cd my-blog
$ jekyll serve
Configuration file: /Users/adamwalz/my-blog/_config.yml
            Source: /Users/adamwalz/my-blog
       Destination: /Users/adamwalz/my-blog/_site
      Generating... done.
    Server address: http://0.0.0.0:4000
  Server running... press ctrl-c to stop.
{% endhighlight %}

{% picture posts/blogging_with_jekyll/jekyll/jekyll_new.png alt="Jekyll new" %}

To start changing some of the default options, open *_config.yml* and edit the text after `name:` to change the title of the site. You can also start by editing these lines in *_layouts/default.html* to change the links in the footer of the site.

{% highlight html %}
<p>
  <a href="https://github.com/yourusername">github.com/yourusername</a><br />
  <a href="https://twitter.com/yourusername">twitter.com/yourusername</a><br />
</p>
{% endhighlight %}

Finally, the sample first blog post, written in Markdown is in *_posts/welcome-to-jekyll.markdown*. Opening that file in a text editor will give you a lot of insight into what markdown feels like, and how to add links and even a block of syntax-highlighted code. One thing in this file is unique to jekyll however, and not Markdown.

{% highlight yaml %}
---
layout: post
title:  "Welcome to Jekyll!"
date:   2014-04-26 19:06:39
categories: jekyll update
---
{% endhighlight %}

This is called *yaml frontmatter* and you will use it on almost every page you write. This is a list of configurations for the page. In the default frontmatter provided for this post there are variables for

* **layout** - Which file to use for the look and feel of the page, in this case _layout/post.html
* **title** - The title of this blog post
* **date** - The publishing date you want associated with the post, it should not change after you deploy your site
* **categories** - This section will affect the final url when you deploy the generated site. In this case, since the categories are *jekyll* and *update*, the post will have the url *http://localhost:4000/jekyll/update/2014/04/26/welcome-to-jekyll.html*

## Coming up next

From here I recommend playing around with the pre-created files. Change one line at a time and then preview with *jekyll serve* and see what happens. You can create a new post by creating a file under *_posts* and follow the naming convention.

This isn't always true in the world of open source tools, but the Jekyll website is fantastic and explains each concept in depth with examples. I used the website's documentation extensively in creating this blog and highly recommend it. The documentation is at [jekyllrb.com](http://www.jekyllrb.com).

Coming up next in this series I will talk about git, a commonly used tool to keep track of each change your make to the code on your site, and be able to revert back to any change you have previously made if something goes wrong. Along with git I will be using the site [github.com](http://www.github.com) to store the code for your site on the internet, so you can edit it from any computer you are at.

#### Notes

[^1]: As long as you haven't updated your site in the meantime by re-building with jekyll.
[^2]: If you're in the market to create your own dynamic site, I recommend using Ruby on Rails. A great tutorial on setting up a Rails site with a database and user accounts can be found in Michael Hartl's [Ruby on Rails Tutorial](http://ruby.railstutorial.org)
[^3]: We'll talk about deployment in much more detail in an upcoming post.

[1]: https://raw.githubusercontent.com/adamwalz/adamwalz.net/master/_posts/2014-04-26-blogging-with-jekyll-and-linode-part-1-jekyll.md
