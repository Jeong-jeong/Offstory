# π μ€νλΌμΈμμ λ§λλ μ°λ¦¬λ€μ μ΄μΌκΈ°, Offstory
Offstoryλ μ¬νμ μΈλ‘­μ§ μκ² λμμ£Όλ λν μ°ΎκΈ° μλΉμ€μλλ€.

## κΈ°λν¨κ³Ό
λλΆλΆμ λͺ¨μμ΄λ λνκ΄λ ¨ μ λ³΄λ€μ΄ μΉ΄νμ μ‘΄μ¬νλ©° μλΉμ€ μ΄μ©μ μν΄ μΉ΄νλ₯Ό κ°μν΄ μΉμΈ μ μ°¨λ₯Ό λ°μμΌ ν©λλ€.
μ€ν μ€ν λ¦¬λ κ°μ μμ΄ λν κ΄λ ¨ μ λ³΄λ₯Ό μ΄ν΄λ³Ό μ μμΌλ©°, λ°μ΄νμ λͺ©μ μ΄ μλ μ¬νκ³Ό κ΄λ ¨ν λν μ λ³΄λ₯Ό μ½κ³  κ°νΈνκ² μ°Ύμ μ μλλ‘ μ€κ³λμμ΅λλ€.

## νμ
<img width="1425" alt="image" src="https://user-images.githubusercontent.com/68528752/141981679-1f2ccadd-71d6-4dea-b3cd-c712c70f0f31.png">

## λ°°ν¬μ£Όμ
[Offstory μ£Όμ](https://offstory.netlify.app/)


## κΈ°μ  μ€ν
<img width="1414" alt="image" src="https://user-images.githubusercontent.com/68528752/141982899-af256e1a-db97-4c48-9475-779c654f140d.png">

## νμ λκ΅¬
- [git project](https://github.com/prgrms-fe-devcourse/FEDC_OffStory_OFF1/projects/1)
- [notion](https://www.notion.so/1-SNS-60f13d07d4d54066a8456731baee30c4)

## Flowchart
<img width="1427" alt="image" src="https://user-images.githubusercontent.com/68528752/141982631-50f14b8e-02e4-4d71-8b16-e31d87529487.png">


## λλ ν λ¦¬ κ΅¬μ‘°

```
ββ README.md
βββ babel.config.json
βββ functions
β   βββ api.js
βββ netlify.toml
βββ package-lock.json
βββ package.json
βββ postcss.config.js
βββ src
β   βββ App.vue
β   βββ api
β   β   βββ common
β   β   βββ index.js
β   β   βββ postContent.js
β   βββ assets
β   β   βββ images
β   βββ components
β   β   βββ Header.vue
β   β   βββ LoginTestHeader.vue
β   β   βββ Sidebar.vue
β   β   βββ designs
β   β   βββ pages
β   βββ index.html
β   βββ main.js
β   βββ plugins
β   β   βββ storage.js
β   βββ routes
β   β   βββ AuthCheck.vue
β   β   βββ CreateNewPost.vue
β   β   βββ Login.vue
β   β   βββ Main.vue
β   β   βββ NotFound.vue
β   β   βββ PersonalActivity.vue
β   β   βββ PersonalInfo.vue
β   β   βββ PostContent.vue
β   β   βββ PostsThatUserLike.vue
β   β   βββ ResultOfPostList.vue
β   β   βββ Signup.vue
β   β   βββ index.js
β   βββ store
β   β   βββ Loading.js
β   β   βββ Login.js
β   β   βββ address.js
β   β   βββ index.js
β   βββ styles
β   β   βββ _reset.scss
β   β   βββ _variables.scss
β   β   βββ layout
β   β   βββ mixins
β   βββ utils
β       βββ cookies.js
β       βββ formValidation.js
β       βββ function.js
β       βββ sessionStorage.js
β       βββ validation.js
β       βββ variables.js
βββ static
β   βββ _redirects
β   βββ favicon.ico
βββ webpack.config.js
```
## API
- Open API  
[νκ΅­κ΄κ΄κ³΅μ¬_κ΅­λ¬Έ κ΄κ΄μ λ³΄ μλΉμ€ - μ§μ­μ½λ μ‘°ν](https://www.data.go.kr/data/15057787/openapi.do)  
ππ» μ£Όμ μ λ³΄λ₯Ό select νκ·Έλ‘ λ°μμ€κΈ° μν΄ μ¬μ©
<br/>

- μ¬μ©ν API
	- μΈμ¦
		- νμκ°μ
		- λ‘κ·ΈμΈ
		- λ‘κ·Έμμ
		- μΈμ¦ νμΈ
	- μ¬μ©μ
		- μ¬μ©μ μ λ³΄
		- νλ‘ν μ΄λ―Έμ§ λ³κ²½
		- μ»€λ² μ΄λ―Έμ§ λ³κ²½
	- μ€μ 
		- λ΄ μ λ³΄ λ³κ²½
		- λΉλ°λ²νΈ λ³κ²½
	- μ±λ
		- μ±λ λͺ©λ‘
		- μ±λ μ λ³΄
	- ν¬μ€νΈ
		- νΉμ  μ±λμ ν¬μ€νΈ λͺ©λ‘
		- νΉμ  μ±λμ ν¬μ€νΈ μμ±νκΈ°
		- νΉμ  ν¬μ€νΈ μμΈ λ³΄κΈ°
		- λ΄κ° μμ±ν ν¬μ€νΈ μμ νκΈ°
		- λ΄κ° μμ±ν ν¬μ€νΈ μ­μ νκΈ°
	- μ’μμ
		- νΉμ  ν¬μ€νΈ μ’μμ
		- νΉμ  ν¬μ€νΈ μ’μμ μ·¨μ
	- λκΈ
		- νΉμ  ν¬μ€νΈμ λκΈ λ¬κΈ°
		- νΉμ  ν¬μ€νΈμ μμ±ν λ΄ λκΈ μ§μ°κΈ°

















