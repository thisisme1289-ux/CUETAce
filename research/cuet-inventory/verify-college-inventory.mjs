import fs from 'node:fs/promises';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';

const file = 'C:\\Users\\thisi\\Documents\\New project\\CUETAce\\research\\cuet-inventory\\cuet-college-level-inventory.xlsx';
const out = 'C:\\tmp\\cuet-inventory-work';
const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(file));
const sheets = [['Read Me', 'A1:H18'], ['College Inventory', 'A1:X20'], ['Entity Register', 'A1:G20'], ['Parent Coverage', 'A1:H20'], ['Sources', 'A1:G20'], ['Missing Documents', 'A1:F20'], ['Validation Tests', 'A1:H8'], ['DU Official Register', 'A1:G20']];
for (const [name, range] of sheets) {
  const blob = await wb.render({ sheetName: name, range, autoCrop: 'all', scale: 1, format: 'png' });
  await fs.writeFile(`${out}\\verify-${name.replaceAll(' ', '-')}.png`, new Uint8Array(await blob.arrayBuffer()));
}
const readme = await wb.inspect({ kind: 'table', sheetId: 'Read Me', range: 'A3:B13', include: 'values,formulas', tableMaxRows: 13, tableMaxCols: 4 });
const tests = await wb.inspect({ kind: 'table', sheetId: 'Validation Tests', range: 'A3:H8', include: 'values,formulas', tableMaxRows: 8, tableMaxCols: 8 });
const du = await wb.inspect({ kind: 'table', sheetId: 'DU Official Register', range: 'A3:G8', include: 'values,formulas', tableMaxRows: 8, tableMaxCols: 7 });
const errors = await wb.inspect({ kind: 'match', searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A', options: { useRegex: true, maxResults: 50 }, summary: 'final formula error scan' });
console.log('README'); console.log(readme.ndjson); console.log('TESTS'); console.log(tests.ndjson); console.log('ERRORS'); console.log(errors.ndjson);
console.log('DU REGISTER'); console.log(du.ndjson);
