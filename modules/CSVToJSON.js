/**
 * Receives an CSV file text content and outputs a converted JavaScript object.
 * @param {string} csv 
 * @returns {any}
 * @see {@link http://techslides.com/convert-csv-to-json-in-javascript}
 */
export default function CSVToJSON(csv) {
    const lines = csv.split("\n")

    let result = [];
    let headers = lines[0].split(",")

    for (let i = 1; i < lines.length; i++) {

        let obj = {};
        let currentline = lines[i].split(",");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }

    return JSON.stringify(result)
}