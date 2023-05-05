const { app, BrowserWindow } = require('electron')
const path = require('path')
const activeWindow = require('active-win');
const fs = require('fs').promises;

const createWindow = async() => {
    const win = new BrowserWindow({
        width: 1500,
        height: 900,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    await win.loadFile('index.html')

    // 오늘 날짜 확인
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    // 데이터 불러오기
    let record = {};
    try{
        const loadedData = await fs.readFile(path.join(__dirname, `${dateStr}.txt`));
        console.log(loadedData.toString())
        record[dateStr] = JSON.parse(loadedData.toString());
    } catch {
        console.log('no file!!')
    }

    //1초마다 실행
    setInterval(async () => {
        // 12시 넘어서 날짜 바뀔 수 있으므로 setInterval 안에서 다시 날짜 로딩
        const date = new Date();
        const dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        //액티브 윈도우 조회
        const data = await activeWindow({})
        if(!record[dateStr]){
            record[dateStr] = {};
        }

        // 없으면 1초로 시작, 있으면 1초 더하기
        if(record[dateStr][data?.owner?.name]){
            record[dateStr][data?.owner?.name] += 1;
        } else{
            record[dateStr][data?.owner?.name] = 1
        }
        // html로 데이터 보내기
        // mac: screenRecordingPermission
        win.webContents.send('updateNumber', record[dateStr]);
        // 데이터 저장
        await fs.writeFile(path.join(__dirname, `${dateStr}.txt`), JSON.stringify(record[dateStr]));
    }, 1000)
}







app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})