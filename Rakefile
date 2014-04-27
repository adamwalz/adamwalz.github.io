#------------------------------------------------------------------------------
#          FILE:  Rakefile
#   DESCRIPTION:  Helper methods to generate and deploy a jekyll site
#        AUTHOR:  Adam Walz <adam@adamwalz.net>
#       VERSION:  2.0.2
#------------------------------------------------------------------------------

require "stringex"

## -- User configs -- ##
## -- (change these according to your server settings) -- ##
domain_name    = 'adamwalz.net'
ssh_user       = 'adamwalz'
ssh_host       = 'ignis'
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
task :build do
  puts '## Generating Site with Jekyll'
  puts '\'jekyll\' does not exist in path, run \'bundle install\'' unless command? 'jekyll'
  ok_failed system 'jekyll build --config _config.yml'
end

desc 'Generate jekyll site'
task "build-drafts" do
  puts '## Generating Site with Jekyll'
  puts '\'jekyll\' does not exist in path, run \'bundle install\'' unless command? 'jekyll'
  ok_failed system 'jekyll build --drafts --config _config.yml,_config.preview.yml'
end

task :generate => :build

desc 'Watch the site and regenerate when it changes'
task :watch do
  puts '## Starting to watch source with Jekyll'
  puts '\'jekyll\' does not exist in path, run \'bundle install\'' unless command? 'jekyll'
  ok_failed system 'jekyll build --watch --drafts --config _config.yml,_config.preview.yml'
end

desc 'preview the site in a web browser'
task :preview do
  puts "## Starting to watch source with Jekyll. Starting Rack on port #{server_port}"
  puts '\'jekyll\' does not exist in path, run \'bundle install\'' unless command? 'jekyll'
  system "jekyll serve --watch --drafts --port #{server_port} --config _config.yml,_config.preview.yml"
end

# usage rake new_post[my-new-post] or rake new_post['my new post'] or rake new_post (prompts for title)
desc "Begin a new post in #{drafts_dir}"
task :new_post, :title do |t, args|
  if args.title
    title = args.title
  else
    title = get_stdin('Enter a title for your post: ')
  end
  mkdir_p drafts_dir
  now = Time.now
  filename = File.join(drafts_dir, "#{now.strftime('%Y-%m-%d')}-#{title.to_url}.#{new_post_ext}")
  if File.exist?(filename)
    abort('rake aborted!') if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) != 'y'
  end
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts '---'
    post.puts 'layout: post'
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "date: '#{now.strftime('%Y-%m-%d %H:%M:%S %z')}'"
    post.puts 'comments: false'
    post.puts 'categories: '
    post.puts '---'
  end
end

# usage rake new_page[my-new-page] or rake new_page[my-new-page.html] or rake new_page (prompts for title)
desc "Create a new page in (filename)/index.#{new_page_ext}"
task :new_page, :filename do |t, args|
  if args.filename
    filename = args.filename
  else
    filename = get_stdin('Enter a title for your page: ')
  end
  page_dir = []
  if filename.downcase =~ /(^.+\/)?(.+)/
    filename, dot, extension = $2.rpartition('.').reject(&:empty?)         # Get filename and extension
    title = filename
    page_dir.concat($1.downcase.sub(/^\//, '').split('/')) unless $1.nil?  # Add path to page_dir Array
    if extension.nil?
      page_dir << filename
      filename = "index"
    end
    extension ||= new_page_ext
    page_dir = File.join(page_dir)
    filename = filename.downcase.to_url

    mkdir_p page_dir
    file = File.join(page_dir, "#{filename}.#{extension}")
    if File.exist?(file)
      abort("rake aborted!") if ask("#{file} already exists. Do you want to overwrite?", ['y', 'n']) != 'y'
    end
    puts "Creating new page: #{file}"
    open(file, 'w') do |page|
      page.puts '---'
      page.puts 'layout: page'
      page.puts "title: \"#{title}\""
      page.puts "date: '#{Time.now.strftime('%Y-%m-%d %H:%M')}'"
      page.puts 'comments: false'
      page.puts 'sharing: false'
      page.puts 'footer: true'
      page.puts '---'
    end
  else
    puts "Syntax error: #{args.filename} contains unsupported characters"
  end
end

# usage rake isolate[my-post]
desc 'Move all other posts than the one currently being worked on to a temporary stash location (stash) so regenerating the site happens much more quickly.'
task :isolate, :filename do |t, args|
  mkdir_p(stash_dir) unless File.exist?(stash_dir)
  Dir.glob("#{posts_dir}/*.*") do |post|
    FileUtils.mv post, stash_dir unless post.include?(args.filename)
  end
end

desc 'Move all stashed posts back into the posts directory, ready for site generation.'
task :integrate do
  FileUtils.mv Dir.glob("#{stash_dir}/*.*"), "#{posts_dir}/"
end

desc "Clean out caches and generated site"
task :clean do
  puts '## Cleaning caches and deleting generated site directory'
  ok_failed rm_rf [".pygments-cache/**", ".gist-cache/**", ".sass-cache/**", site_dir]
end

##############
# Deploying  #
##############

desc 'Default deploy task'
task :deploy => [:integrate, :build] do
  Rake::Task[deploy_via].invoke
end

desc 'Deploy to a preview subdomain of site'
task "deploy-preview" => [:integrate, "build-drafts"]do
  Rake::Task[deploy_via].invoke(true)
end

task :rsync, :preview do |t, args|
  args.with_defaults(:preview => false)

  exclude = '--exclude=\'maintenance.html\''
  if File.exists?('./rsync-exclude')
    exclude = exclude + " --exclude-from '#{File.expand_path('./rsync-exclude')}'"
  end

  puts "## Deploying #{'preview of ' if args[:preview] }website via Rsync"
  site_root = File.join(document_root, "#{'preview.' if args[:preview]}#{domain_name}")

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
