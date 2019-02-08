# educationELLy

> **educationELLy** aims to engage regular classroom teachers in the English language learning process by providing them with quick access to relevant information about the ELL students in their classes. By making ELL student information accessible to mainstream teachers and ELL teachers alike, educationELLy keeps an ELL student's teachers updated on his or her English language proficiency and provides a centralized platform through which all teachers can participate in the feedback process. educationELLy bridges the gap between ELL teachers and regular teachers and facilitates the creation of a more integrated curriculum for English language learners. With educationELLy, all teachers become language teachers.

## Build Status
![React](https://img.shields.io/badge/react-16.6.0%2B-blue.svg) [![npm version](https://img.shields.io/badge/npm%20package-6.4.1-orange.svg)](https://badge.fury.io/js/npm) [![Build Status](https://travis-ci.org/maxjeffwell/full-stack-capstone-client.svg?branch=master)](https://travis-ci.org/maxjeffwell/full-stack-capstone-client) ![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen.svg) [![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://jmaxwell-fullstack-client.herokuapp.com/)

## [Live App](https://jmaxwell-fullstack-client.herokuapp.com/)

```
Demo Account

username: demo
password: demopassword
```
## Screenshots

[![educationELLy Landing Page](https://i.gyazo.com/9f261d982b86d4c58d9e787db42972ea.png)](https://gyazo.com/9f261d982b86d4c58d9e787db42972ea)

[![educationELLy Registration Page](https://i.gyazo.com/15343e6fc9ab4b75daaf68e819d6c672.png)](https://gyazo.com/15343e6fc9ab4b75daaf68e819d6c672)

[![educationELLy Login Page](https://i.gyazo.com/7bf3966ef1f82a8870268357977a0684.png)](https://gyazo.com/7bf3966ef1f82a8870268357977a0684)

[![educationELLy Student List Page](https://i.gyazo.com/56c518f5cadba3482bba048bdd6187a9.png)](https://gyazo.com/56c518f5cadba3482bba048bdd6187a9)

[![educationELLy Update Student Page](https://i.gyazo.com/60b899e1d34962bb2f17127f830dfbf0.png)](https://gyazo.com/60b899e1d34962bb2f17127f830dfbf0)

## Technology Stack
**Front End**
* React/Redux with extensive use of Redux-Form
* Async Redux actions implemented with Redux Thunk middleware
* Semantic-UI-React components customized with the use of Styled Components
* React component testing with Enzyme

**Back End** [Server Github Repo](https://github.com/maxjeffwell/full-stack-capstone-server)

* API built with Express Server
  * with middleware yay
* Security
  * JWT authentication and password hashing with bcrypt.js

**Data Persistence**
* MongoDB connected to Express via Mongoose

**Hosting / SaaS / DBaaS / CICD**
* Github
* TravisCI
* Heroku
* mLab

**Relevant source code to key parts of client-side educationELLy**

* [Action creators and ajax request to backend api](../master/src/actions/index.js)

 * [Data layer control for redux](../master/src/index.js)

 * [Client-side authentication](../master/src/reducers/auth.js)

## Meta

by Jeff Maxwell maxjeffwell@gmail.com |
[https://github.com/maxjeffwell](https://github.com/maxjeffwell)

Distributed under the GNU GPLv3 License.
    See ``LICENSE`` for more information.



