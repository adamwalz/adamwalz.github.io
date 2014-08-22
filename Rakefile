#------------------------------------------------------------------------------
#          FILE:  Rakefile
#   DESCRIPTION:  Helper methods to generate and deploy a jekyll site
#        AUTHOR:  Adam Walz <adam@adamwalz.net>
#       VERSION:  2.0.5
#------------------------------------------------------------------------------

## -- User configs -- ##
## -- (change these according to your server settings) -- ##
domain_name    = 'adamwalz.net'
ssh_user       = 'adamwalz'
ssh_host       = 'adamwalz.net'
document_root  = "/home/#{ssh_user}/Sites/"

## -- Deployment method -- ##
deploy_via     = 'rsync' # options: rsync only currently

## ------------------------------------------------------------------- ##
## --                                                               -- ##
## --                                                               -- ##
## --  You probably won't need to change anything below this point  -- ##
## --                                                               -- ##
## --                                                               -- ##
## ------------------------------------------------------------------- ##

## -- Default Configs -- ##
site_dir      = '_site'    # generated html site directory
posts_dir     = '_posts'    # published post directory
drafts_dir    = '_drafts'    # draft post directory
stash_dir     = '_stash'
new_post_ext  = 'md'  # default new page file extension when using the new_post task
new_page_ext  = 'md'  # default new page file extension when using the new_page task

## -- Rsync Deploy config -- ##
# Be sure your public key is listed in your server's ~/.ssh/authorized_keys file
rsync_delete  = true
rsync_args    = '--chmod=Du=rwx,Dg=rx,Do=,Fu=rw,Fg=r,Fo= --perms'

ssh_port      = 22
server_port   = 4000      # port for preview server eg. localhost:4000

#######################
# Working with Jekyll #
#######################

desc 'Generate jekyll site'
task :build, :production? do |t, args|
  puts "## Generating #{'preview of ' unless args.production? }Site with Jekyll"
  puts '\'jekyll\' does not exist in path, run \'bundle install\'' unless command? 'jekyll'

  env = args.production? ? 'JEKYLL_ENV=production' : 'JEKYLL_ENV=development'
  drafts = args.production? ? '' : '--drafts'

  ok_failed system "#{env} jekyll build #{drafts}"
end

task :generate => :build

desc 'preview the site in a web browser'
task :preview do
  puts "## Starting to watch source with Jekyll. Starting Rack on port #{server_port}"
  puts '\'jekyll\' does not exist in path, run \'bundle install\'' unless command? 'jekyll'

  env = 'JEKYLL_ENV=development'
  ok_failed system "#{env} jekyll serve --watch --drafts --port #{server_port}"
end

# usage rake new_post[my-new-post] or rake new_post['my new post'] or rake new_post (prompts for title)
desc "Begin a new post in #{drafts_dir}"
task :new_post, :title do |t, args|
  args.with_defaults(:title => get_stdin('Enter a title for your post: '))

  mkdir_p drafts_dir
  now = Time.now
  filename = File.join(drafts_dir, "#{to_url(args.title)}.#{new_post_ext}")
  if File.exist?(filename)
    abort('rake aborted!') if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) != 'y'
  end

  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts '---'
    post.puts "title: #{args.title.gsub(/&/,'&amp;')}"
    post.puts "date: '#{now.strftime('%Y-%m-%d %H:%M:%S %z')}'"
    post.puts 'comments: false'
    post.puts 'categories: '
    post.puts '---'
  end
end

# usage rake new_page[my-new-page] or rake new_page[my-new-page.html] or rake new_page (prompts for title)
desc "Create a new page in (title)/index.#{new_page_ext}"
task :new_page, :title do |t, args|
  args.with_defaults(:title => get_stdin('Enter a title for your page: '))

  unless args.title =~ /(^.+\/)?(.+)/
    puts "Syntax error: #{args.title} contains unsupported characters"
  end

  mkdir_p args.title
  filename = File.join(to_url(args.title), "index.#{new_page_ext}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) != 'y'
  end

  puts "Creating new page: #{args.title}"
  open(filename, 'w') do |page|
    page.puts '---'
    page.puts "title: \"#{args.title}\""
    page.puts "date: '#{Time.now.strftime('%Y-%m-%d %H:%M')}'"
    page.puts 'comments: false'
    page.puts 'sharing: false'
    page.puts 'footer: false'
    page.puts '---'
  end
end

# usage rake isolate[my-post]
desc 'Move all other posts than the one currently being worked on to a temporary stash location (stash) so regenerating the site happens much more quickly.'
task :isolate, [:filename] => [:integrate] do |t, args|
  if not args.filename
    abort("rake aborted -- a file path to isolate is required")
  end

  mkdir_p stash_dir
  Dir.glob("#{posts_dir}/*.*") do |post|
    FileUtils.mv post, stash_dir unless post.include?(args.filename)
  end
end

desc 'Move all stashed posts back into the posts directory, ready for site generation.'
task :integrate do
  FileUtils.mv Dir.glob("#{stash_dir}/*.*"), "#{posts_dir}/"
end

desc "Clean out caches and generated site"
task :clean => :integrate do
  puts '## Cleaning caches and deleting generated site directory'
  ok_failed rm_rf ['.pygments-cache', '.gist-cache', '.sass-cache', '.bundle', stash_dir, site_dir]
end

##############
# Deploying  #
##############

desc 'Default deploy task'
task :deploy => :integrate do
  Rake::Task[deploy_via].invoke(true)
end

desc 'Deploy to a preview subdomain of site'
task "deploy-preview" => :integrate do
  Rake::Task[deploy_via].invoke(false)
end

task :rsync, :production? do |t, args|
  args.with_defaults(:production? => false)
  abort("rake aborted!") if args.production? and ask("Are you sure you want to deploy to production?", ['y', 'n']) != 'y'

  Rake::Task[:build].invoke(args.production?)

  exclude = '--exclude=\'maintenance.html\''
  if File.exists?('./rsync-exclude')
    exclude = exclude + " --exclude-from '#{File.expand_path('./rsync-exclude')}'"
  end

  puts "## Deploying #{'preview of ' unless args.production? }website via Rsync"
  site_root = File.join(document_root, "#{'preview.' unless args.production? }#{domain_name}")

  ok_failed system "rsync -avze 'ssh -p #{ssh_port}' #{exclude} #{rsync_args} #{"--delete" unless rsync_delete == false} #{site_dir}/ #{ssh_user}@#{ssh_host}:#{site_root}"

  puts '## Fixing server-side permissions'
  ok_failed system "ssh #{ssh_user}@#{ssh_host} -p #{ssh_port} 'chgrp -R www-data #{site_root}/'"
end

desc 'Toggle maintenance mode for website'
task :maintenance do
  abort("maintenance mode is only written for rsync deployment") if deploy_via != 'rsync'

  puts '## Toggling site maintenance mode'
  # Remove --exclude="maintenance.html" from rsync_args when changes are made
  puts 'Remember, changes to the maintenance page must be manually uploaded'
  maint_file = File.join(document_root, domain_name, 'error', 'maintenance.html')
  main_link = File.join(document_root, domain_name, 'maintenance.html')

  turn_on = "ln -s #{maint_file} #{maint_link} && echo \"Maintenance: On\""
  turn_off = "unlink #{maint_link} && echo \"Maintenance: Off\""

  ok_failed system "ssh #{ssh_user}@#{ssh_host} -p #{ssh_port} 'if [ -h #{maint_link} ]; then #{turn_off}; else #{turn_on}; fi'"
end

def ok_failed(condition)
  if (condition)
    puts 'OK'
  else
    puts 'FAILED'
  end
end

def get_stdin(message)
  print message
  STDIN.gets.chomp
end

def ask(message, valid_options)
  if valid_options
    answer = get_stdin("#{message} #{valid_options.to_s.gsub(/"/, '').gsub(/, /,'/')} ") while !valid_options.include?(answer)
  else
    answer = get_stdin(message)
  end
  answer
end

def to_url(str)
  url = str.gsub(/\s+/,'_') # replace whitespace with underscore
  url.downcase
end

# Returns whether a command exists in PATH.
#
# @param [String] command the name of the command.
# @return [true, false] if true, the command exists; otherwise, it does not.
def command?(command)
  ENV['PATH'].split(':').any? do |directory|
    File.exists?(File.join(directory, command))
  end
end

desc 'list tasks'
task :list do
  puts "Tasks: #{(Rake::Task.tasks - [Rake::Task[:list]]).join(', ')}"
  puts '(type rake -T for more detail)'
end
