//Ciando erro da class Error do js pois diferencia um erro do outro
export class AuthTokenError extends Error {
  constructor() 
  {
    super ('Error with authentication token.')
  }
}