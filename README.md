# Team KhanLab-BayArea 2026 Wiki

This repository **MUST** contain all coding assets to generate your team's wiki (HTML, CSS, JavaScript, TypeScript, Python, etc).

Images, photos, icons and fonts **MUST** be stored on `static.igem.wiki` using [the uploads tool](https://teams.igem.org/go/deliverables/wiki/uploads), and Videos **must** be embedded from [iGEM Video Universe](https://video.igem.org); see [the Video & Audio page](https://teams.igem.org/go/deliverables/wiki/videos-and-audios) for guidance on adding video and audio.

**Everything your wiki loads (CSS, JavaScript, fonts, images) must be served from iGEM infrastructure.** Do not link to external or third-party CDNs (for example Google Fonts, jsDelivr, cdnjs) — upload the files you need via [the uploads tool](https://teams.igem.org/go/deliverables/wiki/uploads) and reference them from `static.igem.wiki` instead.

For up-to-date requirements, resources, help and guidance, visit [teams.igem.org/go/deliverables/wiki](https://teams.igem.org/go/deliverables/wiki).

> **Using an AI assistant (e.g. Claude Code)?** Please read [.claude/RESPONSIBLE_AI_USE.md](.claude/RESPONSIBLE_AI_USE.md) first. You remain fully responsible for everything you publish: never fabricate scientific results, data, or citations.

## Getting started

You should probably only edit the files inside folders `static`, `wiki` and `wiki > pages`.
1. Open the Web IDE
2. Make the changes on the files you wish:
    * For the menu, change the file [menu.html](wiki/menu.html)
    * For the layout, change the file [layout.html](wiki/layout.html)
    * For the pages, change the corresponding file in the foler [pages](wiki/pages)
3. Review the changes you made
4. Once you are done, save the changes by **committing** them to the *main branch* of the repository 
5. An automated script will build, test and deploy your wiki, which should take less than 30 seconds.

## About this Template

### Files

The static assets are in the `static` directory. The layout and templates are in the `wiki` directory, and the pages live in the `wiki > pages` directory. Unless you are an experienced and/or adventurous human, you probably shouldn't change other files.

    |__ static/             -> static assets (CSS and JavaScript files only)
    |__ wiki/               -> Main directory for the pages and layouts
        |__ footer.html     -> Footer that will appear in all the pages
        |__ layout.html     -> Main layout of your wiki. All the pages will follow its structure
        |__ menu.html       -> Menu that will appear in all the pages
        |__ pages/          -> Directory for all the pages
            |__ *.html      -> Actual pages of your wiki
    |__ .gitignore          -> Tells GitLab which files/directories should not be uploaded to the repository
    |__ .gitlab-ci.yml      -> Automated flow for building, testing and deploying your website.
    |__ LICENSE             -> License CC-by-4.0, all wikis are required to have this license - DO NOT MODIFY
    |__ README.md           -> File containing the text you are reading right now
    |__ app.py              -> Python code managing your wiki
    |__ dependencies.txt    -> Software dependencies from the Python code

### Technologies

  * [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/)
  * [Python](https://www.python.org): Programming language
  * [Flask](https://palletsprojects.com/projects/flask): Python framework
  * [Frozen-Flask](https://pypi.org/project/Frozen-Flask): Library that builds the wiki to be deployed as a static website
  * [Bootstrap](https://getbootstrap.com/docs/5.3/components): CSS and JS components used

### Building locally (advanced users)

To work locally with this project, follow the steps below:

#### Important

Ensure you are using Python `>=3.8` (Python 3.12 recommended) to avoid compatibility issues. You can check your Python version by running `python3 --version` in your terminal.

#### Install
```bash
git clone https://gitlab.igem.org/2026/khanlab-bayarea.git
cd khanlab-bayarea
python3 -m venv venv
. venv/bin/activate # on Linux, MacOS; or
. venv\Scripts\activate # on Windows
pip install -r dependencies.txt
```

#### Execute
```bash
python app.py
```