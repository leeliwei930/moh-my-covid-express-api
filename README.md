# Malaysia MOH COVID-19 API endpoint server source code

## Introduction
Malaysia MOH COVID-19 self hosted API endpoint which is written using Node.JS express framework that served CSV data into JSON format.

If have any bug or issues, please open a tickets in issue tabs.

## Author Profile
|||
|:---|:---|
| Name | Lee Li Wei |
| GitHub Profile | [https://github.com/leeliwei930/](https://github.com/leeliwei930/)|
| Portfolio | [https://techrino.net](https://techrino.net)|
| Email | leeliwei930@gmail.com |

## Setup

### Step 1: Install all dependencies
```bash
yarn
```

### Step 2: Run Tensorflow Build
```bash
npm rebuild @tensorflow/tfjs-node --build-addon-from-source
```

### Step 3: Copy .env.example to .env
```bash
cp .env.example .env
```

### Step 4: Start the server
```bash
npm run serve
```

## API Documentation
- [Malaysia local cases statistic API documentation](https://documenter.getpostman.com/view/3033633/TzsbLnnT)

- [MySejahtera check in statistics API documentation](https://documenter.getpostman.com/view/3033633/TzsbLnrp)

- [Malaysia states cases statistic API documentation](https://documenter.getpostman.com/view/3033633/TzsbLnrr)

### Variables
`state` available values
- Johor
- Kedah
- Kelantan
- Melaka
- Negeri Sembilan
- Pahang
- Perak
- Perlis
- Pulau Pinang
- Sabah
- Sarawak
- Selangor
- Terengganu
- W.P. Kuala Lumpur
- W.P. Labuan
- W.P. Putrajaya
