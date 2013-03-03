# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = User.create({ 
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  password: '35jkljsdf&F&(sdf' ,
  thumb_url: 'http://d1w5mwt9nqclox.cloudfront.net/media/cache/user_pics/ToothlessPerson_thumbnail.jpg'
  },
  :without_protection => true
)

group = user.groups.create({
  alias: 'testgroup'
  },
  :without_protection => true
)
group.save()

group2 = user.groups.create({
  alias: 'mysecondgroup'
  },
  :without_protection => true
)
group2.save()

share = group.shares.create( 
  url: 'http://www.youtube.com/watch?v=PpccpglnNf0', 
  title: 'Goats Yelling Like Humans',
  media_type: 'article',
  thumb: 'http://farm4.staticflickr.com/3010/3081514239_c6c20cb0c6.jpg',
  description: 'has something to do with goats',
  preview_html: '<iframe width="420" height="315" src="http://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>'
)

share.save()

tag = share.tags.create( keyword: 'goat' )
tag.save()