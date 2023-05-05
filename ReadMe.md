# 데스크탑 앱 만들기
## 프로그램 사용 기록 추적 프로그램
### 예시) 크롬 30분, 웹스톰 1시간, 게임 30분

## 조건: 시작프로그램에 등록될것
## 조건: db에 사용하지말고 파일에 저장할것
## node.js + electron

# active win tjfcl
```
npm install active-win
```
- 그냥 데스크탑에서 뭐하는지 추적(active-win)
- 추적한 정보를 index.html에 보내기
- 시작프로그램 등록하기
- 에러는 github issue
- 파일로 저장, 불러오기(노드 이론을 알아야함)
- 날짜별로 저장



# 배포
```
npm install --save-dev @electron-forge/cli
npx electron-forge import
npm run make
```

