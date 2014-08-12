---
date: '2013-12-09 23:11:56 -0700'
title: Welcome to Jekyll
author: Adam Walz
comments: false
categories: 
---

Block Elements
==============

Paragraphs
----------
A paragraph is simply one or more consecutive lines of text, separated by one or more blank lines. (A blank line is any line that looks like a blank line — a line containing nothing but spaces or tabs is considered blank.) Normal paragraphs should not be indented with spaces or tabs.

Headers
-------

This is an H1
=============

# This is also an H1

This is an H2
-------------

## This is also an H2

### This is an H3

#### This is an H4

##### This is an H5

###### This is an H6

Blockquotes
------------
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> 
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

Blockquotes can be nested (i.e. a blockquote-in-a-blockquote) by adding additional levels of >:

> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

Lists
-----
Markdown supports ordered (numbered) and unordered (bulleted) lists.

* Red
* Orange
+ Yellow
+ Green
- Blue
- Purple

1. Bird
2. McHale
3. Parish

Any number-period-space sequence at the beginning of a line becomes an ordered list. To avoid this, you can backslash-escape the period:

1986\. What a great season.

#### Definition List
(TODO: I do not currently have CSS for this)

kramdown
: A Markdown-superset converter

Maruku
:     Another Markdown-superset converter

Tables
-------
Here are some example table rows:

(TODO: I do not currently have CSS for this)

| First cell|Second cell|Third cell
| First | Second | Third |

First | Second | | Fourth |

Code Blocks
-----------
    This is a markdown code block.

~~~
This is a kramdown fenced code block.
~~~
{% highlight ruby %}
# This is a jekyll highlighted code block
a = 10
b = 3 * a + 2
printf("%d %d\n", a, b);
{% endhighlight %}
<br />
{% gist 577124eeafe19cd1eedb %}

Latex
----------
$$
\begin{align*}
  & \phi(x,y) = \phi \left(\sum_{i=1}^n x_ie_i, \sum_{j=1}^n y_je_j \right)
  = \sum_{i=1}^n \sum_{j=1}^n x_i y_j \phi(e_i, e_j) = \\
  & (x_1, \ldots, x_n) \left( \begin{array}{ccc}
      \phi(e_1, e_1) & \cdots & \phi(e_1, e_n) \\
      \vdots & \ddots & \vdots \\
      \phi(e_n, e_1) & \cdots & \phi(e_n, e_n)
    \end{array} \right)
  \left( \begin{array}{c}
      y_1 \\
      \vdots \\
      y_n
    \end{array} \right)
\end{align*}
$$

You can also use inline $\LaTeX$ in your paragraphs.

Horizontal Rules
----------------
* * *
***
*****
- - -
---------------------------------------

Span Elements
=============

Links
-----
Markdown supports two style of links: inline and reference.

In both styles, the link text is delimited by [square brackets].

This is [an example](http://example.com/ "Title") inline link.

[This link](http://example.net/) has no title attribute.

Link definition names may consist of letters, numbers, spaces, and punctuation — but they are not case sensitive. E.g. these two links:

This is [an example][example1] reference-style link.

The implicit link name shortcut allows you to omit the name of the link, in which case the link text itself is used as the name.

Visit [Swarm Intelligence][]

Footnotes
----------
This is some text.[^1]. Other text.[^footnote].

Emphasis
--------

*single asterisks*

_single underscores_

**double asterisks**

__double underscores__

Code
----
Use the `printf()` function.

Images
------
Centered Image
{% picture posts/excellent_adventure/bill_and_ted.jpg alt="Optional alt text" %}

Left aligned Image
{% picture posts/excellent_adventure/bill_and_ted.jpg class="img-responsive" %}

Right aligned Image

<div class="clearfix">
{% picture posts/excellent_adventure/bill_and_ted.jpg class="pull-right img-responsive" %}
Images using pull-right or pull-left will have text wrap around. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</div>

Abreviations
------------
This is some text not written in HTML but in another language!

*[another language]: It's called Markdown
*[HTML]: HyperTextMarkupLanguage

Typographic Symbols
--------------------
* --- will become an em-dash
* -- will become an en-dash
* ... will become an ellipsis
* << will become a left guillment

{::comment}
Commments
---------
This should not be displayed
{:/comment}

I'm sure there is more I have forgotten, and I will continue to update this post.

Footnotes
---------
[example1]: http://example.com/  "Optional Title Here"
[Swarm Intelligence]: http://adamwalz.net

[^1]: Some *crazy* footnote definition.
[^footnote]:
    > Blockquotes can be in a footnote.

        as well as code blocks

    or, naturally, simple paragraphs.
