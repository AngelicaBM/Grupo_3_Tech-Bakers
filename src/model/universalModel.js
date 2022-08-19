const fs = require('fs');
const path = require('path');


const universalModel = function (name) {

    return {
        tablePath: path.resolve(__dirname, '../dataBase/', `${name}.json`),
 
        readFile: function () {
            let tableContents = fs.readFileSync(this.tablePath, 'utf-8');
            return JSON.parse(tableContents) || [];
        },
        writeFile: function (contents) {
            let tableContents = JSON.stringify(contents, null, ' ');
            fs.writeFileSync(this.tablePath, tableContents);
        },
        nextId: function () {
            let rows = this.readFile();
            let lastRow = rows.pop();

            return lastRow.id ? ++lastRow.id : 1;
        },
        all: function () {
            return this.readFile();
        },
        find: function (id) {
            let rows = this.readFile();
            return rows.find(i => i.id == id);
        },

        create: function (row) {
            let rows = this.readFile();
            row.id = this.nextId();
            rows.push(row);
            this.writeFile(rows);
            return row.id;
        },
        update: function (row) {
            let rows = this.readFile();

            let updatedRows = rows.map(oneRow => {
                if (oneRow.id == row.id) {
                    return row;
                }

                return oneRow;
            });
            this.writeFile(updatedRows);

            return row.id;
        },
 
        delete: function (id) {

            let rows = this.readFile();
            let updatedRows = rows.filter(row => {
                return row.id != id;
            });

            this.writeFile(updatedRows);
        },

        enOferta: function () {
            let rows = this.readFile();
  
            const visitados = rows.filter(i => i.category == 'En oferta')
            return visitados 

        },

        destacados: function () {
            let rows = this.readFile();
  
            const enVenta = rows.filter(i => i.category == 'Destacados')
            return enVenta

        },

        findFirstByField: function(field, text){
            let rows = this.all();
            let elementFound = rows.find(element => element[field] == text);
            return elementFound;
        },

        findAllByField: function(field, text){
            let rows = this.all();
            let allElementsFound = rows.filter(element => element[field] == text);
            return allElementsFound;
        },

    }
}

module.exports = universalModel