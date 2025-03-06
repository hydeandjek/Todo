
## Todo API App Readme

### 소개

본 App은 React 기반의 Todo 애플리케이션과 Spring Boot 기반의 RESTful API 서버로 구성되어 있습니다. 사용자는 웹 인터페이스를 통해 할 일 목록을 관리하고, API 서버는 데이터베이스와의 상호작용을 담당합니다.

### 기술 스택

#### 프론트엔드 (React)

*   React
*   React Hooks (useState, useEffect, useCallback)
*   react-calendar
*   node-sass
*   classnames
*   react-icons

#### 백엔드 (Spring Boot)

*   Spring Boot
*   JPA
*   Lombok
*   MySQL
*   P6spy (SQL 로깅)

### 주요 기능

*   **할 일 목록 조회:** 특정 날짜 할일 목록을 조회합니다.
*   **할 일 추가:** 새로운 할 일을 추가합니다.
*   **할 일 수정:** 기존 할 일의 완료 상태를 변경합니다.
*   **할 일 삭제:** 기존 할 일을 삭제합니다.

### 프로젝트 구조

```
├── frontend/           # React 프론트엔드 코드
│   ├── src/
│   │   ├── components/   # 컴포넌트
│   │   ├── scss/         # 스타일
│   │   ├── App.js        # 메인 컴포넌트
│   │   └── ...
│   ├── package.json
│   └── ...
├── TodoApi/            # Spring Boot 백엔드 코드
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/TodoApi/
│   │   │   │       ├── API/
│   │   │   │       │   ├── Controller/   # 컨트롤러
│   │   │   │       │   ├── Service/      # 서비스
│   │   │   │       │   ├── dto/          # DTO
│   │   │   │       │   │   ├──requset/
│   │   │   │       │   │   └──response/
│   │   │   │       │   ├── entity/       # 엔티티
│   │   │   │       │   └── repository/   # 리포지토리
│   │   │   └── resources/
│   │   └── test/
│   ├── build.gradle  
│   └── ...
├── README.md           # 프로젝트 설명 파일
└── ...
```

### 실행 방법

1.  **프로젝트 복제:**

    ```bash
    git clone [레포지토리 주소]
    ```

2.  **MySql 데이터베이스 설정:**
    *  `application.yml` 파일에서 데이터베이스 연결 정보를 설정합니다.

        ```bash
            yml
        server:
            port:8080
        spring:
        application:
            name: TodoApi
        datasource:
            url: jdbc:mysql://localhost:3306/sys
            username: root
            password: yourpassword
            driver-class-name: com.mysql.cj.jdbc.Driver
        jpa:
            database-platform: org.hibernate.dialect.MySQL8Dialect
            hibernate:
            ddl-auto: create
            database: mysql

        springdoc:
            swagger-ui:
            path: /myapi.html
        ```


#### 프론트엔드 실행

1.  **디렉토리 이동:**

    ```bash
    cd '설치위치'
    ```

2.  **패키지 설치:**

    ```bash
    $ npm install react-calendar // 캘린더
    $ npm install react-icons  // 아이콘
    $ npm install classnames   // 클래스 add/remove 편리한거
    $ npm install sass // scss 문법 사용
    $ npm install reactstrap bootstrap
    $ npm install @mui/material @emotion/react @emotion/styled
    $ npm install @mui/icons-material
    $ npm install react-router-dom
    ```

3.  **애플리케이션 실행:**

    ```bash
    npm start
    ```

    브라우저에서 `http://localhost:3000`으로 접속합니다.

### API 엔드포인트

*   `GET /api/todos?todoDate=YYYY-MM-DD`: 특정 날짜의 할 일 목록 조회
*   `GET /api/todos/{id}`: 특정 ID의 할 일 조회
*   `POST /api/todos`: 새로운 할 일 추가
*   `PUT /api/todos/{id}`: 특정 ID의 할 일 수정
*   `DELETE /api/todos/{id}`: 특정 ID의 할 일 삭제

### 추가 정보

*   **CORS 설정:** 프론트엔드와 백엔드 간의 CORS 문제를 해결하기 위해 `@CrossOrigin` 어노테이션을 사용하여 CORS를 활성화했습니다.
*   **로깅:** P6spy를 사용하여 SQL 쿼리를 로깅하고 있습니다.