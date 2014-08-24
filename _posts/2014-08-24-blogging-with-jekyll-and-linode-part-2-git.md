---
title: "Blogging with Jekyll and Linode Part 2: Git and Github"
date: '2014-08-24 11:52:36 -0700'
comments: true
description: Introduction to the Git source code management system which allows you to track changes made over time, revert to any previous point, and collaborate using Github.
keywords: git github jekyll blog tutorial
Author: Adam Walz
categories: blogging
tags:
- jekyll
- linode
- git
- github
---

# Part 2: Git and Github

Everyone has experience writing a paper, getting 10 pages in a having your word processor crash. That feeling of so much work lost and frantically attempting to get it back either by computational luck or sheer force of human memory.

Even when pressing save, have you gone down the wrong path in your writing (or coding), and just *know* that your previous version was better, if only the undo button would go that far.

This is where Git comes in. Git is a version control system that allows you to save snapshots of your work quickly, and revert to any save point you've ever created. It goes much further than a save button however, enabling you to snapshot portions of your latest work, collaborate with others who are simultaneously working on the project, remembering/explaining *why* the change was made, finding out who changed a particular line in the project, and backing up your project remotely.

{% image default posts/blogging_with_jekyll/git/git_logo.png alt="Git logo" %}



## Installing Git

On OS X Mavericks, Git is not installed by default, but Apple makes it simple to install using the Xcode command line tools. Run any git command to see if you have it, I like to do this by checking the version number.[^1]

{% highlight bash %}
$ git --version
git version 1.9.3 (Apple Git-50)
{% endhighlight %}

If you see any output from this command, then you're all set; the particular version is not important for anything in this post. Otherwise, a window would have appeared asking to install the command line tools. Click install.[^2] If all else fails see the official [Installing Git][install-git] page for more help.

## Setting up Git

Git is incredibly easy to add to any project; so easy in fact that I often add it to every folder I create, even if I don't think I'll be needing any source control. To add Git to your blog project, navigate to the **root directory** of your site, and type `git init`

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

Working with Git
----------------

Here is where things may start to get interesting. When you first initialize git at the root of your project directory, the files in the directory are not automatically saved. The initialization command creates what is known as a *repository* and files that are **committed** to the repository are saved. At this point you haven't yet added any files to the repository.

The following image shows the life cycle of files in git terminology. The arrows show how the commands `git add` and `git commit` affect the tracking state of a file.

{% image default posts/blogging_with_jekyll/git/git_lifecycle.png alt="Git lifecycle" %}

* **Untracked** files are those that have been created on your local computer, but git is not saving tracking the history of changes to those files.
* **Staging Area** contains files that are about to be committed to git
* **Git Repository** contains every committed change that you have made to your project
* **Working Directory** contains the files that have been modified since the last commit

This is more concretely shown with an example of git in action. After using `git init` to initialize a git repository in an empty directory on your computer, we'll add some files.

{% highlight bash %}
echo "This is some text in a file named foo.txt" > foo.txt
echo "This is some text in a file named bar.txt" > bar.txt
mkdir folder1
mkdir folder2
echo "This is some text in a file named folder1/baz.txt" > folder1/baz.txt
{% endhighlight %}

At this point you have created a three files and two directories. The file baz.txt is inside the directory named *folder1* and the directory named *folder2* is empty. To see the state our files now, run `git status` again.

{% highlight bash %}
$ git status
# On branch master
#
# Initial commit
#
# Untracked files:
#   bar.txt
#   folder1/
#   foo.txt
nothing added to commit but untracked files present
{% endhighlight %}

This shows that *foo.txt*, *bar.txt*, and *folder1* are in the **untracked** state. You may be asking why *folder2* is not also untracked. Git only tracks file changes, so since *folder2* is empty, it cannot be tracked.

### Staging Area
As the git life cycle image shows, to move files from untracked to the staging area run `git add`. Lets do this for *foo.txt* and *folder1*.

{% highlight bash %}
$ git add foo.txt folder1
$ git status
# On branch master
#
# Initial commit
#
# Changes to be committed:
#   new file:   folder1/baz.txt
#   new file:   foo.txt
#
# Untracked files:
#   bar.txt
{% endhighlight %}

This added *foo.txt* and every file in the directory *folder1* to the staging area as shown in the status output under "changes to be committed". The file *bar.txt* was left untracked.

### Committing
Files in the staging area can now be committed to the git repository. Git commits are similar to pressing the 'save' button on a word processor, but include additional information about the author and the reason *why* the change is being committed. This is called the commit message, and every commit includes one. This message can be added on the command line with the `-m` flag followed by a quoted message.

{% highlight bash %}
$ git commit -m "Add example on committing a file and a folder"
[master (root-commit) b022d5f] Add example on committing a file and a folder
 2 files changed, 2 insertions(+)
 create mode 100644 folder1/baz.txt
 create mode 100644 foo.txt
$ git status
# On branch master
# Untracked files:
#   bar.txt
nothing added to commit but untracked files present
{% endhighlight %}

### Modifying files
Additional changes may be needed in the files we committed to our git repository. Use any text editor the change a word in the file *foo.txt*. In this example I have chosen to change the word "some" to "new".

{% highlight bash %}
$ less foo.txt
This is new text in a file named foo.txt
$ git status
# On branch master
# Changes not staged for commit:
#   modified:   foo.txt
#
# Untracked files:
#   bar.txt
no changes added to commit
{% endhighlight %}

The modified file has been added to the **working directory** state and shows in `git status` as "modified:". We have seen how to add a file to the staging area and then commit it to the git repository with a commit message. If we want to do all of these steps at the same time, the `-a` flag commits everything that is currently in the **working directory** or **staging area**.

{% highlight bash %}
$ git commit -a -m "Change word in foo"
[master a5efbe7] Change word in foo
 1 file changed, 1 insertion(+), 1 deletion(-)
{% endhighlight %}

Notice in the output of this command where it says 1 insertion and 1 deletion. When a file is committed to git, only the *differences* are tracked. This commit contained a deletion of the word "some" and an insertion of the word "new". If the file is very large this is an important distinction because it means commits are very light weight and do not require full copies of all the changed files.

### Viewing history
Too see the changes your have made over time, the `git log` command will show you a list of all commits ever made to this repository. 

{% highlight bash %}
$ git log
commit a5efbe706e4e1334079320d8487e34ed040369de
Author: Adam Walz <adam@adamwalz.net>
Date:   Sun Aug 24 01:28:15 2014 -0700

    Change word in foo

commit b022d5f574f5c509b9e224754f5579b44fff54d2
Author: Adam Walz <adam@adamwalz.net>
Date:   Sun Aug 24 01:17:05 2014 -0700

    Add example on committing a file and a folder
{% endhighlight %}

Github
------

So far we have used the git source control system to track the history of project changes on your local computer. However, if you want to work with other people on the same project, or even by yourself on multiple computers, you'll want to create a remote copy of your git repository to share. This is where the site [github.com](http://github.com) comes in.

Github is web hosting service and interface for git repositories. It can store an entire copy of your project so you can share it with others, download it to multiple computers, view the history online, and rest easy knowing your project is backed up remotely.

### Creating a new repository
Once you have set up a github account, click the [+ New repository](github.com/new) link. Add a repository name and description, but leave the box for "Initialize this repository with a README" unchecked because we will be using our previous example which has already been initialized.

{% image double posts/blogging_with_jekyll/git/github_new_repository.png alt="Creating a new github repository" %}

### Pushing to github
Back in the terminal we need to add the address to our github repository as a *remote repository*. It is convention to name this remote **origin**. Change the example to use your own github username instead of *adamwalz* and the name of the repository you created on github instead of *myProject*

{% highlight bash %}
$ git remote add origin git@github.com:adamwalz/myProject.git
{% endhighlight %}

The terms *Pushing* and *Pulling* refer to uploading/downloading from a remote git repository. At this point our local repository contains commits that our remote repository does not have, so those need to be *pushed* to the remote. I will not be covering branches in this post, but the name **master** refers to the git branch in which you are using. If you have not created multiple branches, **master** is the default.

{% highlight bash %}
# push to the remote repository named origin on branch master
$ git push origin master
{% endhighlight %}

## Getting the latest changes
If you are working with a team, or from multiple computers, the commits on github may be more recent than the ones on your local computer. We need to synchronize with those changes.

When starting fresh on a new computer, we need to get the entire repository from github. This is called *cloning*. We will pretend you are starting fresh and clone to a new directory on your Desktop.

{% highlight bash %}
$ cd ~/Desktop
$ git clone git@github.com:adamwalz/myProject.git myLocalProject
Cloning into 'myLocalProject'...
remote: Counting objects: 8, done.
remote: Compressing objects: 100% (5/5), done.
remote: Total 8 (delta 0), reused 8 (delta 0)
Receiving objects: 100% (8/8), done.
Checking connectivity... done
{% endhighlight %}

This created a new directory named *myLocalProject* that contains a copy of the entire git repository and knows about the remote repository on github. You can make changes in this working directory, and when they are ready you'll need to `git add`, `git commit`, and `git push` to send the changes to github.

If there are recent changes on github that you want to download, running `git pull` will merge those changes into your own local repository.

{% highlight bash %}
$ cd ~/Desktop/myLocalProject
$ git pull
Already up-to-date.
{% endhighlight %}

Getting Help
------------
Github has an excellent set of answers to common issues about using git and github at [help.github.com](https://help.github.com). The [git website](http://git-scm.com) also has in depth documentation and a really cool browser based git walk-through system for learning step by step. Even advanced users can pick something up through this site.

Finally, if any of the examples or discussion I have provided is not helpful, let me know in the comments.

### Footnotes
[^1]: The dollar sign often signifies the command prompt in your terminal. I use it in that way to show what *you* should type. When there is no dollar sign before a line in the code block, don't type it. That line signifies what the *output* of the previous command is.
[^2]: This will work on OS X 10.9 Mavericks, but may not on other versions of mac. It will definitely not work on any other platform, so see the [git website][install-git] for help.

[install-git]: http://git-scm.com/book/en/Getting-Started-Installing-Git
