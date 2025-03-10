
## Todo API App Readme

### 소개

본 App은 React 기반의 Todo 애플리케이션과 Spring Boot 기반의 RESTful API 서버로 구성되어 있습니다. 사용자는 웹 인터페이스를 통해 캘린더의 날짜를 선택하여 해당 날짜의 할 일 목록을 관리하고, API 서버는 데이터베이스와의 상호작용을 담당합니다.

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

### API 명세서


**Base URL:** `/api/todos`

## 1. 특정 Todo 조회 (GET /api/todos/{id})

*   **Description:** 지정된 ID에 해당하는 Todo 항목을 조회합니다.
*   **Method:** `GET`
*   **URL:** `/api/todos/{id}`
*   **Path Parameter:**
    *   `id` (required, string): 조회할 Todo 항목의 ID.

*   **Request Body:** 없음
*   **Response Body**

    ```json
    {
      
      "title": "장보기",
      "todoDate": "2024-10-27",
      "done": false,
      "todoId": "653d8d9c-06c8-4b44-a7e9-72c4d8f489f5"
    }
    ```

    *   `todoId` (string): Todo 항목의 ID.
    *   `title` (string): Todo 항목의 제목.
    *   `todoDate` (string, format: YYYY-MM-DD): Todo 항목의 날짜.
    *   `done` (boolean): 완료 여부 (true: 완료, false: 미완료).

## 2. Todo 업데이트 (PUT /api/todos/{id})

*   **Description:** 지정된 ID에 해당하는 Todo 항목의 done만 업데이트합니다.
*   **Method:** `PUT`
*   **URL:** `/api/todos/{id}`
*   **Path Parameter:**
    *   `id` (required, string): 업데이트할 Todo 항목의 ID.

*   **Request Body:**

    ```json
    {
      "title": "장보기",
      "todoDate": "2024-10-28",
      "done": true,
      "todoId": "f653d8d9c-06c8-4b44-a7e9-72c4d8f489f5"
    }
    ```

    *   `title` (string): 업데이트할 Todo 항목의 제목 (Optional).
    *   `todoDate` (string, format: YYYY-MM-DD): 업데이트할 Todo 항목의 날짜 (Optional).
    *   `done` (boolean): 업데이트할 완료 여부 (Optional).  `true` or `false`.

*   **Response Body (Success - 200 OK):** (위에 조회 성공시 Response Body와 동일)

    ```json
    {
      "title": "장보기",
      "todoDate": "2024-10-28",
      "done": true,
      "todoId": "653d8d9c-06c8-4b44-a7e9-72c4d8f489f5"
    }
    ```

## 3. Todo 삭제 (DELETE /api/todos/{id})

*   **Description:** 지정된 ID에 해당하는 Todo 항목을 삭제합니다.
*   **Method:** `DELETE`
*   **URL:** `/api/todos/{id}`
*   **Path Parameter:**
    *   `id` (required, string): 삭제할 Todo 항목의 ID.

## 4. 모든 Todo 조회 (GET /api/todos)

*   **Description:** 모든 Todo 항목을 조회합니다.
*   **Method:** `GET`
*   **URL:** `/api/todos`
*   **Response Body (Success - 200 OK):**

    ```json
    [
      {
        "title": "장보기",
        "todoDate": "2024-10-27",
        "done": false,
        "todoId": "653d8d9c-06c8-4b44-a7e9-72c4d8f489f5"
      },
      {
        "title": "운동하기",
        "todoDate": "2024-10-27",
        "done": true,
        "todoId": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
      }
    ]
    ```

    *   Array of Todo objects (각 객체는 위에 조회 성공시 Response Body와 동일).

## 5. Todo 생성 (POST /api/todos)

*   **Description:** 새로운 Todo 항목을 생성합니다.
*   **Method:** `POST`
*   **URL:** `/api/todos`
*   **Request Body:**

    ```json
    {
      "title": "새로운 할 일",
      "todoDate": "2024-10-28"
    }
    ```

    *   `title` (required, string): 새로운 Todo 항목의 제목.
    *   `todoDate` (required, string, format: YYYY-MM-DD): 새로운 Todo 항목의 날짜.

*   **Response Headers**

    *   `Location`: 생성된 Todo 항목의 URL (`/api/todos/{id}`).

*   **Response Body** (위에 조회 성공시 Response Body와 동일하며, 새로운 ID가 할당됩니다.)

    ```json
    {
      "title": "새로운 할 일",
      "todoDate": "2024-10-28",
      "done": false,
      "todoId": "새로운 UUID"
    }
    ```

## 6. 특정 날짜의 Todo 조회 (GET /api/todos/date/{todoDate})

*   **Description:** 지정된 날짜에 해당하는 Todo 항목들을 조회합니다.
*   **Method:** `GET`
*   **URL:** `/api/todos/date/{todoDate}`
*   **Path Parameter:**
    *   `todoDate` (required, string, format: YYYY-MM-DD): 조회할 Todo 항목의 날짜.

*   **Response Body** (위에 모든 Todo 조회 성공시 Response Body와 동일)

    ```json
    [
      {
        "title": "장보기",
        "todoDate": "2024-10-27",
        "done": false,
        "todoId": "653d8d9c-06c8-4b44-a7e9-72c4d8f489f5",
      },
      {
        "title": "운동하기",
        "todoDate": "2024-10-27",
        "done": true,
        "todoId": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
      }
    ]
    ```

## Notes:

*   모든 API 요청은 `application/json` Content-Type을 사용합니다.
*   날짜 형식은 `YYYY-MM-DD`를 사용합니다.
*   ID는 UUID 형식입니다.
*   에러 발생 시, 응답 Body에 에러 메시지를 포함할 수 있습니다. (구현에 따라 다름)
*   인증 및 권한 부여는 별도로 명시하지 않았습니다. 필요한 경우, API 명세에 추가해야 합니다.

요약
*   `GET /api/todos?todoDate=YYYY-MM-DD`: 특정 날짜의 할 일 목록 조회
*   `GET /api/todos/{id}`: 특정 ID의 할 일 조회
*   `POST /api/todos`: 새로운 할 일 추가
*   `PUT /api/todos/{id}`: 특정 ID의 할 일 수정
*   `DELETE /api/todos/{id}`: 특정 ID의 할 일 삭제

### 추가 정보

*   **CORS 설정:** 프론트엔드와 백엔드 간의 CORS 문제를 해결하기 위해 `@CrossOrigin` 어노테이션을 사용하여 CORS를 활성화했습니다.
*   **로깅:** P6spy를 사용하여 백엔드에서 SQL 쿼리를 로깅하고 있습니다.
