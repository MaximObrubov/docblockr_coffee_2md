/**
 * Класс, предоставляющий возможность парсить jsdoc в markdown таблицу
 */
class MarkdownTableProvider {
  constructor(filePath) {
    console.log("here we go");
    
    this.mdTable = this.getHead();
    this.fs = require('fs');
    this.readFile(filePath);

  }

  readFile(path) {
    fs.readFile(path, {encoding: 'utf-8'}, function(err, content){
        if (!err) {
            this.matched = content.match(/###\*[^#]+###[^:]+/g);
            cunstructTable();
        } else {
            console.log(err);
        }
    });
  }

  cunstructTable(){
    for (let match of this.matched) {
      this.constructFunctionObject(match);
    }
    console.log(this.mdTable);
  }

  getHead() {
    let head = "| Method  | Description   | Parameters| Type | Parameter Description |\n";
    head +=    "|:--------|:--------------|:----------|:-----|:------------|\n";
    return head;
  }

  constructFunctionObject(text) {
    let obj = {}
    let counter = 1;
    const paramReg = /@param\s*\{([^{}]+)}\s*([a-zA-Z._]+)([^@#]*)/g;


    console.log(text);
    console.log("\n===================\n");

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
    this.mdTable += this.gMarkdownTableProvideretMdTableLine(obj);
  }


  getMdTableLine(fo) {
    let line = "",
        prev_name = "",
        prev_desc = "";
    for (let parameter of fo.parameters) {
      let type = parameter.type.replace("|", " or ");
      let name = fo.name;
      let desc = fo.description;

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
