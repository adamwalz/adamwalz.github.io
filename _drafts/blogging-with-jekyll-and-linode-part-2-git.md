---
layout: post
title: "Blogging with Jekyll and Linode Part 2: Git and Github"
date: '2014-04-27 07:57:57 -0700'
comments: true
description: Introduction to the Git source code management system which allows you to track changes made over time, revert to any previous point, and collaborate using Github.
keywords: git github jekyll blog tutorial
categories: tutorial blogging
tags:
- jekyll
- linode
- git
- github
---

# Part 2: Git and Github

Everyone has experience writing a paper, getting 10 pages in a having your word processor crash. That feeling of so much work lost and frantically attempting to get it back either my computational luck or sheer force of memory.

Or even when we save, have you gone down the wrong path in your writing (or coding), and just *know* that your previous version was better, if only the undo button would go that far.

This is where Git comes in. Git is a version control system that allows you to save snapshots of your work quickly, and revert to any save point you've ever created. It goes much further than a save button however, enabling you to snapshot only a small portion of your changes at time, collaborating with others who are simultaneouly working on the project, logging each change along with a message of *why* the change was made, finding out who changed a particular line in the project, and uploading or downloading your project remotely.

![Git Logo]({% asset_path posts/blogging_with_jekyll/git/git_logo.png %})


## Installing Git

On OS X Mavericks, Git is not installed by default, but can be installed using the Xcode command line tools. By the time you read this however things may have changed, so you should first run `which` to see if Git is already installed.[^1]

{% highlight bash %}
$ which git
git not found
{% endhighlight %}

If you saw something other than *not found*, then you're all set, continue to [Setting up Git](#setting-up-git). Otherwise, try installing through the Xcode command line tools[^2]. This will open up an installation window. If that does not work, or if you are not on a mac, see the git website's [Installing Git][install-git] page for more help.

## Setting up Git

Git is incredibly easy to add to any project, so easy in fact that I often add it to every folder I create, even if I don't think I'll be needing any source control, just in case. To add Git to your blog project, navigate to the **root directory** of your site, and type `git init`

{% highlight bash %}
$ git init
Initialized empty Git repository in ~/Developer/blog/.git/
{% endhighlight %}

That's it. You can verify that this was done correctly by using the `status` command.

{% highlight bash %}
$ git status
On branch master

Initial commit

nothing to commit
{% endhighlight %}

## Adding files to Git

Here is where things may start to get confusing. When you first initialize git at the root of your project directory, the files in the directory are not automatically saved. The initialization command creates what is known as a *repository* and files that are **committed** to the repository are saved. At this point you haven't yet added any files to the repository. 

The following image shows the lifecycle of files in git terminology. 

![Git Lifecycle]({% asset_path posts/blogging_with_jekyll/git/git_lifecycle.png %})

* **Untracked** files are those that have been created in the folder in which your site is located, but the git source control system knows nothing about.
* **Staging Area** contains files that are about to be commited to git
* **Git Repository** is every committed change that you have made, and a pointer to the current revision you are currently using
* **Working Directory** contains the files that have been modified since the last commit

[^1]: The dollar sign often signifies the command prompt in your terminal. I use it in that way to show what *you* should type. When there is no dollar sign before a line in the code block, don't type it. That line signifies what the *output* of the previous command is.
[^2]: This will work on OS X 10.9 Mavericks, but may not on other versions of mac. It will definitely not work on any other platform, so see the [git website][install-git] for help.

[install-git]: http://git-scm.com/book/en/Getting-Started-Installing-Git
