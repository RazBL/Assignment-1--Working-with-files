const fs = require('node:fs/promises');
const path = require('node:path');

exports.Create = async(n, txt) => {
    await fs.writeFile(path.join(__dirname, 'files', 'file' + n + '.txt'), txt);
}

 const Read = async(n) => {
    let data = await  fs.readFile(path.join(__dirname, 'files', 'file' + n + '.txt'));
    return data.toString();
  }

  const GetRandNumber  = () => {
    let rand = Math.round(Math.random() * 4) + 1;
    return rand;
 }

 exports.ConcatFiles = async () => {
  
  //Code line only for testing
  await fs.writeFile(path.join(__dirname, 'files', 'concatTextFile.txt'), "hi");

  await fs.unlink(path.join(__dirname, 'files', 'concatTextFile.txt'));

  let number = GetRandNumber();
  console.log(number);

  let files = await fs.readdir(path.join(__dirname, 'files'));

  for (let i = 0; i < files.length; i++) {
    if (files[i] === 'file'+number+'.txt') {
      break;
    }
    let data = await fs.readFile(path.join(__dirname, 'files', files[i]));
    await fs.appendFile(path.join(__dirname, 'files', 'stringtxt.txt'), data.toString() +'\n');
  }

  await fs.rename(path.join(__dirname, 'files', 'stringtxt.txt'), path.join(__dirname, 'files', 'concatTextFile.txt'));
};