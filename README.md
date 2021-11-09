# 📆 오프라인에서 만드는 우리들의 이야기, Offstory
## 팀원
- 김영후 🙆‍♀️
- 조주영 🙆‍♀️
- 김지영 🙆‍♀️

## 협업 도구
- [git project](https://github.com/prgrms-fe-devcourse/FEDC_OffStory_OFF1/projects/1)
- [notion](https://www.notion.so/1-SNS-60f13d07d4d54066a8456731baee30c4)

## 개요
여행을 외롭지 않게 도와주는 동행 찾기 서비스

## 타겟
<!-- 부랑자, 방랑자, 혼동족(혼잔데 동행을 구하는 족) -->
동행을 원하는 분 🙋‍♀️
## 기대효과
- 대부분의 모임이나 동행 관련 정보들은 카페에 존재하며  
이를 위해서는 카페 가입 후 승인을 받아야 하는 번거로운 작업을 거쳐야 함.  
👉🏻 가입할 필요없이 동행 관련 정보를 쉽고 간편하게 찾을 수 있음.
<br/>

- 데이팅이 주 목적이 아닌 친구나 동행을 필요로 하는 사람들을 위해  
유용하게 쓰일 수 있음.

## 폴더구조

```
── README.md
├── babel.config.json
├── functions
│   └── api.js
├── netlify.toml
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   ├── App.vue
│   ├── api
│   │   ├── common
│   │   ├── index.js
│   │   └── postContent.js
│   ├── assets
│   │   └── images
│   ├── components
│   │   ├── Header.vue
│   │   ├── LoginTestHeader.vue
│   │   ├── Sidebar.vue
│   │   ├── designs
│   │   └── pages
│   ├── index.html
│   ├── main.js
│   ├── plugins
│   │   └── storage.js
│   ├── routes
│   │   ├── AuthCheck.vue
│   │   ├── CreateNewPost.vue
│   │   ├── Login.vue
│   │   ├── Main.vue
│   │   ├── NotFound.vue
│   │   ├── PersonalActivity.vue
│   │   ├── PersonalInfo.vue
│   │   ├── PostContent.vue
│   │   ├── PostsThatUserLike.vue
│   │   ├── ResultOfPostList.vue
│   │   ├── Signup.vue
│   │   └── index.js
│   ├── store
│   │   ├── Loading.js
│   │   ├── Login.js
│   │   ├── address.js
│   │   └── index.js
│   ├── styles
│   │   ├── _reset.scss
│   │   ├── _variables.scss
│   │   ├── layout
│   │   └── mixins
│   └── utils
│       ├── cookies.js
│       ├── formValidation.js
│       ├── function.js
│       ├── sessionStorage.js
│       ├── validation.js
│       └── variables.js
├── static
│   ├── _redirects
│   └── favicon.ico
└── webpack.config.js
```
## API
- Open API  
[한국관광공사_국문 관광정보 서비스 - 지역코드 조회](https://www.data.go.kr/data/15057787/openapi.do)  
👉🏻 주소 정보를 select 태그로 받아오기 위해 사용
<br/>

- 사용한 API
	- 인증
		- 회원가입
		- 로그인
		- 로그아웃
		- 인증 확인
	- 사용자
		- 사용자 정보
		- 프로필 이미지 변경
		- 커버 이미지 변경
	- 설정
		- 내 정보 변경
		- 비밀번호 변경
	- 채널
		- 채널 목록
		- 채널 정보
	- 포스트
		- 특정 채널의 포스트 목록
		- 특정 채널에 포스트 작성하기
		- 특정 포스트 상세 보기
		- 내가 작성한 포스트 수정하기
		- 내가 작성한 포스트 삭제하기
	- 좋아요
		- 특정 포스트 좋아요
		- 특정 포스트 좋아요 취소
	- 댓글
		- 특정 포스트에 댓글 달기
		- 특정 포스트에 작성한 내 댓글 지우기

















