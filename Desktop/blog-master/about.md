---
title: About
permalink: /about/
---

안녕하세요. 저는 윤태인입니다. 만나서 반갑습니다.

## 공부하고 있는 것

- JAVA
- Android


## 목표

#### 안드로이드 레이아웃 익숙해지기


#### 안드로이드 앱 만들어보기

1. Create a new branch called _gh-pages_ in the repository where you want to add a template [managing branches](https://help.github.com/articles/creating-and-deleting-branches-within-your-repository/).
2. From command line run `git clone https://github.com/AWEEKJ/Kiko-plus.git` - this will clone _Kiko-plus_ template to your computer.
3. Create new branch `git checkout -b gh-pages` where _gh-pages_ will be your branch name.
4. Add remote, which is your repo from the first step, to your new branch `git remote add gh-pages https://github.com/<yourName>/<yourMaster>/gh-pages`. _yourName_ is your account name and _yourMaster_ is your repository.
5. Push new branch to remote `git push gh-pages`.
6. Update `_config.yml` file by changing `baseurl: "<branchName>"` _branchName_ is your branch name where _gh-pages_ resides. See [configuration](#configuration).

#### Method 3: Run it locally

1. Download [zip](https://github.com/AWEEKJ/Kiko-plus/archive/master.zip) or clone it `git clone https://github.com/AWEEKJ/Kiko-plus`.
2. Go inside folder and run `jekyll serve` or `rake preview`. This will build a website which you can access [https://localhost:4000](https://localhost:4000). You need to have [Jekyll](https://jekyllrb.com/docs/installation/) installed to do this.


## Configuration

All configuration is done via `_config.yml` file which you will find in your main repo folder. Change this `<something>` to yours.

### Basic

- Config your blog name.

```yml
name: <blog-name>
```

- These configuration in `author:` is for links to icons in footer. If you want to add more link icons, modify `_includes/footer.html` file.

```yml
author:
  facebook:         your-id
  twitter:          your-id
  github:           your-id
  linkedin:         your-id
  medium:           your-id
  tumblr:           your-id
  email:            your-id@your-email.com
```

- Change copyright year and name in footer.

```yml
copyright:
  year:             2017
  name:             Kiko
```

### Google analytics

- Change this to your Google Analytic ID.

```yml
google-analytics:
  id:               "your-id"
```

### Disqus

- Change this to your Disqus short name.

```yml
disqus:
  id:               "your-id"
```

### URL

- Config your domain.

```yml
url: "https://<your-name>.github.io"
```

- **NOTE** When if running locally, change url to 

```yml
url: "https://localhost:4000"
```

- Change this to your branch name where _gh-pages_ resides. 
- **NOTE** apply only if you used __Method 2__ for installation.

```yml
baseurl: "/<branch-name>"
```

## Rakefile Usage

```bash
# Create new post
$ rake post title="A Title" [date="2015-08-16"] [tags="[tag1, tag2]"] 

# Create new draft post
$ rake draft title="A Title" [date="2015-08-16"] [tags="[tag1, tag2]"]

# Install Jekyll Plugins. Do before running in local.
$ rake geminstall

# Run in Local
$ rake preview
```

## License

This theme is released under MIT License.
