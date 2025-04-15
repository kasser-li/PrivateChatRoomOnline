// import express from 'express';
// const app = express();

function errorsCode(errorCode: number, errorMessage: string) {
  if(errorCode === 500) {
    return errorMessage || 'Internal Server Error'
  }
  if(errorCode === 404) {
    return errorMessage || 'Not Found'
  }
  if(errorCode === 401) {
    return errorMessage || 'Unauthorized'
  }
  if(errorCode === 403) {
    return errorMessage || 'Forbidden'
  }
  if(errorCode === 400) {
    return errorMessage || 'Bad Request'
  }

}
export default errorsCode;