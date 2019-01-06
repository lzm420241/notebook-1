let fs = require('fs');
let _ = require('lodash')
let qs = require('querystring')
var find = require('findit')
var path = require('path');


class Formater{
    constructor(file){
        this.seen_slug = {}
    
        let markdown = fs.readFileSync(file, {encoding: 'utf-8'})

        markdown = this.format(markdown)

        fs.writeFileSync(file, markdown);
    }

    format(markdown){
        markdown = this.format_image(markdown);
        markdown = this.format_toc(markdown);
        markdown = this.render_math_as_img(markdown);
        return markdown;
    }

    get_title(markdown){
        let title = '';

        let r = /^(#{1,6})\s*?([\w\W]+?)^/gm;
        let match = r.exec(markdown)
        if(match){
            title = match[2].trim()
        }

        return title;
    }

    slug(value) {
        console.log(value)
        '什么是 fps，60fps 意味着什么？'

        let slug = value
            .toLowerCase()
            .trim()
            .split(' ').join('-')
            .split(/[\|\$&`~=\\\/@+*!?\(\{\[\]\}\)<>=.,;:'"^。？！，、；：“”【】（）〔〕［］﹃﹄“”‘’﹁﹂—…－～《》〈〉「」]/g).join('')
            .replace(/\t/, '--');
      
        if (this.seen_slug.hasOwnProperty(slug)) {
          var original_slug = slug;
          do {
            this.seen_slug[original_slug]++;
            slug = original_slug + '-' + this.seen[original_slug];
          } while (this.seen.hasOwnProperty(slug));
        }
        this.seen_slug[slug] = 0;
      
        return slug;
      };

    format_toc(markdown){
        let toc_pattern = '[__TOC__]';
        let r = /^(#{1,6})\s*?([\w\W]+?)^/gm;
        let hx = []

        let toc_pattern_index = markdown.indexOf(toc_pattern);
        if(toc_pattern_index == -1){
            return markdown
        }

        let match = r.exec(markdown);
        while(match){
            if(match.index > toc_pattern_index){
                let h = {
                    level: match[1].length,
                    text: match[2].trim()
                }
                hx.push(h);
            }
            match = r.exec(markdown);
        }

        if(hx.length == 0){
            return markdown.replace(toc_pattern, '');
        }

        let topLevel = _.minBy(hx, (h) => h.level).level;

        let toc = '## 目录：\n\n'
        for(let h of hx){
            let slug = this.slug(h.text);
            let space = _.repeat(' ', (h.level - topLevel) * 2);
            toc +=  `${space}- [${h.text}](#${slug})\n`
        }

        toc += '\n---\n'

        markdown = markdown.replace(toc_pattern, toc);
        return markdown
    }

    format_image(markdown){
        let r = /!\[(.*?)\]\((.+?)\)/mg;
        markdown = markdown.replace(r, function(match, alt, url){
            let attrs = {};
            if(alt.indexOf('=') != -1){
                attrs= qs.parse(alt);
            }else if(alt){
                attrs['alt'] = alt
            }
            if('text' in attrs){
                attrs['alt'] = attrs['text']
                delete attrs['text'];
            }

            let align = 'center';
            if('align' in attrs){
                align = attrs['align']
                delete attrs['align']
            }

            let attr_text = ''
            for(let attr in attrs){
                attr_text += `${attr}="${attrs[attr]}" `
            }

            return `<div align="${align}"><img src="${url}" ${attr_text}/></div>`
        });
        return markdown;
    }


    render_math_as_img(markdown){
        let r = /(\${2,3})(.+)\1/gm;
        markdown = markdown.replace(r, function(match, wrap, tex){
            tex = tex.replace(/\s/g, '');
            let tex_encode = encodeURIComponent(tex);

            let url = `https://latex.codecogs.com/gif.latex?${tex_encode}`;
            if(wrap == '$$'){
                return `<img src="${url}" class="tex" alt="${tex}" />`
            }else{
                return `<div align="center"><img src="${url}" class="tex" alt="${tex}"/></div>`
            }
        });
        return markdown
    }
}


let filepath = ''

if(process.argv.length == 2){
    filepath = '.'
}else{
    filepath = process.argv[2]
}

let finder = find(path.normalize(path.join(__dirname, '..', filepath)))

finder.on('directory', function (dir, stat, stop) {
    var base = path.basename(dir);
    if (base == '.git' || base == 'node_modules' || base == 'images'){
        stop()
    }
});

finder.on('file', function (file, stat) {
    if(path.parse(file).ext == '.md'){
        new Formater(file);
    }
});