require "stringex"

## -- Rsync Deploy config -- ##
# Be sure your public key is listed in your server's ~/.ssh/authorized_keys file
ssh_user       = 'adamwalz_net'
ssh_host       = 'ignis'
ssh_port       = 22
document_root  = "/home/#{ssh_user}/public_html/"
rsync_delete   = true
rsync_args     = '--chmod=Du=rwx,Dg=rx,Do=,Fu=rw,Fg=r,Fo= --perms --exclude="maintenance.html"'
deploy_default = 'rsync'

# This will be configured for you when you run config_deploy
deploy_branch  = 'master'

## -- Misc Configs -- ##
site_dir      = '_site'    # generated html site directory
posts_dir      = '_posts'    # published post directory
drafts_dir      = '_drafts'    # draft post directory
stash_dir       = '_stash'
new_post_ext    = 'md'  # default new page file extension when using the new_post task
new_page_ext    = 'md'  # default new page file extension when using the new_page task
server_port     = 4000      # port for preview server eg. localhost:4000

#######################
# Working with Jekyll #
#######################

desc 'Generate jekyll site'
task :build do
  puts '## Generating Site with Jekyll'
  system 'jekyll build'
end

task :generate => :build

desc 'Watch the site and regenerate when it changes'
task :watch do
  puts 'Starting to watch source with Jekyll'
  system 'jekyll build --watch --drafts'
end

desc 'preview the site in a web browser'
task :preview do
  puts "Starting to watch source with Jekyll. Starting Rack on port #{server_port}"
  system "jekyll serve --watch --drafts --port #{server_port}"
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
  filename = "#{drafts_dir}/#{Time.now.strftime('%Y-%m-%d')}-#{title.to_url}.#{new_post_ext}"
  if File.exist?(filename)
    abort('rake aborted!') if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) != 'y'
  end
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts '---'
    post.puts 'layout: post'
    post.puts "title: \"#{title.gsub(/&/,'&amp;')}\""
    post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M:%S %z')}"
    post.puts 'comments: true'
    post.puts 'categories: '
    post.puts '---'
  end
end

# usage rake new_page[my-new-page] or rake new_page[my-new-page.html] or rake new_page (prompts for title)
desc "Create a new page in (filename)/index.#{new_page_ext}"
task :new_page, :filename do |t, args|
  args.with_defaults(:filename => get_stdin('Enter a title for your page: '))
  page_dir = []
  if args.filename.downcase =~ /(^.+\/)?(.+)/
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
      page.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M')}"
      page.puts 'comments: true'
      page.puts 'sharing: true'
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

desc "Clean out caches: .pygments-cache, .gist-cache, .sass-cache"
task :clean do
  rm_rf [".pygments-cache/**", ".gist-cache/**", ".sass-cache/**"]
end

##############
# Deploying  #
##############

desc 'Default deploy task'
task :deploy do
  Rake::Task["#{deploy_default}"].execute
end

desc 'Generate website and deploy'
task :gen_deploy => [:integrate, :generate, :deploy] do
end

desc 'Deploy website via rsync'
task :rsync do
  exclude = ""
  if File.exists?('./rsync-exclude')
    exclude = "--exclude-from '#{File.expand_path('./rsync-exclude')}'"
  end
  puts '## Deploying website via Rsync'
  ok_failed system("rsync -avze 'ssh -p #{ssh_port}' #{exclude} #{rsync_args} #{"--delete" unless rsync_delete == false} #{site_dir}/ #{ssh_user}@#{ssh_host}:#{document_root}")
  puts '## Fixing server-side permissions'
  ok_failed system("ssh #{ssh_user}@#{ssh_host} -p #{ssh_port} chgrp -R http #{document_root}")
end

desc 'Toggle maintenance mode for website'
task :maintenance do
  puts '## Toggling site maintenance mode'
  # Remove --exclude="maintenance.html" from rsync_args when changes are made
  puts 'Remember, changes to the maintenance page must be manually uploaded'
  maint_file = "#{document_root}maintenance.html"

  turn_on = "ln -s #{document_root}error/maintenance.html #{maint_file} && echo \"Maintenance: On\""
  turn_off = "unlink #{maint_file} && echo \"Maintenance: Off\""
  maint_cmd = "if [ -h #{maint_file} ]; then #{turn_off}; else #{turn_on}; fi"
  ok_failed system("ssh #{ssh_user}@#{ssh_host} -p #{ssh_port} '#{maint_cmd}'")
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

desc 'list tasks'
task :list do
  puts "Tasks: #{(Rake::Task.tasks - [Rake::Task[:list]]).join(', ')}"
  puts '(type rake -T for more detail)\n\n'
end
