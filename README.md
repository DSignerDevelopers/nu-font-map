# nu-font-map
SMART font map for font users and creative professionals.  
Font Map is also to visualize **font-curator**'s results.

  ## Installation
  Installation requires node and npm
  
  ```npm install```
  
  ## Run Dev Mode
  Running dev mode
  
  ```npm run dev```
  
  ## Components
  ### 1. Map Data  
  * font-dataset
    * script: All the shell script files are to transform meta-data file into usable data-set file including font-family, font-weight, font-style. Script의 대부분은 font-metadata.csv 파일의 정보를 참고해 output 데이터를 만들어내고 있음.
    * csv files: CSV 파일 중 combined.csv, weight.csv, slant.csv 는 실제 web-app에서 사용되는 데이터 정보로 구성되어 있음. 이와 다른 tsne 가 붙거나 이름이 다른 데이터는 original 데이터 파일임. (오리지널 데이터는 @David 에게서 받음)
  ### 2. web-app  
  1. D3.js  
    * D3.js는 data visualization 을 가능하게 해주는 js 모듈임. 사용법은 D3.js 문서(링크달자)를 참고.  
    * D3.js의 flot map 을 활용해서 x,y에 대한 좌표를 2차원 상의 font map으로 그려주고 있음.  
    * 현재 D3.js에서 font map을 그릴 때에는 프로젝트 내의 파일을 읽는 것이 아니라 AWS S3에 있는 파일을 읽어 처리하고 있다.  
  2. Vue App  
    *  html head 부분에 google fonts 들을 stylesheet로 로드하기 위한 js 스크립트가 전체 App.vue에 구현되어 있음. fontList를 assets으로 가지고 있기 때문에 disaply할 폰트들에 대한 fontlist가 업데이트 되면 assets 내의 파일을 업데이트 하면 됨.  
    *  Module은 d3js를 불러서 보여주는 부분이 대부분임. 다른 모듈은 거의 없음.
