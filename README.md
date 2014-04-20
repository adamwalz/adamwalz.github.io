# Swarm Intelligence
### adamwalz.net

This directory contains data for my blog, [Swarm Intelligence](http://www.adamwalz.net).

It's automatically transformed by [Jekyll](http://jekyllrb.com) into a static site. Jekyll was created by [Tom Preston-Werner](http://tom.preston-werner.com/).

## Setup

This is how I personally build this site. I hack on macs so the following is very geared toward the latest version of OS X. If you want to take my site, but these instructions don't work for you, try the official [Jekyll documentation](http://jekyllrb.com/docs/home)

All dependencies to building and deploying this blog are written in ruby, and listed in `Gemfile`. To install these dependencies use [Bundler](http://bundler.io) and [rbenv](http://rbenv.org) if you don't want ruby to shit all over your system directories. For more information on that I have written a post about [Getting Started in Ruby]().

    bundle install

#### Previewing your blog

To build the blog with jekyll and start a local local server to preview the blog in a browser run

    rake preview

Then open a browser and go to `localhost:4000`. Note that the port number can be changed through the Rakefiles `server_port` variable.

## Creating a new page

#### Posts
Jekyll has two concepts for creating new content on a jekyll site. The first, and most common, is the *post*. A post is a blog entry, article, tutorial, etc. that has an author, a date, and a title. You can create a new post in either Markdown or Textile format. As long as your post includes YAML frontmatter Jekyll will convert it into an html page for your static site. New posts must be added to the *_posts* directory, and the file naming is important. Jekyll requires posts to be named according to the `YEAR-MONTH-DAY-title.MARKUP` convention. For more information on creating a post see the [Jekyll documentation](http://www.jekyllrb.com/docs/posts)

The Rakefile contains an easy shortcut to creating a new post with the current date. A new post created with rake will have a title, date, and YAML frontmatter already in place. The post is placed in the *_drafts* directory until you are ready to publish.

    $ rake new_post
    Enter a title for your post: My Cool Post
    Creating new post: _drafts/2014-04-19-my-cool-post.md

#### Pages

The other form of content is a *page*. Pages in jekyll do not necessarily have dates or authors, and are mostly used for navigation pages such as the homepage of your site. I also use pages for an *About Me* section of my website. Again the Rakefile has a really easy way to add a new page.

    Enter a title for your page: About
    mkdir -p About
    Creating new page: About/index.md

## Deploying

The Rakefile is currently on set up to deploy via rsync, but other deployment options, such as deployment to github pages, are available with a little tweaking. Before deploying, make sure to [setup your remote server]() and set the following variables in the Rakefile.

`ssh_user` - The username used to log in to your remote server

`ssh_host` - The hostname or ip address of your remote server

`ssh_port` - The port used by ssh (almost always 22)

`document_root` - The remote directory in which your generated site files will be copied into

## Making this site your own

I've tried hard to make this site as modular as possible, relying on Jekyll variables wherever I can. To take *adamwalz.net* and turn it into your own site, it should be as simple as doing the following. 

* Remove everything of mine from the *_posts* and *_drafts* directories
* Remove everything from the *_assets/images/posts* directory
* In *_config.yml* change the following variables to reflect your personal use
    - url
    - name
    - description
    - author
    - email
    - github_user
    - twitter_user
    - googleplus_user
    - linkedin_user
    - disqus_short_name
    - google_analytics_tracking_id
* Remove any Jekyll pages that you don't want. I probably won't keep this README updated after every page I add, but if you see a page such as About.html, go ahead and remove it if you don't want it. No harm will be done by removing a page.

Running `rake build` after doing this will create a blank blog with all of the styling I am currently using, but without any posts or content in the default pages.

## License

The following directories and their contents are Copyright Adam Walz. You may not reuse anything therein without my permission:

* _posts/
* _drafts/
* _assets/images/

All other directories and files are MIT Licensed. Feel free to use the HTML and CSS as you please. If you do use them, a link back to [github.com/adamwalz/adamwalz.net](http://github.com/adamwalz/adamwalz.net) would be appreciated, but is not required.
