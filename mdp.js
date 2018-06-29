'use strict';
/**
 * Класс, предоставляющий возможность парсить jsdoc в markdown таблицу
 * @param {String} filePath - путь к файлу для парсинга
 */
class MarkdownTableProvider {
  constructor(filePath) {
    this.mdTable = this.getHead();
    this.fs = require('fs');
    this.filePath = filePath;
    this.blockRegexes = {
      coffee: /###\*[\s\S]*?###[^:]+/g,
      js:     /\/\*\*[\s\S]*?\*\/[^:]+/g
    }
    this.init();
  }

  init() {
    this.blockRegex = this.blockRegexes[this.getFileExtension(this.filePath)];
    this.readFile(this.filePath, () => {
      this.showTable();
    });
  }

  getFileExtension(file) {
    return file.match(/\.([a-zA-Z]+)$/)[1];
  }

  showTable() {
    console.log(this.mdTable);
  }

  readFile(path, cb) {
    let self = this;
    this.fs.readFile(path, {encoding: 'utf-8'}, function(err, content) {
        if (!err) {
            const matched = content.match(self.blockRegex);
            self.cunstructTable(matched);
            if (typeof(cb) == "function") cb();
        } else {
            console.log(err);
        }
    });
  }

  cunstructTable(matched){
    try {
      for (let match of matched) {
        this.constructFunctionObject(match);
      }
    } catch (e) {
      throw `Something goes wrong: ${e}`;
    }
  }

  getHead() {
    let head = "| Method  | Description   | Parameters| Type | Parameter Description |\n";
    head +=    "|:--------|:--------------|:----------|:-----|:------------|\n";
    return head;
  }

  constructFunctionObject(text) {
    let obj = {},
        counter = 1;
    const paramReg = /@param\s*\{([^{}]+)\}\s*([a-zA-Z._]+)([^@#]*)/g;

    obj.name = text.match(/@?\b.+$/)[0];
    obj.description = text
      .match(/^[^@]+/)[0]
      .trim()
      .replace(/(\*|#)/g, "")
      .replace(/\s+/g, " ");
    obj.parameters = [];

    while(true) {
      let m = paramReg.exec(text);
      if (counter > 1000) {
        throw("too much")
      }
      counter++;

      if (m) {
        const p = {}
        p.name = m[2];
        p.type = m[1];
        p.description = m[3].replace(/\*/g, "").replace(/\s+/g, " ");
        obj.parameters.push(p);
      } else {
        break;
      }
    }
    this.mdTable += this.getMdTableLine(obj);
  }


  getMdTableLine(fo) {
    let line = "",
        prev_name = "",
        prev_desc = "";
    for (let parameter of fo.parameters) {
      let type = parameter.type.replace("|", " or "),
          name = fo.name,
          desc = fo.description;

      if (name === prev_name) {
        name = "";
      } else {
        prev_name = name;
      }
      if (desc === prev_desc) {
        desc = "";
      } else {
        prev_desc = desc;
      }

      line += `|${name}|${desc}|${parameter.name}|${type}|${parameter.description}\n`;
    }
    return line;
  }
}

module.exports = MarkdownTableProvider;
