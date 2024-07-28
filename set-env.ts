// 引入 Node.js 的 'fs' 模組來操作文件系統
import { writeFile } from 'fs';

// 從 package.json 檔案中引入 'name' 和 'version' 屬性
import { name, version } from './package.json'; // 引入 package.json

// 引入 'colors' 模組來讓命令行輸出有顏色
const colors = require('colors');

// 引入 'dotenv' 模組來讀取 .env 檔案中的環境變數
const result = require('dotenv').config();

// 如果讀取 .env 檔案出錯，則輸出錯誤訊息並退出程序
if (result.error) {
  console.log(colors.red('未能讀取 .env 檔案'));
  process.exit(1);
}

// 設定要生成的 environment.ts 檔案的路徑
const targetPath = './src/environments/environment.ts';

// 使用模板字面量來生成 environment.ts 檔案的內容
// 這裡從 process.env 中讀取環境變數並插入到字面量中
const envConfigFile = `export const environment = {
  production: ${process.env['PRODUCTION']}, // 從 .env 檔案中讀取 PRODUCTION 變數
  VERSION: '${version}', // 使用 package.json 中的 version 變數
  apiUrl: '${process.env['BACKEND_URL']}' // 從 .env 檔案中讀取 BACKEND_URL 變數
};

`;

// 顯示將要生成的 environment.ts 檔案的內容
// console.log(colors.magenta('即將生成 environment.ts 檔案，內容如下: \n'));
// console.log(colors.grey(envConfigFile));

// 寫入 environment.ts 檔案，內容是上面生成的 envConfigFile
writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    // 如果寫入檔案失敗，則輸出錯誤訊息
    console.error(colors.red(`生成 environment.ts 檔案失敗: ${err}`));
  }
  // 如果寫入檔案成功，則輸出成功訊息
  // } else {
  //   console.log(
  //     colors.magenta(`成功生成 environment.ts 檔案於 ${targetPath} \n`)
  //   );
  // }
});
